"use client";
import Divider from "@/components/global/divider/divider";
import { useSessionStore } from "@/zustand/providers/sessionStateProvider";
import { GetAdoptRequest, getDogByName } from "@/lib/conn/dogs/adoptDog";
import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdoptRequestTable from "@/components/dogs/tables/tableAdoptRequest";
import { Input } from "@/components/ui/input";
export default function Adoption() {
  const { session } = useSessionStore((store) => store);
  const [adoptRequest, setAdoptRequest] = useState<
    Record<string, string | number>[] | null
  >(null);

  useEffect(() => {
    if (session) {
      GetAdoptRequest(session.access).then((res) => {
        console.log(res);
        setAdoptRequest(res);
      });
    }
  }, [session]);
  const handleRefresh = async () => {
    if (session) {
      await GetAdoptRequest(session.access).then((res) => {
        console.log(res);
        setAdoptRequest(res);
      });
    }
  };

  const handleSearch = async(text:string) => {
    if(session){
      getDogByName(session.access, text).then((res) => {
        setAdoptRequest(res)
      })
    }
  }

  return (
    <div className="bg-white shadow-lg w-full ">
      <h1 className="text-center text-lg py-3">Solicitudes de voluntarios</h1>
      <Divider />
      <div className="w-full flex justify-end items-center pr-5 pt-5">
        <Button onClick={() => handleRefresh()}>
          <RotateCcw className="w-5 h-5" /> Actualizar info
        </Button>
      </div>
      <div className="w-96 p-3 ">
        <Input
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Buscar perritos por nombre"
        ></Input>
      </div>
      {adoptRequest && <AdoptRequestTable data={adoptRequest} />}
    </div>
  );
}
