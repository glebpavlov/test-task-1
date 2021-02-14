import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ChannelsService } from '../../services/channels.service';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { ChannelDetail, Channels, GetChannelRequest } from '../../common/intrafaces';
import { map, switchMap, tap } from 'rxjs/operators';
import { SharedFilterService } from '../../services/shared-filter.service';
import { SearchState } from '../../common/intrafaces/search-state.interface';
import { StateStorageService } from '../../services/state-storage.service';
import { SortingOrder } from '../../../common/enums/sorting-order.enum';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnDestroy, AfterViewInit {
  /**
   * полученные каналы
   */
  public channels$: Observable<Channels>;

  /**
   * флоу вызова каналов
   */
  public getChannelsFlow$: Subject<boolean> = new Subject();

  /**
   * количество элементов на первой странице
   */
  private startPageCount = 24;

  /**
   * количество элементов на следующих страницах
   */
  private nextPageCount = 12;

  /**
   * хранилище активных подписок
   */
  private subs = new SubSink();

  /** кеш каналов, требуется для пагинации */
  private cacheChannels: ChannelDetail[] = [];

  /**
   * стейт поиска
   */
  private searchState: SearchState;
  public paginationState = { limit: this.startPageCount, skip: 0 };

  constructor(private channelService: ChannelsService,
              private sharedFilterService: SharedFilterService,
              private stateStorageService: StateStorageService
  ) {
    this.initGetChannelsFlow();
    // получаем последнее сохраненное состояние поиска
    this.searchState = this.stateStorageService.getState();

    // начинаем следить за изменениям фильтра по жанрам
    this.subs.sink = this.sharedFilterService.onChangeGenreId$
      .subscribe((genreID: string) => {
        this.searchState.genreID = genreID;
        // сбрасываем пагинаюцию
        this.paginationState.limit = this.startPageCount;
        this.paginationState.skip = 0;
        this.getChannels();
      });

    // начинаем следить за изменениям сортировки
    this.subs.sink = this.sharedFilterService.onChangeSortingOrder$
      .subscribe((sorting: SortingOrder) => {
        this.searchState.sorting = sorting;
        // меняем сортировку
        // следовательно перезагружаем все загруженные каналы
        this.paginationState = {
          limit: (this.paginationState.limit + this.paginationState.skip),
          skip: 0
        };
        this.getChannels();
      });
  }

  public ngAfterViewInit(): void {
    this.getChannels();
  }

  /**
   * метод получения каналов
   *
   * @param canPush дополнять данные
   */
  public getChannels(canPush = false): void {
    this.getChannelsFlow$.next(canPush);
  }


  /**
   * инициализируем флоу запросов каналов
   */
  public initGetChannelsFlow(): void {
    this.channels$ = this.getChannelsFlow$.pipe(
      switchMap((canPush: boolean) => {
        const channelRequest: GetChannelRequest = { ...this.paginationState, ...this.searchState };
        const getChannel = this.channelService.getChannels(channelRequest);
        const canPushOf = of(canPush);
        // сохраняем в ответе информацию о canPush и о запросе каналов
        return forkJoin({ channels: getChannel, canPush: canPushOf });
      }),
      map(({ channels, canPush }) => {
        if (!canPush) {
          return channels;
        }
        const mergedChannels = { ...channels };
        mergedChannels.channelDetails = [...this.cacheChannels, ...mergedChannels.channelDetails];
        return mergedChannels;
      }),
      tap((channels: Channels) => this.cacheChannels = channels.channelDetails),
      tap((channels: Channels) => this.sharedFilterService.onGenres$.next(channels.genres))
    );
  }

  /**
   * Обработка события запроса новой страницы
   */
  public onAddPage(): void {
    // вычисляем последний полученый элемент
    // и запрашиваем еще 12 после него
    this.paginationState.skip = (this.paginationState.skip + this.paginationState.limit);
    this.paginationState.limit = this.nextPageCount;
    this.getChannels(true);
  }

  public ngOnDestroy(): void {
    // отписываемся от всех активных подписок
    this.subs.unsubscribe();
  }

  public trackByChannel(index, channel: ChannelDetail): string {
    return channel.name;
  }

}
