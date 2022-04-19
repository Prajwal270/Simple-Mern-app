import React from "react"
import { NavLink } from "react-router-dom"

const Errorpage = ()=>{
  return (
    <>
        <div id="notfound">
            <h1>404</h1>
            <p>
                There is no such page exits or it has not loaded properly.
            </p>
            <NavLink to="/">Back to Home Page</NavLink>
        </div>
    </>
  )
}

export default Errorpage












