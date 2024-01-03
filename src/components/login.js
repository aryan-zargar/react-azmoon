import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

export default function Login() {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  function login(e) {
    e.preventDefault();
    const username = document.getElementById('u').value;
    const password = document.getElementById('p').value;
    let isLoggedIn = false;

    for (let index = 0; index < users.length; index++) {
      const user = users[index];
      if (user.username === username && user.password === password) {
        localStorage.userpass = `${username}!@#${password}!@#${user.privilage}`;
        isLoggedIn = true;
        setLoggedIn(true);
        break;
      }
    }

    if (!isLoggedIn) {
      alert('Wrong username or password');
    }
  }

  if (localStorage.userpass) {
    return <Redirect to="/userportal" />;
  }

  return (
    <div className="d-flex justify-content-center">
      <form className="w-25 mt-5" onSubmit={(e) => login(e)}>
        <h1>Login</h1>
        <input className="form-control w-100 mt-1" id="u" placeholder="Username" />
        <input className="form-control w-100 mt-1" id="p" type="password" placeholder="Password" />
        <button type="submit" className="btn btn-success w-100 mt-1">
          Login
        </button>
      </form>
    </div>
  );
}
