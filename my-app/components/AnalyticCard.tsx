
interface Props{
    header:string
    data:string
}

export default function AnalyticsCard({header, data}: Props){
    return(
        <div className="flex flex-col h-54 w-60 md:w-80 p-7 border-2 border-gray-200 rounded-2xl">
            <h1 className="text-1xl font-bold pb-5">{header}:</h1>
            <p className="text-5xl font-bold">{data}</p>
        </div>
    )
}