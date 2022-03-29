import { request } from 'umi';
import type { Params, ListItemDataType } from './data.d';

export async function queryFakeList(
  params: Params,
): Promise<{ data: { list: ListItemDataType[] } }> {
  return request(window.antdprourl + '/api/fake_list', {
    params,
  });
}
