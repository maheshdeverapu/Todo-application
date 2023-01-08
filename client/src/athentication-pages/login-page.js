import { Link, useNavigate } from "react-router-dom";
import {useState} from "react";
import React from "react";
const Login = ()=>{
    // const [userDetails,setUserDetails] = useState({userId:"",password:""})
   
    
    // user = user.split("@")[0];
    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate();
    const loginHandling =(e)=>{
        e.preventDefault();
        if(!userName || !password){
            return alert("please enter all fields")
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
            if(data.error){
                alert(data.error)
            }
            else{
                localStorage.setItem("token",data.token);
                localStorage.setItem("user",JSON.stringify(data.user));
                console.log(data.user)
                alert("login successfully");
                navigate("/home")
            }
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
               <h1>TODO application</h1>
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