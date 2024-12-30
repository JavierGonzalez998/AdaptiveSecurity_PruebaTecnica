"use client";
import { useSessionStore } from "@/zustand/providers/sessionStateProvider";
import { Dashboard as FetchDashboard } from "@/lib/conn/admin/dashboard";
import { useEffect, useState } from "react";
import { ChartBarUsers } from "@/components/admin/charts/chartBarUsers";
import ChartBarDogs from "@/components/admin/charts/chartBarDogs";
import ChartPieUsers from "@/components/admin/charts/chartPieUsers";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface dashboardInfo{
  users: {
    total_users:number;
    average_users: Float32Array;
    users_with_role_2: number;
    users_with_role_3: number;
    usersPerMonth: Record<string, string>[]
  }
  dogs: {
    total_dogs: number;
    total_dogs_available: number;
    total_dogs_in_process: number;
    total_dogs_adopted: number;
    dogsPerMonth: Record<string, string>[]
  }
}

export default function Dashboard() {
  const { session } = useSessionStore((store) => store);
  const [dashboardInfo, setDashboardInfo] = useState<dashboardInfo>();
  useEffect(() => {
    if (session) {
      FetchDashboard(session.access).then((res) => setDashboardInfo(res));
    }
  }, [session]);
  const handleRefresh = async () => {
    if (session) {
      FetchDashboard(session.access).then((res) => setDashboardInfo(res));
    }
  };
  return (
    <div className="grid grid-cols-3 w-full">
      {dashboardInfo && (
        <>
          <section className="col-span-3 bg-white shadow-lg w-full ">
            <div className="w-full flex justify-end items-center pr-5 pt-5">
              <Button onClick={() => handleRefresh()}>
                <RotateCcw className="w-5 h-5" /> Actualizar info
              </Button>
            </div>
            <h1 className="text-center my-3">Información de usuarios</h1>
            <section className="flex flex-col lg:flex-row justify-center items-center my-5">
              <div className="w-full my-5 lg:my-0 lg:w-[40rem]">
                <div className="flex justify-center items-center">
                  <div className="w-64 h-20 border flex flex-col justify-center items-center">
                    <h1 className="text-center">Total Usuarios</h1>
                    <p className="font-semibold">
                      {dashboardInfo.users.total_users}
                    </p>
                  </div>
                  <div className="w-32 h-20 border flex flex-col justify-center items-center">
                    <h1 className="text-center">Promedio Usuarios</h1>
                    <p className="font-semibold">
                      {dashboardInfo.users.average_users}
                    </p>
                  </div>
                  <div className="w-32 h-20 border flex flex-col justify-center items-center">
                    <h1 className="text-center">Usuarios Administradores</h1>
                    <p className="font-semibold">
                      {dashboardInfo.users.users_with_role_2}
                    </p>
                  </div>
                  <div className="w-32 h-20 border flex flex-col justify-center items-center">
                    <h1 className="text-center">Usuarios Voluntarios</h1>
                    <p className="font-semibold">
                      {dashboardInfo.users.users_with_role_3}
                    </p>
                  </div>
                </div>
                <ChartBarUsers chartData={dashboardInfo.users.usersPerMonth} />
              </div>
              <div className="w-full my-5 lg:my-0 lg:w-[40rem]">
                <ChartPieUsers
                  data={[
                    {
                      users_with_role_2: dashboardInfo.users.users_with_role_2,
                    },
                    {
                      users_with_role_3: dashboardInfo.users.users_with_role_3,
                    },
                  ]}
                />
              </div>
            </section>
          </section>
          <section className="col-span-3 bg-white shadow-lg my-3">
            <h1 className="text-center text-lg">Información de perritos</h1>
            <div className="w-full flex my-5 lg:my-0">
              <div className="flex flex-col justify-center items-center">
                <div className="w-40 h-20 border flex flex-col justify-center items-center">
                  <h1 className="text-center">Total Perritos</h1>
                  <p className="font-semibold">
                    {dashboardInfo.dogs.total_dogs}
                  </p>
                </div>
                <div className="w-40 h-20 border flex flex-col justify-center items-center">
                  <h1 className="text-center">Perritos disponibles</h1>
                  <p className="font-semibold">
                    {dashboardInfo.dogs.total_dogs_available}
                  </p>
                </div>
                <div className="w-40 h-20 border flex flex-col justify-center items-center">
                  <h1 className="text-center">
                    Total Perritos en proceso de adopción
                  </h1>
                  <p className="font-semibold">
                    {dashboardInfo.dogs.total_dogs_in_process}
                  </p>
                </div>
                <div className="w-40 h-20 border flex flex-col justify-center items-center">
                  <h1 className="text-center">Total Perritos Adoptados</h1>
                  <p className="font-semibold">
                    {dashboardInfo.dogs.total_dogs_adopted}
                  </p>
                </div>
              </div>
              <ChartBarDogs chartData={dashboardInfo.dogs.dogsPerMonth} />
            </div>
          </section>
        </>
      )}
    </div>
  );
}
