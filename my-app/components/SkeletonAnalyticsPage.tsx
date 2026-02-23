import SkeletonAnalyticsCard from "./SkeletonAnalyticCard";
import { Skeleton } from "./ui/skeleton";

export default function SkeletonAnalyticsPage(){
    return(
         <div className="flex flex-col">
            <div className="p-10">
                <div className="flex flex-col md:flex-row gap-8">
                    <SkeletonAnalyticsCard/>
                    <SkeletonAnalyticsCard/>
                    <SkeletonAnalyticsCard/>
                </div>
                <div className="flex flex-col md:flex-row mt-5 gap-8"> 
                    <SkeletonAnalyticsCard/>
                    <SkeletonAnalyticsCard/>
                    <SkeletonAnalyticsCard/>
                </div>
            </div>
            <div className="flex flex-col gap-10 p-2 md:p-10 md:ml-10 border-2 border-gray-300 rounded-2xl h-[300px] md:h-[500px] w-full md:w-1/2 overflow-hidden">
                <Skeleton className="w-30 h-10"/>
                <Skeleton className="w-100 h-200"/>
            </div>
        </div>
    )
}