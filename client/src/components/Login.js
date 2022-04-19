import React, { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import loginImg from "../images/favicon-96x96.png";

import { UserContext } from "../App";

import "./Login.css"


const Login = ()=>{

  const { state, dispatch} = React.useContext(UserContext) // this is the context object)

  const navigate = useNavigate();
  const [email, setEmail]= useState('');
  const [password, setPassword] =useState('');


  const loginUser = async (e)=>{

    // github copilot recommended

  //   e.preventDefault();

  //   const res = await fetch("/login",{
  //     method:"POST",
  //     headers:{
  //       "content-type":"application/json"
  //     },
  //     body:JSON.stringify({
  //       email, password
  //     })
  //   })
  //   const data = await res.json();
  //   if(res.status === 422 || !data){
  //     window.alert("Login Failed");
  //   }else{
  //     window.alert("Login Successfull");

  //     navigate("/");
  //   }
  // }



    e.preventDefault();
    
    const res = await fetch("/signin",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
        // A common use of JSON is to send data to a server.
        // The data is converted to a string and sent to the server. 
        // When sending data to a server, the data has to be a string.
        // Convert a JavaScript object into a String with JSON.stringify(). 
      body:JSON.stringify({
        email, password
      })
    })

    const data = await res.json();

    if(res.status === 422 || !data){
      window.alert(data.error);

    }else{
      dispatch({type:"USER", payload:true})
      window.alert(data.message);
      navigate('/')
    }
  }


  return (
      <>
      <section className="sign-in">
        <div className="container mt-5">
          <div className="signin-content">

            <div className='signin-image'>
              <figure>
                <img src={loginImg} alt="Login Img"/>
              </figure>
              <NavLink to="/register" className="login-img-link">Create an Account</NavLink>
            </div>

            <div className="login-form">

              <form method="POST" className="register-form">     

                <div className="form-group">
                  <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                  <input 
                    type="text" 
                    name="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Your Email" 
                    autoComplete='off'
                  />
                 </div>

                <div className="form-group">
                  <label htmlFor="password"><i className="zmdi zmdi-lock"></i></label>
                  <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Your Password" 
                    autoComplete='off'
                   />
                </div>

                <div className="form-group form-button">
                    <input type='submit' name='signin' className='form-submit' value='Log In' onClick={loginUser} />
                </div> 
              </form>
            </div>     
          </div>
        </div>
      </section>

      </>
  )
}

export default Login