"use client"
import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import SkeletonHomepage from "./SkeletonHompage";



export default function Homepage(){
    const {data:session, status} = useSession();
    
    if (status === "loading") {
        return(
            <SkeletonHomepage/>
        )
    }
    if(!session){
        return(
            <div className="flex flex-col p-20 rounded-2xl gap-5">
                <div className="w-full h-1/2 bg-[url('/pictures/clipboard.jpg')] bg-cover fixed bottom-0 left-0"/>
            <div className="w-full h-2/3 bg-gradient-to-b from-white via-white via-55% z-20 md:via-white md:via-20%  fixed bottom-0 left-0"/>
                <p className="font-bold text-4xl z-30">Hello! Welcome to the Job Application Tracker</p>
                <div className="flex flex-col items-end gap-2 z-30">
                    <Link href="/login"><Button className="w-50 h-10 hover:cursor-pointer">Go to Login {">"}</Button></Link>
                    <Link href="/register"><Button className="w-50 h-10 hover:cursor-pointer">Register {">"}</Button></Link>
                </div>
            </div>
        )
    }
    const {id, name, role} = session.user
    return(
         <div className="flex flex-col p-20 rounded-2xl gap-5">
            <div className="w-full h-1/2 bg-[url('/pictures/clipboard.jpg')] bg-cover fixed bottom-0 left-0"/>
            <div className="w-full h-2/3 bg-gradient-to-b from-white via-white via-55% z-20 md:via-white md:via-20%  fixed bottom-0 left-0"/>
           
            <div className="z-30">
                <p className="font-bold text-4xl">Welcome back! {name}</p>
            </div>
            <div className="z-30 text-end">
                <Button className="w-60 h-10"><Link href="/applicationtracker">Go to your Application Tracker {">"}</Link></Button>
            </div>
        </div>
    )
}