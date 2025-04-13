
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Play, Pause, Trash2 } from "lucide-react";
import { toast } from "sonner";

const ListenerManager = () => {
  const [listeners, setListeners] = useState<Listener[]>([
    { id: 1, name: "Windows Handler", payload: "windows/meterpreter/reverse_tcp", port: 4444, status: "stopped" },
  ]);
  
  const [payload, setPayload] = useState("windows/meterpreter/reverse_tcp");
  const [port, setPort] = useState("4444");
  const [name, setName] = useState("");

  const addListener = () => {
    if (!name.trim()) {
      toast.error("Please enter a listener name");
      return;
    }

    const newListener = {
      id: listeners.length + 1,
      name,
      payload,
      port: parseInt(port),
      status: "stopped" as const,
    };

    setListeners([...listeners, newListener]);
    toast.success("Listener created successfully");
    
    // Reset form
    setName("");
  };

  const toggleListener = (id: number) => {
    setListeners(listeners.map(listener => {
      if (listener.id === id) {
        const newStatus = listener.status === "running" ? "stopped" : "running";
        
        toast.info(`Listener ${newStatus === "running" ? "started" : "stopped"}`, {
          description: `${listener.name} is now ${newStatus === "running" ? "listening" : "inactive"}`
        });
        
        return { ...listener, status: newStatus };
      }
      return listener;
    }));
  };

  const removeListener = (id: number) => {
    setListeners(listeners.filter(listener => listener.id !== id));
    toast.success("Listener removed successfully");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Listener Manager</h1>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle>Create Listener</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Listener Name</Label>
                <Input 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="My Listener"
                  className="bg-zinc-900 border-zinc-700"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="payload">Payload Handler</Label>
                <Select value={payload} onValueChange={setPayload}>
                  <SelectTrigger id="payload" className="bg-zinc-900 border-zinc-700">
                    <SelectValue placeholder="Select payload" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-700">
                    <SelectItem value="windows/meterpreter/reverse_tcp">windows/meterpreter/reverse_tcp</SelectItem>
                    <SelectItem value="windows/meterpreter/reverse_https">windows/meterpreter/reverse_https</SelectItem>
                    <SelectItem value="linux/x86/meterpreter/reverse_tcp">linux/x86/meterpreter/reverse_tcp</SelectItem>
                    <SelectItem value="android/meterpreter/reverse_tcp">android/meterpreter/reverse_tcp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="port">Port</Label>
                <Input 
                  id="port" 
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  className="bg-zinc-900 border-zinc-700"
                  type="number"
                />
              </div>
              
              <Button 
                onClick={addListener} 
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Add Listener
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="xl:col-span-2">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle>Active Listeners</CardTitle>
            </CardHeader>
            <CardContent>
              {listeners.length > 0 ? (
                <Table>
                  <TableHeader className="bg-zinc-900">
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Payload</TableHead>
                      <TableHead>Port</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {listeners.map((listener) => (
                      <TableRow key={listener.id}>
                        <TableCell>{listener.name}</TableCell>
                        <TableCell className="font-mono text-xs">{listener.payload}</TableCell>
                        <TableCell>{listener.port}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div 
                              className={`w-2 h-2 rounded-full ${
                                listener.status === "running" ? "bg-green-500" : "bg-red-500"
                              }`} 
                            />
                            {listener.status === "running" ? "Running" : "Stopped"}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 border-zinc-700"
                              onClick={() => toggleListener(listener.id)}
                            >
                              {listener.status === "running" ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 border-zinc-700"
                              onClick={() => removeListener(listener.id)}
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
                  <p>No listeners configured</p>
                  <p className="text-sm mt-1">Create a listener to start monitoring for connections</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface Listener {
  id: number;
  name: string;
  payload: string;
  port: number;
  status: "running" | "stopped";
}

export default ListenerManager;
