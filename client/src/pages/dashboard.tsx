import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ArrowUp, 
  Leaf, 
  Clock, 
  BarChart3,
  Recycle,
  Users,
  Lightbulb,
  ChevronRight,
  DollarSign,
  AlertCircle, 
  BellRing,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowRightCircle,
  Truck,
  RefreshCw,
  Bell,
  XCircle,
  Flag,
  Award,
  Filter,
  Calendar,
  Map
} from "lucide-react";
import { Link } from "wouter";
import { formatDistance, formatNumber } from "@/lib/data";

// Function to get a random value within a range for simulating real-time data points
const getRandomValue = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState<string>("month");
  const [alertFilter, setAlertFilter] = useState<string>("all");
  const chartContainerRef = useRef<HTMLDivElement>(null);
  
  // Format current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });
  
  // Key metrics data
  const efficiencyMetrics = {
    routeEfficiency: { value: 36.8, change: 12.4 },
    timeEfficiency: { value: 28.22, change: 8.7 },
    fuelConsumption: { value: 24.5, change: 5.3 },
    fuelSaved: 1842,
    distanceSaved: 4287,
    timeSaved: 384,
    co2Reduced: 9264,
    routesOptimized: 9,
    recommendationCount: 3,
    alertCount: 1
  };
  
  // Generate more dynamic data for chart with natural variations for realistic data
  const generateDataPoints = (baseValues: number[], pattern: string = 'natural') => {
    if (pattern === 'natural') {
      // Create more natural-looking data with occasional dips and spikes
      return baseValues.map((value, index) => {
        // Base value with slight noise (±5%)
        let newValue = value * (1 + (Math.random() * 0.1 - 0.05));
        
        // Add occasional significant variations (spikes or dips)
        if (Math.random() > 0.7) {
          // 30% chance of a significant variation
          const multiplier = Math.random() > 0.5 ? 
            1 + Math.random() * 0.25 :  // spike up to +25%
            1 - Math.random() * 0.20;   // dip up to -20%
          newValue *= multiplier;
        }
        
        // Occasional plateau (similar to previous value)
        if (index > 0 && Math.random() > 0.8) {
          // 20% chance to be similar to previous value
          const prevValue = baseValues[index-1];
          newValue = prevValue * (1 + (Math.random() * 0.03 - 0.015));
        }
        
        return Math.round(newValue);
      });
    } else {
      // Simple random variation
      return baseValues.map(value => {
        const variance = value * 0.15; // 15% variance
        return Math.round(value + getRandomValue(-variance, variance));
      });
    }
  };
  
  // Historical data for trend chart with more realistic data patterns
  const trendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        name: 'Fuel Savings (gal)',
        data: generateDataPoints([120, 145, 162, 170, 185, 190, 210, 232, 245, 260, 275, 290]),
        color: '#28a745'
      },
      {
        name: 'Distance Reduction (mi)',
        data: generateDataPoints([280, 310, 330, 360, 390, 410, 440, 460, 480, 520, 550, 580]),
        color: '#3b82f6'
      },
      {
        name: 'Time Saved (hrs)',
        data: generateDataPoints([24, 28, 30, 32, 36, 38, 40, 42, 44, 46, 48, 50]),
        color: '#8b5cf6'
      }
    ],
    milestones: [
      { month: 'Feb', label: '1,000 gal milestone', dataset: 0 },
      { month: 'Jul', label: '3,000 mi milestone', dataset: 1 },
      { month: 'Oct', label: '300 hrs saved', dataset: 2 }
    ]
  };
  
  // Carbon Credits data
  const carbonCredits = {
    total: 352,
    available: 214,
    value: 9680,
    projectedAnnual: 28500,
    goalPercentage: 68
  };
  
  // Alerts and insights
  const alertsAndInsights = [
    {
      id: 1,
      type: 'alert',
      severity: 'high',
      category: 'vehicle',
      title: 'Vehicle Maintenance Required',
      message: 'WM-T12 is due for maintenance in 2 days. Schedule service to avoid route disruptions.',
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      time: '35 min ago',
      action: '/alerts',
      actionLabel: 'Schedule Service'
    },
    {
      id: 2,
      type: 'insight',
      severity: 'medium',
      category: 'route',
      title: 'Route Efficiency Opportunity',
      message: 'AI detected potential 14% fuel savings by optimizing South District routes during peak hours.',
      icon: <Lightbulb className="h-5 w-5 text-amber-500" />,
      time: '2 hours ago',
      action: '/route-map',
      actionLabel: 'View Routes'
    },
    {
      id: 3,
      type: 'alert',
      severity: 'medium',
      category: 'weather',
      title: 'Weather Impact Alert',
      message: 'Heavy rain forecasted tomorrow may affect East District collection. Consider schedule adjustments.',
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      time: '1 hour ago',
      action: '/alerts',
      actionLabel: 'Adjust Schedule'
    },
    {
      id: 4,
      type: 'insight',
      severity: 'low',
      category: 'market',
      title: 'Material Price Increase',
      message: 'Aluminum recycling value increased by 8.5%. Consider promoting collection campaigns.',
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
      time: '4 hours ago',
      action: '/recycling-marketplace',
      actionLabel: 'View Marketplace'
    },
    {
      id: 5,
      type: 'alert',
      severity: 'high',
      category: 'operations',
      title: 'Missed Collection Reported',
      message: '3 missed collections reported in North District. Dispatch recovery vehicle immediately.',
      icon: <XCircle className="h-5 w-5 text-red-500" />,
      time: '15 min ago',
      action: '/alerts',
      actionLabel: 'Dispatch Vehicle'
    },
    {
      id: 6,
      type: 'insight',
      severity: 'low',
      category: 'carbon',
      title: 'Carbon Credit Milestone',
      message: 'Fleet operations have earned 50 new carbon credits this month, exceeding target by 15%.',
      icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
      time: '1 day ago',
      action: '/carbon-tracking',
      actionLabel: 'View Credits'
    }
  ];
  
  // Recycling marketplace stats
  const recyclingStats = {
    itemsListed: 458,
    totalValue: 12580,
    mostValuableMaterial: 'Aluminum',
    materialPrice: 1.65
  };
  
  // Citizen engagement stats
  const citizenStats = {
    totalReports: 328,
    resolvedRate: 92,
    averageResponseTime: 3.2, // hours
    communityEngagement: 78 // percentage
  };
  
  // Fleet vehicles data
  const fleetVehicles = [
    {
      id: 'WM-T18',
      type: 'Eco-Compactor',
      status: 'active',
      route: 'North District',
      completion: 68,
      eta: '15:45 EST',
      driver: 'M. Chen'
    },
    {
      id: 'WM-T22',
      type: 'Heavy Lifter',
      status: 'delayed',
      route: 'East District',
      completion: 42,
      eta: '16:10 EST (+35 min)',
      driver: 'S. Johnson'
    },
    {
      id: 'WM-T15',
      type: 'Recycler',
      status: 'active',
      route: 'South District',
      completion: 78,
      eta: '14:15 EST',
      driver: 'A. Rodriguez'
    },
    {
      id: 'WM-T08',
      type: 'Compactor',
      status: 'maintenance',
      route: 'N/A',
      completion: 0,
      eta: '16:30 EST (Return)',
      driver: 'Maintenance'
    },
    {
      id: 'WM-T05',
      type: 'Electric Truck',
      status: 'active',
      route: 'Central District',
      completion: 52,
      eta: '17:00 EST',
      driver: 'J. Williams'
    }
  ];
  
  const timeFilterOptions = [
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Quarter", value: "quarter" },
    { label: "Year", value: "year" }
  ];
  
  // Draw the trend chart using Canvas API for dynamic data visualization
  useEffect(() => {
    if (chartContainerRef.current) {
      drawTrendChart();
    }
    
    // Set up a small interval to simulate real-time data updates
    const interval = setInterval(() => {
      if (chartContainerRef.current && Math.random() > 0.7) {
        drawTrendChart(true); // Occasionally refresh with slight data variations
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, [timeFilter]);
  
  const drawTrendChart = (updateData = false) => {
    // If updateData is true, slightly modify data points to simulate real-time updates
    if (updateData) {
      trendData.datasets.forEach(dataset => {
        dataset.data = dataset.data.map(val => val + getRandomValue(-5, 5));
      });
    }
  
    const canvas = document.createElement('canvas');
    canvas.width = chartContainerRef.current?.clientWidth || 800;
    canvas.height = chartContainerRef.current?.clientHeight || 300;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    
    // Clear previous chart
    if (chartContainerRef.current?.firstChild) {
      chartContainerRef.current.removeChild(chartContainerRef.current.firstChild);
    }
    
    // Add new chart
    chartContainerRef.current?.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Draw chart background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid lines
      ctx.strokeStyle = '#f1f5f9';  // Very light blue-gray for grid
      ctx.lineWidth = 1;
      
      // Horizontal grid lines with labels
      const gridCount = 5;
      const chartAreaHeight = canvas.height - 40; // Reserve space for labels
      const chartAreaTop = 30; // Space at top
      
      // Find the max value across all datasets for proper scaling
      const allValues = trendData.datasets.flatMap(d => d.data);
      const maxValue = Math.max(...allValues) * 1.1; // Add 10% padding
      
      for (let i = 0; i <= gridCount; i++) {
        const y = chartAreaTop + (chartAreaHeight / gridCount) * i;
        
        // Draw grid line
        ctx.beginPath();
        ctx.moveTo(80, y); // Start after y-axis labels
        ctx.lineTo(canvas.width - 20, y);
        ctx.stroke();
        
        // Draw y-axis labels
        if (i < gridCount) { // Skip the very bottom one
          const value = Math.round(maxValue - (maxValue / gridCount) * i);
          ctx.fillStyle = '#64748b'; // Slate-500
          ctx.font = '12px Roboto, sans-serif';
          ctx.textAlign = 'right';
          ctx.fillText(value.toString(), 70, y + 4);
        }
      }
      
      // Vertical grid lines (months) with labels
      const chartAreaWidth = canvas.width - 100; // Reserve space for y-axis labels
      const chartAreaLeft = 80;
      const months = trendData.labels.length;
      
      for (let i = 0; i < months; i++) {
        const x = chartAreaLeft + (chartAreaWidth / months) * i;
        
        // Draw grid line (slightly thicker for Q1, Q2, etc.)
        ctx.beginPath();
        ctx.strokeStyle = (i % 3 === 0) ? '#e2e8f0' : '#f1f5f9';
        ctx.lineWidth = (i % 3 === 0) ? 1.5 : 1;
        ctx.moveTo(x, chartAreaTop);
        ctx.lineTo(x, chartAreaTop + chartAreaHeight);
        ctx.stroke();
        
        // Draw month labels
        ctx.fillStyle = '#64748b';
        ctx.font = '12px Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(trendData.labels[i], x, canvas.height - 10);
        
        // Add quarter labels (Q1, Q2, etc.)
        if (i % 3 === 0) {
          ctx.fillStyle = '#475569'; // Slate-600, slightly darker
          ctx.font = 'bold 12px Roboto, sans-serif';
          ctx.fillText(`Q${Math.floor(i/3) + 1}`, x, canvas.height - 25);
        }
      }
      
      // Draw area charts and lines
      trendData.datasets.forEach((dataset, datasetIndex) => {
        const color = dataset.color;
        
        // Set up area fill style
        const gradient = ctx.createLinearGradient(0, chartAreaTop, 0, chartAreaTop + chartAreaHeight);
        gradient.addColorStop(0, `${color}33`); // 20% opacity at top
        gradient.addColorStop(1, `${color}05`); // 3% opacity at bottom
        
        // Draw area
        ctx.fillStyle = gradient;
        ctx.beginPath();
        
        // Start point at bottom
        const firstX = chartAreaLeft + (chartAreaWidth / months) * 0;
        ctx.moveTo(firstX, chartAreaTop + chartAreaHeight);
        
        // Draw points connecting to the top of each value
        dataset.data.forEach((value, index) => {
          const x = chartAreaLeft + (chartAreaWidth / months) * index;
          const normalizedValue = value / maxValue;
          const y = chartAreaTop + chartAreaHeight - (normalizedValue * chartAreaHeight);
          ctx.lineTo(x, y);
        });
        
        // Complete the area by connecting to the bottom right and back to start
        const lastX = chartAreaLeft + (chartAreaWidth / months) * (months - 1);
        ctx.lineTo(lastX, chartAreaTop + chartAreaHeight);
        ctx.closePath();
        ctx.fill();
        
        // Draw the line on top
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.beginPath();
        
        dataset.data.forEach((value, index) => {
          const x = chartAreaLeft + (chartAreaWidth / months) * index;
          const normalizedValue = value / maxValue;
          const y = chartAreaTop + chartAreaHeight - (normalizedValue * chartAreaHeight);
          
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          
          // Draw data points
          ctx.save();
          ctx.fillStyle = '#ffffff';
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        });
        
        ctx.stroke();
        
        // Add data values on hover (in a real implementation)
        // This would use canvas event listeners
      });
      
      // Draw milestone flags
      trendData.milestones.forEach(milestone => {
        const monthIndex = trendData.labels.indexOf(milestone.month);
        if (monthIndex !== -1) {
          const dataset = trendData.datasets[milestone.dataset];
          const value = dataset.data[monthIndex];
          
          const x = chartAreaLeft + (chartAreaWidth / months) * monthIndex;
          const normalizedValue = value / maxValue;
          const y = chartAreaTop + chartAreaHeight - (normalizedValue * chartAreaHeight) - 25; // Position above the data point
          
          // Draw flag
          ctx.fillStyle = dataset.color;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + 15, y + 8);
          ctx.lineTo(x, y + 16);
          ctx.closePath();
          ctx.fill();
          
          // Draw flagpole
          ctx.strokeStyle = dataset.color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + 40);
          ctx.stroke();
          
          // Draw tooltip-style label
          const labelWidth = ctx.measureText(milestone.label).width + 16;
          const labelHeight = 24;
          const labelX = x - labelWidth / 2;
          const labelY = y - labelHeight - 5;
          
          // Draw tooltip background
          ctx.fillStyle = '#3e3e3e';
          ctx.beginPath();
          ctx.roundRect(labelX, labelY, labelWidth, labelHeight, 4);
          ctx.fill();
          
          // Draw tooltip text
          ctx.fillStyle = '#ffffff';
          ctx.font = '11px Roboto, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(milestone.label, x, labelY + 16);
          
          // Draw tooltip pointer
          ctx.fillStyle = '#3e3e3e';
          ctx.beginPath();
          ctx.moveTo(x, labelY + labelHeight);
          ctx.lineTo(x - 6, labelY + labelHeight);
          ctx.lineTo(x, labelY + labelHeight + 6);
          ctx.closePath();
          ctx.fill();
        }
      });
      
      // Draw legend
      const legendY = 15;
      let legendX = chartAreaLeft;
      
      trendData.datasets.forEach((dataset, index) => {
        ctx.fillStyle = dataset.color;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        
        // Draw legend color box with white border
        ctx.fillRect(legendX, legendY - 6, 12, 12);
        ctx.strokeRect(legendX, legendY - 6, 12, 12);
        
        // Draw legend text
        ctx.fillStyle = '#334155'; // Slate-700
        ctx.font = '13px Roboto, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(dataset.name, legendX + 18, legendY);
        
        legendX += ctx.measureText(dataset.name).width + 40;
      });
      
      // Draw chart title
      ctx.fillStyle = '#1e293b'; // Slate-800
      ctx.font = 'bold 14px Roboto, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`Impact Metrics (${timeFilter})`, 20, 18);
    }
  };

  return (
    <div className="space-y-6">
      {/* Clean Minimal Header */}
      <div className="flex items-center justify-between bg-white px-6 py-4 border-b border-gray-100">
        <div className="flex items-center">
          <div className="h-9 w-9 bg-green-50 rounded-md flex items-center justify-center mr-3 border border-green-200">
            <Leaf className="h-5 w-5 text-green-600" />
          </div>
          <h1 className="text-xl font-semibold text-gray-800">Fleet AI</h1>
        </div>
        
        <div className="text-center text-sm font-medium text-gray-600">
          {formattedDate}
        </div>
        
        <div className="flex items-center">
          <button className="relative p-2 bg-gray-50 rounded-full hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
        </div>
      </div>
      
      {/* Smart Summary Box */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mx-6 shadow-sm">
        <div className="flex items-start">
          <Lightbulb className="h-5 w-5 text-gray-600 mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-sm text-gray-700">
            <span className="font-medium">AI Summary:</span> Fleet AI optimized {efficiencyMetrics.routesOptimized} routes this week, 
            saving {efficiencyMetrics.timeSaved} hrs and reducing {formatNumber(efficiencyMetrics.co2Reduced)} kg CO₂. 
            {efficiencyMetrics.recommendationCount} new AI recommendations. {efficiencyMetrics.alertCount} maintenance alert.
          </p>
        </div>
      </div>
      
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-6">
        <Card className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-500">Fuel Saved</p>
              <div className="p-2 bg-green-50 rounded-full">
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold text-gray-900">{formatNumber(efficiencyMetrics.fuelSaved)}</h3>
              <span className="ml-1 text-sm text-gray-500">gal</span>
            </div>
            <div className="mt-1 flex items-center text-xs text-green-600">
              <ArrowUp className="inline h-3 w-3 mr-1" />
              <span>↑ {efficiencyMetrics.fuelConsumption.change}% since last {timeFilter}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-500">Distance Reduced</p>
              <div className="p-2 bg-green-50 rounded-full">
                <Map className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold text-gray-900">{formatNumber(efficiencyMetrics.distanceSaved)}</h3>
              <span className="ml-1 text-sm text-gray-500">mi</span>
            </div>
            <div className="mt-1 flex items-center text-xs text-green-600">
              <ArrowUp className="inline h-3 w-3 mr-1" />
              <span>↑ {efficiencyMetrics.routeEfficiency.change}% since last {timeFilter}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-500">Time Saved</p>
              <div className="p-2 bg-green-50 rounded-full">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold text-gray-900">{efficiencyMetrics.timeSaved}</h3>
              <span className="ml-1 text-sm text-gray-500">hrs</span>
            </div>
            <div className="mt-1 flex items-center text-xs text-green-600">
              <ArrowUp className="inline h-3 w-3 mr-1" />
              <span>↑ {efficiencyMetrics.timeEfficiency.change}% since last {timeFilter}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-500">CO₂ Reduced</p>
              <div className="p-2 bg-green-50 rounded-full">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold text-gray-900">{formatNumber(efficiencyMetrics.co2Reduced)}</h3>
              <span className="ml-1 text-sm text-gray-500">kg</span>
            </div>
            <div className="mt-1 flex items-center text-xs text-green-600">
              <ArrowUp className="inline h-3 w-3 mr-1" />
              <span>↑ {efficiencyMetrics.fuelConsumption.change * 1.2}% since last {timeFilter}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-6">
        {/* Impact Trends Chart - Takes 2/3 width */}
        <div className="lg:col-span-2">
          <Card className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <CardHeader className="p-5 bg-white border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-800">Impact Trends</CardTitle>
                <CardDescription className="text-sm text-gray-500">Key metrics performance over time</CardDescription>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="text-xs h-8 bg-white border-gray-200 hover:bg-gray-50" onClick={() => setTimeFilter("week")}>Weekly</Button>
                <Button variant="outline" size="sm" className={`text-xs h-8 ${timeFilter === 'month' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white'}`} onClick={() => setTimeFilter("month")}>Monthly</Button>
                <Button variant="outline" size="sm" className="text-xs h-8 bg-white border-gray-200 hover:bg-gray-50" onClick={() => setTimeFilter("quarter")}>Quarterly</Button>
              </div>
            </CardHeader>
            
            <div ref={chartContainerRef} className="h-[350px] w-full p-5 bg-white">
              {/* Interactive chart will be drawn here with Canvas API */}
            </div>
            
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
              <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200 flex items-center">
                <Flag className="h-3.5 w-3.5 mr-1.5" />
                Milestone Indicators
              </Badge>
              
              <Button variant="outline" size="sm" className="text-xs h-8 flex items-center">
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                Refresh Data
              </Button>
            </div>
          </Card>
        </div>
        
        {/* Operational Feed - Takes 1/3 width */}
        <div className="lg:col-span-1">
          <Card className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <CardHeader className="p-5 bg-white border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-800">Operational Feed</CardTitle>
                  <CardDescription className="text-sm text-gray-500">AI-generated alerts & insights</CardDescription>
                </div>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 font-medium">
                  {alertsAndInsights.filter(a => a.type === 'alert').length} Alerts
                </Badge>
              </div>
            </CardHeader>
            
            <div className="p-3 bg-gray-50 border-b border-gray-100">
              <div className="flex space-x-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`text-xs rounded-md ${alertFilter === 'all' ? 'bg-white shadow-sm font-medium' : 'bg-transparent'}`}
                  onClick={() => setAlertFilter('all')}
                >
                  All
                </Button>
                <Button 
                  variant="ghost"
                  size="sm"
                  className={`text-xs rounded-md ${alertFilter === 'critical' ? 'bg-white shadow-sm font-medium' : 'bg-transparent'}`}
                  onClick={() => setAlertFilter('critical')}
                >
                  Critical
                </Button>
                <Button 
                  variant="ghost"
                  size="sm"
                  className={`text-xs rounded-md ${alertFilter === 'suggestions' ? 'bg-white shadow-sm font-medium' : 'bg-transparent'}`}
                  onClick={() => setAlertFilter('suggestions')}
                >
                  Suggestions
                </Button>
              </div>
            </div>
            
            <div className="max-h-[400px] overflow-y-auto">
              {alertsAndInsights
                .filter(item => {
                  if (alertFilter === 'all') return true;
                  if (alertFilter === 'critical') return item.severity === 'high';
                  if (alertFilter === 'suggestions') return item.type === 'insight';
                  return true;
                })
                .map((item) => (
                <div 
                  key={item.id} 
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    item.severity === 'high' ? 'border-l-4 border-l-red-500' : 
                    item.severity === 'medium' ? 'border-l-4 border-l-amber-500' : 
                    'border-l-4 border-l-green-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium text-gray-900 text-sm truncate pr-2">{item.title}</h3>
                        <span className="text-xs text-gray-500 whitespace-nowrap">{item.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{item.message}</p>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className={`text-xs ${
                          item.type === 'alert' 
                            ? 'bg-red-50 text-red-700 border-red-200' 
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          {item.type === 'alert' ? 'Alert' : 'Insight'}
                        </Badge>
                        
                        <Link href={item.action}>
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-green-600 hover:text-green-700 hover:bg-green-50 p-0">
                            <span>{item.actionLabel}</span>
                            <ArrowRightCircle className="h-3.5 w-3.5 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <CardFooter className="p-4 bg-gray-50 border-t border-gray-100">
              <div className="w-full flex items-center justify-between">
                <Button variant="outline" size="sm" className="text-xs h-8">
                  <BellRing className="h-3.5 w-3.5 mr-1.5" />
                  Manage Alerts
                </Button>
                <Link href="/alerts">
                  <Button variant="outline" size="sm" className="text-xs h-8 bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200">
                    View All Alerts
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Lower Metric Modules - 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-6">
        {/* Carbon Credits Card */}
        <Card className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <CardHeader className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium text-gray-800">Carbon Credits</CardTitle>
              <div className="p-2 bg-green-50 rounded-full">
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">Total Earned</div>
              <div className="text-lg font-bold text-gray-900">{carbonCredits.total}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">Available</div>
              <div className="text-lg font-bold text-green-600">{carbonCredits.available}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">Market Value</div>
              <div className="text-lg font-bold text-gray-900">${formatNumber(carbonCredits.value)}</div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-gray-500">Goal Progress</span>
                <span className="font-medium text-green-600">{carbonCredits.goalPercentage}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-gray-500 h-full rounded-full" style={{ width: `${carbonCredits.goalPercentage}%` }}></div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-5 pt-0 pb-5">
            <Link href="/carbon-tracking" className="w-full">
              <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white">
                View Carbon Credits
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        {/* Recycling Marketplace Card */}
        <Card className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <CardHeader className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium text-gray-800">Recycling Marketplace</CardTitle>
              <div className="p-2 bg-green-50 rounded-full">
                <Recycle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">Items Listed</div>
              <div className="text-lg font-bold text-gray-900">{recyclingStats.itemsListed}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">Total Value</div>
              <div className="text-lg font-bold text-gray-900">${formatNumber(recyclingStats.totalValue)}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">Top Material</div>
              <div className="flex items-center">
                <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 mr-1.5">
                  {recyclingStats.mostValuableMaterial}
                </Badge>
                <span className="text-sm font-medium text-green-600">${recyclingStats.materialPrice.toFixed(2)}/kg</span>
              </div>
            </div>
            <div className="flex items-center p-3 bg-amber-50 border border-amber-100 rounded-md">
              <TrendingUp className="h-4 w-4 text-amber-500 mr-2" />
              <p className="text-xs text-amber-700">
                <span className="font-medium">Market Alert:</span> Aluminum prices up 8.5% this week
              </p>
            </div>
          </CardContent>
          <CardFooter className="px-5 pt-0 pb-5">
            <Link href="/recycling-marketplace" className="w-full">
              <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white">
                View Marketplace
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        {/* Citizen Engagement Card */}
        <Card className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <CardHeader className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium text-gray-800">Citizen Engagement</CardTitle>
              <div className="p-2 bg-green-50 rounded-full">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">Total Reports</div>
              <div className="text-lg font-bold text-gray-900">{citizenStats.totalReports}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">Resolution Rate</div>
              <div className="text-lg font-bold text-green-600">{citizenStats.resolvedRate}%</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">Avg. Response Time</div>
              <div className="text-base font-medium text-gray-800">{citizenStats.averageResponseTime} hrs</div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-gray-500">Community Engagement</span>
                <span className="font-medium text-green-600">{citizenStats.communityEngagement}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-gray-500 h-full rounded-full" style={{ width: `${citizenStats.communityEngagement}%` }}></div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-5 pt-0 pb-5">
            <Link href="/citizen-engagement" className="w-full">
              <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white">
                View Reports
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      
      {/* Fleet Overview Section - Interactive Table */}
      <div className="mx-6 mb-6">
        <Card className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <CardHeader className="p-5 bg-white border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-800">Active Fleet Status</CardTitle>
              <CardDescription className="text-sm text-gray-500">Real-time vehicle locations and operations</CardDescription>
            </div>
            
            <div className="flex space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></div>
                Active
              </Badge>
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mr-1.5"></div>
                Delayed
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-1.5"></div>
                Maintenance
              </Badge>
            </div>
          </CardHeader>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-medium">Vehicle ID</TableHead>
                  <TableHead className="font-medium">Type</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">Route</TableHead>
                  <TableHead className="font-medium">Completion</TableHead>
                  <TableHead className="font-medium">ETA</TableHead>
                  <TableHead className="font-medium">Driver</TableHead>
                  <TableHead className="font-medium text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fleetVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id} className="hover:bg-gray-50 border-b border-gray-100">
                    <TableCell className="font-medium">{vehicle.id}</TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`
                        ${vehicle.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 
                          vehicle.status === 'delayed' ? 'bg-orange-50 text-orange-700 border-orange-200' : 
                          'bg-blue-50 text-blue-700 border-blue-200'}
                      `}>
                        <div className={`h-1.5 w-1.5 rounded-full mr-1.5 
                          ${vehicle.status === 'active' ? 'bg-green-500' : 
                            vehicle.status === 'delayed' ? 'bg-orange-500' : 
                            'bg-blue-500'}
                        `}></div>
                        {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{vehicle.route}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              vehicle.status === 'active' ? 'bg-green-500' : 
                              vehicle.status === 'delayed' ? 'bg-orange-500' : 
                              'bg-blue-500'
                            }`} 
                            style={{ width: `${vehicle.completion}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-500">{vehicle.completion}%</span>
                      </div>
                    </TableCell>
                    <TableCell className={`
                      ${vehicle.status === 'active' ? 'text-green-600' : 
                        vehicle.status === 'delayed' ? 'text-orange-600' : 
                        'text-blue-600'}
                    `}>{vehicle.eta}</TableCell>
                    <TableCell>{vehicle.driver}</TableCell>
                    <TableCell className="text-right">
                      <Link href="/route-map">
                        <Button variant="outline" size="sm" className="h-7 text-xs bg-white">
                          View Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <CardFooter className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between">
            <div className="text-sm text-gray-600">
              <span className="font-medium">25</span> Total Vehicles in Fleet
            </div>
            <Button variant="outline" size="sm" className="h-8 bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              Schedule Optimization
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
