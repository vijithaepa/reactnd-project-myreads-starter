import React from 'react'
import { getValue, Shelf, Shelves } from "./Shelf";
import { Link } from "react-router-dom";

// Holds Book shelves.
export const BookRack = (props) => {

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <Shelf title={getValue(Shelves.currentlyReading)}
                           books={props.books.currentlyReading}
                           onChangeShelf={props.onChangeShelf}/>
                    <Shelf title={getValue(Shelves.wantToRead)}
                           books={props.books.wantToRead}
                           onChangeShelf={props.onChangeShelf}/>
                    <Shelf title={getValue(Shelves.read)}
                           books={props.books.read}
                           onChangeShelf={props.onChangeShelf}/>
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">
                    <button>
                        <span>Add a book</span>
                    </button>
                </Link>
            </div>
        </div>
    )
}
