import React from 'react'
import { BooksGrid } from "./BooksGrid";

// Holds Books for it's title.
export const Shelf = (props) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <BooksGrid books={props.books}
                           onChangeShelf={props.onChangeShelf}/>
            </div>
        </div>
    )


}

export const Shelves = {
    currentlyReading: ['currentlyReading', 'Currently Reading'],
    wantToRead: ['wantToRead', 'Want to Read'],
    read: ['read', 'Read']
}

export const getKey = ([key, value]) => (key)

export const getValue = ([key, value]) => (value)


// Shelf.propTypes = {
//     title: PropTypes.string.isRequired,
//     books: PropTypes.object.required,
//     onChangeShelf: PropTypes.func.required
// }

