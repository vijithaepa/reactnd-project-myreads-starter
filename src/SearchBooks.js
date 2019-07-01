import React, { Component } from 'react'
import { Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import { BooksGrid } from "./BooksGrid";
import { getKey, Shelves } from "./Shelf";

// Component to search books and render the resulted books in a Grid.
export default class SearchBooks extends Component {

    state = {
        books: [],      // format of : {title: '', authors: [], imageLinks: {smallThumbnail: ''}, shelf:'none'}
        searchError: false  //True, when an error on search result
    }

    searchBooks = (e) => {
        BooksAPI.search(e.target.value)
            .then(books => {
                if (books === undefined) {
                    console.log("No result found")
                    this.setState(() => (
                        {
                            books: [],
                            searchError: false
                        }
                    ))
                } else if (books.error) {
                    console.log("Error on search : ", books.error)
                    this.setState(() => (
                        {
                            books: [],
                            searchError: true
                        }
                    ))
                } else {
                    const searched = books.map(item => {
                        return {
                            id: item.id,
                            title: item.title,
                            authors: item.authors,
                            imageLinks: item.imageLinks,
                            shelf: this.getTheShelf(item)
                        }
                    })
                    this.setState(() => (
                        {
                            books: searched,
                            searchError: false
                        }
                    ))
                }

            })
    }

    getTheShelf = (book) => {
        if (this.props.booksOnRack[getKey(Shelves.currentlyReading)].filter(element => {
            return (book.id === element.id)
        }).length > 0) {
            return getKey(Shelves.currentlyReading)
        }

        if (this.props.booksOnRack[getKey(Shelves.wantToRead)].filter(element => {
            return (book.id === element.id)
        }).length > 0) {
            return getKey(Shelves.wantToRead)
        }

        if (this.props.booksOnRack[getKey(Shelves.read)].filter(element => {
            return (book.id === element.id)
        }).length > 0) {
            return getKey(Shelves.read)
        }

        return "none"
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                                  You can find these search terms here:
                                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                                  you don't find a specific author or title. Every search is limited by search terms.
                                */}
                        <input type="text" placeholder="Search by title or author" onChange={this.searchBooks}/>

                    </div>
                </div>
                {
                    !this.state.searchError &&
                    <div className="search-books-results">
                        <BooksGrid books={this.state.books}
                                   onChangeShelf={this.props.onChangeShelf}/>
                    </div>
                }
                {
                    this.state.searchError &&
                    <div className="warning-msg">
                        <i className="fa fa-warning"></i>
                        Books not found.
                    </div>
                }


            </div>
        )
    }

}
