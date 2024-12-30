import { query } from "../conn";

export async function Dashboard(access:string) {
  return query('users/admin/dashboard/', access, 'GET')
  .then((res) => {
    return res
  });
}

export async function GetVolunteerRequest(access: string){
    return query('users/admin/volunteers/', access, 'GET')
    .then((res) => res)
}

export async function ApproveVolunteerRequest(access: string, user_id:number){
    return query('users/admin/volunteers/',access, 'POST', {user_id}).then(res => res)
}