import { query } from "../conn";

export async function Register(body: Record<string, string>){
    return query('users/register/', null, "POST", body).then((res) => res)
}