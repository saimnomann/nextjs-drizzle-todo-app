import { NextRequest,NextResponse } from "next/server";
import {db,TodoInsert,TodoSelect,todoTable} from "@/lib/drizzle"
import { eq } from "drizzle-orm";
export async function GET(request:NextRequest) {
    try{
const res:TodoSelect[]=await db.select().from(todoTable)
return NextResponse.json(res)

    }catch(err){
        return NextResponse.json({"Error":`${err as string} `})
    }
}
export async function POST(request:NextRequest){
    try{
const req=await request.json()
if(req.task){
const res:TodoInsert[]=await db.insert(todoTable).values({
    task:req.task,
}).returning()
return NextResponse.json({"Message":"Task Added Successfully"})
    }
else{
    throw new Error("Task Field is Required")
}
}catch(err){
return NextResponse.json({"Error":`${err as string}`})
}
}
export async function PUT(request:NextRequest){
    try{
    const req=await request.json()
    const id= await db.select({id:todoTable.id}).from(todoTable).where(eq(todoTable.id,req.id))
    if(id.length==0){
        throw new Error("No Todo Found")
    }
    const res:TodoInsert[]=await db.update(todoTable).set({task:req.task}).where(eq(todoTable.id,req.id))
    return NextResponse.json({"Message":"Todo Updated Successfully"})
    }
    catch(err){
  return NextResponse.json({"Error":`${err as string}`})
    }
}
export async function DELETE(request:NextRequest){
   try{
    const req=await request.json()
    const id=await db.select({id:todoTable.id}).from(todoTable).where(eq(todoTable.id,req.id))
    if(id.length===0){
        throw new Error("Todo Not Found")
    }
    const res=await db.delete(todoTable).where(eq(todoTable.id,req.id))
    return NextResponse.json({"Message":"Todo Deleted Successfully"})
}catch(err){
    return NextResponse.json(`${err as string}`)
}
}