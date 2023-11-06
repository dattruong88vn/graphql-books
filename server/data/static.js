const authors = [
  { id: 1, name: "To Hoai", age: 99 },
  { id: 2, name: "Xuan Dieu", age: 102 },
  { id: 3, name: "Ngo Tat To", age: 110 },
];

const books = [
  { id: 1, name: "De men phieu luu ky", gendre: "Adventure", authorId: 1 },
  { id: 2, name: "Lam giau khong kho", gendre: "Education", authorId: 2 },
  { id: 3, name: "Song con", gendre: "Education", authorId: 3 },
  { id: 4, name: "Chi Pheo", gendre: "Romantic", authorId: 2 },
];

module.exports = { books, authors };
