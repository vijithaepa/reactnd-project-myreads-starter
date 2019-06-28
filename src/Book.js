import React from 'react'

export const Book = (props) => {

    const onMoveToNewShelf = (newShelf) => {
        props.onChangeShelf(newShelf, props.book)
    }

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${props.book.imageLinks.smallThumbnail})`
                }}/>
                <Option shelf={props.shelf ? props.shelf: props.book.shelf}
                        onChangeShelf={onMoveToNewShelf}/>
            </div>
            <div className="book-title">{props.book.title}</div>
            <div className="book-authors">{props.book.authors.map((auth, index) => (
                <span key={index}>{(index ? ', ' : '') + auth}</span>
            ))}</div>
        </div>
    )
}

const Option = (props) => (
    <div className="book-shelf-changer">
        <select value={props.shelf} onChange={value => props.onChangeShelf(value.target.value)}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
        </select>
    </div>
)

// Book.propTypes = {
//     book: PropTypes.object.required,
//     shelf: PropTypes.string.required,
//     onChangeShelf: PropTypes.func.required,
// }
