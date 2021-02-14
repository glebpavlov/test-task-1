import { Genre } from './genre.interface';
import { GetChannelResponse } from './get-channel-response.interface';

export interface Channels extends GetChannelResponse {
  genres: Genre[];
}
