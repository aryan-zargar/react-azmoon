import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaDoorOpen, FaHome } from 'react-icons/fa';
export default function Customerspage() {
  const [data, setData] = useState([]);
  const [buys,setbuys] = useState([]);
  const fetchData = async () => {
    try {
      const user = localStorage.userpass.split("!@#")[0];
      const response = await axios.get(`http://localhost:3001/Borrows?user=${user}&returned=0`);
      setData(response.data);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  async function lloll(){
    var response1 = await axios.get(`http://localhost:3001/buys?user=${localStorage.getItem("userpass").split("!@#")[0]}`)
    setbuys(response1.data)
  }
  useEffect(() => {
    lloll()
    const intervalId = setInterval(fetchData, 2000);
    
    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once on mount
  function loll(id){
    axios.patch(`http://localhost:3001/Borrows/${id}`,{
      returned : 1
    })
  }
  return (
    <div>
      <button className="btn btn-light mb-3 float-end" onClick={() => (window.location.href = '../..')}>
        <FaHome /> shop 
      </button>
    <div className='d-flex justify-content-center'>
      <button onClick={()=>{localStorage.clear()
      window.location="../"}} className='btn btn-hover'><FaDoorOpen/> logout</button>
    </div>
    
    <div className='col-md-5 float-start'>
      Alert!! : Should be Returned
      <table className='table table-hover table-dark'>
        <thead>
          <tr>
            <th>date</th>
            <th>books</th>
            <th>----</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.books.map((book, bookIndex) => <React.Fragment key={bookIndex}>{book}</React.Fragment>)}</td>
              <td><button className='btn btn-primary' onClick={()=>{loll(entry.id)}} >return</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    
    <div className='col-md-6 float-end mt-2'>
    <h2>buys</h2>
          <table className='table table-hover table-dark'>
              <thead>
                <tr>
                  <th>bookname</th>
                  <th>price</th>
                </tr>
              </thead>
              <tbody>
                {buys.map(e=>{
                  return(
                    <tr>
                      <td>{e.name}</td>
                      <td>{e.price}</td>
                    </tr>
                  )
                })}
              </tbody>
          </table>
    </div>
    
    </div>
  );
}
