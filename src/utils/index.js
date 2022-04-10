/*
 * @Description :
 * @Date        : 2022-04-10 17:16:51 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-04-10 17:39:50 +0800
 * @LastEditors : JackChou
 */
const fs = require('fs')
const path = require('path')
function writeDataToFile(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.resolve(__dirname, filePath), JSON.stringify(data), 'utf-8', (err) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

function bodyData(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    })
    req.on('end', (err) => {
      if (err) {
        reject(err)
      }
      resolve(JSON.parse(body))
    })
  })
}
module.exports = { writeDataToFile, bodyData }
