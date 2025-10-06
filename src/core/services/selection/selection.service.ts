import { Injectable, computed, signal } from '@angular/core';
import { isArray } from 'lodash-es';
import { Identifiable } from '../../models';

@Injectable()
export class SelectionService<T extends Identifiable, V = boolean> {
  readonly #selectedItemsMapSignal = signal<Map<number, V>>(new Map());

  protected mapValueSetter: (isSelected: boolean, item: T) => V;

  readonly $selectedItemsMap = this.#selectedItemsMapSignal.asReadonly();
  readonly $count = computed(() => [...this.$selectedItemsMap().values()].filter(Boolean).length);

  get #itemsMap(): Map<number, V> {
    return this.#selectedItemsMapSignal();
  }

  get isSelectedMapEmpty(): boolean {
    return !this.#itemsMap.size;
  }

  select(items: T | T[]): void {
    this.#updateSelectedMap(items);
  }

  deselect(items: T | T[]): void {
    this.#updateSelectedMap(items, false);
  }

  clear(): void {
    this.#selectedItemsMapSignal.set(new Map());
  }

  isSelected(id: number): boolean {
    return !!this.#itemsMap.get(id);
  }

  #updateSelectedMap(items: T | T[], isSelected = true): void {
    const currentItems = isArray(items) ? items : [items];

    const toCurrentMap = (currentMap: Map<number, V>, currentItem: T): Map<number, V> => {
      const value = this.mapValueSetter ? this.mapValueSetter(isSelected, currentItem) : isSelected;

      currentMap.set(currentItem.userId, value as V);

      return currentMap;
    };

    const updatedMap = currentItems.reduce(toCurrentMap, this.#itemsMap);

    this.#setSelectedMap(updatedMap);
  }

  #setSelectedMap(updatedMap: Map<number, V>): void {
    this.#selectedItemsMapSignal.set(new Map(updatedMap));
  }
}
