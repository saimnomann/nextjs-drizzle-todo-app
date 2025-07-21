import {TodoSelect} from "@/lib/drizzle";
import DeleteTask from "../deleteTask";
import EditTask from "../editTask";
export default async function TodoTask(){
    let data:TodoSelect[]=[]
   try{ const res=await fetch("http://localhost:3000/api/todo",{
        cache:"no-store"
    }
)
if(!res.ok){
    throw new Error("Cannot Fetch Data")
}

data=await res.json()
if(data.length===0){
    return(<div className="text-2xl text-gray-800 font-bold py-4 text-center">
        No Task Found
    </div>)
}
}
catch(err){
     return (
    <div className="text-red-500 text-center py-4">
      Failed to load tasks.
    </div>)
    }

return(
<div className="max-h-[335px]  overflow-y-auto mb-3">
    {
        data.map((todo)=>{
    return(
    <div className="flex justify-between gap-x-2  bg-white w-[90%] h-12 rounded-lg items-center mx-auto px-4 mb-2 " key={todo.id} >
    
    <div className="flex gap-x-3 items-center"> 
    <div className="bg-[#FF512F] rounded-full w-[13px] h-[13px]"></div>
    <div className="text-lg px-3">{todo.task}</div> 
    </div>

    <div className="flex gap-x-2">
<EditTask Id={todo.id} Task={todo.task}/>
 <DeleteTask Id={todo.id}/>

    </div>
    </div> 
)
}
)
}
</div>
 
)
}
