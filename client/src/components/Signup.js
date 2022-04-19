import React, { useState } from "react"
import Imag from "../images/favicon-96x96.png";
import { NavLink, useNavigate } from "react-router-dom";

import "./Signup.css";


const Signup = ()=>{

  const navigate = useNavigate();
  
  

  // Getting data from form and storing in state
  const [user, setUser] = useState({
    name:"", email:"",phone:"",work:"",password:"",cpassword:""
  });

  let name, value;


  const handleInput =(e)=> {
    // console.log(e.target)
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name]:value});
  }



  // Seding data to server using async await concept  
  const PostData = async (e)=>{
      e.preventDefault();

      const{ name, email, phone, work, password, cpassword} = user;

      const res = await fetch("/register",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        // A common use of JSON is to send data to a server.
        // The data is converted to a string and sent to the server. 
        // When sending data to a server, the data has to be a string.
        // Convert a JavaScript object into a String with JSON.stringify(). 
        body:JSON.stringify({
          // name:name, email:email, phone:phone, work:work, password:password, cpassword:cpassword
          name, email, phone, work , password, cpassword
        })
      })

      // console.log(res);
      // OUTPUT :-
        //Response {type: 'basic', url: 'http://localhost:3000/register', redirected: false, status: 201, ok: true, …}
        // body: (...)
        // bodyUsed: true
        // headers: Headers {}
        // ok: true
        // redirected: false
        // status: 201
        // statusText: "Created"
        // type: "basic"
        // url: "http://localhost:3000/register"
        // [[Prototype]]: Response
      
      const data = await res.json();

      // console.log(data) // in case of success it will return data in json format {message: 'User Registration Successfull'} 
      // in case of error it will return data in json format {message: 'User Registration Failed'}
      if(res.status === 422 || !data){
        // console.log(data) // {error : "Email already exists"} or {error : "Password and Confirm Password do not match"}
        // console.log(data.error) // Email already exists or Password must be at least 6 characters longor 'Password and Confirm Password must match'
        window.alert(data.error);
      }else{
        // console.log(data); // {message: 'User Registration Successfull'}
        // console.log(data.message); // User Registration Successfull
        window.alert(data.message);

        navigate("/signin");
      }
  }
  


  return (
    <>
    <section className='signup'>
      <div className="container mt-5">
        <div className="signup-content">

          <div className='signup-form'>
            <h2 className="form-title">SIGN UP</h2>


            <form method="POST" className="register-form" id="register-form">

              <div className="form-group">
                <label htmlFor='name'><i className="zmdi zmdi-account"></i></label>
                <input type = 'text' name="name" id="name" autoComplete='off' value={user.name} onChange={handleInput}  placeholder="Your Name"/>
              </div>

              <div className="form-group">
                <label htmlFor='email'><i className="zmdi zmdi-email"></i></label>
                <input type = 'text' name="email" id="email" autoComplete='off' value={user.email} onChange={handleInput}  placeholder="Your Email"/>
              </div>

              <div className="form-group">
                <label htmlFor='phone'><i className="zmdi zmdi-phone"></i></label>
                <input type = 'number' name="phone" id="phone" autoComplete='off' value={user.phone} onChange={handleInput}  placeholder="Your Number"/>
              </div>

              <div className="form-group">
                <label htmlFor='work'><i className="zmdi zmdi-slideshow"></i></label>
                <input type = 'text' name="work" id="work" autoComplete='off' value={user.work} onChange={handleInput}  placeholder="Your Profession"/>
              </div>
              
              <div className="form-group">
                <label htmlFor='password'><i className="zmdi zmdi-lock"></i></label>
                <input type = 'password' name="password" id="pass" autoComplete='off' value={user.password} onChange={handleInput}  placeholder="Password"/>
              </div>

              <div className="form-group">
                <label htmlFor='cpassword'><i className="zmdi zmdi-lock"></i></label>
                <input type = 'password' name="cpassword" id="cpassword" autoComplete='off' value={user.cpassword} onChange={handleInput}  placeholder="Confirm Your Password"/>
              </div>


               <div className="form-group form-button">
                 <input type='submit' name='signup' className='form-submit' value='Register' onClick={PostData} />
                 </div> 

            </form>
            </div>


            <div className="signup-image">
              <figure>
                <img src={Imag} alt="register pic" />
              </figure>
              <NavLink to="/signin" className="signup-image-link">Already a User</NavLink>
          
          </div>
        </div>
      </div>
    </section>

    </>
  )
}

export default Signup