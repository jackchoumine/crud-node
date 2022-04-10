/*
 * @Description : 应用入口
 * @Date        : 2022-04-10 16:00:20 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-04-10 16:20:30 +0800
 * @LastEditors : JackChou
 */
const http = require('http')
// NOTE 任意路径返回 html
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
  // res.statusCode = 200
  // res.setHeader('Content-Type', 'text/html')
  res.end('<h1>Hello World</h1>')
})
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
