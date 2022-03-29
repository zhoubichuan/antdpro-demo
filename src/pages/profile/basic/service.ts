import { request } from 'umi';
import type { BasicGood, BasicProgress } from './data.d';

export async function queryBasicProfile(): Promise<{
  data: {
    basicProgress: BasicProgress[];
    basicGoods: BasicGood[];
  };
}> {
  return request(window.antdprourl + '/api/profile/basic');
}
