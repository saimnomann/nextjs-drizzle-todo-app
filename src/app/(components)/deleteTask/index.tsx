"use client"
import { toast } from "sonner"
import Image from "next/image"
import { useRouter } from "next/navigation"
export default function DeleteTask({Id}:{Id:number}){
const router=useRouter()
const handleDelete=async()=>{
    try{
const res=await fetch("/api/todo",{
           method:"DELETE",
           body:JSON.stringify({
               id:Id
            })
        })
if(!res.ok){
    throw new Error("Cannot Fetch Data")
}

router.refresh()
setTimeout(()=>{

    toast.success("Task Deleted Successfully")
},1100)

}
catch(err){
    toast.error("Task Not Deleted")
    console.log(err)
}}
return(
    <div>
    <button onClick={handleDelete}><Image src="/delete.png" alt="delete" width={20} height={20} className="hover:cursor-pointer"></Image></button>
    </div>
)
}