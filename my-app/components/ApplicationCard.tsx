import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

export default function ApplicationCard({info}: { info:Application}){

    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id:info.id})
    const style = {
        transition,
        transform:CSS.Transform.toString(transform)
    }
    return(
        <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="p-4 m-1 bg-blue-300">
            hi
        </div>
    )
}