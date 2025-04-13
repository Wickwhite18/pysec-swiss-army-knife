
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, Filter, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface HistoryItem {
  id: number;
  timestamp: string;
  action: string;
  target: string;
  result: "success" | "failure" | "pending";
  details: string;
}

const initialHistory: HistoryItem[] = [
  {
    id: 1,
    timestamp: "2023-04-13 08:32:15",
    action: "Port Scan",
    target: "192.168.1.1",
    result: "success",
    details: "Found 3 open ports: 22, 80, 443"
  },
  {
    id: 2,
    timestamp: "2023-04-13 08:45:22",
    action: "Exploit Attempt",
    target: "192.168.1.5",
    result: "failure",
    details: "MS17-010 execution failed: Target not vulnerable"
  },
  {
    id: 3,
    timestamp: "2023-04-13 09:12:04",
    action: "Payload Generation",
    target: "windows/meterpreter/reverse_tcp",
    result: "success",
    details: "Generated payload.exe (48.2 KB)"
  },
  {
    id: 4,
    timestamp: "2023-04-13 09:30:51",
    action: "Listener Started",
    target: "0.0.0.0:4444",
    result: "success",
    details: "Handler for windows/meterpreter/reverse_tcp"
  }
];

const HistoryView = () => {
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredHistory = history.filter((item) => 
    item.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.details.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const clearHistory = () => {
    toast.info("Confirm clearing history", {
      description: "This would clear all history entries in a real application",
      action: {
        label: "Clear",
        onClick: () => {
          setHistory([]);
          toast.success("History cleared successfully");
        },
      },
    });
  };
  
  const getBadgeColor = (result: string) => {
    switch (result) {
      case "success":
        return "bg-green-500 hover:bg-green-600";
      case "failure":
        return "bg-red-500 hover:bg-red-600";
      case "pending":
        return "bg-yellow-500 hover:bg-yellow-600";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Operation History</h1>
        <Button 
          variant="outline" 
          className="border-zinc-700 text-red-500" 
          onClick={clearHistory}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear History
        </Button>
      </div>
      
      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>Find specific operations in history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                placeholder="Search by action, target or details..."
                className="pl-8 bg-zinc-900 border-zinc-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="border-zinc-700">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" className="border-zinc-700">
              <Clock className="mr-2 h-4 w-4" />
              Date Range
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-zinc-800 border-zinc-700">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-zinc-900">
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-xs">{item.timestamp}</TableCell>
                    <TableCell>{item.action}</TableCell>
                    <TableCell className="font-mono text-xs">{item.target}</TableCell>
                    <TableCell>
                      <Badge className={getBadgeColor(item.result)}>
                        {item.result.charAt(0).toUpperCase() + item.result.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-zinc-400 text-sm max-w-xs truncate">
                      {item.details}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No history entries found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryView;
