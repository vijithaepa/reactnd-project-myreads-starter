import React from 'react'
import { getKey, Shelves } from "./Shelf";

// Component to render a book with it's actions to move between shelves.
export const Book = (props) => {

    const onMoveToNewShelf = (newShelf) => {
        let curShelf = props.book.shelf;
        props.book.shelf = newShelf;
        props.onChangeShelf(curShelf, props.book)
    };

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${props.book.imageLinks ? props.book.imageLinks.smallThumbnail : {smallThumbnail: ''}})`
                }}/>
                <Option shelf={props.book.shelf}
                        onChangeShelf={onMoveToNewShelf}/>
            </div>
            <div className="book-title">{props.book.title}</div>
            <div className="book-authors">{(props.book.authors ? props.book.authors : []).map((auth, index) => (
                <span key={index}>{(index ? ', ' : '') + auth}</span>
            ))}</div>
        </div>
    )
};

const Option = (props) => (
    <div className="book-shelf-changer">
        <select value={props.shelf} onChange={value => props.onChangeShelf(value.target.value)}>
            <option value="move" disabled>Move to...</option>
            <option value={getKey(Shelves.currentlyReading)}>Currently Reading</option>
            <option value={getKey(Shelves.wantToRead)}>Want to Read</option>
            <option value={getKey(Shelves.read)}>Read</option>
            <option value="none">None</option>
        </select>
    </div>
);

// Book.propTypes = {
//     book: PropTypes.object.required,
//     shelf: PropTypes.string.required,
//     onChangeShelf: PropTypes.func.required,
// }
