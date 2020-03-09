import { AxiosResponse, AxiosRequestConfig } from "../types"

export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(message: string, config: AxiosRequestConfig, code?: string|null, request?: any, response?: AxiosResponse) {
    super(message)

    this.config = config
    this.request = request
    this.response = response
    this.code = code
    this.isAxiosError = true

    // ts的缺陷 
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError (
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
){
  const error = new AxiosError(message, config, code, request, response)
  return error
}