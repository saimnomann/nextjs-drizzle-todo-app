"use client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
export default function EditTask({Id,Task}:{Id:number,Task:string}){
    const[editTask,seteditTask]=useState(Task)
    const [allow,setallow]=useState(false)
   const router= useRouter()
    async function handleEdit(e:React.FormEvent){
    e.preventDefault()
    try{
    const res=await fetch("api/todo",{
        method:"PUT",
        body:JSON.stringify({
            id:Id,
            task:editTask
        })

      })
      setallow(true)
    if(!res.ok){
        throw new Error("Something Went Wrong")
    }
    router.refresh()
    setTimeout(()=>{
    toast.success("Task Updated Successfully")

},1100)
    }
catch(err){
    console.log(err)
    toast.error("Task Cannot Be Edited")
}
finally{
    setallow(false)
}
}

return(

        <div>
            {allow?<form onSubmit={handleEdit} className="flex gap-2  rounded-full px-4 py-2 w-40 md:w-40 md:px-35">
            <input type="text" value={editTask} onChange={(e)=>seteditTask(e.target.value)} className=" w-15 md:w:60 p-2 rounded-2xl text-sm shadow-md outline-none bg-gray-300"></input>
           <button type="submit" className=" bg-blue-600 text-sm  text-white px-3 py-2 hover:cursor-pointer hover:scale-105 rounded-full">Save</button>
            </form>:
            <button onClick={()=>{setallow(true)}}><Image src="/edit.jpg" alt="Edit" width={20} height={20} className="hover:cursor-pointer"/>

            </button>}
        </div>
    )
}