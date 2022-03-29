import { request } from 'umi';

export async function fakeSubmitForm(params: any) {
  return request(window.antdprourl + '/api/advancedForm', {
    method: 'POST',
    data: params,
  });
}
