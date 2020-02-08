import { isPlainObject } from  './util'

/* request 中data的处理函数 */
export function transformRequest (data: any): any{
  if(isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
} 

export function transformResponse (data: any): any{
  if (typeof data === 'string'){
    try {
      data = JSON.parse(data)
    } catch (err) {
      // err message
    }
  }
  return data
}