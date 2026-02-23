import ApplicationForm from "@/components/ApplicationEditor";
import { prisma } from "@/lib/prisma";
import getServerSession from "next-auth";
import { auth } from "../api/auth/[...nextauth]/route";
import ApplicationBoard from "@/components/ApplicationBoard";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";

export default async function ApplicationTracker(){
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
            {/* <div>
                <ApplicationForm/>
            </div> */}
            <Navbar/>
            <div className="md:ml-[35px] overflow-hidden">
                <ApplicationBoard data={applications}/>
            </div>
        </div>
    )
}