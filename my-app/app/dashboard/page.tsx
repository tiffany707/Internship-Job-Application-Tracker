import ApplicationForm from "@/components/ApplicationEditor";
import { prisma } from "@/lib/prisma";
import getServerSession from "next-auth";
import { auth } from "../api/[...nextauth]/route";
import ApplicationBoard from "@/components/ApplicationBoard";

export default async function Dashboard(){
    const session = await auth()
        if(!session || !session.user){
            return (<div>Please Log In</div>)
        }
        const userId = session.user.id
        const applications = await prisma.application.findMany({
            where:{userId:Number(userId)}
        })
        console.log(applications)
    return(
        <div>
            {/* <div>
                <ApplicationForm/>
            </div> */}
            <div>
                <ApplicationBoard data={applications}/>
            </div>
        </div>
    )
}