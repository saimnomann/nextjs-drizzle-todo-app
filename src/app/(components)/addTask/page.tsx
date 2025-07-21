"use client"
import Image from "next/image"
import { TodoInsert } from "@/lib/drizzle"
import { useRouter } from "next/navigation"
import { useEffect, useState} from "react"
import { toast } from "sonner"
export default function AddTask(){
const router=useRouter()
const[Loading,setLoading]=useState(false)
const [Task,setTask]=useState<TodoInsert>({task:""})
async function submit(e:React.FormEvent){
    e.preventDefault()
    setLoading(true)
try{
 const res=await fetch("/api/todo",{
    method:"POST",
    body:JSON.stringify({
        task:Task.task
    })
 })
 if(!res.ok){
    throw new Error("Unable to Add Todo")
 }

    setTask({task:""})
    router.refresh()
    setTimeout(()=>{
        toast.success("Task Added Successfully")

    },1100)
    

    }catch(err){
        toast.error("Task Not Added")
        return({err})
    }finally{
        setLoading(false)
    }
}

return(


    <form className="w-full flex gap-x-4 mx-5" onSubmit={submit}> 
        <input type="text" className="bg-white rounded-4xl  focus:outline-2 focus:outline-[#ff522f89] text-base p-3 h-12 w-[65%] md:w-[75%] mb-2" placeholder="Write New Task "
        value={Task.task}
        onChange={(e)=>{setTask({task:e.target.value})}} required/>
        <button className="bg-gradient-to-r from-[#DD2476] to-[#FF512F] rounded-full hover:cursor-pointer hover:scale-105
         w-12  h-12"type="submit">{Loading?(<div className="bg-transparent border-t-transparent mx-3 border-2 border-white w-6 h-6 rounded-full animate-spin"></div>):(<Image src={"/vector.png"} alt="Not Found" height={23} width={23} className="mx-3.5"/>)}

        </button>
    </form>
)
}