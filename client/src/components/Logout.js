import React,{useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"

import { UserContext } from "../App";





const Logout = () => {

    const  { state, dispatch } = React.useContext(UserContext) // this is the context object)
//     const [userData , setUserData] = useState({});
//   const logOutPage = async ()=>{
//     try{
//     const res = await fetch("/logout",{
//       method:"GET",
//       headers:{
//         "Content-Type":"application/json"
//       },
//     });
//       const data = await res.json();
//   }catch(err){
//     console.log(err);
//   }
//   }
  
//   useEffect(()=>{
//     logOutPage();
//   },[])

    const navigate = useNavigate();
    useEffect(() =>{
        fetch('/logout', {
            method: 'GET',
            headers: {
                Accept : 'application/json',
                'Content-Type': 'application/json'
                },
                credentials : "include" // reasigns the cookie to the server
            }).then(res => {
                dispatch({type: 'USER', payload: false});
                if(res.status === 200){
                    navigate("/signin", {replace: true});
                   
                }
            }).catch(err => {
                console.log(err);
            }

            )   
    })


    return (
        <></>
    );
    }

export default Logout;
// Compare this snippet from client\src\components\Logout.js:
// import React from "react"
//
// const Logout = () => {
//     return (
//         <div>
//         <p>Logout</p>
//         </div>
//     );
//     }
//
//     export default Logout;
// Compare this snippet from client\src\components\Errorpage.js:
// import React from "react"
//
// const Errorpage = () => {
//     return (
//         <div>
//         <p>Errorpage</p>
//         </div>
//     );
//     }
//
//     export default Errorpage;
// Compare this snippet from client\src\components\About.js:
// import React from "react"
//
