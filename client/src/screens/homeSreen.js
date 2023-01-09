import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Card from "./card";
const HomeScreen = ()=>{
  let userName = JSON.parse(localStorage.getItem("user"));
  userName = userName.userName.split("@")[0];
  // console.log(userName,"userName")
    const [todo,setTodo] = useState("");
    const [todos,setTodos] = useState([]);
    const [work,setWork] = useState(false);
    const [isWorkStart,setIsWorkStart] = useState(false);
    const [workDone,setWorkDone] = useState([]);
    
    const navigate = useNavigate();
    useEffect(() => {
        // debugger
        fetch(`/home`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+ localStorage.getItem("token")
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if(data.error){
              alert(data.error)
            }
            else{
              let arr;

if (data) {
  data[0] = "foo";
} else {
  data = ["bar"];
}

console.log(data[0]); // 'bar'
              console.log("data",data)
              // console.log("data.inner",data.post[0])
              setTodos(data)
              console.log(todos)
            }
            // setPosts(data.user);
            // debugger
          })
          .catch((err) => {
            console.log("catch", err);
          })
          .finally();
      }, [todo]);
      console.log(todo)

      function add(){
        if(!todo){
          alert("Please enter some activity");
          return;
        }
        setWork(!work)
        // console.log("check")
        fetch("/addActivity",{
          method:"post",
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("token")
        },
        body: JSON.stringify({
          activity:todo,
          Status:"Pending"
      })
        }).then(res=>res.json()).then((data)=>{
          console.log("iam in .then")
          if(data.error){
            alert(data.error)
          }
          else{
            setIsWorkStart(false)
          }
        }).catch((err)=>{console.log("catch",err)})
      }



      const logoutHandling =(e)=>{
        e.preventDefault();
        localStorage.clear();
        navigate("/")
    }
    return(
        <>
              
      <div>
        <span>{userName}</span><span><button onClick={logoutHandling}>logout</button></span>

      </div>
      
       <div><b>Todo Application</b><b>History</b></div> 
      <div>
        {workDone.map((eles)=>{
          return(
            <p>{eles}</p>
          )
        })}
      </div>
      <div>
        <input type={"text"} onChange={(e)=>{setTodo(e.target.value)}}/>
        <button onClick={add}>Add Activity</button>
      </div>
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
              
           
                {todos.map((ele)=>{
                    return(
                            <>
                            <Card ele={ele} workDone={workDone} setWorkDone={setWorkDone} isWorkStart={isWorkStart} setIsWorkStart={setIsWorkStart}/>
                            </>
                     
                    )
                })}
                
                    
                </tbody>
            </table>
        </>
    )
}
export default HomeScreen;