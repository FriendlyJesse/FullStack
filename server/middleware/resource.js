module.exports = options => {
  return auth = async (req, res, next) => { // 动态模型中间件
    // 转换模型名
    const modelName = require('inflection').classify(req.params.resource)
    // 挂载属性
    req.Model = require(`../models/${modelName}`)
    next()
  }
}