import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { createBookQuery } from "../graphql-client/mutations";
import { getAuthors, getBooks } from "../graphql-client/queries";
const DEFAULT_VALUE_BOOK = {
  name: "",
  gendre: "",
  authorId: "",
};
function BookForm() {
  const { data: dataAuthors } = useQuery(getAuthors);

  const [dataBookSubmit, setDataBookSubmit] = useState(DEFAULT_VALUE_BOOK);

  const [handleCreateBook, dataCreateBook] = useMutation(createBookQuery, {
    variables: { ...dataBookSubmit },
    refetchQueries: [getBooks],
  });

  useEffect(() => {
    if (dataCreateBook?.data) {
      setDataBookSubmit(DEFAULT_VALUE_BOOK);
    }
  }, [dataCreateBook]);
  const handleChangeBookForm = (event) => {
    setDataBookSubmit({
      ...dataBookSubmit,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitBookForm = (e) => {
    e.preventDefault();
    handleCreateBook();
  };
  return (
    <Form onSubmit={handleSubmitBookForm}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Book name"
          name="name"
          value={dataBookSubmit.name}
          onChange={handleChangeBookForm}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Book genre"
          name="gendre"
          value={dataBookSubmit.gendre}
          onChange={handleChangeBookForm}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          as="select"
          name="authorId"
          defaultValue={dataBookSubmit.authorId}
          onChange={handleChangeBookForm}
        >
          <option disabled value="">
            Select author
          </option>
          {dataAuthors?.authors &&
            dataAuthors.authors.map((author) => {
              return (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              );
            })}
        </Form.Control>
      </Form.Group>
      <Button className="float-right" variant="info" type="submit">
        Add Book
      </Button>
    </Form>
  );
}

export default BookForm;
