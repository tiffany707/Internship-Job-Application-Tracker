"use client"

import { SlidersHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from "./ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Props{
    filterCategory:string
    setFilterCategory:(arg0:string)=>void
    filterValue:string
    setFilterValue:(arg0:string)=>void

    
}



export default function ApplicationFilterMenu({filterCategory, setFilterCategory, filterValue, setFilterValue}: Props){
    const [applicationDateValue, setApplicationDateValue] = useState("")
    const [roleValue, setRoleValue] = useState("")
    const [categoryValue, setCategoryValue] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    function determineValue(){
        switch(categoryValue){
            case "none":
                setFilterValue("")
                break

            case "role":
                setFilterValue(roleValue)
                break

            case "applicationDate":
                setFilterValue(applicationDateValue)
                break

        }
        setFilterCategory(categoryValue)
        setIsOpen(false)
    }

    return(
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger>
                <SlidersHorizontal className={`w-6 h-6 md:w-7 md:h-7 ${filterCategory == "none" || filterCategory  == null? "hover:text-gray-300": "hover:text-gray-600 text-gray-400" }  hover:cursor-pointer`} />
            </PopoverTrigger>
            <PopoverContent>
                <PopoverTitle>Filter:</PopoverTitle>
                    <div className="flex flex-col gap-2">
                        <span className="flex gap-2 items-center">
                            Category: 
                            <Select value={categoryValue} onValueChange={(value)=>{setCategoryValue(value)}}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a Category"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="none">None</SelectItem>
                                        <SelectItem value="role">Role</SelectItem>
                                        <SelectItem value="applicationDate">Application Date</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </span>
                            {categoryValue == "applicationDate"?<span className="flex gap-2 items-center">
                                Date: 
                                <Input type="date" onChange={(e)=>{setApplicationDateValue(e.target.value)}}/>
                            </span>:
                            categoryValue == "role"?<span className="flex gap-2 items-center">
                                Role: 
                                <Input type="text" value={roleValue || ""} onChange={(e)=>{setRoleValue(e.target.value)}}/>
                            </span>:""}
                        <div>
                            <Button className="cursor-pointer mt-3" onClick={()=>determineValue()}>Done</Button>
                        </div>
                    </div>
            </PopoverContent>
        </Popover>
    )
}