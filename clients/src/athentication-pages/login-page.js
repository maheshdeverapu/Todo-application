import { Link, useNavigate } from "react-router-dom";
import {useState} from "react";
import React from "react";
const Login = ()=>{
    // const [userDetails,setUserDetails] = useState({userId:"",password:""})
    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate();
    const loginHandling =(e)=>{
        e.preventDefault();
        if(!userName || !password){
            alert("please enter all fields")
        }
        fetch("/login",{
            method:"post",
            headers:{
                "Content-Type":"application/json"                
            },

            body:JSON.stringify({
                userName,
                password
            })
        }).then(res=>res.json()).then((data)=>{
            console.log(data.message, "result")
            alert(data.message)   
            debugger
            localStorage.setItem("token",data.token)
            localStorage.setItem("userName",data.userName)
    }).catch((err)=>{
        console.log(err)
    }).finally()
    if(localStorage.getItem("token")){
        navigate("/home")
    }
    // navigate("/getId")
    }
    return(
        <div className="login-page">
      
            <div className="login-content">
               
                <p  className="login-details">enter your credentials to access your accout</p>
                <form>
                    <div>
                      
                        <input className="login-mail" placeholder="MailID" type={"gmail"} id="userid" onChange={(event)=>{setUserName(event.target.value)}}></input>
                    </div>
                    <div>
                     
                        <input className="login-password" placeholder="PASSWORD" type={"password"} id="password" onChange={(event)=>{setPassword(event.target.value)}}></input>
                    </div>
                    <button className="login-submit" onClick={loginHandling}>Login</button>
                    <Link className="login-signup" to={"/signup"}>Signup</Link>
                    
                </form>
           </div>
        </div>

    )
}
export default Login;