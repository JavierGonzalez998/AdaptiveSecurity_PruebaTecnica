import { query } from "../conn";

export async function EditProfile(access:string, data:Record<string, string | number>){
    return query('users/edit/', access, 'PATCH', data)
    .then((res) => {
      return res
    });
}