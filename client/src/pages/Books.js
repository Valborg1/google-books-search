import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import Form from "../components/Form";
import SearchResults from "../components/SearchResults";

import API from "../utils/API";
import "./books.css"


function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState("")

  // Load all books and store them with setBooks
  useEffect(() => {
    searchBook()
  }, [])

  function makeBook(bookData) {
    return {
        _id: bookData.id,
        title: bookData.volumeInfo.title,
        authors: bookData.volumeInfo.authors,
        description: bookData.volumeInfo.description,
        image: bookData.volumeInfo.imageLinks.thumbnail,
        link: bookData.volumeInfo.previewLink
    }
}
  // Loads all books and sets them to books
  function searchBook() {
    API.getBook(query)
    .then(res => setBooks(res.data.items.map(bookData => makeBook(bookData))))
      .catch(err => console.error(err));
  };

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setSearch({...search, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    searchBook(search);
};

    return (
      <Container fluid>
        <Row center>
          <Col size="md-8">
            <Jumbotron>
              <h1>Create Your Reading List</h1>
            </Jumbotron>
          </Col>

        </Row>
        <Row center>
          <Col size="md-5">
          <Form>
              search={search}
              handleInputChange={handleInputChange}
              handleFormSubmit={handleFormSubmit}
            </Form>
          </Col>
          <SearchResults
            books={books}
            />
        </Row>
      </Container>
    );
  }


export default Books;
