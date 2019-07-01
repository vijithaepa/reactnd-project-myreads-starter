import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {BookRack} from "./BookRack";
import SearchBooks from "./SearchBooks";
import { getKey, Shelves } from './Shelf'
import {Switch, Route} from 'react-router'

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
                            currentlyReading: books.filter(book => (book.shelf === getKey(Shelves.currentlyReading))),
                            wantToRead: books.filter(book => (book.shelf === getKey(Shelves.wantToRead))),
                            read: books.filter(book => (book.shelf === getKey(Shelves.read))),
                        }
                    }
                })
            })
    }


    onChangeShelf = (curShelf, book) => {
        BooksAPI.update(book, book.shelf).then(response => {
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
        })

    };

    render() {
        return (
            <div className="app">
                <Switch>
                    <Route exact path="/" render={() => (
                        <BookRack books={this.state.books}
                                  onChangeShelf={this.onChangeShelf}/>
                    )}
                    />
                    <Route path="/search" render={() => (
                        <SearchBooks
                            booksOnRack={this.state.books}
                            onChangeShelf={this.onChangeShelf}/>
                    )}/>
                </Switch>
            </div>
        )
    }
}

export default BooksApp

