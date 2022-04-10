/*
 * @Description :
 * @Date        : 2022-04-10 16:26:20 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-04-10 16:28:37 +0800
 * @LastEditors : JackChou
 */
const books = require('../data/books')

function find() {
  return new Promise((resolve, reject) => {
    resolve(books)
  })
}

module.exports = { find }
