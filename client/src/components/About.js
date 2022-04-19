import React, { useEffect, useState } from 'react';
import ProfPic from "../images/favicon-96x96.png";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom"
import "./About.css";
import axios from "axios";

const About = ()=>{

  const navigate = useNavigate();
  var [userData, setUserData]= useState({});
  

// const callAboutPage = async ()=>{
    
//   try{
//     const res = await axios.get("/about");


//       const data = await res.json();
//       // console.log(data);
//       setUserData(data);

//     if(res.status !== 200){
//       throw new Error ("Failed to fetch data");
//     };

//   } catch(err){
//     console.log(err);
//   }
// }









  const callAboutPage = async ()=>{
    try{
      const response = await fetch("/about",{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials : "include" // reasigns the cookie to the server 
        // this is written to make sure the cookies reach our server.
      })


      if(response.status !== 200){ 
        throw new Error(response.error);
      }

      // ************** or ***************
      // console.log(response.status); // 401 when not logged in and 200 when logged in
      // console.log(response.statusText); // Unauthorized when not logged in and OK when logged in

      // if(response.status === 200){
      //   navigate("/about");
      // }
      
      // if(response.status === 401){
      //   navigate("/signin");
      // }

      const data = await response.json();
      // console.log(data);
      setUserData(data);
      

  }catch(err){
    // window.alert("Please Login First");
    console.log(err);
    navigate("/signin");
  }

}

// The moment the page is loaded, the function callAboutPage is called.
// The function callAboutPage is called only once.
// The function callAboutPage is called only when the page is loaded for the first time and not when the page is refreshed
// or the page is loaded again
useEffect(() => {
  callAboutPage();

  },[])

  //  console.log(userData);
  //  console.log(userData.name);
  

  return (
    <>
    
    <div className="container emp-profile">


      <form method="GET">

        <div className='row'>

          <div className="col-md-4">
            <img src={ProfPic} alt="img"/>
            </div>

            <div className="col-md-6">
              <div className="profile-head">
                <h5>{userData.name}</h5>
                <h6>Web Developer</h6>
                <p className="profile-rating mt-3 mb-5">RANKING: <span> 7/10</span></p>

                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true" >About</a>
                  </li>
                  <li className="nav-item">
                  <a className="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab">TimeLine</a>
                  </li>
                </ul>
                </div>
            </div>


            <div className="col-md-2">
              <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
              <NavLink className="nav-link" id='updateButton' to="/update">Update</NavLink>

              </div>
        </div>



        <div className="row">
          <div className="col-md-4">
            <div className="profile-work">
              <p>Work Link</p>
              <a href="https://google.com">Youtube</a><br />
              <a href="https://google.com">Youtube</a><br />
              <a href="https://google.com">Youtube</a><br />
              <a href="https://google.com">Youtube</a><br />
              <a href="https://google.com">Youtube</a><br />
              </div>
            </div>
            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profile-tab" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" arial-labelledby="home-tab">
                  <div className="row mt-3">
                    <div className="col-md-6">
                        <label> User ID </label>
                    </div>
                    <div className="col-md-6">
                        <p>{userData._id}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                        <label> Name </label>
                    </div>
                    <div className="col-md-6">
                        <p>{userData.name}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                        <label> Email </label>
                    </div>
                    <div className="col-md-6">
                        <p>{userData.email} </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                        <label> Phone </label>
                    </div>
                    <div className="col-md-6">
                        <p>{userData.phone}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                        <label> Work </label>
                    </div>
                    <div className="col-md-6">
                        <p>{userData.work}</p>
                    </div>
                  </div>
                   
                </div>

                <div className="tab-pane fade" id="profile" role="tabpanel" arial-labelledby="profile-tab">
                  <div className="row">
                    <div className="col-md-6">
                        <label> Experience </label>
                    </div>
                    <div className="col-md-6">
                        <p> Expert</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                        <label> Name </label>
                    </div>
                    <div className="col-md-6">
                        <p> Prajwal Raj</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                        <label> User ID </label>
                    </div>
                    <div className="col-md-6">
                        <p> 897998798</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                        <label> User ID </label>
                    </div>
                    <div className="col-md-6">
                        <p> 897998798</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                        <label> User ID </label>
                    </div>
                    <div className="col-md-6">
                        <p> 897998798</p>
                    </div>
                  </div>
                   
                </div>

              </div>
        </div>
        </div>
      </form>
    </div>

    </>
  )
}

export default About;