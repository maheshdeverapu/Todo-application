import React, { useEffect, useState } from 'react'
// import moment from "moment"
// moment().format()
const Card = ({ ele, setWorkDone, workDone, isWorkStart, setIsWorkStart }) => {
  const [start, setStart] = useState(true)
  // let dt1 = 0, dt2 = 0
  const [dt1,setDt1]=useState()
  const[dt2,setDt2]=useState()
  const startAction = () => {
//     if (isAnyStart) {
//       alert("finishing the ongoing task first or pause the ongoing task")
//       return
//     }
//     setStart(false)
//     setIsAnyStart(true)
//     // dt1 = Date.now()%100
//     setDt1(moment.utc())
//     console.log(dt1)

  }
  useEffect(() => {
    // console.log(moment())
    
    
  }, [])
  const pauseHandle = () => {
//     setIsAnyStart(false)
//     setStart(true)
//     // dt2 = Date.now()%100
//     setDt2(moment.utc())
//     console.log(dt2)
//     let duration=moment.duration(dt2.diff(dt1))
//     fetch("/editActivity",{
//       method:"PUT",
//       headers:{
//         "Content-type": "application/json",
//         "Authorization":"Bearer "+ localStorage.getItem("jwt")
//       },
//       body:JSON.stringify({
//         task,
//         TimeTaken:parseInt(duration.asMinutes())%60
//       })
//     }).then(res=>res.json())
//     .then(data=>{
//       if(data.error){
//         alert(data.error)
//       }
//       else{
//         alert("updated")
//       }
//     })
  }
  const EndHandle = () => {
//     console.log(task.Activity)
//     setIsAnyStart(false)
//     // dt2 = Date.now()
//     setDt2(Date.now())
//     setCompletedTasks([...completedTasks, task.Activity])
  }
  function diff_minutes(dt2, dt1) {
    // var diff=(dt2.getTime()-dt1.getTime())/1000
    var diff = dt2 - dt1
    diff /= 60
    return Math.abs(Math.round(diff))
  }
  return (
    <>
      <tr>
        <td>{ele.activity}</td>
        <td>{ele.Status}</td>
        <td>{ele.TimeTaken}</td>
        <td>{start ? <button onClick={startAction}>Start</button> : <><button onClick={pauseHandle}>Pause</button><button onClick={EndHandle}>End</button></>}</td>
      </tr>
    </>
  )
}

export default Card