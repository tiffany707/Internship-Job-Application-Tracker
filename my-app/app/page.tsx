import Homepage from "@/components/HomePage";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return ( 
    <div className="flex justify-center items-center min-h-screen w-full">
      <Navbar />
      <div>
        <Homepage/>
      </div>
    </div>
  );
}
