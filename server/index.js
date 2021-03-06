const express = require('express')


const app = express()

app.set('secret', '123') // 全局秘钥
app.use(require('cors')())
app.use(express.json())
// 设置静态服务器
app.use(express.static(`${__dirname}/uploads`))
app.use('/admin/', express.static(`${__dirname}/public/admin`))
app.use(express.static(`${__dirname}/public/web`))

require('./plugins/db')(app)

require('./route/admin')(app)
require('./route/web')(app)


app.listen(3000)