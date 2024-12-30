import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AproveRequest from "../dialog/aproveRequest";

interface props{
    data: {
        id: number;
        status: string;
        name: string;
        user_id: number;
    }[]
}

export default function VolunteerRequestTable({data}:props) {
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
        {
            data && data.length > 0 && data.map((value) => {
                return(
                    <TableRow key={value.id}>
                        <TableCell>{value.id}</TableCell>
                        <TableCell>{value.name}</TableCell>
                        <TableCell>{value.status}</TableCell>
                        <TableCell>
                            {
                                value.status != "approved" ? <AproveRequest data={value}/> :null
                            }
                        </TableCell>
                    </TableRow>
                )
            })
        }
      </TableBody>
    </Table>
  );
}
