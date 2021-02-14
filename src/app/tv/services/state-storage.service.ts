import { Injectable } from '@angular/core';
import { SharedFilterService } from './shared-filter.service';
import { SortingOrder } from '../../common/enums/sorting-order.enum';
import { SearchState } from '../common/intrafaces/search-state.interface';
import { get } from 'lodash';

@Injectable()
/**
 * сервис сохраняет состояние фильтров
 */
export class StateStorageService {
  /**
   * преффикс ключей для хранение данных в localStorage
   */
  private localStorageKeyPrefix = 'tv_filter_';

  /**
   * ключ для хранения жанра
   */
  private genreKey = `${this.localStorageKeyPrefix}_genreID`;

  /**
   * ключ для хранения сортировки
   */
  private sortingKey = `${this.localStorageKeyPrefix}_sorting`;

  constructor(private sharedFilterService: SharedFilterService) {
    // сохраняем фильтрацию по жанрам
    this.sharedFilterService.onChangeGenreId$.subscribe((genreID: string) => {
      localStorage.setItem(this.genreKey, JSON.stringify({ value: genreID }));
    });

    // сохраняем сортировку
    this.sharedFilterService.onChangeSortingOrder$.subscribe((sortingOrder: SortingOrder) => {
      localStorage.setItem(this.sortingKey, JSON.stringify({ value: sortingOrder }));
    });
  }

  /**
   * метод возвращает последний или пустой стейт
   * @return стейт последнего поиска
   */
  public getState(): SearchState {
    const genreID = get(JSON.parse(localStorage.getItem(this.genreKey)), 'value', null);
    const sorting = get(JSON.parse(localStorage.getItem(this.sortingKey)), 'value', null) as SortingOrder;
    return { genreID, sorting };
  }
}
