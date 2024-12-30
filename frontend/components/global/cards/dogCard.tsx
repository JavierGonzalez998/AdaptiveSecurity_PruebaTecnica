import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export interface Dog {
  id: number;
  name: string;
  img: string;
  sex: string;
  status: number;
  statusName: string;
  adopted_by: number | null;
  owner: string | null;
  created_at: string;
  updated_at: string;
}

interface DogCardProps {
  dog: Dog;
}

export default function DogCard({ dog }: DogCardProps) {
  return (
    <Card className="max-w-96">
      <CardHeader>
        <div className="w-full h-60">
          <Image
            src={dog.img}
            alt="dog photo"
            width={250}
            height={250}
            className="w-full h-full object-contain border-8 border-rose-200 rounded-xl shadow-lg p-2 bg-white"
          />
        </div>
        <CardTitle className="text-center">{dog.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3 justify-center items-center">
          {dog.sex == "M" ? <Badge className="max-w-fit bg-cyan-400 hover:bg-cyan-800">Macho</Badge> : <Badge className="max-w-fit bg-rose-400 hover:bg-rose-800">Hembra</Badge>}
          {dog.status == 1 ? (
            <Badge className="max-w-fit bg-green-400 hover:bg-green-800">Disponible</Badge>
          ) : dog.status === 2 ? (
            <Badge className="max-w-fit bg-yellow-500 hover:bg-yellow-600">En proceso de adopción</Badge>
          ) : (
            <Badge className="max-w-fit bg-rose-200 hover:bg-rose-600">Adoptado</Badge>
          )}
          {dog.adopted_by && <Badge className="max-w-fit">Adoptado por: {dog.owner}</Badge>}
        </div>
      </CardContent>
    </Card>
  );
}
