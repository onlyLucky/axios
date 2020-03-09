
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { buildURL } from '../helpers/url'
import xhr from './xhr'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'

export default function dispatchRequest (config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 配置对象config的处理
function processConfig (config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers =  transformHeaders(config)
  config.data = transformResquestData(config)
}
// url 参数的处理
function transformUrl (config: AxiosRequestConfig): string {
  const { url, params} = config
  return buildURL(url!, params)
}
// 处理请求body
function transformResquestData (config: AxiosRequestConfig): any{
  return transformRequest(config.data)
}
// 处理请求header
function transformHeaders (config: AxiosRequestConfig){
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

// 处理响应的数据
function transformResponseData (res: AxiosResponse): AxiosResponse{
  res.data = transformResponse(res.data)
  return res
}
