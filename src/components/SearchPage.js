import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from '../BooksAPI'

class SearchPage extends React.Component {
  state = {
    books: [],
    query: ''
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    myBooks: PropTypes.array.isRequired
  }

  queryChanged = (event) => {
    this.setState({
      query: event.target.value
    })
    this.searchBooks(event.target.value)
  }

  searchBooks = (query) => {
    if(query.length > 0){
      BooksAPI.search(query, 10).then((searchResult) => {
        let results = []
        searchResult.forEach(element => {
          const myBook = this.props.myBooks.filter((book) => (book.id === element.id))[0]
          element.shelf = myBook? myBook.shelf: "none"
          results.push(element)
        })
        this.setState({
          books: results
        })
      })
    }else{
      this.setState({
        query: '',
        books: []
      })
    }
  }

  add_book = (book, shelf) => {
    this.props.onChange(book, shelf)
  }

  render() {
    return (<div className="search-books">
      <div className="search-books-bar">
        <Link to='/'>
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          {/*
          NOTES: The search from BooksAPI is limited to a particular set of search terms.
          You can find these search terms here:
          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
          you don't find a specific author or title. Every search is limited by search terms.
        */}
          <input placeholder="Search by title or author" value={this.state.query} onChange={this.queryChanged}/>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
        {this.state.query.length > 0 && this.state.books.map((book, index) => (<Book book={book} key={index} onUpdate={(shelf) => {
              this.add_book(book, shelf)
            }}/>))}
        </ol>
      </div>
    </div>)
  }
}

export default SearchPage