/*
 * @Description : 应用入口
 * @Date        : 2022-04-10 16:00:20 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-04-10 17:01:38 +0800
 * @LastEditors : JackChou
 */
const http = require('http')
const { getBooks, addBook, deleteBook, updateBook } = require('./controllers/book-controller')

const server = http.createServer((req, res) => {
  const url = req.url
  let params = null
  if (url.match(/\/api\/books\/([0-9]+)/)) {
    const id = url.match(/\/api\/books\/([0-9]+)/)[1]
    params = { id }
  }
  const method = req.method
  if (['/api/books', '/api/books/'].includes(url) && method === 'GET') {
    getBooks(req, res)
  } else if (params && method === 'GET') {
    getBooks(req, res, params)
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Not Found' }))
  }
  // NOTE 任意路径返回 html
  // res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
  // // res.statusCode = 200
  // // res.setHeader('Content-Type', 'text/html')
  // res.end('<h1>Hello World</h1>')
})
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
