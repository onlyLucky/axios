import { Interface } from "readline"

/* 
*
* 公共类型定义文件
*   url 为请求的地址，必选属性
*   method 是请求的 HTTP 方法
*   data 是 post、patch 等类型请求的数据
*   params 是 get、head 等类型请求的数据
*/

/* 请求参数接口*/
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

/* 请求参数方法类型 */
export type Method = 
'get' 
| 'GET'
| 'delete'
| 'Delete'
| 'head' 
| 'HEAD'
| 'options' 
| 'OPTIONS'
| 'post' 
| 'POST'
| 'put' 
| 'PUT'
| 'patch' 
| 'PATCH'

/* 响应数据接口 */

export interface AxiosResponse<T= any> {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {

}

//  错误信息接口
export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

// Axios 类中的公共方法
export interface Axios {
  request<T=any>(config: AxiosRequestConfig): AxiosPromise<T>
  get<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T=any>(url: string,data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T=any>(url: string,data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T=any>(url: string,data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {

  <T=any>(config: AxiosRequestConfig): AxiosPromise<T> 

  <T=any>(url: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

// axios 拦截管理器接口
export interface AxiosInterceptorManager<T> {
  // 使用返回id
  use(resolved: ResolvedFn<T>, rejected: RejectedFn): number
  // 删除使用id为number
  eject(id: number): void
}

export interface ResolvedFn<T>{
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}
