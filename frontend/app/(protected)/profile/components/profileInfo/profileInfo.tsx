"use client";

import { useSessionStore } from "@/zustand/providers/sessionStateProvider";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/lib/conn/user/userInfo";
import ButtonUpdateProfile from "./ButtonProfile";

export interface userDataType {
  address: string;
  city: string;
  created_at: string;
  email: string;
  id: number;
  last_name: string;
  name: string;
  role: number;
  state: string;
  updated_at: string;
}

export default function ProfileInfo() {
  const { session } = useSessionStore((store) => store);
  const [userInfo, setUserInfo] = useState<userDataType | null>(null);
  //Se llama a la session de usuario para obtener la información del usuario
  useEffect(() => {
    if (session) {
      getUserInfo(session.access).then((res) => {
        console.log(res);
        setUserInfo(res);
      });
    }
  }, [session]);

  return (
    <section>
      <h2 className="font-semibold text-lg mt-5">Mis datos</h2>
      {
        userInfo && (
            <ButtonUpdateProfile user={userInfo} />
        )
      }
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3">
        <p>Nombre: {userInfo ? userInfo.name : "Cargando..."}</p>
        <p>Email: {userInfo ? userInfo.email : "Cargando..."}</p>
        <p>Role: {userInfo ? userInfo.role == 1 ? "Admin": userInfo.role == 2 ? "Usuario" : "Voluntario" : "Cargando..."}</p>
        <p>Dirección: {userInfo ? userInfo.address : "Cargando..."}</p>
      </div>
    </section>
  );
}
