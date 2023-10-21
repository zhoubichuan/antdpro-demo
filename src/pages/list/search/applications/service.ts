import { request } from 'umi';
import type { Params, ListItemDataType } from './data.d';

export async function queryFakeList(
  params: Params,
): Promise<{ data: { list: ListItemDataType[] } }> {
  return request('/api/list/field/1', {
    params,
  });
}
