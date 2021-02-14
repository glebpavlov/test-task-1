import { SortingOrder } from '../../../common/enums/sorting-order.enum';

export interface GetChannelRequest {
  limit: number;
  skip: number;
  sorting?: SortingOrder;
  genreID?: string;
}
