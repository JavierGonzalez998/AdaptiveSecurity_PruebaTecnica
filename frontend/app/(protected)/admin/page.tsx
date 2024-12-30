import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "./dashboard/dashboard";
import Volunteer from "./volunteer/volunteer";
import IpAnalysis from "./ipAnalysis/ipAnalysis";
export default function Admin() {
  return (
    <div>
      <Tabs defaultValue="dashboard" className="">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="volunteer">Solicitud de voluntarios</TabsTrigger>
          <TabsTrigger value="ipAnalysis">Analisis de Ip</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <Dashboard />
        </TabsContent>
        <TabsContent value="volunteer">
          <Volunteer />
        </TabsContent>
        <TabsContent value="ipAnalysis">
            <IpAnalysis/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
