import AnalyticsPage from "@/components/AnalyticsPage";
import Navbar from "@/components/Navbar";

export default function Analytics(){
    return(
        <div>
            <Navbar/>
            <div className="ml-[35px]">
                <AnalyticsPage/>
            </div>
        </div>
    )
}