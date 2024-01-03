import axios from "axios";
import './style.css'
import React, { useCallback, useState } from "react";
import DataGrid, {
    Scrolling, Pager, Paging, 
  } from 'devextreme-react/data-grid';
const baseURL = "http://localhost:3001/books/";

export default function Adminpanel(props) {
  const [post, setPost] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const [borrows, setborrow] = React.useState(null);
  const [showPageSizeSelector, setShowPageSizeSelector] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  const [showNavButtons, setShowNavButtons] = useState(true);
  const showPageSizeSelectorChange = useCallback((value) => {
      setShowPageSizeSelector(value);
    }, []);
  
    const showInfoChange = useCallback((value) => {
      setShowInfo(value);
    }, []);
  
    const showNavButtonsChange = useCallback((value) => {
      setShowNavButtons(value);
    }, []);
  React.useEffect(() => {
    axios.get(props.baseURL).then((response) => {
      setPost(response.data);
    });
    axios.get("http://localhost:3001/users").then((response) => {
        setUsers(response.data);
      });
    axios.get("http://localhost:3001/borrows").then((response) => {
        setborrow(response.data);
      });
  }, []);

  if (!post) return null;
  function posting(e){
    axios
    .post(baseURL, {
      name:document.getElementById("name").value,
      author:document.getElementById("author").value,
      ISBN:Number(document.getElementById("ISBN").value),
      category:(document.getElementById("category").value).split(",")
    })
    .then((response) => {
      setPost(response.data);
    });
  }
    function posting1(e){
        axios
        .post("http://localhost:3001/users", {
          username:document.getElementById("username").value,
          password:document.getElementById("password").value,
          privilage:Number(document.getElementById("privilage").value),
          penalty:0
        })
        .then((response) => {
          setPost(response.data);
        });
 }
 function posting2(e){
    axios
    .post("http://localhost:3001/borrows", {
      date:document.getElementById("date").value,
      books:(document.getElementById("books").value).split(","),
      user:(document.getElementById("user").value),
      returned:0
    })
    .then((response) => {
      setborrow(response.data);
    });
}
 function deleteReq(e){
    axios.delete(`http://localhost:3001/books/${document.getElementById("idDel").value}/`)
 }
 function deleteReq1(e){
    axios.delete(`http://localhost:3001/users/${document.getElementById("idDel1").value}/`)
 }

  return (
    <>
    <button className="btn btn-hover btn-success"><a style={{"color":"white"}} href="../report">Reports</a></button>
    <div className="">
        <h1>books</h1>
    <DataGrid className="float-start"
    style={{"width":"70%"}}
      id='gridContainer'
      dataSource={post}
      keyExpr="id"
      showBorders={true}

    >
      <Scrolling rowRenderingMode='virtual'></Scrolling>
      <Paging defaultPageSize={10} />
      <Pager
        visible={true}
        showPageSizeSelector={showPageSizeSelector}
        showInfo={showInfo}
        showNavigationButtons={showNavButtons} />
    </DataGrid>
    <div className='w-25   float-end'  >
      <form className='form-group w-100 p-2' style={{"border":"solid gray 1px","borderRadius":"8px"}} onSubmit={(e)=>posting(e)}>
          <h1>add a {props.name}</h1>
          <input className='form-control' placeholder='name' id="name"/>
          <input className='form-control' placeholder='author' id="author" />
          <input className='form-control' placeholder='ISBN'id="ISBN" />
          <label htmlFor="category">seprate with comma(,)</label>
          <input className='form-control' name='category' placeholder='category' id='category' />
          <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-success w-100">submit</button>
          </div>
      </form>
      <form className='form-group w-100 mt-2 p-2'style={{"border":"solid gray 1px","borderRadius":"8px"}} onSubmit={(e)=>deleteReq(e)}>
          <h1>Delete a {props.name}</h1>
          <input id="idDel" type="number" className="form-control" placeholder="id"/>
          <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-danger w-100 mt-2">delete</button>
          </div>
      </form>
  </div>
  </div>
  <div className="">
    <h1>Users</h1>
      <DataGrid className="float-start"
      style={{"width":"70%","paddingTop":"50px"}}
        id='gridContainer'
        dataSource={users}
        keyExpr="id"
        showBorders={true}

      >
        <Scrolling rowRenderingMode='virtual'></Scrolling>
        <Paging defaultPageSize={10} />
        <Pager
          visible={true}
          showPageSizeSelector={showPageSizeSelector}
          showInfo={showInfo}
          showNavigationButtons={showNavButtons} />
      </DataGrid>
      <div className='w-25   float-end'  >
        <form className='form-group w-100 p-2' style={{"border":"solid gray 1px","borderRadius":"8px"}} onSubmit={(e)=>posting1(e)}>
            <h1>add a user</h1>
            <input className='form-control' placeholder='username' id="username"/>
            <input className='form-control' placeholder='password' id="password" />
            <input className='form-control' type="number" placeholder='privilage'id="privilage" />
            <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success w-100 mt-2">submit</button>
            </div>
        </form>
        <form className='form-group w-100 mt-2 p-2'style={{"border":"solid gray 1px","borderRadius":"8px"}} onSubmit={(e)=>deleteReq1(e)}>
            <h1>Delete a user</h1>
            <input id="idDel1" type="number" className="form-control" placeholder="id"/>
            <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-danger w-100 mt-2">delete</button>
            </div>
        </form>
    </div>
    </div>

    <div className="" >
        <h1>Borrows</h1>
      <DataGrid className="float-start mt-5"
      style={{"width":"70%","paddingTop":"50px"}}
        id='gridContainer'
        dataSource={borrows}
        keyExpr="id"
        showBorders={true}

      >
        <Scrolling rowRenderingMode='virtual'></Scrolling>
        <Paging defaultPageSize={10} />
        <Pager
          visible={true}
          showPageSizeSelector={showPageSizeSelector}
          showInfo={showInfo}
          showNavigationButtons={showNavButtons} />
      </DataGrid>
        <div className='w-25   float-end'  >
        <form className='form-group w-100 p-2' style={{"border":"solid gray 1px","borderRadius":"8px"}} onSubmit={(e)=>posting2(e)}>
            <h1>add a Borrow</h1>
            <input className='form-control' type="date" placeholder='name' id="date"/>
            <input className='form-control' placeholder='books(seprate with comma(,))'id="books" />
            <input className='form-control' placeholder='user'id="user" />
            <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success w-100 mt-2">submit</button>
            </div>
        </form>
        </div>
    </div>
  </>
    
    
  )
}