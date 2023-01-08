import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const HomeScreen = ()=>{
  let userName = JSON.parse(localStorage.getItem("user"));
  userName = userName.userName.split("@")[0];
  console.log(userName,"userName")
    const [todo,setTodo] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        // debugger
        fetch(`/home`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data",data.post[0].activity)
            setTodo(data.post[0].activity)
            // setPosts(data.user);
            // debugger
          })
          .catch((err) => {
            console.log("catch", err);
          })
          .finally();
      }, []);
      console.log(todo)
      const logoutHandling =(e)=>{
        e.preventDefault();
        localStorage.clear();
        navigate("/login")
    }
    return(
        <>
              <button ><Link className="app-todo" to={"/add"}>Add Todo</Link></button>
      <select onChange={logoutHandling} className={"logout"}>
        <option>{userName}</option>
        <option >logout</option>
      </select>
            <table>
                <thead>
                    <tr>
                        <td>Activity</td>
                        <td>Status</td>
                        <td>Time taken (Hrs:Min:Sec)</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {todo}
                    </td>
                  </tr>
{/*            
                {todo.map((ele,i)=>{
                    return(
                     
                            <tr key={i}>
                            <td>{ele.activity}</td>
                            <td>{ele.status}</td>
                            <td>{ele.timeTaken}</td>
                            <td>{ele.action}</td>
                            </tr>
                     
                    )
                })} */}
                
                    
                </tbody>
            </table>
        </>
    )
}
export default HomeScreen;