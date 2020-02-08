/* 
*axios库入口文件
*
*/
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { buildURL } from './helpers/url'
import xhr from './core/xhr'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios (config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig (config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transformData(config)
  config.headers =  transformHeaders(config)
}

function transformUrl (config: AxiosRequestConfig): string {
  const { url, params} = config
  return buildURL(url, params)
}

function transformData (config: AxiosRequestConfig): any{
  return transformRequest(config.data)
}

function transformHeaders (config: AxiosRequestConfig){
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData (res: AxiosResponse): AxiosResponse{
  res.data = transformResponse(res.data)
  return res
}

export default axios