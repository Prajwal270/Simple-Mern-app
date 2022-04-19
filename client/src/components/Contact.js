
import React,{useState, useEffect} from "react"
import bootstrap from "bootstrap/dist/css/bootstrap.css";
import "./Contact.css";

const Contact = ()=>{

  const [userData , setUserData] = useState({
    name:"",
    email:"",
    phone:"",
    message:"",
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

    const {name, email, phone, message} = userData;

    const res = await fetch("/contact",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name, email, phone, message
      })
    })

    const data = await res.json();
    if(res.status === 422 || !data){
      window.alert("Contact Failed");
    }else{
      window.alert("Contact Successfull");
      setUserData({...userData, message:""});
      
    }
  }

  //*******github recommended */
  // const handleSubmit = async (e)=>{
  //   e.preventDefault();

  //   const res = await fetch("/addData",{
  //     method:"POST",
  //     headers:{
  //       "Content-Type":"application/json"
  //     },
  //     body:JSON.stringify(newData)
  //   });

  //   const data = await res.json();
  //   if(res.status === 422 || !data){
  //     window.alert("Error");
  //   }else{
  //     window.alert("Success");
  //     loadContact();
  //   }
  // }


  // console.log(userData);
  //  console.log(userData.name);


  return (
    <>
    <div className="contact_info">
      <div className="container">
        <div className='row' id="main-div">

            <div className=" col-lg-4 contat_info_item">
              <p className="contact-info-title">Phone</p>
              <p className="contact_info_detail">+91 9508017435</p>
            </div>

            <div className=" col-lg-4 contat_info_item">
              <p className="contact-info-title">Email</p>
              <p className="contact_info_detail">prajwalraj27@gmail.com</p>
            </div>

            <div className=" col-lg-4 contat_info_item">
              <p className="contact-info-title">Address</p>
              <p className="contact_info_detail">India, Earth Universe</p>
            </div>    
        </div>
      </div>
    </div>

    {/* contact us form */}
      <div className="contact_form">
        <div className="container">
          <h2>Get in Touch</h2>
            <form method="POST">
              <div className="form-group">
              <input 
                type = 'text' 
                name="name" 
                autoComplete='off' 
                placeholder="Your Name" 
                required="true" 
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
                required="true" 
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
                required="true" 
                value={userData.phone}
                onChange={handleChange} 
              />
              </div>
              <div className="form-group">
                <textarea 
                name="message" 
                rows="4" 
                cols="50" 
                placeholder="Message" 
                required="true"
                value={userData.message}
                onChange={handleChange}
                 
                 ></textarea>
              </div>

              <div className="form-group">
                <button type="submit" className="button" onClick={handleSubmit} >Send Message</button>
              </div>
            </form>
        </div>
      </div>
    </>
  )
}

export default Contact