import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHome } from 'react-icons/fa';
import { FaDoorOpen } from 'react-icons/fa';
const ShoppingSite = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Check if localStorage.userpass exists
    if (!localStorage.userpass) {
      // Redirect to login page
      window.location.href = '../login';
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  const handleBorrow = async (bookName) => {
    try {
      const today = new Date().toISOString().split('T')[0]; // Get today's date without hours
      const user = localStorage.userpass.split('!@#')[0];

      const borrowData = {
        date: today,
        books: [bookName],
        user: user,
        returned: 0,
      };

      await axios.post('http://localhost:3001/borrows', borrowData);
      console.log('Book borrowed successfully!');

      // Redirect to "../cust"
      window.location.href = '../userportal';
    } catch (error) {
      console.error('Error borrowing book:', error);
    }
  };

  // Filter books based on search query
  const filteredBooks = books.filter((book) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    
    return (
      book.name.toLowerCase().includes(lowerCaseQuery) ||
      book.author.toLowerCase().includes(lowerCaseQuery) ||
      book.ISBN.toString().includes(lowerCaseQuery)
    );
  });
  function handlebuy(name,price){
    axios.post("http://localhost:3001/buys/",{
      name:name,price:price,user:localStorage.getItem("userpass").split("!@#")[0]
    })
    window.location="../userportal"
  }
  return (
    <div className="container mt-5">
      <div className='d-flex justify-content-center'>
      <button onClick={()=>{localStorage.clear()
         window.location="../.."}} className='btn btn-hover'><FaDoorOpen/> logout</button>
    </div>
      <h1 className="mb-4 float-start">Shopping Site</h1>
      <button className="btn btn-light mb-3 float-end" onClick={() => (window.location.href = '../userportal')}>
        <FaHome /> Home 
      </button>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by ISBN, name, or author"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="form-control mb-3"
      />

      <div className="row">
        {filteredBooks.map((book, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{book.name}</h5>
                <p className="card-text">Author: {book.author}</p>
                <p className="card-text">ISBN: {book.ISBN}</p>
                <p className="card-text">
                  Category: {book.category.map((category, catIndex) => (
                    <span key={catIndex}>{catIndex > 0 ? ', ' : ''}{category}</span>
                  ))}
                </p>
                <button onClick={() => handleBorrow(book.name)} className="btn btn-primary">
                  Borrow
                </button>
                <button onClick={() => handlebuy(book.name,book.price)} className="btn btn-success">
                  buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingSite;
