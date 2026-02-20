"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "./ui/button"
import { ArrowLeftToLine, ArrowRight } from "lucide-react"


export default function Navbar(){
    const[isOpen, setIsOpen] = useState(false)
    const {data:session, status} = useSession()
    return(
        <nav>
            <div className={`border-r-2 p-2 flex fixed top-0 left-0 h-full w-[200px] bg-white z-50 transition-transform  ${isOpen?"translate-x-0":"-translate-x-[165px]"}`}>
                <div className="flex flex-col px-9 mt-auto justify-center items-center">
                    {status === "authenticated"?(<Button className="hover:cursor-pointer" onClick={()=>{signOut({redirectTo:"/"})}}>Sign Out</Button>):(<Link href="/login"><Button className="hover:cursor-pointer">Log In</Button></Link>)}
                </div>
                <div className="">
                    {isOpen?<ArrowLeftToLine className="hover:cursor-pointer" onClick={()=>{setIsOpen(false)}} />:<ArrowRight className="hover:cursor-pointer" onClick={()=>{setIsOpen(true)}}/>}
                </div>
            </div>
        </nav>
    )
}