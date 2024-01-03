import axios from 'axios';
import React from 'react'

export default function Signup() {
    function posting1(e){
        e.preventDefault();
        axios
        .post("http://localhost:3001/users", {
          username:document.getElementById("username").value,
          password:document.getElementById("password").value,
          privilage:0,
          penalty:0
        })
        window.location = "/login"
 }
  return (
    <div className='d-flex justify-content-center'>
        <form className='form-group w-25 p-2 mt-5'  onSubmit={(e)=>posting1(e)}>
            <h1>add a user</h1>
            <input className='form-control' placeholder='username' id="username"/>
            <input className='form-control' placeholder='password' id="password" />
            <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success w-100 mt-2">submit</button>
            </div>
        </form>
    </div>
  )
}
