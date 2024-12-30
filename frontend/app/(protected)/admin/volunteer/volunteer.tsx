'use client'
import Divider from "@/components/global/divider/divider"
import VolunteerRequestTable from "@/components/admin/tables/volunteerRequestTable"
import { useSessionStore } from "@/zustand/providers/sessionStateProvider"
import { GetVolunteerRequest } from "@/lib/conn/admin/dashboard"
import { useEffect, useState } from "react"
import { RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
export default function Volunteer(){
    const {session} = useSessionStore(store => store)
    const [dataVolunteer, setDataVolunteer] = useState<{id: number;status: string;name: string; user_id:number;}[] | null>(null)
    
    useEffect(() => {
        if(session){
            GetVolunteerRequest(session.access).then((res) => {
                console.log(res)
                setDataVolunteer(res)})
        }
    },[session])
    const handleRefresh = async() => {
        if(session){
            await GetVolunteerRequest(session.access).then((res) => {
                console.log(res)
                setDataVolunteer(res)})
        }
    }
    return(
        <div className="bg-white shadow-lg w-full ">
            <h1 className="text-center text-lg py-3">Solicitudes de voluntarios</h1>
            <Divider/>
            <div className="w-full flex justify-end items-center pr-5 pt-5">
                <Button onClick={()=> handleRefresh()}><RotateCcw className="w-5 h-5"/> Actualizar info</Button>
            </div>
            {
                dataVolunteer && (
                    <VolunteerRequestTable data={dataVolunteer}/>
                )
            }
        </div>
    )
}