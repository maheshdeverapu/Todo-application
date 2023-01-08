import {useState} from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = ()=>{
    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [popUp,setPopup] = useState("");

    const navigate = useNavigate();
    const signupHandling = (e)=>{
        e.preventDefault();
        console.log(userName,password,confirmPassword)
        // debugger
        if(!userName || !password || !confirmPassword){
           return alert("Please enter all fields")
        }
        fetch("/register",{
            method :"post",
            headers : {"Content-Type" : "application/json"},
            body:JSON.stringify({
                userName,
                password,
                confirmPassword
            })
        }).then(res=>res.json()).then((data)=>{
            if(data.error){
                alert(data.error)
            }
            else{
                alert("accout created succesfully")
                navigate("/")
            }
     
    }).catch((err)=>{
        console.log(err,"i am here")
    }).finally()
    
    // navigate("/login")


    }
    return(
        <div className={"signup-page"}>
            {/* <p >Logo</p> */}
            <div 
            className="signup-content">
            
            <h1>TODO application</h1>
            <p className="signup-details">Register</p>
            <form className="s">
           
                <div >
                   
                    <input className="signup-mail" type={"email"} id={"userid"} placeholder={"MailID"} onChange={(event)=>{setUserName(event.target.value)}}></input>
                </div >
                <div >
                  
                    <input className="signup-password" type={"password"} id={"password"} placeholder={"PASSWORD"} onChange={(event)=>{setPassword(event.target.value)}}></input>
                </div>
                <div >
              
                    <input className="signup-confirm-password" type={"password"} id={"confirm-password"} placeholder={"CONFIRM PASSWORD"} onChange={(event)=>{setConfirmPassword(event.target.value)}}></input>
                </div>
                <button  className="signup-submit" onClick={signupHandling}>Signup</button>
                <button><Link to="/">Member Login</Link></button>
                {/* {popUp && (
                    <>
                    <div>{popUp}</div>
                    <button inClick={()=>{setPopup("")}}>ok</button>
                    </>
                )} */}
            </form>
            </div>
        </div>

    )
}
export default Signup;
//<Link to={"/signin"}>Signup</Link>
//onChange={(event)=>{setSignupDetails({...signupDetails,userId:event.target.value})}}