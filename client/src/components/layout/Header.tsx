import { useState } from "react";
import { Link } from "wouter";
import { 
  Search, 
  Menu, 
  Bell, 
  Settings, 
  Calendar,
  User,
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
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }));

  return (
    <header className="bg-white border-b border-gray-200 z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 hover:text-gray-600"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="ml-4 md:hidden">
            <span className="font-semibold text-gray-900 flex items-center">
              Fleet<span className="text-green-600 ml-1">AI</span>
            </span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center">
          <div className="text-sm text-gray-500">{currentDate}</div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Input 
              type="text" 
              placeholder="Search..." 
              className="w-64 bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-green-500"
            />
            <div className="absolute right-3 top-2.5 text-gray-400">
              <Search className="h-4 w-4" />
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative text-gray-500 hover:text-gray-600"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-orange-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-500 hover:text-gray-600"
          >
            <Settings className="h-5 w-5" />
          </Button>
          
          <div className="hidden md:block border-l border-gray-200 h-8 mx-2"></div>
          
          <div className="hidden md:flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <User className="h-4 w-4" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-700">Admin User</p>
              <p className="text-xs text-gray-500">Operations Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
