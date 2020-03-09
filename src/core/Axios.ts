import { AxiosRequestConfig, AxiosPromise, Method, AxiosResponse, ResolvedFn, RejectedFn } from "../types";
import dispatchRequest from "./dispatchRequest";
import InterceptorManager from "./interceptorManager";
import { rejects } from "assert";

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T>{
  // dispatchRequest
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig)=>AxiosPromise)

  rejected?: RejectedFn
}

export default class Axios {

  interceptors: Interceptors

  constructor() {
    this.interceptors = {
      /* 请求响应两种拦截器的实例对象 */
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request(url: any, config?: any): AxiosPromise {

    if(typeof url === 'string') {
      if(!config) {
        config = {}
      }
      config.url = url
    }else {
      config = url
    }

    const chain: PromiseChain<any>[] = [{
      resolved: dispatchRequest,
      rejected: undefined
    }]

    // 添加请求拦截链 (后添加的先执行)
    this.interceptors.request.forEach(interceptor=>{
      chain.unshift(interceptor)
    })
    // 添加响应拦截链 (先添加的先执行)
    this.interceptors.response.forEach(interceptor=>{
      chain.push(interceptor)
    })

    // promise 进行异步操作
    let promise = Promise.resolve(config)

    // 链式执行拦截链
    while (chain.length) {
      // 类型断言不为空（!）
      const {resolved, rejected} = chain.shift()!
      promise = promise.then( resolved, rejected)
    }

    return promise
  }

  get(url: string, config?:AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?:AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }
  head(url: string, config?:AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }
  options(url: string, config?:AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?:any, config?:AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }
  patch(url: string, data?:any, config?:AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }
  put(url: string, data?:any, config?:AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }
   
  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {},
      {method, url}
    ))
  }

  _requestMethodWithData(method: Method, url: string, data?:any, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {},
      {method, url, data}
    ))
  }
}