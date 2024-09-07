import { KeyValueDTO } from './KeyValueDTO';

export interface StandardResponse<data> {
  code: string;
  message: string;
  data: KeyValueDTO<data>[];
}
