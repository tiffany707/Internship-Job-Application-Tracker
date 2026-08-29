"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react"
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function RegistrationForm(){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


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
            console.log("Changing to login page...")
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
         <form onSubmit={preventSubmit} className="gap-2 p-20 flex flex-col rounded-2xl shadow-2xl w-full max-w-md">
                    <p className="text-center font-bold mb-2 text-2xl">Register</p>
                    <Label htmlFor="name">Name: </Label>
                    <Input placeholder="Enter Name" required id="name" type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                    <Label htmlFor="email">Email: </Label>
                    <Input placeholder="Enter Email" required id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <Label htmlFor="password" >Password: </Label>
                    <Input placeholder="Enter Password" required minLength={6} id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <Label htmlFor="password2">Confirm Password: </Label>
                    <Input placeholder="Re-Enter Password" required minLength={6} id="password2" type="password" value={password2} onChange={(e)=>setPassword2(e.target.value)} />

                    <Button className="mt-5 hover:cursor-pointer w-50 text-center mx-auto" disabled={isLoading}>{isLoading?"Registering...":"Register"}</Button>
                    <Link className="hover:underline hover:text-blue-400 text-center" href="/login">Go back to Login</Link>
        </form>
    )
}