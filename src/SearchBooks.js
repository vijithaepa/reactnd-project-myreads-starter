import React, { Component } from 'react'
import { Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import { BooksGrid } from "./BooksGrid";

// Component to search books and render the resulted books in a Grid.
export default class SearchBooks extends Component {

    state = {
        books: [],      // format of : {title: '', authors: [], imageLinks: {smallThumbnail: ''}, shelf:'none'}
    }

    searchBooks = (e) => {
        BooksAPI.search(e.target.value)
            .then(books => {
                if(books === undefined) {
                    console.log("No result found")
                    this.setState(() => (
                        {books: []}
                    ))
                } else if (books.error) {
                    console.log("Error on search : ", books.error)
                    this.setState(() => (
                        {books: []}
                    ))
                } else {
                    const searched = books.map(item => {
                        return {
                            id: item.id,
                            authors: item.authors ? item.authors: [],
                            imageLinks: item.imageLinks ? item.imageLinks: {smallThumbnail: ''},
                            shelf: this.getTheShelf(item)
                        }
                    })
                    this.setState(() => (
                        {books: searched}
                    ))
                }

            })
    }

    getTheShelf = (book) => {
        if (this.props.booksOnRack["currentlyReading"].filter(element => {
            return (book.id === element.id)
        }).length > 0) {
            return "currentlyReading"
        }

        if (this.props.booksOnRack["wantToRead"].filter(element => {
            return (book.id === element.id)
        }).length > 0) {
            return "wantToRead"
        }

        if (this.props.booksOnRack["read"].filter(element => {
            return (book.id === element.id)
        }).length > 0) {
            return "read"
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
                <div className="search-books-results">
                    <BooksGrid books={this.state.books}
                               onChangeShelf={this.props.onChangeShelf}/>
                </div>
            </div>
        )
    }

}
