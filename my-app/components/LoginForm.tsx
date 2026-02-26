"use client"
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react"
import Link from "next/link";
import { useState } from "react";

import { useRouter }from "next/navigation";


export default function LoginForm(){
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(false)


    async function preventSubmit(e:React.FormEvent){
        e.preventDefault();
        const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect:false,
        callbackUrl: "/"
    })
    if(res?.error){
        setIsLogin(true)
        setEmail("")
        setPassword("")
        console.log("isLogin set to true")
    }
    else{
        router.push("/")
    }
    }

    return(
        <div className="gap-2 p-20 flex flex-col rounded-2xl shadow-2xl w-full max-w-md">
            <form onSubmit={preventSubmit} className="gap-2 flex flex-col">
                <p className="text-center font-bold mb-2 text-2xl">Welcome!</p>
                <Label htmlFor="email">Email: </Label>
                <Input required placeholder="Enter Email" id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <Label htmlFor="password" >Password: </Label>
                <Input required placeholder="Enter Password" id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <Link className="hover:underline text-sm hover:text-gray-400 text-end" href="/passwordreset">Forgot your Password?</Link>
                <div className={`${isLogin?"flex":"hidden"} text-sm py-1 text-red-500 justify-center font-semibold`}>Incorrect Username or Password</div>
                <Button className="hover:cursor-pointer mt-2 w-50 mx-auto">Log In</Button>
            </form>
                <p className="text-gray-400 text-center"> ------- Or sign in with ------- </p>
                <Button className="hover:cursor-pointer w-50 text-center mx-auto" onClick={()=>{signIn("google", {redirectTo:"/"})}}><FaGoogle/>Sign in with Google</Button>
                <Link className="text-center text-sm mt-5 hover:text-gray-400 hover:underline" href="/register">{`Don't have an account? Sign up`}</Link>
        </div>
    )
}