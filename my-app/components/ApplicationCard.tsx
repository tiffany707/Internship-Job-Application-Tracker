"use client"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react"


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
    info:Application;
    editForm:(App:Application)=>void;
    setApp:(arg0:(prev:Application[])=>Application[]) => void
}



export default function ApplicationCard({info, editForm, setApp}: Props){
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id:info.id})
    const style = {
        transition,
        transform:CSS.Transform.toString(transform)
    }
    
    async function deleteCard(){
    try{
        const res = await fetch(`/api/applications/${info.id}/delete`,{
            method:"DELETE",
        })
        if(!res.ok){
            const error = await res.json()
            throw new Error(error.message || "There was an error when attempting to delete the application")
        }

        setApp((prev:Application[])=>{
            const copyArr = [...prev]
            return copyArr.filter((i)=> !(i.id == info.id))
        })
    }
    catch(e){
        console.log(e)
    }
}
    return(
        <div>
            
            <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="flex justify-between items-center p-4 m-1 bg-blue-300 rounded-2xl">
                <div>
                    <h1 className="text-md font-semibold">{info.company}</h1>
                    <h2>{info.role}</h2>
                </div>
                
                <div className="">
                    <Button className="mr-2" onPointerDown={(e)=>{e.stopPropagation()}} onClick={()=>{deleteCard()}}><Trash2/></Button>
                    <Button onPointerDown={(e)=>{e.stopPropagation();} } onClick={(e)=>{editForm(info)}}><Pencil/></Button>
                </div>
            </div>
        </div>
    )
}