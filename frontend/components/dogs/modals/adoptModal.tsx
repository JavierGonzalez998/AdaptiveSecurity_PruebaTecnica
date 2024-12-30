"use client";
import { useSessionStore } from "@/zustand/providers/sessionStateProvider";
import { Dog } from "@/components/global/cards/dogCard";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dog as DogIcon } from "lucide-react";
import { AdoptDog } from "@/lib/conn/dogs/adoptDog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface props {
  dog: Dog;
  disabled: boolean
}
export default function AdoptModal({ dog, disabled }: props) {
  const router = useRouter();
  const { session } = useSessionStore((store) => store);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    if (!session) {
      router.push("/auth/login");
      return;
    }
    setOpen(true);
  };
  const handleAdopt = async(id: number) => {
    if(session){
        const res = await AdoptDog(session.access, id).then(res => res)
        if(res.status == 200){
            toast({
                title: "Perrito adoptado",
                description: `${res.data.name} ahora está en proceso de adopción. Muchas gracias por ayudarnos a entregar un hogar a nuestros amiguitos 🐶`,
              })
        }else{
            toast({
                title: "Error al adoptar",
                description: "Ups, hubo un error al adoptar al perrito. Por favor, intente nuevamente.",
              })
        }
    }
  }
  return (
    <>
      <Button
        className="bg-green-400 hover:bg-green-800"
        onClick={() => handleOpenModal()}
        disabled={disabled}
      >
        <DogIcon className="h-3 w-3"></DogIcon>Adoptar
      </Button>
      <Dialog open={open} onOpenChange={(b) => setOpen(b)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deseas Adoptar a {dog.name}?</DialogTitle>
            <DialogDescription>
              Si está seguro de adoptar a {dog.name}, no podrá adoptar más perritos hasta que su solicitud sea aprobada por el administrador o los voluntarios.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => handleAdopt(dog.id)} className="bg-rose-500 hover:bg-rose-600">Adoptar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
