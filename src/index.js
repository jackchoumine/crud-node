/*
 * @Description : 应用入口
 * @Date        : 2022-04-10 16:00:20 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-04-10 16:35:34 +0800
 * @LastEditors : JackChou
 */
const http = require('http')
const { getBooks, addBook, deleteBook, updateBook } = require('./controllers/book-controller')
// NOTE 任意路径返回 html
const server = http.createServer((req, res) => {
  const url = req.url
  const method = req.method
  if (url === '/api/books' && method === 'GET') {
    getBooks(req, res)
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Not Found' }))
  }
  // res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
  // // res.statusCode = 200
  // // res.setHeader('Content-Type', 'text/html')
  // res.end('<h1>Hello World</h1>')
})
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
