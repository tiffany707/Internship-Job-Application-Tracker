"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react"
import Link from "next/link";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { convertServerPatchToFullTree } from "next/dist/client/components/segment-cache/navigation";
import { X } from "lucide-react"
import { Textarea } from "./ui/textarea";

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

interface Props{
    info:Application | null
    setIsOpen:(arg0:boolean)=>void
    setApp:(arg0:(prev:Application[])=>Application[])=>void
    app:Application[]
}

export default function ApplicationEditor({setIsOpen, info, setApp, app}:Props){

    console.log("hi")
  
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [applicationDate, setApplicationDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [jobStatus, setJobStatus] = useState("Pending");
    const [notes, setNotes] = useState("");
    const [jobLink, setJobLink] = useState("");
    const [salary, setSalary] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const formatDateForInput = (dateValue: Date | string | null) => {
    if (!dateValue) return "";
    return new Date(dateValue).toISOString().split("T")[0];
    }

    useEffect(()=>{
        console.log(info)
        if(info){
            setCompany(info.company || "")
            setRole(info.role || "")
            setDueDate(formatDateForInput(info.dueDate) )
            setApplicationDate(formatDateForInput(info.applicationDate))
            setLocation(info.location || "")
            setDescription(info.description || "")
            setJobStatus(info.jobStatus || "Pending")
            setNotes(info.notes || "")
            setJobLink(info.jobLink || "")
            setSalary(info.salary || "")
        }
        
    }, [info])



    async function preventSubmit(e:React.FormEvent){
        e.preventDefault();
        setIsLoading(true);
        try{
            if(!info){
                return 
            }

            const res = await fetch(`api/applications/${info.id}/edit`,{
                method: "PATCH",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({company, role, dueDate,applicationDate, location, description, jobStatus, notes, jobLink,salary})
            })

            if(res.ok){
                const findIndex = app.findIndex(i => i.id == info.id)
                setApp((prev:Application[])=>{
                    const copyApp = [...prev]
                    copyApp[findIndex] = {...copyApp[findIndex], 
                        company: company, 
                        role: role , 
                        dueDate: dueDate ? new Date(dueDate) : null,
                        applicationDate: applicationDate ? new Date(applicationDate) : new Date(), 
                        location: location, 
                        description: description, 
                        jobStatus: jobStatus as Status, 
                        notes: notes, 
                        jobLink: jobLink,
                        salary: salary

                    }
                    console.log(copyApp[findIndex])
                    return copyApp
                })
            }
            if(!res.ok){
                const error = await res.json()
                throw new Error(error.message || "Failed to Edit Application")
            }
            
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false);
        }
        
    }
    return(
        <div>
            <div className="flex flex-col">
                <div className="ml-auto mt-5 mr-5">
                    
                    <Button onClick={()=>{setIsOpen(false)}} className="w-10"><X/></Button>
                </div>
                <div>
                    <h1 className="text-center font-bold mb-2 text-2xl">Job Editor</h1>
                </div>
            </div>
            <form onSubmit={preventSubmit} className="p-20 gap-3 flex flex-col rounded-2xl shadow-2xl">
                <div>
                    <Label className="mb-1" htmlFor="company">Company (required): </Label>
                    <Input required id="company" type="text" value={company} onChange={(e)=>setCompany(e.target.value)} />
                </div>
                <div>
                    <Label className="mb-1" htmlFor="role" >Role (required): </Label>
                    <Input required id="role" type="text" value={role} onChange={(e)=>setRole(e.target.value)} />
                </div>
                <div>
                    <Label className="mb-1" htmlFor="dueDate" >Due Date: </Label>
                    <Input id="dueDate" type="date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} />
                </div>
                <div>
                    <Label className="mb-1" htmlFor="applicationDate" >Application Date: </Label>
                    <Input id="applicationDate" type="date" value={applicationDate} onChange={(e)=>setApplicationDate(e.target.value)} />
                </div>
                <div>
                    <Label className="mb-1" htmlFor="jobStatus" >Job Status: </Label>
                    <Select value={jobStatus} onValueChange={setJobStatus}>
                        <SelectTrigger id="jobStatus" className="w-[180px]">
                            <SelectValue placeholder="Pending" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Interviewing">Interviewing</SelectItem>
                            <SelectItem value="Offer">Offer</SelectItem>
                            <SelectItem value="Ghosted">Ghosted</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                            <SelectItem value="Accepted">Accepted</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label className="mb-1" htmlFor="location" >Location: </Label>
                    <Input id="location" type="text" value={location} onChange={(e)=>setLocation(e.target.value)} />
                </div>
                <div>
                    <Label className="mb-1" htmlFor="jobLink" >Job Link: </Label>
                    <Input id="jobLink" type="text" value={jobLink} onChange={(e)=>setJobLink(e.target.value)} />
                </div>
                <div>
                    <Label className="mb-1" htmlFor="salary" >Salary: $</Label>
                    <Input id="salary" type="number" value={salary} onChange={(e)=>setSalary(e.target.value)} />
                </div>
                <div>
                    <Label className="mb-1" htmlFor="description" >Job Description: </Label>
                    <Textarea id="description" value={description} onChange={(e)=>setDescription(e.target.value)} />
                </div>
                <div>
                    <Label className="mb-1" htmlFor="notes" >Notes: </Label>
                    <Textarea id="notes" value={notes} onChange={(e)=>setNotes(e.target.value)} />
                </div>
                <div>
                    <Button className="justify-center" disabled={isLoading}>{isLoading?"Confirming Changes...":"Confirm Changes"}</Button>
                </div>
            </form>
        
        </div>
    )
}