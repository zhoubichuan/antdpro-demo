import { request } from 'umi';

export async function fakeSubmitForm(params: any) {
  return request(window.antdprourl + '/api/basicForm', {
    method: 'POST',
    data: params,
  });
}
