/*
 * @Description : 应用入口
 * @Date        : 2022-04-10 16:00:20 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-11-20 21:31:19 +0800
 * @LastEditors : JackChou
 */
const http = require('http')
const { getBooks, addBook, deleteBook, updateBook } = require('./controllers/book-controller')
const {
  showDataInline,
  dataDownload,
  downloadFile,
  downloadPdf,
} = require('./controllers/http-header')

const server = http.createServer((req, res) => {
  const url = req.url
  console.log(url)
  let params = null
  if (url.match(/\/api\/books\/([0-9]+)/)) {
    const id = url.match(/\/api\/books\/([0-9]+)/)[1]
    params = { id }
  }
  const method = req.method
  if (url === '/') {
    // NOTE 任意路径返回 html
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
    // res.statusCode = 200
    // res.setHeader('Content-Type', 'text/html')
    const html = /*html*/ `<div>
    <h1>node restful</h1>
    <a href="/inline">Content-Disposition inline</a><br />
    <a href="/attachment">Content-Disposition attachment</a><br />
    <a href="/attachment.json" download name="person.json">Content-Disposition attachment download</a><br />
    <a href="/attachment-file">Content-Disposition attachment;filename="person.json"</a><br />
    <a href="/pdf" target="_blank">下载pdf</a><br />
  </div>`
    res.end(html)
  } else {
    // http header demo
    switch (method) {
      case 'GET':
        if (url === '/inline') {
          showDataInline(req, res)
        } else if (url === '/attachment') {
          dataDownload(req, res)
        } else if (url === '/attachment.json') {
          dataDownload(req, res)
        } else if (url === '/attachment-file') {
          downloadFile(req, res)
        } else if (url === '/pdf') {
          downloadPdf(req, res)
        }
    }
  }
  // BOOK restful API
  // switch (method) {
  //   case 'GET':
  //     if (['/api/books', '/api/books/'].includes(url)) {
  //       getBooks(req, res)
  //     } else {
  //       getBooks(req, res, params)
  //     }
  //     break
  //   case 'POST':
  //     addBook(req, res)
  //     break
  //   case 'DELETE':
  //     deleteBook(req, res, params)
  //     break
  //   case 'PUT':
  //     updateBook(req, res, params)
  //     break
  //   default:
  //     res.writeHead(404, { 'Content-Type': 'application/json' })
  //     res.end(JSON.stringify({ message: 'Not Found' }))
  //     break
  // }
})
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
