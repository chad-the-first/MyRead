import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { Debounce } from 'react-throttle'

class SearchBooks extends Component{
	state = {
		books: [],
		query: '',
    refresh: true
	}

	updateQuery(query) {
    	this.setState({ query: query})
    	this.search()
  	}

	changeOption(book, shelf) {
		this.props.onUpdate(book, shelf.target.value)
    book.shelf = shelf.target.value;
    this.setState(state => ({
      books: state.books.filter(b => b.id !== book.id).concat([ book ])
    }))
    console.log(this.state.books)
	}

	search() {
		if (this.state.query) {
			let word = this.state.query
			BooksAPI.search(word)
        .then((books) =>{
          const mainshelf = this.props.mainshelf
          mainshelf.map(function(y){
            const check = books.find(function(x){
              return x.id === y.id
            })
            if(check){
              check.shelf = y.shelf
            }
          })
          books.map(function(x){
            if(!x.shelf){
              x.shelf = 'none'
            }
          })
	  			this.setState({books})
        })
        .catch(error => {
          this.setState({})
        })
		}
	}

	render() {

		return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className='close-search' to='/'>Close</Link>
              <div className="search-books-input-wrapper">
				        <Debounce time="500" handler="onChange">
                <input type="text"
                onChange={(event) => this.updateQuery(event.target.value)} 
                placeholder="Search by title or author"/>
                </Debounce>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              	{this.state.books.map((book) => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193,  backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                        <div className="book-shelf-changer">
                          <select id='select' value={book.shelf} onChange={this.changeOption.bind(this, book)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
		)
	}
}

export default SearchBooks