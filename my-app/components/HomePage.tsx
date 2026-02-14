"use client"
import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";


export default function Homepage(){
    const {data:session, status} = useSession();
    if (status === "loading") {
        return <div className="p-20 text-center">Loading your profile...</div>;
    }
    if(!session){
        return(
            <div className="flex flex-col p-20 rounded-2xl gap-3">
                <p className="font-semibold text-xl">Hello! Log in or Register to check Job Postings and check you Dashboard!</p>
                <div className="flex flex-col items-end gap-2">
                    <Button className="w-40"><Link href="/login">Go to Login {">"}</Link></Button>
                    <Button className="w-40"><Link href="/register">Register {">"}</Link></Button>
                </div>
            </div>
        )
    }
    const {id, name, role} = session.user
    return(
         <div className="flex flex-col p-20 rounded-2xl">
            <p>Welcome back! {name}</p>
            <Button><Link href="/dashboard">Go to your Dashboard {">"}</Link></Button>
        </div>
    )
}