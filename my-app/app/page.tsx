import Homepage from "@/components/HomePage";
import Image from "next/image";

export default function Home() {
  return ( 
    <div className="flex justify-center items-center min-h-screen w-full">
      <div>
        <Homepage/>
      </div>
    </div>
  );
}
