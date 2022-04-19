import React,{useState, useEffect} from "react"
import "./Home.css"
const Home = ()=>{
  
  const [userData , setUserData] = useState({});
  const [show , setShow] = useState(false);

const userHomePage = async ()=>{
  try{
  const res = await fetch("/getData",{
    method:"GET",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json"
    },
    credentials : "include" // reasigns the cookie to the server
    });

    const data = await res.json();
    setUserData(data);
    setShow(true);
}catch(err){
  console.log(err);
}
}

useEffect(()=>{
  userHomePage();
},[])


  return (
    <div className="main ">
        <p className="para">WELCOME</p>
      
      <h1>{userData.name ? "Welcome"+ " "+userData.name : "Static Content"}</h1>
    </div>
  )
}

export default Home;