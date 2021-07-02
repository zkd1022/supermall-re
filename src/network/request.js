import axios from 'axios'

export function request(config) {
  //创建一个新的axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  //请求拦截
  instance.interceptors.request.use(config => config, err => {})

  //响应拦截
  instance.interceptors.response.use(res => res.data, err => {
    console.log(err);
  })

  //发送真正的网络请求(返回的是个Promise)
  return instance(config)
}
