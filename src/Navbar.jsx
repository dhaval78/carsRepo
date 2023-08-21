import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch,withRouter} from 'react-router-dom';
import {Link} from "react-router-dom";

class Navbar extends Component {


  render() {
    
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-danger">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-link" style={{color:"white",justifyContent:"left"}} >
              <Link to="/cars" style={{color:"white",textDecorationLine:"none"}}><b>Home</b></Link>
              
            </li>
         
          
        
          </ul>
        </div>
        <span class="navbar-text" style={{marginRight:"10px"}}>
        <Link to="/cars/add"   style={{color:"white",textDecorationLine:"none",}}><b>New car</b></Link>
    </span>
      </nav>
    );
  }
}

export default withRouter(Navbar);
