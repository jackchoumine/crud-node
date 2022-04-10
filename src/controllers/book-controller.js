/*
 * @Description :
 * @Date        : 2022-04-10 16:29:09 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-04-10 16:31:13 +0800
 * @LastEditors : JackChou
 */
const Book = require('../models/Book')

async function getBooks(req, res) {
  try {
    const books = await Book.find()
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(books))
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getBooks }
