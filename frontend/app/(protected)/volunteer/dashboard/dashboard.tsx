"use client";

import { useSessionStore } from "@/zustand/providers/sessionStateProvider";
import { useEffect, useState } from "react";
import { Dashboard as FetchDashboard } from "@/lib/conn/admin/dashboard";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import ChartBarDogs from "@/components/admin/charts/chartBarDogs";

interface dashboardInfo{
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
      <section className="col-span-3 bg-white shadow-lg my-3">
        <div className="w-full flex justify-end items-center pr-5 pt-5">
          <Button onClick={() => handleRefresh()}>
            <RotateCcw className="w-5 h-5" /> Actualizar info
          </Button>
        </div>
        <h1 className="text-center text-lg">Información de perritos</h1>
        {dashboardInfo && (
          <div className="w-full flex my-5 lg:my-0">
            <div className="flex flex-col justify-center items-center">
              <div className="w-40 h-20 border flex flex-col justify-center items-center">
                <h1 className="text-center">Total Perritos</h1>
                <p className="font-semibold">{dashboardInfo.dogs.total_dogs}</p>
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
        )}
      </section>
    </div>
  );
}
