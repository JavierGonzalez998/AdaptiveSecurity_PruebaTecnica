"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

interface props {
  data: Record<string, string | number>[];
}

export default function IpAnalysisTable({ data }: props) {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Record<string, string | number>>();

  const handleOpen = (value: Record<string, string | number>) => {
    setOpen(true);
    setSelected(value);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>IP</TableHead>
            <TableHead>Pais</TableHead>
            <TableHead>Puntaje de Reputacion</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.length > 0 &&
            data.map((value, index) => {
              return (
                <TableRow key={index} onClick={() => handleOpen(value)}>
                  <TableCell>
                    {value.status === 3 ? "❗" : null}
                    {value.ip}
                  </TableCell>
                  <TableCell>{value.countryCode}</TableCell>
                  <TableCell>{value.repPoint}</TableCell>
                  <TableCell>{value.statusName}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      {selected && (
        <Dialog open={open} onOpenChange={(b: boolean) => setOpen(b)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selected.ip}</DialogTitle>
              <DialogContent>
                <ul>
                  <li>IP: {selected.ip}</li>
                  <li>País: {selected.countryCode}</li>
                  <li>
                    Puntos de confianza (más cercano a 0, más confiable):{" "}
                    {selected.repPoint}
                  </li>
                  <li>Estado: {selected.statusName}</li>
                </ul>
                <h3 className="my-3">Ubicación de la IP</h3>
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2647.066547373993!2d${selected.longitude}!3d${selected.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2scl!4v1735528377318!5m2!1ses!2scl`}
                  width="400"
                  height="300"
                  className="border-x-0 border-y-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </DialogContent>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
