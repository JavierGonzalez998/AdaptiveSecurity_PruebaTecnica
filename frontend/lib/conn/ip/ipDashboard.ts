import { query } from "../conn";

export async function IpDashboard(access: string){
    return query('ip/dashboard/', access, 'GET').then(res => res)
}