import { useState } from "react";
import { Link } from "wouter";
import { 
  Search, 
  Menu, 
  Bell, 
  Settings, 
  Calendar, 
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const [currentTab, setCurrentTab] = useState("Overview");
  
  const tabs = [
    "Overview",
    "Route Details",
    "Performance",
    "Carbon Tracking",
    "Citizen Reports"
  ];

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-neutral-500 hover:text-neutral-600"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="ml-4 md:hidden">
            <span className="font-semibold text-neutral-900">Fleet Dashboard</span>
          </div>
        </div>
        
        <div className="hidden md:block">
          <h1 className="text-xl font-semibold text-neutral-900">Fleet Operations Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Input 
              type="text" 
              placeholder="Search..." 
              className="w-64 bg-neutral-50 border border-neutral-200"
            />
            <div className="absolute right-3 top-2.5 text-neutral-400">
              <Search className="h-5 w-5" />
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative text-neutral-400 hover:text-neutral-600"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-warning-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-neutral-400 hover:text-neutral-600"
          >
            <Settings className="h-6 w-6" />
          </Button>
          
          <div className="hidden md:block border-l border-neutral-200 h-8 mx-2"></div>
          
          <div className="hidden md:flex items-center">
            <span className="text-sm text-neutral-700 mr-2">{new Date().toLocaleDateString()}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-neutral-400 hover:text-neutral-600"
            >
              <Calendar className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="px-4 border-b flex space-x-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={cn(
              "px-1 py-4 text-sm font-medium whitespace-nowrap",
              tab === currentTab 
                ? "text-primary border-b-2 border-primary" 
                : "text-neutral-500 hover:text-neutral-700 border-b-2 border-transparent"
            )}
            onClick={() => setCurrentTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </header>
  );
}
