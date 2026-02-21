import Homepage from "@/components/HomePage";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return ( 
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen w-full">
        <Homepage/>
      </div>
    </div>
  );
}
