
import { Terminal, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Header = () => {
  const handleConnect = () => {
    toast.info("Connecting to Metasploit service...", {
      description: "This would connect to a real Metasploit RPC service in a production app."
    });
  };

  return (
    <header className="bg-zinc-800 border-b border-zinc-700 px-6 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-3">
        <Shield className="h-6 w-6 text-red-500" />
        <h1 className="text-xl font-bold">PySec Swiss Army Knife</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1 rounded-full text-xs">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span>Not Connected</span>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleConnect}
          className="flex items-center gap-2 border-zinc-700 hover:bg-zinc-700 hover:text-zinc-100"
        >
          <Terminal className="h-4 w-4" />
          Connect to MSF
        </Button>

        <Button 
          variant="destructive" 
          size="sm" 
          className="flex items-center gap-2"
        >
          <AlertTriangle className="h-4 w-4" />
          Emergency Stop
        </Button>
      </div>
    </header>
  );
};

export default Header;
