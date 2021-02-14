import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { SelectOption } from '../../../tv/common/intrafaces';
import { find } from 'lodash';

@Component({
  selector: 'app-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.scss'],
})
/**
 * Компонент для выбора значения из списка
 */
export class FilterSelectComponent {

  /**
   * признак открытости элемента
   */
  @Input() public isActive = false;

  /**
   * выбранное значение опции
   */
  @Input() public value: string | unknown;

  /**
   * событие выбора опции
   */
  @Output() public selectOption = new EventEmitter<unknown>();

  /**
   * отображаемое знаниче по умолчанию
   */
  @Input() public placeholder = '';

  /**
   * опции выбора
   */
  @Input() public options: SelectOption[];

  constructor(private eRef: ElementRef) {
  }

  /**
   * геттер выдает лейбл в зависомсти от значения
   */
  public get label(): string {
    const foundOption = find(this.options, { value: this.value });
    if (foundOption) {
      return find(this.options, { value: this.value }).label;
    }
    return this.placeholder;
  }

  /**
   * обаботчик выбора опции
   * @param value значение опции
   */
  public onClickOption(value): void {
    this.value = value;
    this.selectOption.emit(value);
  }

  @HostListener('document:click', ['$event'])
  /**
   * обработчик кликов по документу
   * определяет клики по компоненту или другой части страницы
   */
  public onClickDocument(event): void {
    // кликнули по компоненту, инвертируем скрытие
    if (this.eRef.nativeElement.contains(event.target)) {
      this.isActive = !this.isActive;
      return;
    }
    // кликнули не по компоненту, скрываем
    this.isActive = false;
  }

}
