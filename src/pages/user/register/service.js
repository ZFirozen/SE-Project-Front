import axios from 'axios';
import { request } from 'umi';
export async function userRegister(params) {
  // return request('/api/antdproregister', {
  //   method: 'POST',
  //   data: params,
  // });
  // console.log(params);
  return axios.post("/api/register?userName=" + params.userName + "&userPassword=" + params.userPassword);
}