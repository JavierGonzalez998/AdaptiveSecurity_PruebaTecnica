"use client";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { getDogs } from "@/lib/conn/dogs/getDogs";
import { VerifyIsAdopted } from "@/lib/conn/dogs/adoptDog";
import { useSessionStore } from "@/zustand/providers/sessionStateProvider";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AdoptModal from "../modals/adoptModal";
import { Dog } from "@/components/global/cards/dogCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function TableAllDogs() {
  const { session } = useSessionStore((store) => store);
  const [dogList, setDogList] = useState<Dog[]>();
  const [status, setStatus] = useState<Record<string, string | null>>({
    next: null,
    prev: null,
  });
  const [page, setPage] = useState<number>(1);
  const [isAdopted, setIsAdopted] = useState<boolean>(true);

  useEffect(() => {
    getDogs(page.toString()).then((res) => {
      setDogList(res.results);
      setStatus({ next: res.next, prev: res.previous });
    });
  }, [page]);

  useEffect(() => {
    if (session) {
      VerifyIsAdopted(session.access).then((res) =>
        setIsAdopted(res.is_adopted)
      );
    }
  }, [session]);



  return (
    <>
      <Table className="my-5">
        <TableCaption>Listado de nuestros perritos en el refugio</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nombre</TableHead>
            <TableHead>Sexo</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Adoptado por</TableHead>
            <TableHead>¿Adoptar?</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dogList &&
            dogList.map((dog) => {
              return (
                <TooltipProvider key={dog.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TableRow>
                        <TableCell className="font-medium">
                          {dog.name}
                        </TableCell>
                        <TableCell>
                          {dog.sex === "M" ? "Macho" : "Hembra"}
                        </TableCell>
                        <TableCell>{dog.statusName}</TableCell>
                        <TableCell>{dog.owner}</TableCell>
                        <TableCell>
                          {dog.statusName === "Disponible" ? (
                            <AdoptModal dog={dog} disabled={isAdopted} />
                          ) : null}
                        </TableCell>
                      </TableRow>
                    </TooltipTrigger>
                    <TooltipContent>
                      <Image
                        src={dog.img}
                        alt="dog image"
                        width={200}
                        height={200}
                      ></Image>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
        </TableBody>
      </Table>
      <section className="w-full flex justify-around items-center">
        <Button
          disabled={status.prev ? false : true}
          onClick={() => setPage((current) => current - 1)}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          disabled={status.next ? false : true}
          onClick={() => setPage((current) => current + 1)}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </section>
    </>
  );
}
