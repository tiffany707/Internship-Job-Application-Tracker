import ApplicationForm from "@/components/ApplicationEditor";
import { prisma } from "@/lib/prisma";
import getServerSession from "next-auth";
import { auth } from "../api/auth/[...nextauth]/route";
import ApplicationBoard from "@/components/ApplicationBoard";
import Navbar from "@/components/Navbar";

export default async function Dashboard(){
    const session = await auth()
        if(!session || !session.user){
            return (<div>Please Log In</div>)
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
            <div className="ml-[35px]">
                <ApplicationBoard data={applications}/>
            </div>
        </div>
    )
}