/*
 * @Description :
 * @Date        : 2022-04-10 16:29:09 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-04-10 18:23:28 +0800
 * @LastEditors : JackChou
 */
const Book = require('../models/Book')
const { bodyData } = require('../utils')
async function getBooks(req, res, { id } = { id: '' }) {
  try {
    if (id) {
      const book = await Book.findById(id)
      if (book) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(book))
        return
      }
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Not Found' }))
      return
    }
    const books = await Book.find()
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(books))
  } catch (error) {
    console.log(error)
  }
}

async function addBook(req, res) {
  try {
    const book = await bodyData(req)
    const newBook = await Book.create(book)
    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(newBook))
  } catch (error) {
    console.log(error)
  }
}

async function updateBook(req, res, { id } = { id: '' }) {
  try {
    if (!id) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Not Found' }))
      return
    }
    const book = await bodyData(req)
    const newBook = await Book.findByIdAndUpdate(id, book).catch((error) => {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Not Found' }))
      return
    })
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(newBook))
  } catch (error) {
    console.log(error)
  }
}

async function deleteBook(req, res, { id } = { id: '' }) {
  try {
    if (!id) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Not Found' }))
      return
    }
    const book = await Book.delete(id)
    if (!book) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Not Found' }))
      return
    }
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Delete Success' }))
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
}
