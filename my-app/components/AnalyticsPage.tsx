"use client"

import { useSession } from "next-auth/react"
import AnalyticCard from "./AnalyticCard"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import SkeletonAnalyticsPage from "./SkeletonAnalyticsPage";


type Status = "Pending" | "Interviewing" | "Offer" | "Ghosted" | "Rejected" | "Accepted"

interface Application{
  id:number;
  userId:number;
  company: string;
  role :string;
  dueDate: Date | null;
  applicationDate: Date; 
  jobStatus: Status;
  location:string | null;
  description:string | null;
  notes: string | null;
  jobLink: string | null;
  salary: string | null;

}

export default function  AnalyticsPage({data}:{data:Application[]}){
    const {data:session, status} = useSession()
    if (status === "loading"){
        return(
            <SkeletonAnalyticsPage/>
        )
    }

    const totalApplications = data.length
    const totalRejected = data.filter((i) => i.jobStatus == "Rejected").length
    const totalPending = data.filter((i) => i.jobStatus == "Pending").length
    const totalOffer = data.filter((i) => i.jobStatus == "Offer").length
    const totalGhosted = data.filter((i) => i.jobStatus == "Ghosted").length
    const responseRate = (((totalApplications - totalRejected - totalOffer)/totalApplications*100) || 0).toFixed(1)

    const applicationsDateCountObject = data.reduce((acc:Record<string, number>, curr)=>{
        const currentDate = new Date(curr.applicationDate).toLocaleDateString()
        acc[currentDate] = (acc[currentDate] || 0) + 1
        return acc
    },{})

    const applicationsDateCountArray = Object.keys(applicationsDateCountObject).map((date:string)=>{
        return {date, count:applicationsDateCountObject[date]}
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    console.log(applicationsDateCountArray)

    return(
        
        <div className="flex flex-col">
            <div className="p-10">
                <div className="flex flex-col md:flex-row gap-8">
                    <AnalyticCard header={"Total Amount of Applications"} data={totalApplications.toString()} />
                    <AnalyticCard header={"Total Amount of Applications still Pending"} data={totalPending.toString()}/>
                    <AnalyticCard header={"Total Amount of Offers"} data={totalOffer.toString()} />
                </div>
                <div className="flex flex-col md:flex-row mt-5 gap-8"> 
                    <AnalyticCard header={"Total Amount of Applications Rejected"} data={totalRejected.toString()} />
                    <AnalyticCard header={"Total Amount of Applications Ghosted"} data={totalGhosted.toString()} />
                    <AnalyticCard header={"Response Rate"} data={`${responseRate}%`}/>
                </div>
            </div>
                
            <div className="flex flex-col gap-10 p-2 md:p-10 md:ml-10 border-2 border-gray-300 rounded-2xl h-[300px] md:h-[500px] w-full md:w-1/2 overflow-hidden">
                <h1 className="md:text-3xl font-bold">Application Activity</h1>
                <ResponsiveContainer width="100%" height="100%">
                     <LineChart data={applicationsDateCountArray} margin={{left:10, top:10, right:10, bottom:0}}>
                        <XAxis dataKey="date" tick={{fontSize: 12}} />
                        <YAxis dataKey="count" allowDecimals={false} tick={{fontSize: 12}} width={25}/>
                        <Line dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Tooltip/>
                    </LineChart>
                </ResponsiveContainer>
              
            </div>
            
        </div>
    )
}