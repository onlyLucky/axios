const toString = Object.prototype.toString

/* 判断是否为日期对象 */
export function isDate (val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

/* 是否为为对象 */
export function isObject (val: any): val is Object {
  return val !== null && typeof val === 'object'
}


/* 是否为普通的json对象 */
export function isPlainObject (val: any): val is Object{
  return toString.call(val) === '[object Object]'
}