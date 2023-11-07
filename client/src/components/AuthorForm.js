import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { getAuthors } from "../graphql-client/queries";
import { createAuthorQuery } from "../graphql-client/mutations";

const DEFAULT_VALUE_AUTHOR = {
  name: "",
  age: "",
};

const AuthorForm = () => {
  const [dataAuthorSubmit, setDataAuthorSubmit] =
    useState(DEFAULT_VALUE_AUTHOR);

  const [handleCreateAuthor, dataCreateAuthor] = useMutation(
    createAuthorQuery,
    {
      variables: { ...dataAuthorSubmit, age: +dataAuthorSubmit.age },
      refetchQueries: [getAuthors],
    }
  );

  useEffect(() => {
    console.log(dataCreateAuthor);
    if (dataCreateAuthor?.data) {
      setDataAuthorSubmit(DEFAULT_VALUE_AUTHOR);
    }
  }, [dataCreateAuthor]);

  const handleChangeAuthorForm = (event) => {
    setDataAuthorSubmit({
      ...dataAuthorSubmit,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitAuthorForm = (e) => {
    e.preventDefault();
    handleCreateAuthor();
  };

  return (
    <Form onSubmit={handleSubmitAuthorForm}>
      <Form.Group className="invisible">
        <Form.Control />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Author name"
          name="name"
          value={dataAuthorSubmit.name}
          onChange={handleChangeAuthorForm}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="number"
          placeholder="Author age"
          name="age"
          value={dataAuthorSubmit.age}
          onChange={handleChangeAuthorForm}
        />
      </Form.Group>
      <Button className="float-right" variant="info" type="submit">
        Add Author
      </Button>
    </Form>
  );
};

export default AuthorForm;
