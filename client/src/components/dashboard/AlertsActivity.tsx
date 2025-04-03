import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, AlertCircle, Ban, CheckCircle, Users, RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

interface Alert {
  id: number;
  type: string;
  title: string;
  message: string;
  severity: string;
  timestamp: string;
  vehicleId?: number;
  routeId?: number;
}

export default function AlertsActivity() {
  const { data: alerts = [], isLoading } = useQuery({
    queryKey: ['/api/alerts'],
  });

  // Format the time difference
  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else {
      const hours = Math.floor(diffInMinutes / 60);
      const mins = diffInMinutes % 60;
      return `${hours}h${mins ? ` ${mins}m` : ''} ago`;
    }
  };

  // Get icon based on alert type
  const getAlertIcon = (type: string, severity: string) => {
    switch (type) {
      case 'traffic_delay':
        return <AlertCircle className="h-5 w-5" />;
      case 'maintenance':
        return <Ban className="h-5 w-5" />;
      case 'route_completion':
        return <CheckCircle className="h-5 w-5" />;
      case 'citizen_report':
        return <Users className="h-5 w-5" />;
      case 'carbon_milestone':
        return <RefreshCw className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  // Get color based on severity
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error':
        return 'bg-error-500 bg-opacity-10 text-error-500';
      case 'warning':
        return 'bg-warning-500 bg-opacity-10 text-warning-500';
      case 'success':
        return 'bg-success-500 bg-opacity-10 text-success-500';
      case 'info':
      default:
        return 'bg-secondary-400 bg-opacity-10 text-secondary-400';
    }
  };

  return (
    <Card className="bg-white rounded-lg shadow-sm border border-neutral-100">
      <div className="p-4 border-b border-neutral-100 flex justify-between items-center">
        <h3 className="font-medium text-neutral-800">Recent Alerts & Activity</h3>
        <div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-primary font-medium hover:text-primary/90 px-0"
          >
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
      
      {/* Alert List */}
      <div className="divide-y divide-neutral-100 max-h-[530px] overflow-y-auto">
        {isLoading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="p-4 flex animate-pulse">
              <div className="flex-shrink-0 h-9 w-9 rounded-full bg-neutral-100 mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-neutral-100 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-neutral-100 rounded w-full mb-2"></div>
                <div className="h-3 bg-neutral-100 rounded w-full mb-2"></div>
                <div className="h-6 bg-neutral-100 rounded w-1/3 mt-4"></div>
              </div>
            </div>
          ))
        ) : (
          alerts.map((alert: Alert) => (
            <div key={alert.id} className="p-4 flex">
              <div className={cn(
                "flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center mr-3",
                getSeverityColor(alert.severity)
              )}>
                {getAlertIcon(alert.type, alert.severity)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-neutral-800 truncate">{alert.title}</p>
                  <span className="text-xs text-neutral-500">{formatTimeAgo(alert.timestamp)}</span>
                </div>
                <p className="text-xs text-neutral-600 mt-1">
                  {alert.message}
                </p>
                <div className="mt-2 flex space-x-2">
                  {alert.type === 'traffic_delay' && (
                    <>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        View Route
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        Notify Driver
                      </Button>
                    </>
                  )}
                  {alert.type === 'maintenance' && (
                    <>
                      <Button 
                        variant="default" 
                        size="sm"
                        className="h-7 text-xs bg-error-500 hover:bg-error-600 text-white"
                      >
                        Schedule Service
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        Contact Driver
                      </Button>
                    </>
                  )}
                  {alert.type === 'route_completion' && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-success-500 bg-opacity-10 text-success-500">
                      Ahead of Schedule
                    </span>
                  )}
                  {alert.type === 'citizen_report' && (
                    <>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        Assign Pickup
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        Contact Resident
                      </Button>
                    </>
                  )}
                  {alert.type === 'carbon_milestone' && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-success-500 bg-opacity-10 text-success-500">
                      Goal Achieved
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
