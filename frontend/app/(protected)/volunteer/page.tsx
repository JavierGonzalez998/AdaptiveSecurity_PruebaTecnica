import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "./dashboard/dashboard";
import Adoption from "./adoption/adoption";
export default function Volunteer() {
  return (
    <div>
      <Tabs defaultValue="dashboard" className="">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="volunteer">Solicitud de adopción</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
            <Dashboard/>
        </TabsContent>
        <TabsContent value="volunteer">
            <Adoption/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
