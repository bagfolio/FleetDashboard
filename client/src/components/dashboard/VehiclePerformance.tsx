import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";

export default function VehiclePerformance() {
  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ['/api/vehicles'],
  });
  
  // We'll use the first vehicle for the demo
  const vehicle = vehicles[0] || {
    id: 1,
    vehicleId: "WM-T18",
    name: "Eco-Compactor",
    district: "Northeast District Assignment",
    driver: "Michael Chen",
    fuelLevel: 68,
    maintenanceStatus: "good",
    currentMileage: 42.8,
    idleTime: 43,
    fuelEfficiency: 5.7,
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b"
  };

  const { data: routes = [] } = useQuery({
    queryKey: ['/api/vehicle/1/routes'],
  });

  return (
    <Card className="bg-white rounded-lg shadow-sm border border-neutral-100">
      <div className="p-4 border-b border-neutral-100 flex justify-between items-center">
        <h3 className="font-medium text-neutral-800">Vehicle Performance</h3>
        <div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-primary font-medium hover:text-primary/90 px-0"
          >
            Vehicle Details
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center mb-4">
          <div className="relative flex-1">
            <img 
              src={vehicle.image} 
              alt="Waste Management Truck" 
              className="h-32 w-full object-cover rounded-lg"
            />
            <div className="absolute top-2 left-2 bg-success-500 text-white text-xs px-2 py-0.5 rounded-full">
              Active
            </div>
          </div>
          <div className="flex-1 ml-4">
            <h4 className="text-base font-medium text-neutral-800">{vehicle.vehicleId} {vehicle.name}</h4>
            <p className="text-sm text-neutral-500 mb-2">{vehicle.district}</p>
            
            <div className="space-y-1.5">
              <div className="flex items-center text-xs">
                <span className="w-28 text-neutral-600">Driver:</span>
                <span className="font-medium text-neutral-800">{vehicle.driver}</span>
              </div>
              <div className="flex items-center text-xs">
                <span className="w-28 text-neutral-600">Fuel Level:</span>
                <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-success-500 rounded-full" 
                    style={{ width: `${vehicle.fuelLevel}%` }}
                  />
                </div>
                <span className="ml-2 font-medium text-neutral-800">{vehicle.fuelLevel}%</span>
              </div>
              <div className="flex items-center text-xs">
                <span className="w-28 text-neutral-600">Maintenance:</span>
                <span className="font-medium text-success-500">
                  {vehicle.maintenanceStatus === "good" ? "Good Condition" : "Needs Service"}
                </span>
              </div>
              <div className="flex items-center text-xs">
                <span className="w-28 text-neutral-600">Today's Mileage:</span>
                <span className="font-medium text-neutral-800">{vehicle.currentMileage} miles</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-neutral-50 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-neutral-600">Idle Time</span>
              <span className="text-xs font-medium text-warning-500">Above Target</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-lg font-semibold text-neutral-800">{vehicle.idleTime}</span>
              <span className="ml-1 text-xs text-neutral-500">min today</span>
            </div>
            <div className="text-xs text-neutral-500">vs. 35 min target</div>
          </div>
          
          <div className="p-3 bg-neutral-50 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-neutral-600">Fuel Efficiency</span>
              <span className="text-xs font-medium text-success-500">Good</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-lg font-semibold text-neutral-800">{vehicle.fuelEfficiency}</span>
              <span className="ml-1 text-xs text-neutral-500">mpg avg</span>
            </div>
            <div className="text-xs text-neutral-500">vs. 5.2 mpg fleet avg</div>
          </div>
        </div>
        
        <div className="border-t border-neutral-100 pt-4">
          <h4 className="text-sm font-medium text-neutral-700 mb-3">Recent Routes & Performance</h4>
          <div className="space-y-3">
            {isLoading ? (
              <div className="space-y-3">
                <div className="h-4 bg-neutral-100 rounded animate-pulse"></div>
                <div className="h-4 bg-neutral-100 rounded animate-pulse"></div>
                <div className="h-4 bg-neutral-100 rounded animate-pulse"></div>
              </div>
            ) : (
              routes.map((route: any) => (
                <div key={route.id} className="flex items-center text-xs">
                  <div className="w-28 text-neutral-600">Route #{route.routeId}</div>
                  <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-success-500 rounded-full" 
                      style={{ 
                        width: route.completedStops / (route.totalStops || 1) * 100 + '%'
                      }}
                    />
                  </div>
                  <span className="ml-2 font-medium text-neutral-800">
                    {route.status === "completed" ? (
                      <span className="text-success-500">Completed</span>
                    ) : (
                      `${Math.round(route.completedStops / (route.totalStops || 1) * 100)}% complete`
                    )}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
