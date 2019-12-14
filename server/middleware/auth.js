const jwt = require('jsonwebtoken')
const assert = require('http-assert')
const Admin = require('../models/Admin')

module.exports = options => {
  return auth = async (req, res, next) => { // 登录校验中间件
    // 提取 token
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '无效令牌!')
    let {id} = jwt.verify(token, req.app.get('secret'))
    assert(token, 401, '无效用户!')
    req.admin = await Admin.findById(id)
    assert(req.admin, 401, '请先登录!')
    next()
  }
}