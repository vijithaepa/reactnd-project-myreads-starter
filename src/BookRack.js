import React from 'react'
import { Shelf } from "./Shelf";
import { Link } from "react-router-dom";

export const BookRack = (props) => {

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <Shelf title={"Currently Reading"}
                           books={props.books.currentlyReading}
                           onChangeShelf={props.onChangeShelf}/>
                    <Shelf title={"Want to Read"}
                           books={props.books.wantToRead}
                           onChangeShelf={props.onChangeShelf}/>
                    <Shelf title={"Read"}
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
