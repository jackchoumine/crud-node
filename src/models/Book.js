/*
 * @Description :
 * @Date        : 2022-04-10 16:26:20 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-04-10 18:08:01 +0800
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

function findByIdAndUpdate(id, book) {
  return new Promise(async (resolve, reject) => {
    const needUpdateBook = books.find((book) => book.id === id)
    if (!needUpdateBook) {
      reject(new Error('Not Found'))
    } else {
      const rest = books.filter((book) => book.id !== id)
      const newBook = { ...needUpdateBook, ...book }
      const newBooks = [...rest, newBook]
      try {
        await writeDataToFile('../data/books.json', newBooks)
        resolve(newBook)
      } catch (error) {
        reject(error)
      }
    }
  })
}

module.exports = {
  find,
  findById,
  create,
  findByIdAndUpdate,
  // update,
  // delete: deleteBook,
}
