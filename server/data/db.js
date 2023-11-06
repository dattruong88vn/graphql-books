const Author = require("../model/Author");
const Book = require("../model/Book");

const mongoDataMethods = {
  // QUERY
  getBooks: async (condition) =>
    condition ? await Book.find(condition) : await Book.find(),
  getBookById: async (id) => await Book.findById(id),
  getAuthors: async (condition) =>
    condition ? await Author.find(condition) : await Author.find(),
  getAuthorById: async (id) => await Author.findById(id),

  // MUTATION
  createBook: async (data) => {
    const newBook = new Book(data);
    return await newBook.save();
  },
  createAuthor: async (data) => {
    const newAuthor = new Author(data);
    return await newAuthor.save();
  },
};

module.exports = mongoDataMethods;
