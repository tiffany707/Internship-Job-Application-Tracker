import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function GET(req:Request, {params}:{params:Promise<{userId:number}>}){
    try{
        const paramsData = await params
        console.log(paramsData)
        const jobOrder = await prisma.users.findUnique({
            where:{id:Number(paramsData.userId)}
        })

        if(!jobOrder){
            throw new Error("There was an error grabbing the columns")
        }
        return NextResponse.json(jobOrder)
    }
    catch(e){
        console.log(e)
        return NextResponse.json({error:"There was an error grabbing the columns"}, {status: 500})
    }

}


export async function PATCH(req:Request, {params}:{params:{userId:number}}){
    try{
        const paramsData = await params
        const data = await req.json();
        const updateColumns = await prisma.users.update({
            where:{id:Number(paramsData.userId)},
            data:{jobOrder:data.jobOrder}
        })
        console.log(data.jobOrder)
        return NextResponse.json({success:"Updated column order"}, {status: 200})
    }
    catch(e){
        console.log(e)
        return NextResponse.json({error:"There was an error updating the columns"}, {status: 500})
    }
}