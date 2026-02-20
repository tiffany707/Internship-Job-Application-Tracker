"use client"
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react"
import Link from "next/link";
import { useState } from "react";


export default function LoginForm(){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    async function preventSubmit(e:React.FormEvent){
        e.preventDefault();
        await signIn("credentials", {
        email: email,
        password: password,
        callbackUrl: "/"
    })
    }

    return(
        <div className="gap-2 p-20 flex flex-col rounded-2xl shadow-2xl">
            <form onSubmit={preventSubmit} className="gap-2 flex flex-col">
                <p className="text-center font-bold mb-2 text-2xl">Welcome!</p>
                <Label htmlFor="email">Email: </Label>
                <Input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <Label htmlFor="password" >Password: </Label>
                <Input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />

                <Button className="hover:cursor-pointer">Log In</Button>
            </form>
                <Link href="/register"><Button className="hover:cursor-pointer" >Register</Button></Link>
                <Link className="hover:underline hover:text-blue-400 text-center" href="/passwordreset">Forgot your Password?</Link>
                <p className="text-gray-400 text-center"> -------or------- </p>
                <Button className="hover:cursor-pointer" onClick={()=>{signIn("google", {redirectTo:"/"})}}><FaGoogle/>Sign in with Google</Button>
        </div>
    )
}