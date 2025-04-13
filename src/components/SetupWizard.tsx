
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Progress } from "./ui/progress";
import { Shield, Terminal, Check, ArrowRight, Settings, Database, Globe, Rocket } from "lucide-react";
import { toast } from "sonner";

interface SetupWizardProps {
  onComplete: () => void;
}

const SetupWizard = ({ onComplete }: SetupWizardProps) => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  
  // Form state
  const [metasploitPath, setMetasploitPath] = useState("/opt/metasploit-framework");
  const [connectionType, setConnectionType] = useState("local");
  const [rpcHost, setRpcHost] = useState("127.0.0.1");
  const [rpcPort, setRpcPort] = useState("55553");
  const [username, setUsername] = useState("msf");
  const [password, setPassword] = useState("");
  const [setupType, setSetupType] = useState("standard");

  const nextStep = () => {
    if (step === totalSteps) {
      completeSetup();
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const completeSetup = () => {
    toast.success("Setup completed successfully!", {
      description: "Your security toolkit is now configured and ready to use."
    });
    onComplete();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Shield className="h-12 w-12 text-red-500 mx-auto mb-2" />
              <h2 className="text-xl font-bold">Welcome to the Security Toolkit</h2>
              <p className="text-zinc-400">
                This wizard will help you set up your security environment and configure key components.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="setup-type">Setup Type</Label>
                <RadioGroup value={setupType} onValueChange={setSetupType} className="grid grid-cols-1 gap-4">
                  <div className="flex items-center space-x-2 bg-zinc-900 p-3 rounded-md border border-zinc-700">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex flex-col cursor-pointer">
                      <span className="font-medium">Standard Setup</span>
                      <span className="text-xs text-zinc-400">Recommended for most users. Basic configuration with essential features.</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-zinc-900 p-3 rounded-md border border-zinc-700">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced" className="flex flex-col cursor-pointer">
                      <span className="font-medium">Advanced Setup</span>
                      <span className="text-xs text-zinc-400">For experienced users. Detailed configuration of all components.</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-zinc-900 p-3 rounded-md border border-zinc-700">
                    <RadioGroupItem value="minimal" id="minimal" />
                    <Label htmlFor="minimal" className="flex flex-col cursor-pointer">
                      <span className="font-medium">Minimal Setup</span>
                      <span className="text-xs text-zinc-400">Quick setup with minimal configuration. Limited functionality.</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Terminal className="h-12 w-12 text-blue-500 mx-auto mb-2" />
              <h2 className="text-xl font-bold">Metasploit Configuration</h2>
              <p className="text-zinc-400">
                Configure your Metasploit installation to enable exploitation capabilities.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metasploit-path">Metasploit Framework Path</Label>
                <Input
                  id="metasploit-path"
                  value={metasploitPath}
                  onChange={(e) => setMetasploitPath(e.target.value)}
                  className="bg-zinc-900 border-zinc-700"
                />
                <p className="text-xs text-zinc-400">The directory where Metasploit Framework is installed.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="connection-type">Connection Type</Label>
                <Select value={connectionType} onValueChange={setConnectionType}>
                  <SelectTrigger id="connection-type" className="bg-zinc-900 border-zinc-700">
                    <SelectValue placeholder="Select connection type" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-700">
                    <SelectItem value="local">Local Installation</SelectItem>
                    <SelectItem value="remote">Remote RPC Server</SelectItem>
                    <SelectItem value="docker">Docker Container</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {connectionType === "remote" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="rpc-host">RPC Host</Label>
                    <Input
                      id="rpc-host"
                      value={rpcHost}
                      onChange={(e) => setRpcHost(e.target.value)}
                      className="bg-zinc-900 border-zinc-700"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rpc-port">RPC Port</Label>
                    <Input
                      id="rpc-port"
                      value={rpcPort}
                      onChange={(e) => setRpcPort(e.target.value)}
                      className="bg-zinc-900 border-zinc-700"
                      type="number"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Settings className="h-12 w-12 text-green-500 mx-auto mb-2" />
              <h2 className="text-xl font-bold">Authentication Setup</h2>
              <p className="text-zinc-400">
                Configure authentication for secure access to Metasploit services.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-zinc-900 border-zinc-700"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-zinc-900 border-zinc-700"
                />
              </div>

              <div className="bg-zinc-900 p-3 rounded-md border border-zinc-700">
                <p className="text-xs text-zinc-400">
                  These credentials will be used to authenticate with the Metasploit RPC service.
                  Keep them secure and do not share them with unauthorized users.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Database className="h-12 w-12 text-purple-500 mx-auto mb-2" />
              <h2 className="text-xl font-bold">Database Configuration</h2>
              <p className="text-zinc-400">
                Set up the database for storing scan results, hosts, and session information.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="db-type">Database Type</Label>
                <Select defaultValue="postgresql">
                  <SelectTrigger id="db-type" className="bg-zinc-900 border-zinc-700">
                    <SelectValue placeholder="Select database type" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-700">
                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                    <SelectItem value="sqlite" disabled>SQLite (Limited Support)</SelectItem>
                    <SelectItem value="none">No Database</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="db-path">Database Path</Label>
                <Input
                  id="db-path"
                  defaultValue="/var/lib/postgresql/data"
                  className="bg-zinc-900 border-zinc-700"
                />
                <p className="text-xs text-zinc-400">Directory where database files are stored.</p>
              </div>

              <div className="bg-zinc-900 p-3 rounded-md border border-zinc-700">
                <p className="text-xs text-zinc-400">
                  A database is recommended for storing scan results and managing large penetration testing projects.
                  PostgreSQL offers the best compatibility with Metasploit Framework.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Rocket className="h-12 w-12 text-orange-500 mx-auto mb-2" />
              <h2 className="text-xl font-bold">Ready to Launch</h2>
              <p className="text-zinc-400">
                Your security toolkit is now configured and ready to go. Click Finish to start using the application.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-zinc-900 p-4 rounded-md border border-zinc-700">
                <h3 className="text-sm font-medium mb-2">Configuration Summary:</h3>
                <ul className="text-xs text-zinc-400 space-y-1">
                  <li><span className="text-zinc-300">Setup Type:</span> {setupType === "standard" ? "Standard Setup" : setupType === "advanced" ? "Advanced Setup" : "Minimal Setup"}</li>
                  <li><span className="text-zinc-300">Metasploit Path:</span> {metasploitPath}</li>
                  <li><span className="text-zinc-300">Connection:</span> {connectionType === "local" ? "Local Installation" : connectionType === "remote" ? `Remote (${rpcHost}:${rpcPort})` : "Docker Container"}</li>
                  <li><span className="text-zinc-300">Username:</span> {username}</li>
                  <li><span className="text-zinc-300">Database:</span> PostgreSQL</li>
                </ul>
              </div>

              <div className="flex items-center gap-2 bg-green-900/30 text-green-400 p-3 rounded-md border border-green-800">
                <Check className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">
                  Configuration complete. Click Finish to apply settings and start using the toolkit.
                </p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg bg-zinc-800 border-zinc-700">
        <CardHeader className="pb-4">
          <CardTitle>Security Toolkit Setup</CardTitle>
          <CardDescription>
            Step {step} of {totalSteps}: {
              step === 1 ? "Welcome" :
              step === 2 ? "Metasploit Configuration" :
              step === 3 ? "Authentication" :
              step === 4 ? "Database Setup" : "Finalize Setup"
            }
          </CardDescription>
          <Progress value={(step / totalSteps) * 100} className="h-1 mt-2" />
        </CardHeader>
        <CardContent>
          {renderStep()}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={step === 1}
            className="border-zinc-700"
          >
            Back
          </Button>
          <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
            {step === totalSteps ? (
              <>
                Finish <Check className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SetupWizard;
