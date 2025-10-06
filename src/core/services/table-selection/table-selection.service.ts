import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { Subscription, finalize, tap } from 'rxjs';

import { SelectionService } from '../selection';
import { TableBarService } from '../table-bar';
import { Identifiable } from '../../models';
import { Nullable } from '../../types';
import { toId } from '../../helpers';

@Injectable()
export class TableSelectionService<T extends Identifiable> extends SelectionService<
  T,
  Nullable<T>
> {
  readonly #tableBarService = inject(TableBarService);

  #tableBarSubscription: Nullable<Subscription>;
  #tableBarTemplate: PolymorpheusContent;

  readonly #currentItemsIdsSignal = signal<number[]>([]);

  readonly $areAllSelected = this.#initAreAllSelected();
  readonly $isIndeterminate = this.#initIsIndeterminate();
  readonly $selectedItems = computed(() => this.getSelectedItems(this.$selectedItemsMap()));

  getSelectedItems(itemsMap = this.$selectedItemsMap()): T[] {
    const isSelectedItem = (item: Nullable<T>): item is T => !!item;

    return [...itemsMap.values()].filter(isSelectedItem);
  }

  setCurrentItemsIds(items: T[]): void {
    const ids = items.map(toId);

    this.#currentItemsIdsSignal.set(ids);
  }

  setTableBarTemplate(template: PolymorpheusContent): void {
    this.#tableBarTemplate = template;
  }

  toggleAll(items: T[]): void {
    const areAllSelected = this.$areAllSelected();
    const hasAlreadySelectedItems = this.$selectedItems().length > items.length;

    if (areAllSelected && hasAlreadySelectedItems) {
      this.deselect(items);

      return;
    }

    if (areAllSelected) {
      this.clear();
      this.#toggleTableBar();

      return;
    }

    this.select(items);
    this.#toggleTableBar();
  }

  toggle(item: T): void {
    if (this.isSelected(item.userId)) {
      this.deselect(item);
      this.#toggleTableBar();

      return;
    }

    this.select(item);
    this.#toggleTableBar();
  }

  clearSelectedItems(): void {
    this.clear();
    this.#closeTableBar();
  }

  protected override mapValueSetter = (isSelected: boolean, item: T): Nullable<T> =>
    isSelected ? item : null;

  #initAreAllSelected(): Signal<Nullable<boolean>> {
    return computed(() => {
      const itemsMap = this.$selectedItemsMap();
      const currentItemsIds = this.#currentItemsIdsSignal();

      if (this.isSelectedMapEmpty) return false;

      const areAllSelected = currentItemsIds.every(this.#hasCurrentId(itemsMap));

      if (areAllSelected) return areAllSelected;

      if (this.#areSomeSelected(currentItemsIds, itemsMap)) return null;

      return false;
    });
  }

  #initIsIndeterminate(): Signal<Nullable<boolean>> {
    return computed(() => {
      const itemsMap = this.$selectedItemsMap();
      const currentItemsIds = this.#currentItemsIdsSignal();

      if (this.isSelectedMapEmpty || this.$areAllSelected()) return false;

      return this.#areSomeSelected(currentItemsIds, itemsMap);
    });
  }

  #hasCurrentId(itemsMap: Map<number, Nullable<T>>): (id: number) => boolean {
    return (id: number) => !!itemsMap.get(id);
  }

  #areSomeSelected(
    currentItemsIds: number[] = this.#currentItemsIdsSignal(),
    itemsMap: Map<number, Nullable<T>> = this.$selectedItemsMap()
  ): boolean {
    return currentItemsIds.some(this.#hasCurrentId(itemsMap));
  }

  #toggleTableBar(): void {
    if (!this.$selectedItems().length) {
      this.#closeTableBar();

      return;
    }

    if (!this.#tableBarTemplate || this.#tableBarSubscription) return;

    this.#tableBarSubscription = this.#tableBarService
      .show(this.#tableBarTemplate)
      .pipe(finalize(this.clearSelectedItems.bind(this)))
      .subscribe();
  }

  #closeTableBar(): void {
    this.#tableBarSubscription?.unsubscribe();
    this.#tableBarSubscription = null;
  }
}
