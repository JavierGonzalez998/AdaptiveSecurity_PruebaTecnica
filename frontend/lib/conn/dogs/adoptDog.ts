import {query} from '@/lib/conn/conn'

export async function AdoptDog(access: string, id:number){
    return query('dogs/adopt/', access, 'POST', {id}).then(res => res)
}

export async function VerifyIsAdopted(access:string){
    return query('dogs/isadopted/', access, 'GET').then(res => res)
}

export async function GetAdoptRequest(access:string){
    return query('dogs/adopt/', access, 'GET').then(res => res)
}

export async function getDogByName(access: string, name:string){
    return query(`dogs/adopt/?name=${name}`, access, 'GET')
    .then((res) => {
      return res
    });
  }

  export async function ConfirmAdopt(access: string, dog_id:number){
    return query('dogs/adopt/confirm/',access, 'POST', {dog_id}).then(res => res)
}