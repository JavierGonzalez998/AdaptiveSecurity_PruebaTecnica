import { query } from "../conn";

export async function login(email: string, password: string) {
  return query('users/login/', null, 'POST', { email, password })
  .then((res) => {
    return res
  });
}
export async function logout(access:string, refresh:string){
  return query('users/logout/', access, 'POST', {refresh})
  .then((res) => {
    return res
  });
}