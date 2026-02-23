import { Skeleton } from "./ui/skeleton";

export default function SkeletonAnalyticsCard(){
    return(
        <div className="flex flex-col justify-center h-54 w-60 md:w-80 p-10  gap-5 border-2 border-gray-200 rounded-2xl">
            <Skeleton className="w-40 h-10"/>
            <Skeleton className="w-20 h-20"/>
        </div>
    )
}