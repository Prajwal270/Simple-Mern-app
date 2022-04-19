import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Update = () => {

  const navigate = useNavigate();

    const [userData , setUserData] = useState({
        name:"",
        email:"",
        phone:"",
        work:"",
      });
    
    
      const loadContact = async ()=>{
    
        const res = await fetch("/getData",{
          method:"GET",
          headers:{
            // Accept:"application/json",
            "Content-Type":"application/json"
          },
          // credentials : "include" // reasigns the cookie to the server
          });
          const data = await res.json();
          setUserData({...userData,
            name:data.name,
            email:data.email,
            phone:data.phone,
            work:data.work,
          });
      }
    
    
      useEffect(()=>{
        loadContact();
      },[])
    
      // Store the form data in state, so that it can be send to server
      const handleChange = (e)=>{
        // const {name, value} = e.target;
        const name = e.target.name;
        const value = e.target.value;
    
        setUserData({
          ...userData,
          [name]:value
        });
      }
        
    
      // Now we have to send the data to the server
    
      const handleSubmit = async (e)=>{
        e.preventDefault();
    
        const {name, email, phone, work} = userData;
    
        const res = await fetch("/update",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            name, email, phone, work
          })
        })
    
        const data = await res.json();
        if(res.status === 400 || !data){
          window.alert(data.error);
        }else{
          window.alert(data.message);
          navigate('/update');
        }
      }


    return (
        <div>
        <p>Update</p>
        <form method="POST">
              <div className="form-group">
              <input 
                type = 'text' 
                name="name" 
                autoComplete='off' 
                placeholder="Your Name" 
                 
                value={userData.name}
                onChange={handleChange} 
              />
              </div>
              <div className="form-group">
              <input 
                type = 'text' 
                name="email" 
                autoComplete='off' 
                placeholder="Your Email" 
                 
                value={userData.email}
                onChange={handleChange}
              />
              </div>
              <div className="form-group">
              <input 
                type = 'number' 
                name="phone" 
                autoComplete='off' 
                placeholder="Your Phone Number" 
                
                value={userData.phone}
                onChange={handleChange} 
              />
              </div>
              <div className="form-group">
                <textarea 
                name="work" 
                rows="4" 
                cols="50" 
                placeholder="Work" 
                
                value={userData.work}
                onChange={handleChange}
                 
                 ></textarea>
              </div>

              <div className="form-group">
                <button type="submit" className="button" onClick={handleSubmit} >Send Message</button>
              </div>
            </form>
        </div>
    );
    };  

    export default Update;