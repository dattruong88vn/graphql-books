const resolvers = {
  // Query
  Query: {
    books: async (parent, args, { mongoDataMethods }) => {
      return mongoDataMethods.getBooks();
    },
    book: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getBookById(args.id);
    },
    authors: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getAuthors();
    },
    author: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getAuthorById(args.id);
    },
  },
  Book: {
    author: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getAuthorById(parent.authorId);
    },
  },
  Author: {
    books: async (parent, args, { mongoDataMethods }) => {
      return mongoDataMethods.getBooks({ authorId: parent.id });
    },
  },
  // Mutation
  Mutation: {
    createAuthor: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.createAuthor(args);
    },
    createBook: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.createBook(args);
    },
  },
};

module.exports = resolvers;
