import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { vehicleTypes, routeTypes } from "@/lib/data";
import { RefreshCw, Edit, Plus, Minus, Maximize, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function MapView() {
  const [selectedVehicleType, setSelectedVehicleType] = useState("all");
  const [selectedRouteType, setSelectedRouteType] = useState("all");
  const [showTraffic, setShowTraffic] = useState(true);
  const [showCitizenReports, setShowCitizenReports] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  
  const { data: routes = [], isLoading: isLoadingRoutes } = useQuery({
    queryKey: ['/api/routes'],
  });
  
  const { data: vehicles = [], isLoading: isLoadingVehicles } = useQuery({
    queryKey: ['/api/vehicles'],
  });

  // Sample route info for demo popup
  const routeInfo = {
    id: "WM-1043",
    name: "Residential Collection - Northeast District",
    driver: "Michael Chen",
    vehicleId: "WM-T18",
    status: "On Schedule",
    etaCompletion: "15:45 EST",
    stopsCompleted: 78,
    totalStops: 142
  };

  return (
    <Card className="bg-white rounded-lg shadow-sm border border-neutral-100 lg:col-span-2">
      <div className="p-4 border-b border-neutral-100 flex justify-between items-center">
        <h3 className="font-medium text-neutral-800">Live Route Map</h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            <span>Refresh</span>
          </Button>
          <Button variant="default" size="sm" className="h-8 text-xs">
            <Edit className="h-3.5 w-3.5 mr-1" />
            <span>Edit Routes</span>
          </Button>
        </div>
      </div>
      
      {/* Filter Controls */}
      <div className="p-3 bg-neutral-50 border-b border-neutral-100 flex flex-wrap gap-3">
        <div className="flex items-center bg-white rounded-md border border-neutral-200 px-2">
          <Label className="text-xs text-neutral-600 mr-2">Show:</Label>
          <Select value={selectedVehicleType} onValueChange={setSelectedVehicleType}>
            <SelectTrigger className="text-xs py-1 border-0 bg-transparent focus:ring-0 h-7 w-28">
              <SelectValue placeholder="All Vehicles" />
            </SelectTrigger>
            <SelectContent>
              {vehicleTypes.map(type => (
                <SelectItem key={type.value} value={type.value} className="text-xs">
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center bg-white rounded-md border border-neutral-200 px-2">
          <Label className="text-xs text-neutral-600 mr-2">Route Type:</Label>
          <Select value={selectedRouteType} onValueChange={setSelectedRouteType}>
            <SelectTrigger className="text-xs py-1 border-0 bg-transparent focus:ring-0 h-7 w-28">
              <SelectValue placeholder="All Routes" />
            </SelectTrigger>
            <SelectContent>
              {routeTypes.map(type => (
                <SelectItem key={type.value} value={type.value} className="text-xs">
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="showTraffic"
              checked={showTraffic}
              onCheckedChange={() => setShowTraffic(!showTraffic)}
              className="h-3 w-3"
            />
            <Label htmlFor="showTraffic" className="text-xs text-neutral-700">
              Show traffic
            </Label>
          </div>
        </div>
        
        <div className="flex items-center ml-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="showReports"
              checked={showCitizenReports}
              onCheckedChange={() => setShowCitizenReports(!showCitizenReports)}
              className="h-3 w-3"
            />
            <Label htmlFor="showReports" className="text-xs text-neutral-700">
              Show citizen reports
            </Label>
          </div>
        </div>
        
        <div className="ml-auto flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:bg-neutral-100">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:bg-neutral-100">
            <Minus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:bg-neutral-100">
            <Maximize className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Map Container with Interactive Routes */}
      <div 
        className="relative rounded-b-lg overflow-hidden"
        style={{
          height: "500px",
          backgroundImage: "url('https://images.unsplash.com/photo-1596649299486-4cdea56fd59d')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Routes (visual elements positioned over the map) */}
        <div className="route-line completed" style={{ top: "30%", left: "10%", width: "15%" }}></div>
        <div className="route-line completed" style={{ top: "30%", left: "25%", width: "20%" }}></div>
        <div className="route-line" style={{ top: "30%", left: "45%", width: "10%" }}></div>
        <div className="route-line" style={{ top: "30%", left: "55%", width: "20%", opacity: 0.4 }}></div>
        
        <div className="route-line completed" style={{ top: "50%", left: "20%", width: "30%" }}></div>
        <div className="route-line" style={{ top: "50%", left: "50%", width: "15%" }}></div>
        <div className="route-line" style={{ top: "50%", left: "65%", width: "15%", opacity: 0.4 }}></div>
        
        <div className="route-line completed" style={{ top: "70%", left: "30%", width: "25%" }}></div>
        <div className="route-line" style={{ top: "70%", left: "55%", width: "15%" }}></div>
        
        {/* Vehicle locations */}
        <div className="map-location-dot" style={{ top: "30%", left: "55%" }}></div>
        <div className="map-location-dot active" style={{ top: "50%", left: "50%" }}></div>
        <div className="map-location-dot" style={{ top: "70%", left: "55%" }}></div>
        
        {/* Map Controls */}
        <div className="absolute top-4 right-4 bg-white shadow-md rounded-lg overflow-hidden">
          <Button variant="ghost" size="sm" className="p-2 h-auto hover:bg-neutral-100 border-b border-neutral-200 rounded-none">
            <Plus className="h-5 w-5 text-neutral-600" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2 h-auto hover:bg-neutral-100 rounded-none">
            <Minus className="h-5 w-5 text-neutral-600" />
          </Button>
        </div>
        
        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 shadow-md rounded-lg p-3">
          <div className="text-xs font-medium text-neutral-800 mb-2">Map Legend</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-success-500 rounded-sm mr-2"></div>
              <span className="text-xs text-neutral-600">Completed</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-primary rounded-sm mr-2"></div>
              <span className="text-xs text-neutral-600">In Progress</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-neutral-300 rounded-sm mr-2"></div>
              <span className="text-xs text-neutral-600">Planned</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-warning-500 mr-2"></div>
              <span className="text-xs text-neutral-600">Alert</span>
            </div>
          </div>
        </div>
        
        {/* Route Info Popup */}
        {routeInfo && (
          <div className="absolute top-20 left-1/4 bg-white shadow-lg rounded-lg p-3 w-64">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-neutral-800">Route #{routeInfo.id}</h4>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5 text-neutral-400 hover:text-neutral-600"
                onClick={() => setSelectedRoute(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xs text-neutral-500 mb-2">{routeInfo.name}</div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-neutral-600">Driver:</span>
              <span className="font-medium text-neutral-800">{routeInfo.driver}</span>
            </div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-neutral-600">Vehicle ID:</span>
              <span className="font-medium text-neutral-800">{routeInfo.vehicleId}</span>
            </div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-neutral-600">Status:</span>
              <span className="font-medium text-success-500">{routeInfo.status}</span>
            </div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-neutral-600">ETA Completion:</span>
              <span className="font-medium text-neutral-800">{routeInfo.etaCompletion}</span>
            </div>
            <div className="flex justify-between text-xs mb-3">
              <span className="text-neutral-600">Stops Completed:</span>
              <span className="font-medium text-neutral-800">{routeInfo.stopsCompleted}/{routeInfo.totalStops}</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="default" size="sm" className="flex-1 h-7">
                Details
              </Button>
              <Button variant="outline" size="sm" className="flex-1 h-7">
                Message
              </Button>
            </div>
          </div>
        )}

        <style jsx>{`
          .map-location-dot {
            height: 12px;
            width: 12px;
            background-color: hsl(217, 71%, 45%);
            border-radius: 50%;
            position: absolute;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.3);
          }
          .map-location-dot.active {
            background-color: #ff9800;
            animation: pulse 2s infinite;
          }
          .route-line {
            position: absolute;
            height: 3px;
            background-color: rgba(25, 118, 210, 0.7);
            z-index: 1;
          }
          .route-line.completed {
            background-color: rgba(76, 175, 80, 0.7);
          }
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(255, 152, 0, 0.7);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(255, 152, 0, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(255, 152, 0, 0);
            }
          }
        `}</style>
      </div>
    </Card>
  );
}
