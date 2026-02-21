"use client"

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { closestCorners, DndContext, DragEndEvent, DragOverEvent, pointerWithin } from "@dnd-kit/core";
import { arrayMove, horizontalListSortingStrategy, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Columns from "./Columns";
import { useEffect, useState } from "react";
import ApplicationForm  from "./ApplicationForm"
import ApplicationEditor from "./ApplicationEditor"
import { Button } from "./ui/button";


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
    const [isOpen, setIsOpen] = useState(false)
    const [editApp, setEditApp] = useState<Application | null>(null)
    const [isNewFormOpen, setIsNewFormOpen] = useState(false)
    const [isColumnsLoading, setIsColumnsLoading] = useState(true)
    

    useEffect(()=>{
        if ( status === "loading") return

        async function getJobOrder(){
        try{
            const res = await fetch(`/api/columns/${session?.user?.id}`)

            const data = await res.json()

            setColumnStatus(data.jobOrder)
        }
        catch(e){
            console.log(e)
            return 
        }
        finally{
            setIsColumnsLoading(false)
        }
    }
        getJobOrder()
    },[session?.user?.id, status])


  if (isColumnsLoading || status === "loading"){
    return(
        <div className="flex justify-center items-center h-screen">
            Loading...
        </div>
    )
  }

  if(!session || ! session.user){
        return redirect("/login")
    }

    
    



    
    async function handleDragEnd(event:DragEndEvent){
       
        const {active, over} = event;

        console.log(`${over?.id} and ${active?.id}`)

        
        if(!over) return

        //this is if we move the column over
        const overColumn = columnStatus.includes(over.id as Status)
        const activeId = !columnStatus.includes(active.id as Status)


        //Column over Column
        if(overColumn && !activeId){
            const activePos = columnStatus.findIndex((i:Status) => i == active.id)
            const overPos = columnStatus.findIndex((i:Status) => i == over.id)
            const newArray = arrayMove(columnStatus, activePos, overPos)
            setColumnStatus(newArray)
            console.log(newArray)
            const res = await fetch(`/api/columns/${session?.user?.id}`,{
                method:"PATCH",
                headers:{"Content-Type":"applications/json"},
                body:JSON.stringify({jobOrder:newArray})
            })
        }

        //card over card
         if(!overColumn && activeId){
            // console.log(`${over?.id} and ${active?.id}`)
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
        console.log(`${over?.id} and ${active?.id}`)
        console.log("hi", findApp)
        if(findApp){
            console.log("CARD UPDATE")
            const res = await fetch(`/api/applications/${active.id}/move`,{
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({jobStatus:findApp?.jobStatus})
            })
        }
        
        
    }

    async function handleDragOver(event:DragOverEvent){
        const {active, over} = event;

        if (!over || active.id === over.id){
            return;
        } 

        const activeId = !columnStatus.includes(active.id as Status)
        const overColumn = columnStatus.includes(over.id as Status)

        //Card over Column
        if(overColumn && activeId){
            // console.log(`${over?.id} and ${active?.id}`)
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

    function editForm(app:Application){
        setEditApp(app);
        setIsOpen(true);
        console.log(app)
    }
    

    return(
        //Application Form
        <div className="mt-3">
            <div className={`fixed top-0 right-0 h-full w-[400px] transition-transform ease-in-out bg-white z-50 overflow-y-auto ${isOpen?'translate-x-0':'translate-x-full'}`}>
                <ApplicationEditor setIsOpen={setIsOpen} info={editApp} setApp={setApp} app={app}/>
            </div>
            <div className={`fixed top-0 right-0 h-full w-[400px] bg-white overflow-y-auto transition-transform ease-in-out ${isNewFormOpen?"translate-x-0":"translate-x-full"}`}>
                <ApplicationForm setIsNewFormOpen={setIsNewFormOpen} setApp={setApp}/>
            </div>
            <div className="p-4 flex w-full  justify-between">
                <h1 className="font-bold text-3xl">Application Tracker</h1>
                <Button className="" onClick={()=>{setIsNewFormOpen(true)}}>Add New Application</Button>
            </div>
            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
            <div className="flex gap-4 overflow-x-auto items-start">
                <SortableContext items={columnStatus} strategy={horizontalListSortingStrategy}>
                {columnStatus.map((item, index) =>{
                    const appArr = app.filter(((apps:Application) => (apps.jobStatus == item)))
                    const appId = appArr.map((items)=>items.id)
                    return(
                        <Columns key={item} item={item} appArr={appArr} appId={appId} editForm={editForm} setApp={setApp}/>    
                    )
                        
                })}
                </SortableContext>
            </div>
            </DndContext>
        </div>
    )
}