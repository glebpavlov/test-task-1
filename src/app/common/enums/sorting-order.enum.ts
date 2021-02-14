/**
 * enum способов сортировки
 */
export enum SortingOrder {
  /**
   * по возрастанию
   */
  Asc = 'asc',
  /**
   * по убыванию
   */
  Desc = 'desc'
}

export const SortingOrderLabel = new Map<SortingOrder, string>([
  [SortingOrder.Asc, 'По возрастанию'],
  [SortingOrder.Desc, 'По убыванию'],
]);
