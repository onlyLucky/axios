# axios
使用typescript实现axios

#### 实现功能

- 在浏览器端使用 XMLHttpRequest 对象通讯
- 支持 Promise API
- 支持请求和响应的拦截器
- 支持请求数据和响应数据的转换
- 支持请求的取消
- JSON 数据的自动转换
- 客户端防止 XSRF

#### npm script

- `npm run lint`: 使用 TSLint 工具检查 `src` 和 `test` 目录下 TypeScript 代码的可读性、可维护性和功能性错误。
- `npm start`: 观察者模式运行 `rollup` 工具打包代码。
- `npm test`: 运行 `jest` 工具跑单元测试。
- `npm run commit`: 运行 `commitizen` 工具提交格式化的 `git commit` 注释。
- `npm run build`: 运行 `rollup` 编译打包 TypeScript 代码，并运行 `typedoc` 工具生成文档。
#### 主要思路
- 1.创建主入口

  - 主入口文件创建

  - 参数接口

- 2.内部逻辑实现

  - 发送请求
  - 处理请求url参数
  - 处理请求body数据
  - 处理请求headers
  - 处理响应数据
  - 处理响应headers
  - 处理响应data