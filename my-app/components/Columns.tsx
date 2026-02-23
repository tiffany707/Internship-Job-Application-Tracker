import { rectSortingStrategy, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import ApplicationCard from "./ApplicationCard"
import { CSS } from "@dnd-kit/utilities";
import { arrayMove, itemsEqual } from "@dnd-kit/sortable/dist/utilities";
import { LiaBrailleSolid } from "react-icons/lia";
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
    item:Status;
    appArr:Application[];
    appId:number[]
    editForm:(app:Application)=>void;
    setApp:(arg1:(prev:Application[]) => Application[]) => void
    filterCompany:string
     filterCategory: string
     filterValue: string
}

export default function Columns({item, appArr, appId, editForm, setApp, filterCompany, filterCategory, filterValue}:Props){
   
    const {attributes, listeners, transition, transform, setNodeRef} = useSortable({id:item, data:{type:Columns}})
    const styles = {
        transition: transition || undefined,
        transform: CSS.Transform.toString(transform)
    }

    const colorDict = {
        Pending:"bg-gray-100",
        Interviewing:"bg-green-100",
        Offer:"bg-green-200",
        Ghosted:"bg-red-300",
        Rejected:"bg-[#f76f6f]",
        Accepted:"bg-[#6eeba0]",
    }

    function colorPicker(item:Status){
        return colorDict[item]
    }
   

    return(
        <div ref={setNodeRef} style={styles} className="flex flex-col gap-3 p-4 rounded-2xl shadow-2xl min-h-[350px] min-w-[350px]">
            <div className={`p-4 ${colorPicker(item)} flex justify-between rounded-2xl shadow-md`}>
                 <h1 className="flex items-center text-lg font-semibold text-center">{item}</h1>
                 <LiaBrailleSolid {...attributes} {...listeners} className="hover:cursor-grab active:cursor-grabbing text-4xl focus:outline-none focus:ring-0"/>
            </div>
            
            <SortableContext items={appId} strategy={verticalListSortingStrategy}>
                <div className="min-h-[350px] min-w-[300px]">
                {appArr.filter((i:Application)=>{
                    if((i.company.toLowerCase().includes(filterCompany.toLowerCase()) || filterCompany == "") && (filterCategory == "none" || filterCategory=="")){
                        return true
                    }
                    if(filterCategory == "applicationDate"){
                        if((i.company.toLowerCase().includes(filterCompany.toLowerCase()) || filterCompany == "") && new Date(i.applicationDate).toISOString().split('T')[0] === filterValue){
                            return true
                        }
                    }
                    if(filterCategory == "role"){
                        if((i.company.toLowerCase().includes(filterCompany.toLowerCase()) || filterCompany == "") && i.role.toLowerCase().includes(filterValue.toLowerCase())){
                            return true
                        }
                    }
                    return false 
                }).map((apps:Application) =>{
                    return(
                            <ApplicationCard key={apps.id} info={apps} editForm={editForm} setApp={setApp}/> 
                    )
                })}
                </div>
             </SortableContext>
        </div>
    )
}