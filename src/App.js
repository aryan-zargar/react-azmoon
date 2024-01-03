import React from 'react'
import Adminpanel from './components/adminpanel'
import CrudPage from './components/CrudPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Signup from './components/signup';
import Login from './components/login';
import Userportal from './components/userportal';
import Customerspage from './components/customerspage';
import ShoppingSite from './components/Shop';
import Report from './components/Report';
import Handlereport from './components/handlereport';
export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/signup">
            <Signup/>
          </Route>
          <Route path="/userportal">
            <Userportal/>
          </Route>
          <Route exact path="/">
            <ShoppingSite/>
          </Route>
          <Route exact path="/adminpanel">
            <CrudPage/>
          </Route>
          <Route exact path="/report">
            <Handlereport/>
          </Route>
        </Switch>
      </Router>
      
    </div>
  )
}
