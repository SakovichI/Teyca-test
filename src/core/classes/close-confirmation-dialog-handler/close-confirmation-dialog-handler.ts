import {
  DestroyRef,
  Directive,
  ElementRef,
  HostListener,
  inject,
  signal,
  Renderer2,
  AfterViewInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  TuiDialogCloseService,
  TuiDialogContext,
  TuiDialogOptions,
  TuiDialogService,
} from '@taiga-ui/core';
import { TUI_PROMPT, TuiPromptData } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { filter, Observable, of, switchMap, tap } from 'rxjs';
import { DirtyComponent } from '../../types';

@Directive()
export abstract class CloseConfirmationDialogHandler<
  I extends Record<string, unknown>,
  FG extends FormGroup | FormArray,
  DialogContext extends TuiDialogContext<any, any> = TuiDialogContext<any, any>
> implements DirtyComponent, AfterViewInit
{
  readonly #renderer = inject(Renderer2);
  readonly #el = inject(ElementRef);
  readonly #dialogService = inject(TuiDialogService);
  readonly #close$ = inject(TuiDialogCloseService);
  readonly #router = inject(Router);

  readonly #isDirtySignal = signal(false);

  #snapshot: I;
  #form: FG;

  protected readonly fb = inject(FormBuilder);
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly context = inject<DialogContext>(POLYMORPHEUS_CONTEXT);

  readonly $isDirty = this.#isDirtySignal.asReadonly();

  constructor() {
    this.#handleCloseChanges();
  }

  get form(): FG {
    return this.#form;
  }

  ngAfterViewInit(): void {
    this.#addWrapper();
  }

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: BeforeUnloadEvent): void {
    if (this.$isDirty()) {
      event.preventDefault();
      event.returnValue = ''; // для некоторых старых браузеров требуется установить returnValue
    }
  }

  setForm(form: FG): void {
    this.#form = form;
    this.#takeFormSnapshot(form.getRawValue());
    this.#handleIsDirtyFormChanges();
  }

  resetForm(data: I): void {
    if (this.form instanceof FormGroup) this.form.patchValue(data, { emitEvent: false });

    this.#takeFormSnapshot(data);
  }

  close<T = unknown>(data?: T): void {
    if (data) this.context.completeWith(data);

    this.context.$implicit.complete();
  }

  goBack(url: string): Observable<boolean> {
    const goBack = (): void => this.#navigateTo(url);

    return this.#attemptClose().pipe(filter(Boolean), tap(goBack));
  }

  goToDialog(url: string): Observable<boolean> {
    const toAccountDialog = (): void => {
      setTimeout(() => this.#navigateTo(url));
    };

    return this.#attemptClose().pipe(
      filter(Boolean),
      tap(() => this.close()),
      tap(toAccountDialog)
    );
  }

  #navigateTo(url: string): void {
    void this.#router.navigate([url], { queryParamsHandling: 'preserve' });
  }

  #attemptClose(): Observable<boolean> {
    if (!this.$isDirty()) return of(true);

    const data: TuiPromptData = {
      content: 'Внесенные изменения не сохранятся',
      yes: 'Закрыть',
      no: 'Отменить',
    };
    const label = 'Вы уверены, что хотите закрыть окно?';
    const options: Partial<TuiDialogOptions<TuiPromptData>> = {
      appearance: 'delete',
      label,
      size: 's',
      data,
      closeable: false,
    };

    return this.#dialogService.open<boolean>(TUI_PROMPT, options);
  }

  #takeFormSnapshot(data: I): void {
    this.#snapshot = data;
    this.#isDirtySignal.set(false);
  }

  #addWrapper(): void {
    const wrapper = this.#renderer.createElement('div');

    this.#renderer.addClass(wrapper, 'wrapper');

    while (this.#el.nativeElement.childNodes.length) {
      this.#renderer.appendChild(wrapper, this.#el.nativeElement.childNodes[0]);
    }

    this.#el.nativeElement.appendChild(wrapper);
  }

  #isDirtyCheck(value: Partial<I>): boolean {
    if (!value) return false;

    return JSON.stringify(this.#snapshot) !== JSON.stringify(value);
  }

  #handleIsDirtyFormChanges(): void {
    const isDirty = (): void =>
      this.#isDirtySignal.set(this.#isDirtyCheck(this.form.getRawValue()));

    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(isDirty);
  }

  #handleCloseChanges(): void {
    this.#close$
      .pipe(
        switchMap(this.#attemptClose.bind(this)),
        filter(Boolean),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.close());
  }
}
