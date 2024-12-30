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
    data: Record<string, string | number|null>
}
import { useSessionStore } from "@/zustand/providers/sessionStateProvider";
import { toast } from "@/hooks/use-toast";
import { ConfirmAdopt } from "@/lib/conn/dogs/adoptDog";

export default function AdoptConfirm({data}:props) {
    const [open, setOpen] = useState<boolean>(false)
    const {session} = useSessionStore(store =>store)
    const handleApproveRequest = async() => {
        if(session){
            const res = await ConfirmAdopt(session.access, Number(data.id)).then(res=>res)
            if(res.status == 200){ 
                toast({
                    title: `${data.name} ha sido adoptado/a! 🐶❤️`,
                    description: "Felicidades, le hemos dado una nueva vida a nuestro/a amiguito/a. Por favor, actualice los datos"
                })
                setOpen(false)
            }
        }
    }
  return (
    <>
      <Button className="bg-rose-500 hover:bg-rose-700" onClick={() => setOpen(true)}>
        Confirmar
      </Button>
      <Dialog open={open} onOpenChange={(b) => setOpen(b)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Desea confirmar la adopción de {data.name} ?</DialogTitle>
            <DialogDescription>
              Si está seguro/a de los antecedentes presentados por el dueño, puede presionar el botón de adoptar y confirmar la adopción.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className="bg-rose-500 hover:bg-rose-700" onClick={() => handleApproveRequest()}>Adoptar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
