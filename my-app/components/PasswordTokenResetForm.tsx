"use client"
import Link from "next/link"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useState } from "react";
import { redirect } from "next/navigation"
import { Router } from "lucide-react"
import router from "next/router"


export default function PasswordTokenResetForm({ token }:{ token:string }){
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false)

    async function preventSubmit(e:React.FormEvent){
        e.preventDefault()
        try{
        
            if(!password || typeof password !== "string" || password !== password2){
            return {error:"Password does not match"}
            }

            const res = await fetch("/api/passwordreset",{
                method:"PATCH",
                headers:{"Content-Type":"applications-json"},
                body:JSON.stringify({password:password, id:token})
            })

            if(!res.ok){
                throw new Error ("There was a server error resetting your password")
            }

            router.push("/login")

        }
        catch(e){
            console.log(e)
        }
        
        
    }
    

    return(
        <form onSubmit={preventSubmit} className="p-20 gap-2 flex flex-col rounded-2xl shadow-2xl">
                    <p className="text-center font-bold mb-2 text-2xl">Reset your Password</p>
                    <Label htmlFor="password" >Password: </Label>
                    <Input minLength={6} id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <Label htmlFor="password2">Confirm Password: </Label>
                    <Input minLength={6} id="password2" type="password" value={password2} onChange={(e)=>setPassword2(e.target.value)} />

                    <Button disabled={isLoading} className="hover:cursor-pointer">{isLoading?"Resetting Password..." : "Reset Password"}</Button>
                    <Link className="hover:underline hover:text-blue-400 text-center" href="/login">Go back to Login</Link>
        </form>
    )
}