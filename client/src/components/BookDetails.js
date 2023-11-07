/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";

import { getBookDetail } from "../graphql-client/queries";

const BookDetails = ({ bookId }) => {
  const [hanldeGetBookDetail, { loading, error, data }] = useLazyQuery(
    getBookDetail,
    { variables: { id: bookId } }
  );

  useEffect(() => {
    if (bookId) {
      hanldeGetBookDetail();
    }
  }, [bookId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error load book detail!</div>;
  if (!data)
    return (
      <Card bg="info" text="white" className="shadow">
        <Card.Body>
          <Card.Title>Please select a book</Card.Title>
        </Card.Body>
      </Card>
    );

  const { book } = data;

  return (
    <Card bg="info" text="white" className="shadow">
      <Card.Body>
        <Card.Title>{book.name}</Card.Title>
        <Card.Subtitle>{book.gendre}</Card.Subtitle>
        <Card.Text>
          <p>{book.author.name}</p>
          <p>Age: {book.author.age}</p>
          <p>All books by this author</p>
          <ul>
            {book.author.books.map((bo) => {
              return <li key={bo.id}>{bo.name}</li>;
            })}
          </ul>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BookDetails;
