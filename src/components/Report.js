import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome } from 'react-icons/fa';

const Report = () => {
  const [buyData, setBuyData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [transactions, setTransactions] = useState(0);
  const [profit, setProfit] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [totalPenalties, setTotalPenalties] = useState(0);

  useEffect(() => {
    // Fetch buy data from the provided API endpoint
    fetch('http://localhost:3001/buys')
      .then(response => response.json())
      .then(data => {
        setBuyData(data);

        // Calculate total transactions and profit
        const totalTransactions = data.length;
        const totalProfit = data.reduce((sum, item) => sum + item.price, 0);

        setTransactions(totalTransactions);
        setProfit(totalProfit);
      })
      .catch(error => console.error('Error fetching buy data:', error));

    // Fetch user data from the provided API endpoint
    fetch('http://localhost:3001/users')
      .then(response => response.json())
      .then(data => {
        setUserData(data);

        // Calculate user count and total penalties
        const count = data.length;
        const penaltiesSum = data.reduce((sum, user) => sum + user.penalty, 0);

        setUserCount(count);
        setTotalPenalties(penaltiesSum);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <div className="container mt-4">
        <div className='d-flex justify-content-center'>
            <button className='btn ' onClick={()=>window.location="../.."}><FaHome width={50} height={50}/>home</button>
        </div>
      <h2>Transactions</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Transactions</td>
            <td>{transactions}</td>
          </tr>
          <tr>
            <td>Profit</td>
            <td>{profit}$</td>
          </tr>
        </tbody>
      </table>
      <h2 className='mt-2'>users</h2>
      <table className="table">
        

        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>usercount</td>
            <td>{userCount}</td>
          </tr>
          <tr>
            <td>penalties</td>
            <td>{totalPenalties}$</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Report;
