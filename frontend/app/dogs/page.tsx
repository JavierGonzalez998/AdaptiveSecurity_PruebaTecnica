import TableAllDogs from "@/components/dogs/tables/tableAllDogs"
import Divider from "@/components/global/divider/divider"
export default function Dogs(){
    
    return(
        <div>
            <h1 className="text-xl font-normal text-center my-3">Nuestros perritos</h1>
            <Divider/>
            <TableAllDogs/>
        </div>
    )
}