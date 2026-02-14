import { redirect } from "next/navigation"
import { auth } from "../[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function POST(req:Request){
    const session = await auth();
    if(!session || !session.user){
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try{
        const data = await req.json();

    const {company, role, jobStatus} = data
    const dueDate = data.dueDate
    const applicationDate = data.applicationDate
    const location = data.location
    const description = data.description
    const notes = data.notes
    const jobLink = data.jobLink
    const salary =  data.salary

    const newApp = await prisma.application.create({
        data:{
            userId: (Number(session.user.id)),
            company: company,
            role:role,
            dueDate:dueDate?new Date(dueDate):null,
            applicationDate: applicationDate? new Date(applicationDate): new Date(),
            jobStatus:jobStatus,
            location:location,
            description: description,
            notes: notes,
            jobLink: jobLink,
            salary: salary,
            }
        })

        return NextResponse.json(newApp)
    }
    catch(e){
        console.log(e)
        return NextResponse.json({error:"Server side error"}, {status: 500})
    }
    
}

export async function GET(){
    const session = await auth()
        if(!session || !session.user){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const userId = session.user.id
    try{

        const applications = await prisma.application.findMany({
            where:{userId:Number(userId)}
        })
        return NextResponse.json(applications)
    }
    catch(e){
        console.log(e)
        return NextResponse.json({error:"Server Error"}, {status: 500})
    }
}
