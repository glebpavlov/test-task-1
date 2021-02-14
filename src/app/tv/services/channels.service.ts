import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { filter, findIndex, flatten, orderBy, uniqBy } from 'lodash';
import { ChannelDetail, Channels, GetChannelRequest, GetChannelResponse } from '../common/intrafaces';

@Injectable()
/** сервис работы с каналами */
export class ChannelsService {
  private baseUrl = '/assets/stub-data';

  /**
   * @param http http клиент
   */
  constructor(private http: HttpClient) {
  }

  /** метод получения списка каналов
   * Внимание! Эмулирует серверную сортировку и пагинацию!
   *
   * @param params параметры фильтрации и сортировки
   */
  public getChannels(params: GetChannelRequest): Observable<Channels> {
    return this.http.get<GetChannelResponse>(`${this.baseUrl}/channels.json`)
      .pipe(map((res: Channels) => {
        // насыщаем ответ собранными данным о жанрах
        // очищаем от пустых значений
        // очищаем от повторов
        res.genres = uniqBy(
          flatten(res.channelDetails.map((channelDetail) => {
            return channelDetail.genres;
          }).filter((v) => v)),
          'genreID');

        // применяем фильтр по жанрам
        if (params?.genreID) {
          res.channelDetails = filter<ChannelDetail>(res.channelDetails, (channelDetail) => {
            return findIndex(channelDetail.genres, (genre) => genre.genreID === params.genreID) > -1;
          });
        }

        // применяем пагинацию
        res.channelDetails = res.channelDetails.slice(params.skip, params.skip + params.limit);
        // применяем сортировку
        if (params?.sorting) {
          res.channelDetails = orderBy(res.channelDetails, ['name'], params.sorting);
        }
        return res;
      }));
  }


}
