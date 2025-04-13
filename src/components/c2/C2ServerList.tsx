
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlayCircle, StopCircle, Trash2 } from "lucide-react";
import { C2Server } from "@/types/c2";
import C2ServerTypeIcon from "./C2ServerTypeIcon";

interface C2ServerListProps {
  servers: C2Server[];
  onStartServer: (id: number) => void;
  onStopServer: (id: number) => void;
  onDeleteServer: (id: number) => void;
}

const C2ServerList = ({ 
  servers, 
  onStartServer, 
  onStopServer, 
  onDeleteServer 
}: C2ServerListProps) => {
  return (
    <>
      {servers.length > 0 ? (
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
            {servers.map((server) => (
              <TableRow key={server.id}>
                <TableCell className="font-medium">{server.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <C2ServerTypeIcon type={server.type} />
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
                        onClick={() => onStartServer(server.id)}
                      >
                        <PlayCircle className="h-4 w-4 text-green-500" />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-zinc-700"
                        onClick={() => onStopServer(server.id)}
                      >
                        <StopCircle className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-zinc-700"
                      onClick={() => onDeleteServer(server.id)}
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
    </>
  );
};

export default C2ServerList;
