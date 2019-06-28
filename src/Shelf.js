import React from 'react'
import { Book } from "./Book";

export const Shelf = (props) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.map((book, index) => (
                        <li key={index}>
                            <Book book={book}
                                  shelf={props.shelf}
                                  onChangeShelf={props.onChangeShelf}/>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )


}

// Shelf.propTypes = {
//     title: PropTypes.string.isRequired,
//     books: PropTypes.object.required,
//     onChangeShelf: PropTypes.func.required
// }

