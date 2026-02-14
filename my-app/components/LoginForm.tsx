"use client"
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
        <form onSubmit={preventSubmit} className="p-20 gap-2 flex flex-col rounded-2xl shadow-2xl">
            <p className="text-center font-bold mb-2 text-2xl">Welcome!</p>
            <Label htmlFor="email">Email: </Label>
            <Input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <Label htmlFor="password" >Password: </Label>
            <Input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />

            <Button>Log In</Button>
            <Button ><Link href="/register">Register</Link></Button>
            <Link className="hover:underline hover:text-blue-400 text-center" href="/">Forgot your Password?</Link>
        </form>
    )
}