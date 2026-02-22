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
import { Skeleton } from "./ui/skeleton";


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

export default function ApplicationBoard(){
    
  

    const arr = [1,2,3,4,5]
       
    

    return(
        <>
            <div>
                <div className={`border-r-2 p-2 flex fixed top-0 left-0 h-full w-[200px] bg-white z-50 transition-transform -translate-x-[165px]`}>
                </div>
            </div>
            <div className="mt-3">
                <div className="p-4 flex w-full  justify-between">
                    <Skeleton className="font-bold text-3xl w-80 h-10"/>
                </div>
                <div className="flex gap-4 overflow-x-auto items-start">
                    {arr.map((item, index) =>{
                        
                        return(
                            <div key={index} className="flex flex-col gap-3 p-4 rounded-2xl shadow-2xl min-h-[450px] min-w-[350px]">
                                        <div className="flex justify-between rounded-2xl shadow-md p-3">
                                            <Skeleton className="flex justify-start text-lg font-semibold text-center w-40 h-7"/>
                                            <Skeleton className="w-9 h-9 rounded-full"/>
                                        </div>  
                                        <div>
                                            <Skeleton className="hover:cursor-grab active:cursor-grabbing flex justify-between items-center h-24 p-4 my-2 border-2 border-grey-500 rounded-2xl"/>
                                            <Skeleton className="hover:cursor-grab active:cursor-grabbing flex justify-between items-center h-24 p-4 my-2 border-2 border-grey-500 rounded-2xl"/>
                                        </div>              
                            </div>
                        )
                            
                    })}
                    
                </div>
           
            </div>
        </>
    )
}