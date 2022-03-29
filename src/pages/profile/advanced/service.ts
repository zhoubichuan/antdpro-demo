import { request } from 'umi';

export async function queryAdvancedProfile() {
  return request(window.antdprourl + '/api/profile/advanced');
}
