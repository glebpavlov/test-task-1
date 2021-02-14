import { ChannelDetail } from './channel-detail.interface';

export interface GetChannelResponse {
  /** общее количество каналов */
  total: string;
  /** список каналов */
  channelDetails: ChannelDetail[];
}
