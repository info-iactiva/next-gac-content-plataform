import ContratacionPage from "./PlanClient";
import { Suspense } from "react";


export default function Page() {
  return (    
      <Suspense fallback={<div>Cargando...</div>}>
      <ContratacionPage />
    </Suspense>
  );
}