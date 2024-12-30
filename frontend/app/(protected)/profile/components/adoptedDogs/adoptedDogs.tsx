"use client";
import { useEffect, useState } from "react";
import Divider from "@/components/global/divider/divider";
import { useSessionStore } from "@/zustand/providers/sessionStateProvider";
import { getDogByUser } from "@/lib/conn/dogs/getDogs";
import { Dog } from "@/components/global/cards/dogCard";
export default function AdoptedDogs() {
  const { session } = useSessionStore((store) => store);
  const [dogs, setDogs] = useState<Dog[] | null>(null);
  useEffect(() => {
    if (session) {
      getDogByUser(session.access).then((res) => {
        console.log(res);
        setDogs(res);
      });
    }
  }, [session]);
  return (
    <div>
      <h1 className="text-center font-semibold text-xl my-5">
        Mis perros adoptados
      </h1>
      <Divider />
      <div className="my-3 w-full max-h-96 overflow-scroll">
        {dogs &&
          dogs.map((dog) => {
            return (
              <div
                key={dog.id}
                className="my-5 grid grid-cols-1 lg:grid-cols-3"
              >
                <p>Nombre: {dog.name}</p>
                <p>Sexo: {dog.sex === "M" ? "Macho": "Hembra" }</p>
                <p>Estado: {dog.status === 2 ? "En Proceso de Adopcion": "Adoptado"}</p>
                <p>Fecha de {dog.status === 2 ? "solicitud": "adopción"}: {new Date(dog.updated_at).toLocaleString('es-CL', {day:"numeric", month:"long"})}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
