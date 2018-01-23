import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import MainPage from './MainPage'
import SearchBooks from './SearchBooks'


class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
  	BooksAPI.getAll().then((books) =>{
  		this.setState({books})
  	})
  }
 updateBook = (book, newShelf) => {
      BooksAPI.update(book, newShelf).then(() => {
          book.shelf = newShelf;
          this.setState(state => ({
            books: state.books.filter(b => b.id !== book.id).concat([ book ])
          }))
      })
  }

  render() {

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MainPage
            onUpdate={this.updateBook}
            books={this.state.books}
          />
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks
            onUpdate={this.updateBook}
            mainshelf={this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
