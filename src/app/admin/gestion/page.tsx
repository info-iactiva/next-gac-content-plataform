"use client";
import React, { useEffect, useState } from "react";
import {  toast } from 'sonner'
import { SpinnerOverlay } from "@/components/Spinner";

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [usuariosOriginales, setUsuariosOriginales] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUsuariosYPlanes = async () => {
      try {
        setLoading(true);
        const [usuariosRes, planesRes] = await Promise.all([
          fetch("/api/user"),
          fetch("/api/planes"),
        ]);

        const usuariosData = await usuariosRes.json();
        const planesData = await planesRes.json();

        setUsuarios(usuariosData.usuarios);
        setUsuariosOriginales(JSON.parse(JSON.stringify(usuariosData.usuarios))); // copia profunda
        setPlanes(planesData.planes);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuariosYPlanes();
  }, []);

  const handleChangeActivo = (index: number, newValue: boolean) => {
    const updated = [...usuarios];
    updated[index].is_active = newValue;
    setUsuarios(updated);
  };

  const handleChangePlan = (index: number, newPlanId: string) => {
    const updated = [...usuarios];
    if (!updated[index].plan_data) {
      updated[index].plan_data = {};
    }
    updated[index].plan_data.id_plan = newPlanId;
    setUsuarios(updated);
  };

  const getUsuariosModificados = () => {
    return usuarios.filter((usuarioActual, index) => {
      const usuarioOriginal = usuariosOriginales[index];

      const cambioActivo = usuarioActual.is_active !== usuarioOriginal.is_active;
      const cambioPlan =
        (usuarioActual.plan_data?.id_plan?._id || usuarioActual.plan_data?.id_plan || "") !==
        (usuarioOriginal.plan_data?.id_plan?._id || usuarioOriginal.plan_data?.id_plan || "");

      return cambioActivo || cambioPlan;
    });
  };

  return (

    <>
       {loading && (<SpinnerOverlay />)}

       {
        !loading && ( 
          

          <div className="p-4 mx-auto w-full lg:w-4/5">
                     <h1 className="text-3xl font-bold mb-4">Gestión de Usuarios</h1>

  {/* Tabla para pantallas md+ */}
  <div className="hidden md:block overflow-x-auto">
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200 text-left">
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Rol</th>
          <th className="p-2 border">Activo</th>
          <th className="p-2 border">Plan</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario, index) => (
          <tr key={usuario._id} className="border-t">
            <td className="p-2 border">{usuario.email}</td>
            <td className="p-2 border">{usuario.rol?.name || "Sin rol"}</td>
            <td className="p-2 border">
              <select
                value={usuario.is_active ? "true" : "false"}
                onChange={(e) => handleChangeActivo(index, e.target.value === "true")}
                className="border rounded px-2 py-1"
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </td>
            <td className="p-2 border">
              <select
                value={usuario.plan_data?.id_plan?._id || usuario.plan_data?.id_plan || ""}
                onChange={(e) => handleChangePlan(index, e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="" disabled={!!usuario.plan_data?.id_plan}>
                  Sin plan
                </option>
                {planes.map((plan) => (
                  <option key={plan._id} value={plan._id}>
                    {plan.nombre}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Cards para pantallas pequeñas */}
  <div className="md:hidden space-y-4">
    {usuarios.map((usuario, index) => (
      <div
        key={usuario._id}
        className="border rounded p-4 shadow bg-white"
      >
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Rol:</strong> {usuario.rol?.name || "Sin rol"}</p>
        <div className="mt-2">
          <label className="block font-semibold">Activo:</label>
          <select
            value={usuario.is_active ? "true" : "false"}
            onChange={(e) => handleChangeActivo(index, e.target.value === "true")}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>
        <div className="mt-2">
          <label className="block font-semibold">Plan:</label>
          <select
            value={usuario.plan_data?.id_plan?._id || usuario.plan_data?.id_plan || ""}
            onChange={(e) => handleChangePlan(index, e.target.value)}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="" disabled={!!usuario.plan_data?.id_plan}>
              Sin plan
            </option>
            {planes.map((plan) => (
              <option key={plan._id} value={plan._id}>
                {plan.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
    ))}
  </div>

  <button
    className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
    onClick={async () => {
      const modificados = getUsuariosModificados();

      if (modificados.length > 0) {
        try {
          for (const usuario of modificados) {
            const res = await fetch("/api/user", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: usuario._id,
                is_active: usuario.is_active,
                id_plan: usuario.plan_data?.id_plan?._id || usuario.plan_data?.id_plan || null,
              }),
            });

            if (!res.ok) {
              const error = await res.json();
              throw new Error(error?.error || "Error al actualizar el usuario");
            }
          }
          toast.success("Usuarios actualizados");
        } catch (error: any) {
          toast.error("Error al guardar cambios: " + error.message);
        }
      }
    }}
  >
    Guardar cambios
  </button>
</div>




    //       <div className="p-4">
    //   <h1 className="text-3xl font-bold mb-4">Gestión de Usuarios</h1>
    //   <div className="overflow-x-auto">
    //     <table className="min-w-full border border-gray-300">
    //       <thead>
    //         <tr className="bg-gray-200 text-left">
    //           <th className="p-2 border">Email</th>
    //           <th className="p-2 border">Rol</th>
    //           <th className="p-2 border">Activo</th>
    //           <th className="p-2 border">Plan</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {usuarios.map((usuario, index) => (
    //           <tr key={usuario._id} className="border-t">
    //             <td className="p-2 border">{usuario.email}</td>
    //             <td className="p-2 border">{usuario.rol?.name || "Sin rol"}</td>

    //             <td className="p-2 border">
    //               <select
    //                 value={usuario.is_active ? "true" : "false"}
    //                 onChange={(e) => handleChangeActivo(index, e.target.value === "true")}
    //                 className="border rounded px-2 py-1"
    //               >
    //                 <option value="true">Activo</option>
    //                 <option value="false">Inactivo</option>
    //               </select>
    //             </td>

    //             <td className="p-2 border">
    //               <select
    //                 value={usuario.plan_data?.id_plan?._id || usuario.plan_data?.id_plan || ""}
    //                 onChange={(e) => handleChangePlan(index, e.target.value)}
    //                 className="border rounded px-2 py-1"
    //               >
    //               {/* Opción "Sin plan", solo seleccionable si actualmente no tiene uno */}
    //             <option value="" disabled={!!usuario.plan_data?.id_plan}>
    //               Sin plan
    //             </option>
    //             {planes.map((plan) => (
    //               <option key={plan._id} value={plan._id}>
    //                 {plan.nombre}
    //               </option>
    //         ))}

    //               </select>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>

    //     <button
    //       className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
    //       onClick={async () => {
    //         const modificados = getUsuariosModificados();

    //         if (modificados.length > 0) {
                            
    //             try{                
    //               for (const usuario of modificados) {

    //                 const res = await fetch("/api/user", {
    //                   method: "PATCH",
    //                   headers: { "Content-Type": "application/json" },
    //                   body: JSON.stringify({
    //                     id: usuario._id,
    //                     is_active: usuario.is_active,
    //                     id_plan: usuario.plan_data?.id_plan?._id || usuario.plan_data?.id_plan || null,
    //                   }),                                    

    //                 });

    //                 if (!res.ok) {
    //                       const error = await res.json();                    
    //                       throw new Error(error?.error || "Error al actualizar el usuario");
    //                 }
    //               }
    //                 toast.success("Usuarios actualizados");

    //             }catch (error: any) {
    //                 toast.error("Error al guardar cambios: " + error.message); 
    //             }
    //         }          

    //       }}
    //     >
    //       Guardar cambios
    //     </button>

    // </div>

    
        )
       }
    </>
    
  );
}
