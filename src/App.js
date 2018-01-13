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
      console.log(books)
  	})
  }
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(res => this.setState({}))
    BooksAPI.get(book).then((book) =>{console.log(book)})
    console.log(shelf)
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
          <SearchBooks/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
