"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react"
import Link from "next/link";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function ApplicationForm(){
  
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [applicationDate, setApplicationDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Pending");
    const [notes, setNotes] = useState("");
    const [jobLink, setJobLink] = useState("");
    const [salary, setSalary] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function preventSubmit(e:React.FormEvent){
        e.preventDefault();

        const res = await fetch("api/applications",{
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({})
        })
    }
    return(
        <div>
            <form onSubmit={preventSubmit} className="p-20 gap-2 flex flex-col rounded-2xl shadow-2xl">
                <p className="text-center font-bold mb-2 text-2xl">Job Application</p>
                <Label htmlFor="company">Company (required): </Label>
                <Input required id="company" type="text" value={company} onChange={(e)=>setCompany(e.target.value)} />
                <Label htmlFor="role" >Role (required): </Label>
                <Input required id="role" type="text" value={role} onChange={(e)=>setRole(e.target.value)} />
                <Label htmlFor="dueDate" >Due Date: </Label>
                <Input id="dueDate" type="date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} />
                <Label htmlFor="applicationDate" >Application Date: </Label>
                <Input id="applicationDate" type="date" value={applicationDate} onChange={(e)=>setApplicationDate(e.target.value)} />
                <Label htmlFor="jobStatus" >Job Status: </Label>
                <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger id="jobStatus" className="w-[180px]">
                        <SelectValue placeholder="pending" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="interviewing">Interviewing</SelectItem>
                        <SelectItem value="offer">Offer</SelectItem>
                        <SelectItem value="ghosted">Ghosted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                    </SelectContent>
                </Select>

                <Label htmlFor="location" >Location: </Label>
                <Input id="location" type="text" value={location} onChange={(e)=>setLocation(e.target.value)} />
                <Label htmlFor="description" >Job Description: </Label>
                <Input id="description" type="text" value={description} onChange={(e)=>setDescription(e.target.value)} />
                <Label htmlFor="notes" >Notes: </Label>
                <Input id="notes" type="text" value={notes} onChange={(e)=>setNotes(e.target.value)} />
                <Label htmlFor="jobLink" >Job Link: </Label>
                <Input id="jobLink" type="text" value={jobLink} onChange={(e)=>setJobLink(e.target.value)} />
                <Label htmlFor="salary" >Salary: $</Label>
                <Input id="salary" type="number" value={salary} onChange={(e)=>setSalary(e.target.value)} />

                <Button disabled={isLoading}>{isLoading?"Adding Application...":"Add Application"}</Button>
            </form>
        
        </div>
    )
}