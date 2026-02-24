import { Skeleton } from "./ui/skeleton";

export default function SkeletonHomepage(){
    return(
        <>
            <div className={`border-r-2 p-2 flex fixed top-0 left-0 h-full w-[200px] bg-white z-50 transition-transform -translate-x-[165px]`}></div>
            <div className="flex flex-col p-20 rounded-2xl gap-5">
                <div className="z-30">
                    <Skeleton className="font-bold h-30 w-100"/>
                </div>
            </div>
        </>
    )
}