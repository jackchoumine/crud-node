/*
 * @Description :
 * @Date        : 2022-04-10 16:26:20 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-04-10 16:46:19 +0800
 * @LastEditors : JackChou
 */
const books = require('../data/books')

function find() {
  return new Promise((resolve, reject) => {
    resolve(books)
  })
}
function findById(id) {
  return new Promise((resolve, reject) => {
    const book = books.find((book) => book.id === id)
    resolve(book)
  })
}

module.exports = { find, findById }
