import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import KPICard from "@/components/dashboard/KPICard";
import MapView from "@/components/dashboard/MapView";
import AlertsActivity from "@/components/dashboard/AlertsActivity";
import VehiclePerformance from "@/components/dashboard/VehiclePerformance";
import CitizenEngagement from "@/components/dashboard/CitizenEngagement";
import { Button } from "@/components/ui/button";
import { 
  Map, 
  Zap, 
  ChartBarStacked, 
  RefreshCw,
  ChevronDown
} from "lucide-react";

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState<string>("week");
  
  const { data: summary, isLoading } = useQuery({
    queryKey: ['/api/dashboard/summary'],
  });

  const timeFilterOptions = [
    { label: "Today", value: "today" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Quarter", value: "quarter" },
    { label: "Custom", value: "custom" }
  ];

  const handleTimeFilterChange = (value: string) => {
    setTimeFilter(value);
  };

  return (
    <>
      {/* Time Filter */}
      <div className="mb-6 flex flex-wrap items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-neutral-800">Today's Operation Summary</h2>
          <p className="text-sm text-neutral-500">Last updated: {new Date().toLocaleString()}</p>
        </div>
        
        <div className="flex space-x-2 mt-3 md:mt-0">
          {timeFilterOptions.map((option) => (
            <Button
              key={option.value}
              variant={timeFilter === option.value ? "default" : "outline"}
              size="sm"
              className="h-8"
              onClick={() => handleTimeFilterChange(option.value)}
            >
              {option.label}
              {option.value === "custom" && <ChevronDown className="ml-1 h-4 w-4" />}
            </Button>
          ))}
        </div>
      </div>
      
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Active Routes */}
        <KPICard
          title="Active Routes"
          value={isLoading ? "..." : summary.activeRoutes}
          unit="routes"
          change={{
            value: "+3 vs yesterday",
            positive: true,
          }}
          icon={<Map className="h-5 w-5" />}
          iconBgColor="bg-primary-50"
          progress={{
            value: 82,
            label: "82% completed",
            target: "16:00 EST",
          }}
        />
        
        {/* Vehicles On Route */}
        <KPICard
          title="Vehicles On Route"
          value={isLoading ? "..." : summary.activeVehicles}
          unit="active"
          change={{
            value: "All operational",
            positive: true,
          }}
          icon={<Zap className="h-5 w-5" />}
          iconBgColor="bg-secondary-50 text-secondary-400"
          progress={{
            value: 89,
            label: "On schedule: 16",
            target: "Delayed: 2",
          }}
        />
        
        {/* Fuel Consumption */}
        <KPICard
          title="Fuel Consumption"
          value={isLoading ? "..." : Math.round(summary.fuelConsumption)}
          unit="gallons"
          change={{
            value: "+5.2% vs target",
            positive: false,
          }}
          icon={<ChartBarStacked className="h-5 w-5" />}
          iconBgColor="bg-warning-500 bg-opacity-10 text-warning-500"
          chart={
            <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke="hsl(217, 71%, 45%)"
                strokeWidth="2"
                points="0,80 25,75 50,70 75,85 100,65 125,60 150,50 175,45 200,55 225,40 250,35 275,30 300,25"
              />
              <line x1="225" y1="0" x2="225" y2="100" stroke="#e1e5eb" strokeWidth="1" strokeDasharray="4" />
              <text x="235" y="15" fontSize="10" fill="#5a6a79">Current</text>
            </svg>
          }
        />
        
        {/* Carbon Emissions */}
        <KPICard
          title="Carbon Emissions"
          value={isLoading ? "..." : summary.carbonEmissions}
          unit="metric tons"
          change={{
            value: "-8.4% vs last week",
            positive: true,
          }}
          icon={<RefreshCw className="h-5 w-5" />}
          iconBgColor="bg-success-500 bg-opacity-10 text-success-500"
          chart={
            <div className="w-full h-full relative">
              <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                <polygon
                  fill="rgba(76, 175, 80, 0.1)"
                  stroke="none"
                  points="0,100 0,70 50,65 100,75 150,60 200,50 250,40 300,45 300,100"
                />
                <polyline
                  fill="none"
                  stroke="#4caf50"
                  strokeWidth="2"
                  points="0,70 50,65 100,75 150,60 200,50 250,40 300,45"
                />
                <line x1="200" y1="0" x2="200" y2="100" stroke="#e1e5eb" strokeWidth="1" strokeDasharray="4" />
                <text x="210" y="15" fontSize="10" fill="#5a6a79">Current</text>
              </svg>
              
              <div className="absolute top-3 left-0 right-0 flex justify-between items-center text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-success-500 mr-2"></div>
                  <span className="text-neutral-600">Saved: {isLoading ? "..." : summary.carbonSaved} tons</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-warning-500 mr-2"></div>
                  <span className="text-neutral-600">Target: 2.8 tons</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-error-500 mr-2"></div>
                  <span className="text-neutral-600">YTD: 186 tons</span>
                </div>
              </div>
            </div>
          }
        />
      </div>
      
      {/* Map and Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <MapView />
        <AlertsActivity />
      </div>
      
      {/* Operations & Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <VehiclePerformance />
        <CitizenEngagement />
      </div>
    </>
  );
}
