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
            // use a copy and assign to state as a whole
            const newBooks = curState.books;
            for (let [key] of Object.entries(newBooks)) {
                // Adding the new book to the shelf
                if (book.shelf === key) {
                    newBooks[key] = [...curState.books[book.shelf], book]
                }

                // Removing from the old shelf
                if (curShelf === key) {
                    newBooks[key] = curState.books[curShelf].filter(b => b.id !== book.id)
                }
            }

            return {
                books: newBooks
                // TODO: to verify- below method will leave the other shelf empty as this override the whole state
                // {
                //     [newShelf]: [...curState.books[newShelf], book],
                //     [book.shelf]: curState.books[book.shelf].filter(b => b.id !== book.id),
                //
                // }
            }
        });

        // This could possibly be done at teh Book level. Need an advice
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
