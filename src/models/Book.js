/*
 * @Description :
 * @Date        : 2022-04-10 16:26:20 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-04-10 17:26:07 +0800
 * @LastEditors : JackChou
 */
const books = require('../data/books')
const { v4: uuidV4 } = require('uuid')
const { writeDataToFile } = require('../utils')
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

function create(book) {
  return new Promise(async (resolve, reject) => {
    const newBook = { id: uuidV4(), ...book }
    console.log(newBook)
    try {
      await writeDataToFile('../data/books.json', [...books, newBook])
      resolve(newBook)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  find,
  findById,
  create,
  // update,
  // delete: deleteBook,
}
