import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Map, 
  FileText, 
  Bell, 
  TrendingUp, 
  Recycle, 
  Users, 
  MoreVertical,
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const [location] = useLocation();

  const navigationItems = [
    {
      section: "Operations",
      items: [
        { name: "Dashboard", href: "/", icon: <Home className="h-5 w-5" /> },
        { name: "Route Map", href: "/route-map", icon: <Map className="h-5 w-5" /> },
        { name: "Reports", href: "/reports", icon: <FileText className="h-5 w-5" /> },
        { name: "Alerts", href: "/alerts", icon: <Bell className="h-5 w-5" />, badge: 3 }
      ]
    },
    {
      section: "Analytics",
      items: [
        { name: "Performance", href: "/performance", icon: <TrendingUp className="h-5 w-5" /> },
        { name: "Carbon Tracking", href: "/carbon-tracking", icon: <Recycle className="h-5 w-5" /> },
        { name: "Citizen Engagement", href: "/citizen-engagement", icon: <Users className="h-5 w-5" /> }
      ]
    }
  ];

  return (
    <aside className={cn("w-64 h-full bg-white shadow-lg hidden md:flex flex-col", className)}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            F
          </div>
          <span className="text-xl font-semibold text-neutral-900">Fleet AI</span>
        </div>
      </div>
      
      <div className="flex-1 py-4 overflow-y-auto">
        {navigationItems.map((section) => (
          <div key={section.section} className="mb-6">
            <div className="px-4 py-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              {section.section}
            </div>
            
            {section.items.map((item) => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-6 py-3 text-neutral-700 hover:bg-neutral-50",
                    {
                      "border-l-4 border-primary bg-primary/5": isActive,
                      "border-l-4 border-transparent": !isActive
                    }
                  )}
                >
                  <span className={cn("mr-3", { "text-primary": isActive, "text-neutral-400": !isActive })}>
                    {item.icon}
                  </span>
                  {item.name}
                  {item.badge && (
                    <span className="ml-auto bg-warning-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>
      
      <div className="border-t py-4">
        <div className="px-4 flex items-center">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="User avatar" 
            className="h-10 w-10 rounded-full mr-3"
          />
          <div>
            <p className="text-sm font-medium text-neutral-800">Alex Morgan</p>
            <p className="text-xs text-neutral-500">Operations Manager</p>
          </div>
          <button className="ml-auto text-neutral-400 hover:text-neutral-600">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
