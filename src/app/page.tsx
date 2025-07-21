import TodoTask from "@/app/(components)/todo_list/page";
import AddTask from "./(components)/addTask/page";

export default function Home(){
  return(
  <main className="bg-gradient-to-r from-[#E32C69] to-[#F7463F] h-screen flex justify-center items-center shadow-2xl">
<div className="bg-[#d9d9d97e] px-3 py-3  w-[80%] md:w-full max-w-md rounded-2xl h-[600] md:h-[545px]  flex flex-col justify-between">
<div className="mt-6">
<TodoTask/>
</div>
<div className="">

<AddTask/>

  <div className="bg-black/80 rounded w-1/2 h-1.5 mx-auto mt-2 "></div>
</div>
</div>
  </main>
  )
}