import { query } from "../conn";

export async function getUserInfo(access: string) {
  return query('users/', access, 'GET')
  .then((res) => {
    return res
  });
}