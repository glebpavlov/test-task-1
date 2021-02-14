import { Component } from '@angular/core';
import { SortingOrder, SortingOrderLabel } from '../../../common/enums/sorting-order.enum';
import { SelectOption } from '../../common/intrafaces/select-option.interface';
import { SearchState } from '../../common/intrafaces/search-state.interface';
import { StateStorageService } from '../../services/state-storage.service';
import { SharedFilterService } from '../../services/shared-filter.service';

@Component({
  selector: 'app-sorting-select',
  templateUrl: './sorting-select.component.html',
  styleUrls: ['./sorting-select.component.scss']
})
export class SortingSelectComponent {
  /**
   * список сортировок и описаний
   */
  public options: SelectOption[] = Array.from(SortingOrderLabel, ([value, label]) => ({ value, label }));

  /**
   * отображаемое знаниче по умолчанию
   */
  public defaultLabel = 'Сортировка';

  /**
   * стейт поиска
   */
  public searchState: SearchState;

  constructor(
    private stateStorageService: StateStorageService,
    private sharedFilterService: SharedFilterService) {
    // получаем последнее сохраненное состояние поиска
    this.searchState = this.stateStorageService.getState();
  }

  /**
   * обработка выбора сортировки
   */
  public onSelect(sortingOrder: SortingOrder | unknown): void {
    this.sharedFilterService.onChangeSortingOrder$.next(sortingOrder as SortingOrder);
  }
}
