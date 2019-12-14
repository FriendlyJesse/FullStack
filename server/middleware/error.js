module.exports = options => {
  return async (err, req, res, next) => { // 错误处理中间件
    // err.status 是隐藏的
    console.log(err)
    res.status(err.status || 500).send(err)
  }
}