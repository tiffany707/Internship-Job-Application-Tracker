import PasswordResetEmail from "@/components/PasswordResetEmail"
import { prisma } from "@/lib/prisma"
import bcrypt, { hash } from "bcryptjs"
import { randomUUID } from "crypto"
import { NextResponse } from "next/server"
import { Resend } from "resend"

 const resend = new Resend(process.env.RESEND_KEY)

export async function POST(req:Request){
    console.log("1")
   try{
        const reqData = await req.json()

        const user = await prisma.users.findUnique({
            where:{email:reqData.email}
        })

        if(!user){
            return NextResponse.json({error:"The user does not exist in our database"}, {status: 500})
        }
        console.log("there is a user", user.id)
        const token = await prisma.passwordResetToken.create({
            data:{
                userId: user.id,
                token:`${randomUUID()}${randomUUID()}`.replace(/-/g,"")
            }
        })
        console.log("created token")

        const {data, error} = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: reqData.email,
            subject: "[Job Application Tracker] Password Reset Link",
            react: PasswordResetEmail({email:reqData.email, token:token.token})
        })
        console.log("sent")
        if(error){
            console.log(error)
            return NextResponse.json({error:"There was an error sending the email"}, {status: 500})
        }

        return(Response.json(data))
   }
   catch(e){
     console.error("PRISMA ERROR:", e)
     return NextResponse.json({error:e}, {status: 500})
   }

}

export async function PATCH(req:Request){
    try{
        const data = await req.json()
        const token = await prisma.passwordResetToken.findUnique({
            where:{
                    token: data.id,
                    createdAt: {gt: new Date(Date.now() - 1000 * 60 * 60 *4)},
                    resetAt: null
                }
        })
        
       
        if(!token){
            return NextResponse.json({error:"This is an invalid URL please try getting another link"}, {status: 500})
        }

        const encryptedPassword = await hash(data.password, 12)
        const patchPassword =  prisma.users.update({
            where:{ id:token.userId },
            data:{password:encryptedPassword}
        })

        const updateTime =  prisma.passwordResetToken.update({
            where:{id:token.id},
            data:{resetAt: new Date()}
        })

        await prisma.$transaction([patchPassword, updateTime])
        

        return NextResponse.json({error:"Changes were made successfully"}, {status: 200})
    }
    catch(e){
        console.log(e)
        return NextResponse.json({error:"There was a server error resetting your password"}, {status: 500})
    }
    
}