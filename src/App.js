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

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      })
    })
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.getData()
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
