import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Genre } from '../common/intrafaces';
import { SortingOrder } from '../../common/enums/sorting-order.enum';

@Injectable()
/**
 * сервис создан для обмена данными между страницами каналов и фильтрами
 */

export class SharedFilterService {

  /**
   * событие обновления списка жанров
   */
  onGenres$ = new Subject<Genre[]>();
  /**
   * событие смены типа сортировки
   */
  onChangeSortingOrder$ = new Subject<SortingOrder>();
  /**
   * событие смены жанра
   */
  onChangeGenreId$ = new Subject<string>();

  constructor() {
  }
}
