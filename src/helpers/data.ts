import { isPlainObject } from  './util'

/* request 中data的处理函数 */
export function transformRequest (data: any): any{
  if(isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
} 

// 处理响应的数据
export function transformResponse (data: any): any{
  // 如果响应数据为字符串
  if (typeof data === 'string'){
    try {
      data = JSON.parse(data)
    } catch (err) {
      // err message
    }
  }
  return data
}