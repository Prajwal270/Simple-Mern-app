import React from "react"

import {Routes, Route } from "react-router-dom";
import bootstrap from "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar"

import Home from "./components/Home"
import Contact from "./components/Contact"
import Login from "./components/Login"
import About from "./components/About"
import Signup from "./components/Signup"
import Errorpage from "./components/Errorpage"
import Logout from "./components/Logout";
import Update from "./components/Update";
import {reducer, initialState} from "./reducer/reducer";

export const UserContext = React.createContext();




const App = ()=>{

  const [ state, dispatch ] = React.useReducer(reducer, initialState);
  return (
    <>
      
      <UserContext.Provider value = {{state, dispatch}}>
      <Navbar/>
      <Routes>
      {/* <Route path="/">
        <Home />
      </Route>  out dated*/}
      {/* <Route exact path="/" components={Home} />   out dated*/}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/signin" element={<Login />} />
        <Route exact path="/register" element={<Signup />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/update" element={ <Update /> } />
        <Route exact path="/error" element={<Errorpage />} />
    </Routes>
    </UserContext.Provider>
      
    </>
  )
}

export default App