import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req:Request){
    try{
        const {email, password, password2, name} = await req.json()
        const lcEmail = email.toLowerCase()

        if(password != password2){
        return NextResponse.json({ error: "Passwords do not match" }, { status: 400 })
        }

        const user = await prisma.users.findUnique({
            where:{email:lcEmail}
        })

        if(user){
            return NextResponse.json({error:"User Found"}, {status:400})
        }


        if(!user){
            const hashedPassword = await bcrypt.hash(password, 10)
            await prisma.users.create({
                data:{
                    email:lcEmail,
                    password: hashedPassword,
                    name: name
                }
            })
        }

        return NextResponse.json({
            email:email
        })
    }
    catch(e){
        console.log(e)
        return NextResponse.json({error:"Internal Server Error"}, {status: 500})
    }
   
}