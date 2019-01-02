import React from 'react'
import Book from './Book'
import {PropTypes} from 'prop-types'

class BookShelf extends React.Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    update = (book, shelf) => {
        this.props.onChangeShelf(book,shelf)
    }

    render() {
        const books = this.props.books
        const title = this.props.title
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book, index) => (<Book book={book} key={index} onUpdate={(shelf) => {
                            this.update(book, shelf)
                        }} />))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf