
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

import { C2Server } from "@/types/c2";
import C2ServerForm from "@/components/c2/C2ServerForm";
import C2ServerList from "@/components/c2/C2ServerList";
import { EmptyClientsState, EmptyTasksState } from "@/components/c2/C2EmptyStates";

const C2Management = () => {
  const [c2Servers, setC2Servers] = useState<C2Server[]>([
    { id: 1, name: "C2 Server Alpha", type: "http", address: "192.168.1.100", port: 8080, status: "offline", clients: 0 }
  ]);
  
  const [activeTab, setActiveTab] = useState("c2-servers");

  const handleStartServer = (id: number) => {
    setC2Servers(c2Servers.map(server => {
      if (server.id === id) {
        toast.info(`Starting ${server.name} C2 server`, {
          description: `${server.type.toUpperCase()} server on ${server.address}:${server.port}`
        });
        return { ...server, status: "online" };
      }
      return server;
    }));
  };

  const handleStopServer = (id: number) => {
    setC2Servers(c2Servers.map(server => {
      if (server.id === id) {
        toast.info(`Stopping ${server.name} C2 server`);
        return { ...server, status: "offline", clients: 0 };
      }
      return server;
    }));
  };

  const handleDeleteServer = (id: number) => {
    setC2Servers(c2Servers.filter(server => server.id !== id));
    toast.success("C2 server removed successfully");
  };

  const handleAddServer = (name: string, type: string, address: string, port: number) => {
    const newServer: C2Server = {
      id: c2Servers.length + 1,
      name,
      type,
      address,
      port,
      status: "offline",
      clients: 0
    };

    setC2Servers([...c2Servers, newServer]);
    toast.success("C2 server added successfully");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">C2 Management</h1>
      
      <Tabs defaultValue="c2-servers" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-zinc-800">
          <TabsTrigger value="c2-servers">C2 Servers</TabsTrigger>
          <TabsTrigger value="clients">Connected Clients</TabsTrigger>
          <TabsTrigger value="tasks">Task Deployment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="c2-servers" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <C2ServerForm onAddServer={handleAddServer} />
            </div>
            
            <div className="md:col-span-2">
              <Card className="bg-zinc-800 border-zinc-700">
                <CardHeader>
                  <CardTitle>C2 Server Infrastructure</CardTitle>
                  <CardDescription>Manage your command & control servers</CardDescription>
                </CardHeader>
                <CardContent>
                  <C2ServerList 
                    servers={c2Servers}
                    onStartServer={handleStartServer}
                    onStopServer={handleStopServer}
                    onDeleteServer={handleDeleteServer}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="clients" className="mt-4">
          <EmptyClientsState />
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-4">
          <EmptyTasksState />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default C2Management;
