import { isPlainObject } from "./util"

// 处理请求header大小写不一致问题
function normalizeHeaderName (headers: any, normalizedName: string): void {
  if(!headers) {
    return
  }

  Object.keys(headers).forEach( name => {
    if(name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}
// 处理请求header
export function processHeaders (headers: any, data: any): any{
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if(headers && !headers['Content-Type']){
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

// 处理响应header部分
export function parseHeaders(headers: string): any{
  let parsed = Object.create(null)
  if(!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let  [key, val] = line.split(':')
    key = key.trim().toLowerCase()

    if(! key){
      return
    }
    if(val) {
      val = val.trim()
    }
    parsed[key] = val
  })

  return parsed
}
