/*
 * @Description :
 * @Date        : 2022-04-10 16:29:09 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-04-10 17:03:35 +0800
 * @LastEditors : JackChou
 */
const Book = require('../models/Book')

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

module.exports = { getBooks }
