import React from "react"
import bootstrap from "bootstrap/dist/css/bootstrap.css"; // the bootstrap name has not been used, but its functionality is used
// so do not comment it thinking that it is not used.
import { NavLink } from "react-router-dom"
import logo from "../images/favicon-32x32.png";
import "./Navbar.css"
import { UserContext } from "../App";

const Navbar = ()=>{

  const { state, dispatch } = React.useContext(UserContext);

  const NavLinks = ()=>{
    if(state){
      return (
      <>
        <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/about">About</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/contact">Contact</NavLink>
      </li>
      {/* <li className="nav-item">
        <NavLink className="nav-link" to="/signin">Login</NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" to="/register">Register</NavLink>
      </li> */}

      <li className="nav-item right">
        <NavLink className="nav-link" to="/logout">Logout</NavLink>
      </li>
      {/* <li className="nav-item">
        <NavLink className="nav-link" to="/update">Update</NavLink>
      </li> */}
      </>
      )
    }else{
      return (
        <>
                <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/about">About</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/contact">Contact</NavLink>
      </li>
      <li className="nav-item right">
        <NavLink className="nav-link" to="/signin">Login</NavLink>
      </li>

      <li className="nav-item right">
        <NavLink className="nav-link" to="/register">Register</NavLink>
      </li>

      {/* <li className="nav-item">
        <NavLink className="nav-link" to="/logout">Logout</NavLink>
      </li> */}
      {/* <li className="nav-item">
        <NavLink className="nav-link" to="/update">Update</NavLink>
      </li> */}
        </>
      )
    }
  }

  return (

<>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <NavLink className="navbar-brand" to="/">
    <img src={logo} alt="logo" />
  </NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">


      <NavLinks />

    </ul>

  </div>
</nav> 
</>
  )
}

export default Navbar