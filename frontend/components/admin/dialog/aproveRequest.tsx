'use client'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
interface props{
    data: {
        id: number;
        name: string;
        status: string;
        user_id:number
    }
}
import { useSessionStore } from "@/zustand/providers/sessionStateProvider";
import { ApproveVolunteerRequest } from "@/lib/conn/admin/dashboard";
import { toast } from "@/hooks/use-toast";

export default function AproveRequest({data}:props) {
    const [open, setOpen] = useState<boolean>(false)
    const {session} = useSessionStore(store =>store)
    const handleApproveRequest = async() => {
        if(session){
            const res = await ApproveVolunteerRequest(session.access, data.user_id).then(res=>res)
            if(res.status == 200){ 
                toast({
                    title: "Usuario Aprobado",
                    description: "Felicidades, Se agregó un nuevo voluntario a la familia. Por favor, reinicie las métricas para visualizar sus cambios"
                })
                setOpen(false)
            }
        }
    }
  return (
    <>
      <Button className="bg-rose-500 hover:bg-rose-700" onClick={() => setOpen(true)}>
        Aprobar Solicitud
      </Button>
      <Dialog open={open} onOpenChange={(b) => setOpen(b)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Desea aprobar como voluntario a {data.name} ?</DialogTitle>
            <DialogDescription>
              Una vez aprobada la solicitud, el usuario tendrá funciones como ver las métricas de adopción y aprobar solicitudes de adopción.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className="bg-rose-500 hover:bg-rose-700" onClick={() => handleApproveRequest()}>Aprobar Solicitud</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
