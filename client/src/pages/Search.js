import React from "react";
import Form from "../components/Form";
import Results from "../components/Results";
import API from "../utils/API";

class Search extends React.Component {
    state = {
        value: "",
        books: []
    };

    componentDidMount() {
        this.searchBookInitial();
    }

    searchBookInitial = () => {
        API.getBook("Lord of the Rings")
            .then(res => this.setState({ books: res.data.items.map(bookData => this.makeBook(bookData)) }))
            .catch(err => console.error(err));
    };

    makeBook = bookData => {
            var authorsAPI = bookData.volumeInfo.authors
            if (!authorsAPI) {
                authorsAPI = "Not Listed";
            } else {
                authorsAPI = bookData.volumeInfo.authors[0]
            }

            var descriptionAPI = bookData.volumeInfo.description;
            if (!descriptionAPI) {
                descriptionAPI = "No description."
            }

            var imgAPI = bookData.volumeInfo.imageLinks;
            if (!imgAPI) {
                imgAPI = "https://firstfreerockford.org/wp-content/uploads/2018/08/placeholder-book-cover-default.png"
            } else {
                imgAPI = bookData.volumeInfo.imageLinks.thumbnail
            }

        return {
            _id: bookData.id,
            title: bookData.volumeInfo.title,
            authors: authorsAPI,
            description: descriptionAPI,
            image: imgAPI,
            link: bookData.volumeInfo.previewLink
        }
    }

    searchBook = query => {
        API.getBook(query)
            .then(res => this.setState({ books: res.data.items.map(bookData => this.makeBook(bookData)) }))
            .catch(err => console.error(err));
    };

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.searchBook(this.state.search);
    };

    render() {
        return (
            <div>
                <Form
                    search={this.state.search}
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit={this.handleFormSubmit}
                />
                <div className="container">
                    <h2>Results</h2>
                    <Results books={this.state.books} />
                </div>
            </div>
        )
    }
}

export default Search;