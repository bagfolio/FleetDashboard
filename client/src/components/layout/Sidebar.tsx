import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Map, 
  FileText, 
  Bell, 
  TrendingUp, 
  Leaf, 
  Recycle, 
  CreditCard,
  Users, 
  Settings,
  LogOut
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const [location] = useLocation();

  const navigationItems = [
    {
      items: [
        { name: "Dashboard", href: "/", icon: <Home className="h-5 w-5" /> },
        { name: "Route Optimization", href: "/route-map", icon: <Map className="h-5 w-5" /> },
        { name: "Citizen Engagement", href: "/citizen-engagement", icon: <Users className="h-5 w-5" /> },
        { name: "Recycling Marketplace", href: "/recycling-marketplace", icon: <Recycle className="h-5 w-5" /> },
        { name: "Carbon Credits", href: "/carbon-tracking", icon: <Leaf className="h-5 w-5" /> },
        { name: "Performance", href: "/performance", icon: <TrendingUp className="h-5 w-5" /> },
        { name: "Reports", href: "/reports", icon: <FileText className="h-5 w-5" /> },
        { name: "Alerts", href: "/alerts", icon: <Bell className="h-5 w-5" />, badge: 3 }
      ]
    }
  ];

  return (
    <aside className={cn("w-64 h-full bg-white border-r border-gray-200 hidden md:flex flex-col", className)}>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center">
          <div className="h-8 w-8 bg-green-50 rounded-md flex items-center justify-center mr-3 border border-green-200">
            <Leaf className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-800 text-xl flex items-center">
              Fleet <span className="text-green-600 ml-1">AI</span>
            </h1>
            <div className="text-xs text-gray-500 mt-1">AI-powered solutions for route optimization, citizen engagement, and sustainability</div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 py-4 overflow-y-auto">
        {navigationItems.map((section, index) => (
          <div key={index} className="px-3">            
            {section.items.map((item) => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "sidebar-link my-1",
                    isActive && "active"
                  )}
                >
                  <span className={isActive ? "text-green-600" : "text-gray-500"}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 py-4 px-3">
        <Link href="/settings" className="sidebar-link my-1">
          <Settings className="h-5 w-5 text-gray-500" />
          <span>Settings</span>
        </Link>
        <Link href="/logout" className="sidebar-link my-1">
          <LogOut className="h-5 w-5 text-gray-500" />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
