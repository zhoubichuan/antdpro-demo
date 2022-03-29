import { request } from 'umi';

export async function fakeSubmitForm(params: any) {
  return request(window.antdprourl + '/api/stepForm', {
    method: 'POST',
    data: params,
  });
}
