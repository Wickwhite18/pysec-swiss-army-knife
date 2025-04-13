
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const SystemInfo = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">System Information</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle>System Resources</CardTitle>
            <CardDescription>Current resource utilization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>CPU Usage</span>
                <span>48%</span>
              </div>
              <Progress value={48} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Memory Usage</span>
                <span>3.2 GB / 8 GB</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Disk Usage</span>
                <span>120 GB / 500 GB</span>
              </div>
              <Progress value={24} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Network</span>
                <span>2.4 MB/s</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle>Environment</CardTitle>
            <CardDescription>Application environment information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-y-3">
                <div className="text-sm text-zinc-400">Operating System:</div>
                <div className="text-sm">Linux (Ubuntu 22.04)</div>
                
                <div className="text-sm text-zinc-400">Python Version:</div>
                <div className="text-sm">Python 3.10.12</div>
                
                <div className="text-sm text-zinc-400">Framework Versions:</div>
                <div className="text-sm">Metasploit 6.3.4</div>
                
                <div className="text-sm text-zinc-400">Architecture:</div>
                <div className="text-sm">x86_64</div>
                
                <div className="text-sm text-zinc-400">Processor:</div>
                <div className="text-sm">Intel Core i7</div>
                
                <div className="text-sm text-zinc-400">Hostname:</div>
                <div className="text-sm">security-workstation</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-zinc-800 border-zinc-700 md:col-span-2">
          <CardHeader>
            <CardTitle>Dependencies</CardTitle>
            <CardDescription>Required libraries and tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-zinc-900 rounded-md p-4 font-mono text-xs overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>
                  <span className="text-green-400">✓</span> Metasploit Framework
                </div>
                <div>
                  <span className="text-green-400">✓</span> Python 3.x
                </div>
                <div>
                  <span className="text-green-400">✓</span> Tkinter
                </div>
                <div>
                  <span className="text-green-400">✓</span> Requests Module
                </div>
                <div>
                  <span className="text-green-400">✓</span> Socket Module
                </div>
                <div>
                  <span className="text-green-400">✓</span> Paramiko (SSH)
                </div>
                <div>
                  <span className="text-green-400">✓</span> Scapy
                </div>
                <div>
                  <span className="text-green-400">✓</span> Python-nmap
                </div>
                <div>
                  <span className="text-green-400">✓</span> Crypto Module
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemInfo;
