
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PlayCircle, StopCircle, Trash2, Plus, Server, Wifi, Radio, Globe, Send } from "lucide-react";
import { toast } from "sonner";

interface C2Server {
  id: number;
  name: string;
  type: string;
  address: string;
  port: number;
  status: "online" | "offline";
  clients: number;
}

const C2Management = () => {
  const [c2Servers, setC2Servers] = useState<C2Server[]>([
    { id: 1, name: "C2 Server Alpha", type: "http", address: "192.168.1.100", port: 8080, status: "offline", clients: 0 }
  ]);
  
  const [activeTab, setActiveTab] = useState("c2-servers");
  const [serverName, setServerName] = useState("");
  const [serverType, setServerType] = useState("http");
  const [serverAddress, setServerAddress] = useState("");
  const [serverPort, setServerPort] = useState("8080");

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

  const handleAddServer = () => {
    if (!serverName.trim()) {
      toast.error("Please enter a server name");
      return;
    }

    if (!serverAddress.trim()) {
      toast.error("Please enter a server address");
      return;
    }

    const newServer: C2Server = {
      id: c2Servers.length + 1,
      name: serverName,
      type: serverType,
      address: serverAddress,
      port: parseInt(serverPort),
      status: "offline",
      clients: 0
    };

    setC2Servers([...c2Servers, newServer]);
    toast.success("C2 server added successfully");
    
    // Reset form
    setServerName("");
    setServerAddress("");
  };

  const getServerTypeIcon = (type: string) => {
    switch (type) {
      case "http":
        return <Globe className="h-4 w-4" />;
      case "tcp":
        return <Server className="h-4 w-4" />;
      case "dns":
        return <Wifi className="h-4 w-4" />;
      default:
        return <Radio className="h-4 w-4" />;
    }
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
              <Card className="bg-zinc-800 border-zinc-700">
                <CardHeader>
                  <CardTitle>Add C2 Server</CardTitle>
                  <CardDescription>Configure a new command & control server</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="server-name">Server Name</Label>
                    <Input 
                      id="server-name" 
                      value={serverName}
                      onChange={(e) => setServerName(e.target.value)}
                      placeholder="Primary C2"
                      className="bg-zinc-900 border-zinc-700"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="server-type">Protocol Type</Label>
                    <Select value={serverType} onValueChange={setServerType}>
                      <SelectTrigger id="server-type" className="bg-zinc-900 border-zinc-700">
                        <SelectValue placeholder="Select server type" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-700">
                        <SelectItem value="http">HTTP/HTTPS</SelectItem>
                        <SelectItem value="tcp">TCP Direct</SelectItem>
                        <SelectItem value="dns">DNS Tunneling</SelectItem>
                        <SelectItem value="custom">Custom Protocol</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="server-address">Address</Label>
                    <Input 
                      id="server-address" 
                      value={serverAddress}
                      onChange={(e) => setServerAddress(e.target.value)}
                      placeholder="192.168.1.100 or domain.com"
                      className="bg-zinc-900 border-zinc-700"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="server-port">Port</Label>
                    <Input 
                      id="server-port" 
                      value={serverPort}
                      onChange={(e) => setServerPort(e.target.value)}
                      className="bg-zinc-900 border-zinc-700"
                      type="number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Switch id="advanced-options" />
                      <Label htmlFor="advanced-options">Show Advanced Options</Label>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleAddServer} 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add C2 Server
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card className="bg-zinc-800 border-zinc-700">
                <CardHeader>
                  <CardTitle>C2 Server Infrastructure</CardTitle>
                  <CardDescription>Manage your command & control servers</CardDescription>
                </CardHeader>
                <CardContent>
                  {c2Servers.length > 0 ? (
                    <Table>
                      <TableHeader className="bg-zinc-900">
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Address</TableHead>
                          <TableHead>Port</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Clients</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {c2Servers.map((server) => (
                          <TableRow key={server.id}>
                            <TableCell className="font-medium">{server.name}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {getServerTypeIcon(server.type)}
                                <span className="capitalize">{server.type}</span>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-xs">{server.address}</TableCell>
                            <TableCell>{server.port}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div 
                                  className={`w-2 h-2 rounded-full ${
                                    server.status === "online" ? "bg-green-500" : "bg-red-500"
                                  }`} 
                                />
                                {server.status === "online" ? "Online" : "Offline"}
                              </div>
                            </TableCell>
                            <TableCell>{server.clients}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                {server.status === "offline" ? (
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 border-zinc-700"
                                    onClick={() => handleStartServer(server.id)}
                                  >
                                    <PlayCircle className="h-4 w-4 text-green-500" />
                                  </Button>
                                ) : (
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 border-zinc-700"
                                    onClick={() => handleStopServer(server.id)}
                                  >
                                    <StopCircle className="h-4 w-4 text-red-500" />
                                  </Button>
                                )}
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 border-zinc-700"
                                  onClick={() => handleDeleteServer(server.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8 text-zinc-400">
                      <p>No C2 servers configured</p>
                      <p className="text-sm mt-1">Add a C2 server to start building your infrastructure</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="clients" className="mt-4">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle>Connected Clients</CardTitle>
              <CardDescription>Manage compromised systems in your botnet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-zinc-400">
                <p>No connected clients</p>
                <p className="text-sm mt-1">Launch your C2 servers and deploy payloads to see connected clients</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-4">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle>Task Deployment</CardTitle>
              <CardDescription>Send commands to compromised systems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-zinc-400">
                <p>No tasks available</p>
                <p className="text-sm mt-1">Connect to clients first to deploy tasks and commands</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled className="w-full bg-blue-600 hover:bg-blue-700">
                <Send className="mr-2 h-4 w-4" />
                Deploy Task
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface C2Server {
  id: number;
  name: string;
  type: string;
  address: string;
  port: number;
  status: "online" | "offline";
  clients: number;
}

export default C2Management;
