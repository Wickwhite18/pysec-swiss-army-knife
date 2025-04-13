
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface C2ServerFormProps {
  onAddServer: (name: string, type: string, address: string, port: number) => void;
}

const C2ServerForm = ({ onAddServer }: C2ServerFormProps) => {
  const [serverName, setServerName] = useState("");
  const [serverType, setServerType] = useState("http");
  const [serverAddress, setServerAddress] = useState("");
  const [serverPort, setServerPort] = useState("8080");

  const handleAddServer = () => {
    if (!serverName.trim()) {
      toast.error("Please enter a server name");
      return;
    }

    if (!serverAddress.trim()) {
      toast.error("Please enter a server address");
      return;
    }

    onAddServer(serverName, serverType, serverAddress, parseInt(serverPort));
    
    // Reset form
    setServerName("");
    setServerAddress("");
  };

  return (
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
  );
};

export default C2ServerForm;
