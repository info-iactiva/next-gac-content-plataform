'use client';
import { UserProtected } from "@/types/user.protected";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PagoUnico from "@/components/paypal/paypalbuttononce";

const planesPreciosByNombre = {
    'Básico': 99,
    'Pro': 349,
    'Pro Con Descuento': 349
}



export default function ComprartokensPage() {
    const router = useRouter();
    const [user, setUser] = useState<UserProtected | null>(null);    
 
    useEffect(() => {      
      const storedUser = localStorage.getItem("user");
          
      if (storedUser) {        
        const parsedUser: UserProtected = JSON.parse(storedUser);
        setUser(parsedUser);
      } else {
        router.push("/login");
      }      
    }, []);


  return (
    
    <div className=" w-[80%] m-auto mt-10 lg:w-[50%] shadow-lg p-5 rounded-lg bg-white">

        <div className="lg:text-center">
            <h1 className="text-2xl font-bold  lg:text-4xl">Comprar Tokens</h1>
            <p className="text-lg  lg:text-2xl">Tokens restantes: {user?.tokens_restantes}</p>
            <p className="text-lg  lg:text-2xl">Plan actual: {user?.plan}</p>
            <p className="text-lg  lg:text-2xl">Precio para restablecer tokens: ${planesPreciosByNombre[user?.plan]}</p>        
        </div>
        
        <div className="mt-10 w-[70%] m-auto lg:w-[40%]">
            <PagoUnico  amount={planesPreciosByNombre[user?.plan]}  planId={''} userId={user?.id} resettokens={true} />
        </div>

      
    </div>
  );
}