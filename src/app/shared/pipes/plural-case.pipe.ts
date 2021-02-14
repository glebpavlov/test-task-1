import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralCase',
})

/**
 * строит строку варианта произношения числительного
 * @see http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html?id=l10n/pluralforms
 */
export class PluralCasePipe implements PipeTransform {
  /**
   * @param count количество элементов
   * @param plurals это массив слов для варианта произношения [отзыв, отзыва, отзывов] например для чисел 1 2 5
   */
  public transform(count: number, plurals: Array<string>): string {
    // tslint:disable-next-line:max-line-length
    return plurals[(count % 10 === 1 && count % 100 !== 11 ? 0 : count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20) ? 1 : 2)];
  }
}
