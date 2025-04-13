
import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const Index = () => {
  const [activeModule, setActiveModule] = useState<string>("dashboard");

  return (
    <div className="flex flex-col h-screen bg-zinc-900 text-zinc-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
        <main className="flex-1 overflow-auto p-6">
          <Dashboard activeModule={activeModule} />
        </main>
      </div>
    </div>
  );
};

export default Index;
