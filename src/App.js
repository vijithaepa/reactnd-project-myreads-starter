import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import { BookRack } from "./BookRack";
import SearchBooks from "./SearchBooks";

class BooksApp extends React.Component {
    state = {
        books: {
            currentlyReading: [{title: '', authors: [], imageLinks: {smallThumbnail: ''}}],
            wantToRead: [{title: '', authors: [], imageLinks: {smallThumbnail: ''}}],
            read: [{title: '', authors: [], imageLinks: {smallThumbnail: ''}}]
        }
    };

    componentDidMount() {
        BooksAPI.getAll()
            .then(books => {
                this.setState(() => {
                    return {
                        books: {
                            currentlyReading: books.filter(book => (book.shelf === "currentlyReading")),
                            wantToRead: books.filter(book => (book.shelf === "wantToRead")),
                            read: books.filter(book => (book.shelf === "read")),
                        }
                    }
                })
            })
    }

    onChangeShelf = (curShelf, book) => {
        this.setState((curState) => {

            // Clone the books as to reserve the state of the rest of the shelf/shelves
            const newBooks = curState.books;

            // Adding the new book to the shelf
            if (book.shelf !== 'none')
                newBooks[book.shelf] = [...curState.books[book.shelf], book]
            // Removing from the old shelf
            if (curShelf !== 'none')
                newBooks[curShelf] = curState.books[curShelf].filter(b => b.id !== book.id)

            return {
                books: newBooks
            }
        });

        // This could possibly be done at the Book level. Need an advice
        BooksAPI.update(book, book.shelf)

    };

    render() {
        return (
            <div className="app">
                <Route path="/search" render={() => (
                    <SearchBooks
                        booksOnRack={this.state.books}
                        onChangeShelf={this.onChangeShelf}/>
                )}/>

                <Route exact path="/" render={() => (
                    <BookRack books={this.state.books}
                              onChangeShelf={this.onChangeShelf}/>
                )}
                />
            </div>
        )
    }
}

export default BooksApp
