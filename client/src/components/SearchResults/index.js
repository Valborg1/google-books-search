import React, { useState, useEffect } from "react";
import API from "../../utils/API";

function BookResults(props) {
    const [savedBooks, setSavedBooks] = useState([])

    useEffect(() => {
        API.savedBooks()
        .then(res => setSavedBooks(res.data))
        .catch(err => console.error(err));
      }, [])

    function handleSave(book) {

        if (savedBooks.map(book => book._id).includes(book._id)) {
            API.deleteBook(book._id)
                .then(deletedBook => setSavedBooks(savedBooks.filter(book => book._id !== deletedBook._id)))
                .catch(err => console.error(err));
        } else {
            API.saveBook(book)
                .then(savedBook => setSavedBooks(savedBooks.concat([savedBook])))
                .catch(err => console.error(err));
        }
    }
    return (
        <div>
            {!props.books.length ? (
                <h1 className="text-center">No Results to Display</h1>
            ) : (
                    <div>
                        {props.books.map(result => (
                            <div className="card mb-3" key={result._id}>
                                <div className="row">
                                    <div className="col-md-2">
                                        <img alt={result.title} className="img-fluid" src={result.image} />
                                    </div>
                                    <div className="col-md-10">
                                        <div className="card-body">
                                            <h5 className="card-title">{result.title} by {result.authors}</h5>
                                            <p className="card-text">{result.description}</p>
                                            <div>
                                                <a href={result.link} className="btn badge-pill btn-outline-dark mt-3" target="_blank" >View</a>
                                                <button onClick={handleSave(result)} className="btn badge-pill btn-outline-warning mt-3 ml-3" >
                                                    {savedBooks.map(book => book._id).includes(result._id) ? "Unsave" : "Save"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    )
}

export default BookResults;