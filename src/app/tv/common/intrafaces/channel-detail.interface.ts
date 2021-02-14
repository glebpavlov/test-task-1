import { Picture } from './picture.interface';
import { Genre } from './genre.interface';

export interface ChannelDetail {
  name: string;
  introduce: string;
  picture: Picture;
  genres: Genre[];
}
