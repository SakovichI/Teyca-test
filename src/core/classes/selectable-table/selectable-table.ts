import {
  AfterViewInit,
  Directive,
  OnDestroy,
  effect,
  inject,
  output,
  viewChild,
} from '@angular/core';

import { Table } from '../table';
import { Identifiable } from '../../models';
import { TableSelectionService } from '../../services';

@Directive()
export class SelectableTable<T extends Identifiable>
  extends Table<T>
  implements AfterViewInit, OnDestroy
{
  readonly #tableSelectionService = inject(TableSelectionService<T>);

  refresh = output<void>();

  readonly $tableBarTemplate = viewChild('tableBarTemplate');

  readonly $selectedCount = this.#tableSelectionService.$count;
  readonly $selectedItems = this.#tableSelectionService.$selectedItems;
  readonly $areAllSelected = this.#tableSelectionService.$areAllSelected;
  readonly $isIndeterminate = this.#tableSelectionService.$isIndeterminate;
  readonly $selectedItemsMap = this.#tableSelectionService.$selectedItemsMap;

  constructor() {
    super();
    this.#handleDataChanges();
  }

  ngAfterViewInit(): void {
    this.#setTableBarTemplate();
  }

  toggle(item: T): void {
    this.#tableSelectionService.toggle(item);
  }

  toggleAll(): void {
    this.#tableSelectionService.toggleAll(this.$data());
  }

  refreshTableBar(): void {
    this.clearSelectedItems();
    this.refresh.emit();
  }

  ngOnDestroy(): void {
    this.clearSelectedItems();
  }

  protected clearSelectedItems(): void {
    this.#tableSelectionService.clearSelectedItems();
  }

  #handleDataChanges(): void {
    effect(() => {
      this.#tableSelectionService.setCurrentItemsIds(this.$data());
    });
  }

  #setTableBarTemplate(): void {
    const template = this.$tableBarTemplate();

    if (!template) return;

    this.#tableSelectionService.setTableBarTemplate(template);
  }
}
