import React from 'react'
import { PropTypes } from 'prop-types'
import noImage from '../icons/no-image.png'

class Book extends React.PureComponent {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onUpdate: PropTypes.func.isRequired
    }

    change = (e) => {
        this.props.onUpdate(e.target.value)
    }

    render() {
        const book = this.props.book
        const image =
            book.imageLinks && book.imageLinks.thumbnail
                ? book.imageLinks.thumbnail
                : noImage
        const title = book.title ? book.title : 'No title available'
        const shelf = book.shelf ? book.shelf : "none"
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${image}")` }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={this.change} value={shelf}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
            </li>
        )
    }
}

export default Book