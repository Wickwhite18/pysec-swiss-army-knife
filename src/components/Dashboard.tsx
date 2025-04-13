
import { useState, useEffect } from "react";
import PayloadGenerator from "./modules/PayloadGenerator";
import ListenerManager from "./modules/ListenerManager";
import ExploitBrowser from "./modules/ExploitBrowser";
import PostExploitation from "./modules/PostExploitation";
import NetworkTools from "./modules/NetworkTools";
import ReconTools from "./modules/ReconTools";
import SystemInfo from "./modules/SystemInfo";
import HistoryView from "./modules/HistoryView";
import SettingsPanel from "./modules/SettingsPanel";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DashboardProps {
  activeModule: string;
}

const Dashboard = ({ activeModule }: DashboardProps) => {
  const [systemStats, setSystemStats] = useState({
    status: "Disconnected",
    exploitCount: 156,
    payloadCount: 524,
    auxiliaryCount: 347,
  });

  // This would normally connect to your Python backend
  const checkPythonBackend = () => {
    console.log("Checking Python backend status...");
    toast.info("This is a frontend demo", {
      description: "In production, this would connect to a Python backend handling Metasploit commands."
    });
  };

  useEffect(() => {
    // Simulate checking backend on mount
    checkPythonBackend();
  }, []);

  const renderModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <DashboardHome stats={systemStats} />;
      case "payloads":
        return <PayloadGenerator />;
      case "listeners":
        return <ListenerManager />;
      case "exploits":
        return <ExploitBrowser />;
      case "post-exploitation":
        return <PostExploitation />;
      case "network":
        return <NetworkTools />;
      case "reconnaissance":
        return <ReconTools />;
      case "systems":
        return <SystemInfo />;
      case "history":
        return <HistoryView />;
      case "settings":
        return <SettingsPanel />;
      default:
        return <DashboardHome stats={systemStats} />;
    }
  };

  return (
    <div className="w-full">
      {renderModule()}
    </div>
  );
};

interface DashboardHomeProps {
  stats: {
    status: string;
    exploitCount: number;
    payloadCount: number;
    auxiliaryCount: number;
  };
}

const DashboardHome = ({ stats }: DashboardHomeProps) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <Alert variant="destructive" className="border-red-800 bg-red-950/30">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Important Notice</AlertTitle>
        <AlertDescription>
          This is a frontend demo only. In a real application, this would connect to a Python backend that interfaces with Metasploit.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              {stats.status}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Exploits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.exploitCount}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Payloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.payloadCount}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Auxiliary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.auxiliaryCount}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and operations</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="border-zinc-700 hover:bg-zinc-700">
              Generate Payload
            </Button>
            <Button variant="outline" className="border-zinc-700 hover:bg-zinc-700">
              Start Listener
            </Button>
            <Button variant="outline" className="border-zinc-700 hover:bg-zinc-700">
              Scan Target
            </Button>
            <Button variant="outline" className="border-zinc-700 hover:bg-zinc-700">
              View Sessions
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle>Console</CardTitle>
            <CardDescription>Direct command interface</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-black rounded-md p-3 h-[150px] font-mono text-xs text-green-500 overflow-y-auto">
              <div>[*] Initializing PySec Toolkit</div>
              <div>[*] Interface ready</div>
              <div>[!] Not connected to Metasploit backend</div>
              <div>[*] Use the "Connect to MSF" button to establish a connection</div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="border-zinc-700 hover:bg-zinc-700 text-xs">
              <Terminal className="mr-1 h-3 w-3" />
              Clear
            </Button>
            <Button variant="default" size="sm" className="text-xs bg-blue-600 hover:bg-blue-700">
              Execute Command
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest security operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="bg-zinc-900 p-2 rounded-md border border-zinc-700">
              <div className="flex items-center justify-between">
                <div className="font-medium text-sm">Application Initialized</div>
                <div className="text-xs text-zinc-400">Just now</div>
              </div>
              <div className="text-xs text-zinc-400 mt-1">
                PySec Swiss Army Knife interface loaded successfully
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
