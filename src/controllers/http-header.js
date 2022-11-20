/*
 * @Description : http header 学习
 * @Date        : 2022-11-20 20:16:01 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-11-20 21:56:57 +0800
 * @LastEditors : JackChou
 */
const fs = require('fs')
const path = require('path')
const user = {
  name: 'Jack',
  age: 34,
}
function showDataInline(req, res) {
  res.writeHead(200, { 'Content-Disposition': 'inline' })
  res.write(JSON.stringify(user))
  res.end()
}
function downloadFile(req, res) {
  res.writeHead(200, { 'Content-Disposition': 'attachment;filename="person.json"' })
  res.write(JSON.stringify(user))
  res.end()
}

function dataDownload(req, res) {
  res.writeHead(200, { 'Content-Disposition': 'attachment' })
  res.write(JSON.stringify(user))
  res.end()
}

function downloadPdf(req, res) {
  console.log(__dirname)
  fs.readFile(path.resolve(__dirname, './JavaScript异步编程的副本.pdf'), (err, data) => {
    if (err) {
      console.log('>>>>>read file is error<<<<<')
      throw err
    }
    // 名字含有中文，使用 encodeURIComponent 编码一下，否则报错
    // NOTE Invalid character in header content ["Content-Disposition"]
    const fileName = encodeURIComponent('JavaScript异步编程.pdf')
    res.writeHead(200, {
      // 'Content-Disposition': 'inline', // 预览
      'Content-Disposition': 'attachment', // 下载，不指定名字
      // 'Content-Disposition': 'attachment;filename=' + fileName, // 下载，指定名字
    })
    res.write(data)
    // 把data设置为响应内容
    res.end()
  })
}
module.exports = {
  showDataInline,
  downloadFile,
  dataDownload,
  downloadPdf,
}
