import { AxiosInstance } from "./types";
import Axios from "./core/Axios";
import { extend } from "./helpers/util";

// createInstance 工厂函数创建了 axios

// instance 本身是一个函数，又拥有了 Axios 类的所有原型和实例属性
function createInstance() :AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)
  // 由于这里 TypeScript 不能正确推断 instance 的类型，我们把它断言成 AxiosInstance 类型
  return instance as AxiosInstance
}

const axios = createInstance()

export default axios