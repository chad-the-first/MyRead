import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'

class MainPage extends Component{
	
	changeOption(book, shelf) {
		this.props.onUpdate(book, shelf.target.value)
	}

	render() {

		let reading, toread, read
	    let match1 = new RegExp(escapeRegExp("currentlyReading"))
	    reading = this.props.books.filter((book) => match1.test(book.shelf))

	    let match2 = new RegExp(escapeRegExp("wantToRead"))
	    toread = this.props.books.filter((book) => match2.test(book.shelf))

	    let match3 = new RegExp(escapeRegExp("read"))
	    read = this.props.books.filter((book) => match3.test(book.shelf))

	    let Shelf = (props) => (
	    	<div className="bookshelf">
              <h2 className="bookshelf-title" style={{ textAlign: 'center' }}>{props.shelf}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {props.list.map((book) => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193,  backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                        <div className="book-shelf-changer">
                          <select id='select' value={props.value} onChange={this.changeOption.bind(this, book)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors.toString()}</div>
                    </div>
                  </li>
                ))}
                </ol>
              </div>
            </div>
	    )

		return (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
               <Shelf shelf='Currently Reading' value='currentlyReading' list = {reading}/>
               <Shelf shelf='Want to Read' value='wantToRead' list={toread}/>
               <Shelf shelf='Read' value='read' list = {read}/>  
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
		)
	}
}

export default MainPage