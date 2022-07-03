import { request } from 'umi';
export async function queryCurrent() {
  return request('/api/account');
}
export async function queryFakeList(params) {
  return request('/api/fake_list_Detail', {
    params,
  });
}
