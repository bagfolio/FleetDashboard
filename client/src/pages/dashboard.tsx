import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowUp, 
  ArrowDown,
  Map, 
  Leaf, 
  Clock, 
  BarChart3,
  Recycle,
  Users,
  Lightbulb,
  CalendarDays,
  ChevronRight,
  DollarSign
} from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState<string>("month");
  
  // In a real app, this would come from the API
  const efficiencyMetrics = {
    routeEfficiency: {
      value: 36.8,
      change: 12.4,
      description: "Reduction in transportation distance"
    },
    operationalEfficiency: {
      value: 13.35,
      change: 3.2,
      description: "Reduction in operational expenses"
    },
    timeEfficiency: {
      value: 28.22,
      change: 8.7,
      description: "Reduction in collection time"
    },
    fuelConsumption: {
      value: 24.5,
      change: 5.3,
      description: "Reduction in fuel usage"
    }
  };
  
  const timeFilterOptions = [
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Quarter", value: "quarter" },
    { label: "Year", value: "year" }
  ];

  return (
    <>
      {/* Title and Description */}
      <div className="mb-6">
        <div className="flex items-center">
          <div className="h-8 w-8 bg-green-50 rounded-md flex items-center justify-center mr-3 border border-green-200">
            <Leaf className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Fleet AI</h1>
            <p className="text-sm text-gray-500">AI-powered solutions for route optimization, citizen engagement, and sustainability</p>
          </div>
        </div>
      </div>
      
      {/* Efficiency Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Route Efficiency */}
        <div className="card-stats">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="stat-label">Route Efficiency</h3>
              <Map className="h-5 w-5 text-green-600" />
            </div>
            <div className="stat-value">{efficiencyMetrics.routeEfficiency.value}%</div>
            <div className="text-xs text-gray-500">{efficiencyMetrics.routeEfficiency.description}</div>
            <div className="stat-change-positive">
              <ArrowUp className="h-3.5 w-3.5 mr-1" /> {efficiencyMetrics.routeEfficiency.change}% from last {timeFilter}
            </div>
          </div>
        </div>
        
        {/* Operational Efficiency */}
        <div className="card-stats">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="stat-label">Operational Efficiency</h3>
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div className="stat-value">{efficiencyMetrics.operationalEfficiency.value}%</div>
            <div className="text-xs text-gray-500">{efficiencyMetrics.operationalEfficiency.description}</div>
            <div className="stat-change-positive">
              <ArrowUp className="h-3.5 w-3.5 mr-1" /> {efficiencyMetrics.operationalEfficiency.change}% from last {timeFilter}
            </div>
          </div>
        </div>
        
        {/* Time Efficiency */}
        <div className="card-stats">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="stat-label">Time Efficiency</h3>
              <Clock className="h-5 w-5 text-green-600" />
            </div>
            <div className="stat-value">{efficiencyMetrics.timeEfficiency.value}%</div>
            <div className="text-xs text-gray-500">{efficiencyMetrics.timeEfficiency.description}</div>
            <div className="stat-change-positive">
              <ArrowUp className="h-3.5 w-3.5 mr-1" /> {efficiencyMetrics.timeEfficiency.change}% from last {timeFilter}
            </div>
          </div>
        </div>
        
        {/* Fuel Consumption */}
        <div className="card-stats">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="stat-label">Fuel Consumption</h3>
              <Leaf className="h-5 w-5 text-green-600" />
            </div>
            <div className="stat-value">{efficiencyMetrics.fuelConsumption.value}%</div>
            <div className="text-xs text-gray-500">{efficiencyMetrics.fuelConsumption.description}</div>
            <div className="stat-change-positive">
              <ArrowUp className="h-3.5 w-3.5 mr-1" /> {efficiencyMetrics.fuelConsumption.change}% from last {timeFilter}
            </div>
          </div>
        </div>
      </div>
      
      {/* Feature Navigation Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Link href="/route-map">
          <div className="card-section hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-800">Route Optimization</h3>
              <div className="p-2 bg-green-50 rounded-full">
                <Map className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">AI-powered route planning based on historical data, traffic patterns, and weather conditions</p>
            <Button variant="link" className="p-0 h-auto text-green-600 hover:text-green-700">
              View Routes <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </Link>
        
        <Link href="/citizen-engagement">
          <div className="card-section hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-800">Citizen Engagement</h3>
              <div className="p-2 bg-green-50 rounded-full">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">Community feedback and reporting system for waste management and recycling services</p>
            <Button variant="link" className="p-0 h-auto text-green-600 hover:text-green-700">
              View Reports <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </Link>
        
        <Link href="/recycling-marketplace">
          <div className="card-section hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-800">Recycling Marketplace</h3>
              <div className="p-2 bg-green-50 rounded-full">
                <Recycle className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">Digital marketplace for recyclable materials and waste exchange services</p>
            <Button variant="link" className="p-0 h-auto text-green-600 hover:text-green-700">
              Browse Market <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </Link>
        
        <Link href="/carbon-tracking">
          <div className="card-section hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-800">Carbon Credits</h3>
              <div className="p-2 bg-green-50 rounded-full">
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">Track and monetize carbon reduction through efficient waste management operations</p>
            <Button variant="link" className="p-0 h-auto text-green-600 hover:text-green-700">
              View Credits <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </Link>
      </div>
      
      {/* Map Card for Route Optimization */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2 card-section">
          <div className="card-header">
            <h3>Route Optimization</h3>
            <Button variant="outline" className="text-xs h-7 bg-green-50 border-green-200 text-green-700 hover:bg-green-100">
              Optimize Routes
            </Button>
          </div>
          
          <div className="bg-gray-100 h-96 rounded-md flex items-center justify-center">
            <div className="text-center">
              <Map className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Interactive Map View</p>
              <p className="text-gray-400 text-sm">Select a zone and date to optimize routes</p>
            </div>
          </div>
        </div>
        
        <div className="card-section">
          <div className="card-header">
            <h3>Optimization Controls</h3>
          </div>
          
          <div className="space-y-5">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Collection Zone</h4>
              <div className="p-2 text-sm bg-gray-50 border border-gray-200 rounded-md flex justify-between items-center">
                <span>North District</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Collection Date</h4>
              <div className="p-2 text-sm bg-gray-50 border border-gray-200 rounded-md flex justify-between items-center">
                <span>Today</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Optimization Priority</h4>
              <div className="p-2 text-sm bg-gray-50 border border-gray-200 rounded-md flex justify-between items-center">
                <span>Balanced</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <Button className="w-full btn-green">Optimize Routes</Button>
          </div>
        </div>
      </div>
    </>
  );
}
