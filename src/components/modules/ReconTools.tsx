
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Globe, Search, Database, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";

const ReconTools = () => {
  const [domain, setDomain] = useState("");
  const [domainResults, setDomainResults] = useState<null | any>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleDomainSearch = () => {
    if (!domain) {
      toast.error("Please enter a domain name");
      return;
    }
    
    setIsLoading(true);
    setDomainResults(null);
    
    setTimeout(() => {
      setIsLoading(false);
      
      setDomainResults({
        domain: domain,
        whois: {
          registrar: "Example Registrar, LLC",
          creationDate: "2005-08-21",
          expiryDate: "2030-08-21",
          nameservers: ["ns1.example.com", "ns2.example.com"]
        },
        dns: [
          { type: "A", name: domain, value: "93.184.216.34" },
          { type: "MX", name: domain, value: "mail.example.com" },
          { type: "NS", name: domain, value: "ns1.example.com" },
          { type: "NS", name: domain, value: "ns2.example.com" }
        ],
        subdomains: [
          "www." + domain,
          "mail." + domain,
          "blog." + domain,
          "api." + domain
        ]
      });
      
      toast.success("Domain reconnaissance completed");
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reconnaissance Tools</h1>
      
      <Tabs defaultValue="domain" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-zinc-800">
          <TabsTrigger value="domain">Domain Recon</TabsTrigger>
          <TabsTrigger value="osint">OSINT</TabsTrigger>
          <TabsTrigger value="vuln">Vulnerability Scanner</TabsTrigger>
          <TabsTrigger value="social">Social Engineering</TabsTrigger>
        </TabsList>
        
        <TabsContent value="domain" className="mt-4 space-y-4">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle>Domain Reconnaissance</CardTitle>
              <CardDescription>Gather information about a domain</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Globe className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <Input
                    placeholder="example.com"
                    className="pl-8 bg-zinc-900 border-zinc-700"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                  />
                </div>
                
                <Button 
                  onClick={handleDomainSearch} 
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Searching..." : "Search"}
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button variant="outline" className="border-zinc-700 text-xs">WHOIS</Button>
                <Button variant="outline" className="border-zinc-700 text-xs">DNS Records</Button>
                <Button variant="outline" className="border-zinc-700 text-xs">SSL Info</Button>
                <Button variant="outline" className="border-zinc-700 text-xs">Subdomains</Button>
              </div>
            </CardContent>
          </Card>
          
          {domainResults && (
            <>
              <Card className="bg-zinc-800 border-zinc-700">
                <CardHeader>
                  <CardTitle>Domain Information: {domainResults.domain}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Collapsible className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold">WHOIS Information</h4>
                      <CollapsibleTrigger className="flex items-center gap-1 text-xs text-zinc-400">
                        <span>Toggle</span>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                      <div className="rounded-md border border-zinc-700 p-4 text-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-zinc-400">Registrar:</div>
                          <div>{domainResults.whois.registrar}</div>
                          <div className="text-zinc-400">Creation Date:</div>
                          <div>{domainResults.whois.creationDate}</div>
                          <div className="text-zinc-400">Expiry Date:</div>
                          <div>{domainResults.whois.expiryDate}</div>
                          <div className="text-zinc-400">Nameservers:</div>
                          <div>{domainResults.whois.nameservers.join(", ")}</div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  <Collapsible className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold">DNS Records</h4>
                      <CollapsibleTrigger className="flex items-center gap-1 text-xs text-zinc-400">
                        <span>Toggle</span>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                      <Table>
                        <TableHeader className="bg-zinc-900">
                          <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Value</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {domainResults.dns.map((record: any, index: number) => (
                            <TableRow key={index}>
                              <TableCell>{record.type}</TableCell>
                              <TableCell>{record.name}</TableCell>
                              <TableCell>{record.value}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  <Collapsible className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold">Discovered Subdomains</h4>
                      <CollapsibleTrigger className="flex items-center gap-1 text-xs text-zinc-400">
                        <span>Toggle</span>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                      <ul className="rounded-md border border-zinc-700 p-4 space-y-1">
                        {domainResults.subdomains.map((subdomain: string, index: number) => (
                          <li key={index} className="text-sm">
                            {subdomain}
                          </li>
                        ))}
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="border-zinc-700">
                    Export Results
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="osint" className="mt-4">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle>OSINT Tools</CardTitle>
              <CardDescription>Open-source intelligence gathering</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Search className="h-12 w-12 text-zinc-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Feature Coming Soon</h3>
                <p className="text-sm text-zinc-400">
                  OSINT tools will be implemented in a future version.
                  <br />
                  This will include social media analysis, email harvesting, and metadata extraction capabilities.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="vuln" className="mt-4">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle>Vulnerability Scanner</CardTitle>
              <CardDescription>Identify vulnerabilities in target systems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Database className="h-12 w-12 text-zinc-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Feature Coming Soon</h3>
                <p className="text-sm text-zinc-400">
                  Vulnerability scanning tools will be implemented in a future version.
                  <br />
                  This will include web application scanning, network vulnerability assessment, and CMS security checking.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="social" className="mt-4">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle>Social Engineering Tools</CardTitle>
              <CardDescription>Tools for social engineering attacks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Database className="h-12 w-12 text-zinc-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Feature Coming Soon</h3>
                <p className="text-sm text-zinc-400">
                  Social engineering tools will be implemented in a future version.
                  <br />
                  This will include phishing templates, pretexting generators, and credential harvesting tools.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReconTools;
