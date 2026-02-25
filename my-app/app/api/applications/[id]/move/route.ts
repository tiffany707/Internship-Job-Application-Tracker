import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(req:Request, {params}:{params:Promise<{id:string}>}){
    try{
        const data = await req.json()
        const newParams = await params

        const updatedApp = await prisma.application.update({
            where:{id:Number(newParams.id)},
            data:{jobStatus:data.jobStatus}
        })
        return NextResponse.json({success:"Update Application"}, {status: 200})
    }
    catch(e){
        console.log(e)
        return NextResponse.json({error:"Could not update Job Status of Application"}, {status: 500})
    }
}