/*
 * @Description :
 * @Date        : 2022-11-20 21:42:18 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-11-20 21:48:52 +0800
 * @LastEditors : JackChou
 */
// app.js
const express = require('express')
const multiparty = require('multiparty')
const app = express()
const port = 4000
app.use(express.static('public'))

// 访问的时候，弹窗提示下载attachment.html，并保存为ddd.html
app.get('/attach', (req, res, next) => {
  const options = {
    root: __dirname,
    headers: {
      'Content-Disposition': 'attachment;filename=ddd.html',
    },
  }
  res.sendFile('/attachment.html', options, err => {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', 'attachment.html')
    }
  })
})

// form-data表单提交
app.post('/user', (req, res, next) => {
  const form = new multiparty.Form()
  var name
  var image
  form.on('error', next)
  form.on('close', function (err) {
    console.log(err)
    console.log('Sent')
    console.log(name)
    console.log(image)
    res.send('资料提交成功！')
  })

  form.on('field', function (key, val) {
    if (key !== 'image') name = val
  })

  form.on('part', function (part) {
    if (!part.filename) return
    if (part.name !== 'image') return part.resume()
    image = {}
    image.filename = part.filename
    image.size = 0
    part.on('data', function (buf) {
      image.size += buf.length
    })
  })

  form.parse(req)
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
