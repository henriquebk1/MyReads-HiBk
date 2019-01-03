import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import ListBooks from './components/ListBooks'
import SearchPage from './components/SearchPage'

class BooksApp extends React.Component {
  state = {
    books: []
  };

  async componentDidMount() {
    const books = await BooksAPI.getAll()
    this.setState({ books })
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)

    book.shelf = shelf

    this.setState(old => {
      return {books: old.books.filter(b => b.id !== book.id).concat([ book ])}
    })
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListBooks books={this.state.books} onChange={this.updateBook}/>
        )} />
        <Route path='/search' render={() => (
          <SearchPage onChange={this.updateBook} myBooks={this.state.books}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
