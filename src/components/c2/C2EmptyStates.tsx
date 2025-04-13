
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export const EmptyClientsState = () => (
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
);

export const EmptyTasksState = () => (
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
);
