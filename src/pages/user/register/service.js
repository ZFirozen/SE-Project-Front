import { request } from 'umi';
export async function fakeRegister(params) {
  return request('/api/antdproregister', {
    method: 'POST',
    data: params,
  });
}
