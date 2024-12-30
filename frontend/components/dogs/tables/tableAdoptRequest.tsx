import {
  Table,
  TableBody,
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
import Image from "next/image";
import AdoptConfirm from "../dialog/adoptConfirm";

interface props {
  data: Record<string, string | number | null>[];
}

export default function AdoptRequestTable({ data }: props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acción</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.length > 0 &&
          data.map((value) => {
            return (
              <TooltipProvider key={value.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TableRow>
                      <TableCell>{value.id}</TableCell>
                      <TableCell>{value.name}</TableCell>
                      <TableCell>{value.statusName}</TableCell>
                      <TableCell>{value.statusName === "Pendiente de confirmación" ? <AdoptConfirm data={value}/> : null}</TableCell>
                    </TableRow>
                  </TooltipTrigger>
                  <TooltipContent>
                    <Image src={String(value.img)} alt="dog image" width={200} height={200}></Image>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
      </TableBody>
    </Table>
  );
}
