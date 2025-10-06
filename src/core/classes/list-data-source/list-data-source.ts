import { Injector, Signal, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';

import {
  Observable,
  Subject,
  catchError,
  debounceTime,
  filter,
  finalize,
  map,
  of,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';

import { DEBOUNCE_TIME_UI } from '../../constants';
import { negativeBoolean, combineLatestIntoObject, toResult } from '../../helpers';
import {
  EntityList,
  Identifiable,
  ListDataSourceAdapter,
  ListQueryParams,
  ListQueryParamsPagination,
} from '../../models';
import { DirectionOrder, FilterValues, Nullable } from '../../types';

import { ListDataSourceOptions } from './models';
import { TuiPaginationComponent } from '@taiga-ui/kit';
import { TuiDirectionOrderDirective, TuiSortByDirective } from '@taiga-ui/addon-table';

export abstract class ListDataSource<
  ItemType extends Identifiable,
  FilterType = FilterValues,
  ListType extends EntityList<ItemType> = EntityList<ItemType>
> implements ListDataSourceAdapter
{
  readonly #defaultPageIndex = 0;
  readonly #optionsSubject = new Subject<ListDataSourceOptions<ItemType>>();
  readonly #dataSignal = signal<ItemType[]>([]);
  readonly #pageIndexSignal = signal<number>(this.#defaultPageIndex);
  readonly #pagesLengthSignal = signal<number>(0);
  readonly #isLoadingSignal = signal<boolean>(true);
  readonly #isEmptyDataSignal = signal<boolean>(true);
  readonly #refreshSubject = new Subject<void>();
  readonly #injector = inject(Injector);

  protected limit = 10;

  readonly $data = this.#initData();
  readonly $isLoading = this.#isLoadingSignal.asReadonly();
  readonly $isEmptyData = this.#isEmptyDataSignal.asReadonly();
  readonly $pageIndex = this.#pageIndexSignal.asReadonly();
  readonly $pagesLength = this.#pagesLengthSignal.asReadonly();

  get data(): ItemType[] {
    return this.#dataSignal();
  }

  get length(): number {
    return this.data.length;
  }

  get isLoading(): boolean {
    return this.#isLoadingSignal();
  }

  initDataSource(options: ListDataSourceOptions<ItemType>): void {
    this.#optionsSubject.next(options);
  }

  refresh(): Observable<void> {
    this.#refreshSubject.next();

    const toEmptyValue = (): void => undefined;

    return toObservable(this.#isLoadingSignal, { injector: this.#injector }).pipe(
      filter(negativeBoolean),
      take(1),
      map(toEmptyValue)
    );
  }

  resetData(): void {
    this.#isEmptyDataSignal.set(true);
  }

  protected abstract getApiData(
    params: ListQueryParams<ItemType, FilterType>
  ): Observable<ListType>;

  #initData(): Signal<ItemType[]> {
    const toParamsWithRefresh = (
      params: ListQueryParams<ItemType, FilterType>
    ): Observable<ListQueryParams<ItemType, FilterType>> => {
      return this.#mergeParamsWithRefresh(params);
    };
    const toDataFlow = (params: ListQueryParams<ItemType, FilterType>): Observable<ItemType[]> => {
      return this.#createDataFlow(params);
    };
    const toDataStream = (options: ListDataSourceOptions<ItemType>): Observable<ItemType[]> => {
      return this.#createParamsObservable(options).pipe(
        switchMap(toParamsWithRefresh),
        switchMap(toDataFlow)
      );
    };

    return toSignal(this.#optionsSubject.pipe(switchMap(toDataStream)), { initialValue: [] });
  }

  #createParamsObservable({
    tableComponent,
    form,
  }: ListDataSourceOptions<ItemType>): Observable<ListQueryParams<ItemType, FilterType>> {
    const pagination = tableComponent.$pagination();

    return combineLatestIntoObject<ListQueryParams<ItemType, FilterType>>({
      pagination: this.#createPaginationObservable(pagination),
      orderBy: this.#createOrderByObservable(tableComponent?.$sort(), pagination),
      filterValues: this.#createFilterObservable(form, pagination),
      directionOrder: this.#createDirectionObservable(
        tableComponent?.$table()?.direction,
        tableComponent?.$direction(),
        pagination
      ),
    }).pipe(debounceTime(DEBOUNCE_TIME_UI));
  }

  #mergeParamsWithRefresh(
    params: ListQueryParams<ItemType, FilterType>
  ): Observable<ListQueryParams<ItemType, FilterType>> {
    const toParams = (): ListQueryParams<ItemType, FilterType> => params;

    return this.#refreshSubject.pipe(map(toParams), startWith(params));
  }

  #createPaginationObservable(
    pagination?: TuiPaginationComponent
  ): Observable<ListQueryParamsPagination> {
    if (!pagination) return of({ limit: this.limit, offset: 0 });

    const setPageIndex = (offset: number): void => this.#pageIndexSignal.set(offset);
    const toPagination = (offset: number): ListQueryParamsPagination => ({
      offset: offset * this.limit,
      limit: this.limit,
    });

    return pagination.indexChange.pipe(
      startWith(pagination.index),
      tap(setPageIndex),
      map(toPagination)
    );
  }

  #createOrderByObservable(
    sort?: TuiSortByDirective<Partial<Record<keyof ItemType, unknown>>>,
    pagination?: TuiPaginationComponent
  ): Observable<Nullable<string | keyof ItemType>> {
    if (!sort) return of(null);

    return sort.tuiSortByChange.pipe(tap(this.#resetPage(pagination)), startWith(sort.tuiSortBy));
  }

  #createDirectionObservable(
    initialDirection?: -1 | 1,
    direction?: TuiDirectionOrderDirective<ItemType>,
    pagination?: TuiPaginationComponent
  ): Observable<Nullable<DirectionOrder>> {
    if (!direction) return of(null);

    const currentDirectionOrder: DirectionOrder = initialDirection === 1 ? 'asc' : 'desc';

    return direction.directionOrderChange.pipe(
      tap(this.#resetPage(pagination)),
      startWith(currentDirectionOrder)
    );
  }

  #createFilterObservable(
    form?: FormGroup,
    pagination?: TuiPaginationComponent
  ): Observable<Nullable<FilterType>> {
    if (!form) return of(null);

    return form.valueChanges.pipe(
      tap(this.#resetPage(pagination)),
      startWith<FilterType>(form.value)
    );
  }

  #createDataFlow(params: ListQueryParams<ItemType, FilterType>): Observable<ItemType[]> {
    const setIsLoading = (isLoading: boolean) => (): void => this.#isLoadingSignal.set(isLoading);
    const setIsEmptyData = (): void => this.#isEmptyDataSignal.set(!this.length);
    const setPagesLength = ({ meta }: EntityList<ItemType>): void => {
      const pagesLength = Math.ceil(meta!.size / this.limit);

      this.#pagesLengthSignal.set(pagesLength);
    };
    const toData = (): Observable<ListType> => this.getApiData(params);
    const setData = (data: ItemType[]): void => this.#dataSignal.set(data);
    const handleError = (error: Error): Observable<null> => {
      console.error(error);

      return of(null);
    };

    return of(null).pipe(
      tap(setIsLoading(true)),
      switchMap(toData),
      tap(setPagesLength),
      map(toResult),
      tap(setData),
      catchError(handleError),
      filter(Boolean),
      finalize(setIsEmptyData),
      finalize(setIsLoading(false))
    );
  }

  #resetPage = (pagination?: TuiPaginationComponent) => (): void => {
    if (!pagination) return;

    pagination.onElementClick(this.#defaultPageIndex);
  };
}
