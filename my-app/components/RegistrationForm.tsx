"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react"
import Link from "next/link";
import { redirect } from "next/navigation";
import router from "next/router";
import { useState } from "react";



export default function RegistrationForm(){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    async function preventSubmit(e:React.FormEvent){

        e.preventDefault();
        setIsLoading(true);
        try{
            const res = await fetch("/api/register",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify({email, password, password2, name})
                }
            )

            const data = await res.json()

            if(!res.ok){
                alert(data.error || "Error")
                return;
            }
            router.push("/login")
        }   
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false);
        }
        
    }

    return(
         <form onSubmit={preventSubmit} className="p-20 gap-2 flex flex-col rounded-2xl shadow-2xl">
                    <p className="text-center font-bold mb-2 text-2xl">Welcome!</p>
                    <Label htmlFor="name">Name: </Label>
                    <Input id="name" type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                    <Label htmlFor="email">Email: </Label>
                    <Input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <Label htmlFor="password" >Password: </Label>
                    <Input minLength={6} id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <Label htmlFor="password2">Confirm Password: </Label>
                    <Input minLength={6} id="password2" type="password" value={password2} onChange={(e)=>setPassword2(e.target.value)} />

                    <Button disabled={isLoading}>{isLoading?"Registering...":"Register"}</Button>
                    <Link className="hover:underline hover:text-blue-400 text-center" href="/login">Go back to Login</Link>
        </form>
    )
}