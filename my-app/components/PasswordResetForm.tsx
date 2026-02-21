"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { get } from "node:http";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto"
import { useState } from "react";

export default function PasswordResetForm(){
    const [sentLink, setSentLink] = useState(false)
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    async function preventSubmit(e:React.FormEvent){
        e.preventDefault()
        setIsLoading(true)
        try{
            if(!email || typeof email !== 'string'){
                return ("invalid email")
            }


            const req = await fetch("/api/passwordreset",{
                method:"POST",
                headers:{"Content-Type":"applications/json"},
                body:JSON.stringify({email:email})
            })

            if(!req.ok){
                throw new Error("The password link failed to send")
            }
            console.log("submitted reset!")
        }
        catch(e){
            console.log(e)
        }
        finally{
            setSentLink(true)
            setIsLoading(false)

        }
        
    }

    return(
        <div>
            {sentLink?(
                <div className="p-20 gap-2 flex flex-col rounded-2xl shadow-2xl">
                            <h1 className="text-center font-bold mb-1 text-2xl">Password Reset</h1>
                            <h3 className="whitespace-pre-line text-center">{`A password reset has been sent to your email. 
                            If the email is connected to an account, 
                            you'll be able to reset your password.`} </h3>
                            <Button className="mt-5 w-50 mx-auto" onClick={()=>{setSentLink(false)}}>Try again</Button>
                            <Link className="hover:underline hover:text-gray-400 text-center" href="/login">Go back to Login</Link>
                </div>)
                :
                (<form onSubmit={preventSubmit} className="p-20 gap-2 flex flex-col rounded-2xl shadow-2xl gap-3">
                            <div>
                                <p className="text-center font-bold mb-1 text-2xl">Reset Password</p>
                                <p className="text-center">Type in your email to reset your email</p>
                            </div>
                            <Label htmlFor="email">Email: </Label>
                            <Input required id="email" type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />

                            <Button disabled={isLoading} className="hover:cursor-pointer w-50 mx-auto">{isLoading?"Sending Link..." : "Reset Password"}</Button>
                            <Link className="hover:underline hover:text-gray-400 text-center" href="/login">Go back to Login</Link>
                </form>
            )}
        </div>
        
    )
}