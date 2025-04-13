
import { 
  LayoutDashboard, 
  Rocket, 
  Ear, 
  Shield, 
  Globe, 
  Cpu, 
  Package, 
  Network, 
  History,
  Settings,
  Server
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const modules = [
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
  { id: "payloads", name: "Payloads", icon: Package },
  { id: "listeners", name: "Listeners", icon: Ear },
  { id: "exploits", name: "Exploits", icon: Rocket },
  { id: "command-control", name: "Command & Control", icon: Server },
  { id: "post-exploitation", name: "Post Exploitation", icon: Shield },
  { id: "network", name: "Network", icon: Network },
  { id: "reconnaissance", name: "Reconnaissance", icon: Globe },
  { id: "systems", name: "Systems", icon: Cpu },
  { id: "history", name: "History", icon: History },
  { id: "settings", name: "Settings", icon: Settings },
];

const Sidebar = ({ activeModule, setActiveModule }: SidebarProps) => {
  return (
    <div className="w-64 bg-zinc-800 border-r border-zinc-700 flex-shrink-0 overflow-y-auto py-4">
      <div className="px-4 mb-6">
        <div className="text-xs text-zinc-500 font-medium mb-2 uppercase tracking-wider">
          Modules
        </div>
        <nav>
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={cn(
                  "flex items-center gap-3 w-full px-3 py-2 mb-1 rounded-md text-sm font-medium transition-colors",
                  activeModule === module.id
                    ? "bg-zinc-700 text-zinc-100"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700/50"
                )}
              >
                <Icon className="h-4 w-4" />
                {module.name}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="px-4">
        <div className="text-xs text-zinc-500 font-medium mb-2 uppercase tracking-wider">
          Active Sessions
        </div>
        <div className="bg-zinc-900 rounded-md p-3 border border-zinc-700">
          <div className="text-xs text-zinc-400 mb-1">No active sessions</div>
          <p className="text-xs text-zinc-500">
            Sessions will appear here when exploitation is successful
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
