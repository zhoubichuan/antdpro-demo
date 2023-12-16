import { request } from 'umi';
import type { CardListItemDataType } from './data.d';

export async function queryFakeList(params: {
  current: number;
  pageSize: number;
}): Promise<{ data: { list: CardListItemDataType[] } }> {
  return request('/api/list/data/1', {
    params,
  });
}
