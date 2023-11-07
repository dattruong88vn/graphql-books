import { gql } from "@apollo/client";

const createBookQuery = gql`
  mutation MyMutationCreateBook(
    $name: String
    $gendre: String
    $authorId: ID!
  ) {
    createBook(name: $name, gendre: $gendre, authorId: $authorId) {
      id
      name
      gendre
    }
  }
`;
const createAuthorQuery = gql`
  mutation MyMutationCreateAuthor($name: String, $age: Int) {
    createAuthor(name: $name, age: $age) {
      id
      name
      age
    }
  }
`;

export { createBookQuery, createAuthorQuery };
