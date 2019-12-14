module.exports = app => {

  const express = require('express')
  const Admin = require('../../models/Admin') // 数据模型
  const jwt = require('jsonwebtoken') // 引入 jwt 中间件
  const assert = require('http-assert') // 引入返回 http 状态的中间件
  const auth = require('../../middleware/auth') // 引入登录校验中间件
  const resource = require('../../middleware/resource') // 引入动态资源中间件
  const error = require('../../middleware/error') // 引入动态资源中间件
  const router = express.Router({mergeParams: true}) // 合并参数，使通用接口能获取到父路由动态参数



  router
    .get('/', async (req, res) => { // 获取所有数据
      // 设置 populate 获取的数据
      const queryOptions = {}
      if (req.Model.modelName == 'Category') {
        queryOptions.populate = 'parent'
      }

      // populate 填充关联的id
      const model = await req.Model.find().setOptions(queryOptions)
      // let data
      // let type = req.query.type
      // if (type == 'top') {
      //   data = model.filter(item => !item.parent)
      // } else if (type) {
      //   data = model.filter(item => item.name == type || (item.parent && item.parent.name == type))
      // } else {
      //   data = model
      // }
      res.send(model)
    })
    .get('/:id', async (req, res) => { // 获取单条数据
      const model = await req.Model.findById(req.params.id)
      res.send(model)
    })
    .post('/', async (req, res) => { // 创建
      const model = await req.Model.create(req.body)
      res.send(model)
    })
    .put('/:id', async (req, res) => { // 修改
      const model = await req.Model.findByIdAndUpdate( req.params.id, req.body)
      res.send(model)
    })
    .delete('/:id', async (req, res) => { // 删除
      const model = await req.Model.findByIdAndDelete(req.params.id)
      res.send({ok: true})
    })
  
  // 使用 router 中间件
  app.use('/admin/api/rest/:resource', auth(), resource(), router)

  // multer 中间件获取文件数据
  const multer = require('multer')
  const upload = multer({dest: `${__dirname}/../../uploads`})
  app.post('/admin/api/upload', auth(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/${file.filename}`
    res.send(file)
  })

  // 登录
  app.post('/admin/api/login', async (req, res) => {
    let {username, password} = req.body

    // 根据用户名查找用户，使用 selec 强制获取密码
    let admin = await Admin.findOne({username}).select('+password')
    assert(admin, 422, '用户不存在!')
    // 验证密码
    let isValid = require('bcryptjs').compareSync(password, admin.password)
    assert(isValid, 422, '密码错误！')

    // 返回 token
    let token = jwt.sign({id: admin._id}, app.set('secret')) // 第二个参数是秘钥
    res.send({admin, token})
  })

  // 使用错误处理中间件
  app.use(error())
}