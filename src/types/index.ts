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

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {

}