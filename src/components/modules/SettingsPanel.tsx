
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const SettingsPanel = () => {
  const [metasploitPath, setMetasploitPath] = useState("/opt/metasploit-framework");
  const [apiKey, setApiKey] = useState("••••••••••••••••");
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [theme, setTheme] = useState("dark");
  
  const handleSaveSettings = () => {
    toast.success("Settings saved successfully", {
      description: "Your configuration changes have been applied"
    });
  };
  
  const handleResetSettings = () => {
    toast.info("Confirm reset settings", {
      description: "This will reset all settings to their default values",
      action: {
        label: "Reset",
        onClick: () => {
          setMetasploitPath("/opt/metasploit-framework");
          setApiKey("••••••••••••••••");
          setAutoUpdate(true);
          setTheme("dark");
          toast.success("Settings reset to defaults");
        },
      },
    });
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-zinc-800">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-4 space-y-4">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic application configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metasploit-path">Metasploit Framework Path</Label>
                <Input
                  id="metasploit-path"
                  value={metasploitPath}
                  onChange={(e) => setMetasploitPath(e.target.value)}
                  className="bg-zinc-900 border-zinc-700"
                />
                <p className="text-xs text-zinc-400">
                  Specify the path to your Metasploit Framework installation
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-update">Auto Update</Label>
                  <p className="text-xs text-zinc-400">
                    Automatically check for and install updates
                  </p>
                </div>
                <Switch
                  id="auto-update"
                  checked={autoUpdate}
                  onCheckedChange={setAutoUpdate}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="debug-mode">Debug Mode</Label>
                  <p className="text-xs text-zinc-400">
                    Enable additional logging and debugging information
                  </p>
                </div>
                <Switch id="debug-mode" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="border-zinc-700" onClick={handleResetSettings}>
                Reset
              </Button>
              <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="connections" className="mt-4 space-y-4">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle>Connection Settings</CardTitle>
              <CardDescription>Configure connection parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="msf-host">Metasploit RPC Host</Label>
                  <Input
                    id="msf-host"
                    defaultValue="127.0.0.1"
                    className="bg-zinc-900 border-zinc-700"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="msf-port">Metasploit RPC Port</Label>
                  <Input
                    id="msf-port"
                    defaultValue="55553"
                    className="bg-zinc-900 border-zinc-700"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="relative">
                  <Input
                    id="api-key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    type="password"
                    className="bg-zinc-900 border-zinc-700"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 border-zinc-700 text-xs"
                  >
                    Generate
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ssl-verify">Verify SSL</Label>
                  <p className="text-xs text-zinc-400">
                    Verify SSL certificates when connecting to services
                  </p>
                </div>
                <Switch id="ssl-verify" defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="border-zinc-700" onClick={handleResetSettings}>
                Reset
              </Button>
              <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="mt-4 space-y-4">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the application appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme" className="bg-zinc-900 border-zinc-700">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-700">
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="system">System Default</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="font-size">Font Size</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="font-size" className="bg-zinc-900 border-zinc-700">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-700">
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="animations">Enable Animations</Label>
                  <p className="text-xs text-zinc-400">
                    Show animations throughout the interface
                  </p>
                </div>
                <Switch id="animations" defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="border-zinc-700" onClick={handleResetSettings}>
                Reset
              </Button>
              <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="mt-4 space-y-4">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced options (use with caution)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-zinc-900 p-4 rounded-md border border-zinc-700">
                <p className="text-amber-500 text-sm mb-2">Warning</p>
                <p className="text-xs text-zinc-400">
                  Changing these settings may affect application stability. Only modify if you understand the consequences.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timeout">Connection Timeout (seconds)</Label>
                <Input
                  id="timeout"
                  type="number"
                  defaultValue="30"
                  className="bg-zinc-900 border-zinc-700"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="thread-count">Maximum Thread Count</Label>
                <Input
                  id="thread-count"
                  type="number"
                  defaultValue="10"
                  className="bg-zinc-900 border-zinc-700"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="experimental">Experimental Features</Label>
                  <p className="text-xs text-zinc-400">
                    Enable experimental and potentially unstable features
                  </p>
                </div>
                <Switch id="experimental" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="border-zinc-700" onClick={handleResetSettings}>
                Reset
              </Button>
              <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPanel;
