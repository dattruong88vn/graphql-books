import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookDetails from "./BookDetails";

import { useQuery } from "@apollo/client";
import { getBooks } from "../graphql-client/queries";

const BookList = () => {
  const { loading, error, data } = useQuery(getBooks);

  const [bookId, setBookId] = useState(null);

  const handleSelectBook = (id) => {
    setBookId(id);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error load books!</div>;

  return (
    <Row>
      <Col xs={8}>
        {data.books.map((book) => {
          return (
            <Card
              key={book.id}
              border="info"
              text="info"
              className="text-center shadow"
              onClick={() => handleSelectBook(book.id)}
            >
              <Card.Body>{book.name}</Card.Body>
            </Card>
          );
        })}
      </Col>
      <Col>
        <BookDetails bookId={bookId} />
      </Col>
    </Row>
  );
};

export default BookList;
