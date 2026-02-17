import { rectSortingStrategy, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import ApplicationCard from "./ApplicationCard"
import { CSS } from "@dnd-kit/utilities";
import { arrayMove, itemsEqual } from "@dnd-kit/sortable/dist/utilities";

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
    item:string;
    appArr:Application[];
    appId:number[]


}

export default function Columns({item, appArr, appId}:Props){
   
    const {attributes, listeners, transition, transform, setNodeRef} = useSortable({id:item, data:{type:Columns}})
    const styles = {
        transition: transition || undefined,
        transform: CSS.Transform.toString(transform)
    }

   

    return(
        <div ref={setNodeRef} style={styles} className="flex flex-col gap-3 p-4 rounded-2xl shadow-2xl min-h-[350px] min-w-[350px]">
            <div  {...attributes} {...listeners}  className="p-4 bg-red-300">
                 <h1 className="font-semibold">{item}</h1>
            </div>
            
            <SortableContext items={appId} strategy={verticalListSortingStrategy}>
                <div className="min-h-[350px] min-w-[300px]">
                {appArr.map((apps:Application) =>{
                    return(
                            <ApplicationCard key={apps.id} info={apps}/> 
                    )
                })}
                </div>
             </SortableContext>
        </div>
    )
}