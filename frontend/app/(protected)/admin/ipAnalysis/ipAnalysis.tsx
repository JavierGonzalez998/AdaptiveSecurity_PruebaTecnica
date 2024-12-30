"use client";
import { useSessionStore } from "@/zustand/providers/sessionStateProvider";
import { useEffect, useState } from "react";
import { IpDashboard } from "@/lib/conn/ip/ipDashboard";
import Divider from "@/components/global/divider/divider";
import ChartPieIpAnalysis from "@/components/admin/charts/chartPieIpAnalysis";
import IpAnalysisTable from "@/components/admin/tables/ipAnalysisTable";

interface Analysis{
  analysis: Record<string, string | number>[]
  data:  Record<string, string | number>[]
}

export default function IpAnalysis() {
  const { session } = useSessionStore((store) => store);
  const [dataAnalysis, setDataAnalysis] = useState<Analysis | null>(null);

  useEffect(() => {
    if (session) {
      IpDashboard(session.access).then((res) => {
        console.log(res);
        setDataAnalysis(res);
      });
    }
  }, [session]);
  return (
    <div className="bg-white shadow-lg w-full ">
      <h1 className="text-center text-lg py-3">Analisis de Ip</h1>
      <Divider />
      <h2 className="text-xl font-semibold text-center my-4">
        Total de IP por País
      </h2>
      <div>
        {dataAnalysis && <ChartPieIpAnalysis data={dataAnalysis.analysis} />}
      </div>
      <h2 className="text-xl font-semibold text-center my-4">Detalle de IP</h2>
      <div className="px-5">
        {dataAnalysis && <IpAnalysisTable data={dataAnalysis.data} />}
      </div>
    </div>
  );
}
