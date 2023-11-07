import { gql } from "@apollo/client";

const getBooks = gql`
  query getBooksQuery {
    books {
      id
      name
    }
  }
`;

const getBookDetail = gql`
  query getBookDetail($id: ID!) {
    book(id: $id) {
      id
      name
      gendre
      author {
        id
        name
        age
        books {
          id
          name
        }
      }
    }
  }
`;

export { getBooks, getBookDetail };
