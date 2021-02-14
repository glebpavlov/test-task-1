import { SortingOrder } from '../../../common/enums/sorting-order.enum';

export interface SearchState {
  genreID?: string;
  sorting?: SortingOrder;
}
