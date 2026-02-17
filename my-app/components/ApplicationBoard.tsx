"use client"

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { closestCorners, DndContext, DragEndEvent, DragOverEvent, pointerWithin } from "@dnd-kit/core";
import { arrayMove, horizontalListSortingStrategy, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Columns from "./Columns";
import { useState } from "react";


type Status = "Pending" | "Interviewing" | "Offer" | "Ghosted" | "Rejected" | "Accepted"

interface ApplicationProps{
    data:Application[]
}

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

export default function ApplicationBoard({data}:ApplicationProps){
    const statuses:Status[] = ["Pending", "Interviewing", "Offer", "Ghosted", "Rejected", "Accepted"]
    const {data:session, status} = useSession();
    const [app, setApp] = useState<Application[]>(data);
    const [columnStatus, setColumnStatus] = useState(statuses);


    if(!session || ! session.user){
        return redirect("/login")
    }

    
    async function handleDragEnd(event:DragEndEvent){
        const {active, over} = event;
        

        if(!over || active.id === over.id) return

        //this is if we move the column over
        const overColumn = columnStatus.includes(over.id as Status)
        const activeId = !columnStatus.includes(active.id as Status)


        //Column over Column
        if(overColumn && !activeId){
            setColumnStatus((prev:Status[]) =>{
                const activePos = prev.findIndex((i:Status) => i == active.id)
                const overPos = prev.findIndex((i:Status) => i == over.id)
                return arrayMove(prev, activePos, overPos)
            })
        }

         if(!overColumn && activeId){
            setApp((prev:Application[]) =>{
                const activePos = prev.findIndex((i:Application) => i.id == active.id)
                const overPos = prev.findIndex((i:Application)=> i.id == over.id)
                if (activePos === -1 || overPos === -1) return prev;

                if(prev[activePos].jobStatus !== prev[overPos].jobStatus){
                    const copyApp = [...prev]
                    copyApp[activePos] = {...copyApp[activePos], jobStatus:copyApp[overPos].jobStatus}
                    return arrayMove(copyApp, activePos, overPos)
                }
                return arrayMove(prev, activePos, overPos)
            })
        }

        //Api to change card status
        const findApp = app.find(i => i.id == active.id)
        if(activeId){
            const res = await fetch(`/api/applications/${active.id}`,{
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({jobStatus:findApp?.jobStatus})
            })
        }
        
        
    }

    async function handleDragOver(event:DragOverEvent){
        const {active, over} = event;

        if (!over || active.id === over.id) return;

        const activeId = !columnStatus.includes(active.id as Status)
        const overColumn = columnStatus.includes(over.id as Status)

        //Card over Column
        if(overColumn && activeId){
            setApp((prev:Application[])=>{
                const activePos = prev.findIndex((i:Application) => i.id == active.id)
                //for columns
                    const newApp = [...prev]
                    newApp[activePos] = {...newApp[activePos], jobStatus:over.id as Status}
                    return newApp
            })
            
        }


        //Card over Card
        if(!overColumn && activeId){
            setApp((prev:Application[]) =>{
                const activePos = prev.findIndex((i:Application) => i.id == active.id)
                const overPos = prev.findIndex((i:Application)=> i.id == over.id)
                if (activePos === -1 || overPos === -1) return prev;

                if(prev[activePos].jobStatus !== prev[overPos].jobStatus){
                    const copyApp = [...prev]
                    copyApp[activePos] = {...copyApp[activePos], jobStatus:copyApp[overPos].jobStatus}
                    return arrayMove(copyApp, activePos, overPos)
                }
                return prev
            })
        }

    }
    

    return(
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
        <div className="flex gap-4 overflow-x-auto items-start">
            <SortableContext items={columnStatus} strategy={horizontalListSortingStrategy}>
            {columnStatus.map((item, index) =>{
                const appArr = app.filter(((apps:Application) => (apps.jobStatus == item)))
                const appId = appArr.map((items)=>items.id)
                return(
                    <Columns key={item} item={item} appArr={appArr} appId={appId}/>    
                )
                    
            })}
            </SortableContext>
        </div>
        </DndContext>
    )
}