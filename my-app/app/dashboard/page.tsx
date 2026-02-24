import AnalyticsPage from "@/components/AnalyticsPage";
import Navbar from "@/components/Navbar";
import { auth } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Suspense } from "react";


export default async function Dashboard(){
    const session = await auth()
            if(!session || !session.user){
                redirect("/login")
                return
            }
            
            const userId =  session.user.id
            console.log("Session User ID:", session);
            const applications = await prisma.application.findMany({
                where:{userId:Number(userId)}
            })
            console.log(applications)
            
    return(
        <div>
           
            <Navbar/>
            <div className="md:ml-[35px]">
                <AnalyticsPage data={applications}/>
            </div>
           
        </div>
    )
}