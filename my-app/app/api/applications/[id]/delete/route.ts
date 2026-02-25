import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req:Request, {params}:{params:Promise<{id:string}>}){
    try{
        const newParams = await params
        const deletedApp = await prisma.application.delete({
            where:{id:Number(newParams.id)}
        }) 
        return NextResponse.json({success:"Application got deleted"}, {status: 200})
    }
    catch(e){
        console.log(e)
        return NextResponse.json({error:"Server Side Error. Application attempted to get deleted"}, {status: 500})
    }
    
}