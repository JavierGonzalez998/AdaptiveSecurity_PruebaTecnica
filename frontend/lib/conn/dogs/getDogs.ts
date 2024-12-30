import { query } from "../conn";

export async function getDogs(page:string = "1") {
  return query(`dogs/?page=${page}`)
  .then((res) => {
    return res
  });
}

export async function getDogByUser(access: string){
  return query('dogs/user/', access, 'GET')
  .then((res) => {
    return res
  });
}

