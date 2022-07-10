import { useState } from "react";

const courses = [
    {
        id: 1,
        name: "HTML,CSS"
    },
    {
        id: 2,
        name: "React"
    },
    {
        id: 3,
        name: "ReactNative"
    },
    {
        id: 4,
        name: "Laravel"
    }
];


function App(){
    const [checked,setChecked]=useState();
    const handleSubmit = ()=>{
      
    
    }
    return(
        <div>
        {courses.map (course=>(
            <div key={course.id}>
                <input type="radio" checked={checked==course.id} onChange={()=> setChecked(course.id)}/>
                {course.name}
            </div>
        ))}
            <button type="submit" onClick={handleSubmit}>Register</button>
            </div>
    )
}
export default App;