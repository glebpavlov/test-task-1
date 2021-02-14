import { Component } from '@angular/core';
import { SharedFilterService } from '../../services/shared-filter.service';
import { Genre, SelectOption } from '../../common/intrafaces';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SearchState } from '../../common/intrafaces/search-state.interface';
import { StateStorageService } from '../../services/state-storage.service';

@Component({
  selector: 'app-genre-select',
  templateUrl: './genre-select.component.html',
  styleUrls: ['./genre-select.component.scss']
})
/**
 * компонент выбора жанра
 */
export class GenreSelectComponent {

  /** опции для селекта */
  public genresOptions$: Observable<SelectOption[]>;

  /**
   * стейт поиска
   */
  public searchState: SearchState;

  constructor(
    private sharedFilterService: SharedFilterService,
    private stateStorageService: StateStorageService) {
    this.genresOptions$ = sharedFilterService.onGenres$
      // преобразовываем жанры в опции для селекта
      .pipe(map((genres: Genre[]) => {
        return genres.map((genre) => {
          return { value: genre.genreID, label: genre.genreName };
        });
      }));

    // получаем последнее сохраненное состояние поиска
    this.searchState = this.stateStorageService.getState();
  }

  /**
   * обработка выбора жанра
   */
  public onSelect(genreID: string | unknown): void {
    this.sharedFilterService.onChangeGenreId$.next(genreID as string);
  }

}
