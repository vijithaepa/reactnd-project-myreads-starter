import React from 'react'
import { Book } from "./Book";

// Holds Books as a Grid.
export const BooksGrid = (props) => {

    const {books, onChangeShelf} = props

    return (
        <div className="search-books-results">
            <ol className="books-grid">
                {books.map((book, index) => (
                    <li key={index}>
                        <Book book={book}
                              onChangeShelf={onChangeShelf}/>
                    </li>
                ))}
            </ol>
        </div>
    )
}
