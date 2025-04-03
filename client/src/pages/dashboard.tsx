import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowUp, 
  ArrowDown,
  Map, 
  Leaf, 
  Clock, 
  BarChart3,
  BarChart4,
  Recycle,
  Users,
  Lightbulb,
  CalendarDays,
  ChevronRight,
  DollarSign,
  AlertCircle, 
  BellRing,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowRightCircle,
  Truck,
  Info,
  RefreshCw,
  UserCircle2,
  LogOut,
  Bell,
  XCircle,
  ShieldAlert,
  Zap,
  Filter
} from "lucide-react";
import { Link } from "wouter";
import { formatDistance, formatNumber, formatPercentage } from "@/lib/data";

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState<string>("month");
  const [selectedTab, setSelectedTab] = useState<string>("overview");
  const chartContainerRef = useRef<HTMLDivElement>(null);
  
  // Format current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });
  const formattedTime = currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // In a real app, these would come from the API
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
    },
    fuelSaved: 1842,
    distanceSaved: 4287,
    timeSaved: 384,
    co2Reduced: 9264
  };
  
  // Historical data for trend chart
  const trendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        name: 'Fuel Savings (gal)',
        data: [120, 145, 162, 170, 185, 190, 210, 232, 245, 260, 275, 290]
      },
      {
        name: 'Distance Reduction (mi)',
        data: [280, 310, 330, 360, 390, 410, 440, 460, 480, 520, 550, 580]
      },
      {
        name: 'Time Saved (hrs)',
        data: [24, 28, 30, 32, 36, 38, 40, 42, 44, 46, 48, 50]
      }
    ]
  };
  
  // Carbon Credits data
  const carbonCredits = {
    total: 352,
    available: 214,
    value: 9680,
    projectedAnnual: 28500,
    growth: 18.5
  };
  
  // Alerts and insights
  const alertsAndInsights = [
    {
      id: 1,
      type: 'alert',
      severity: 'high',
      title: 'Vehicle Maintenance Required',
      message: 'WM-T12 is due for maintenance in 2 days. Schedule service to avoid route disruptions.',
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      time: '35 min ago',
      action: '/alerts'
    },
    {
      id: 2,
      type: 'insight',
      severity: 'medium',
      title: 'Route Efficiency Opportunity',
      message: 'AI detected potential 14% fuel savings by optimizing South District routes during peak hours.',
      icon: <Lightbulb className="h-5 w-5 text-amber-500" />,
      time: '2 hours ago',
      action: '/route-map'
    },
    {
      id: 3,
      type: 'alert',
      severity: 'medium',
      title: 'Weather Impact Alert',
      message: 'Heavy rain forecasted tomorrow may affect East District collection. Consider schedule adjustments.',
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      time: '1 hour ago',
      action: '/alerts'
    },
    {
      id: 4,
      type: 'insight',
      severity: 'low',
      title: 'Material Price Increase',
      message: 'Aluminum recycling value increased by 8.5%. Consider promoting collection campaigns.',
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
      time: '4 hours ago',
      action: '/recycling-marketplace'
    },
    {
      id: 5,
      type: 'alert',
      severity: 'high',
      title: 'Missed Collection Reported',
      message: '3 missed collections reported in North District. Dispatch recovery vehicle immediately.',
      icon: <XCircle className="h-5 w-5 text-red-500" />,
      time: '15 min ago',
      action: '/alerts'
    },
    {
      id: 6,
      type: 'insight',
      severity: 'low',
      title: 'Carbon Credit Milestone',
      message: 'Fleet operations have earned 50 new carbon credits this month, exceeding target by 15%.',
      icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
      time: '1 day ago',
      action: '/carbon-tracking'
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
  
  const timeFilterOptions = [
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Quarter", value: "quarter" },
    { label: "Year", value: "year" }
  ];
  
  // Simulate chart with canvas
  useEffect(() => {
    if (chartContainerRef.current) {
      drawTrendChart();
    }
  }, [timeFilter, selectedTab]);
  
  const drawTrendChart = () => {
    const canvas = document.createElement('canvas');
    canvas.width = chartContainerRef.current?.clientWidth || 800;
    canvas.height = chartContainerRef.current?.clientHeight || 300;
    canvas.className = 'trend-chart';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    
    // Clear previous chart
    if (chartContainerRef.current?.firstChild) {
      chartContainerRef.current.removeChild(chartContainerRef.current.firstChild);
    }
    
    // Add new chart
    chartContainerRef.current?.appendChild(canvas);
    
    // In a real app, we would use Chart.js or Recharts to render the actual chart
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Draw chart background
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid lines
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      
      // Horizontal grid lines
      const gridCount = 5;
      for (let i = 1; i < gridCount; i++) {
        const y = (canvas.height / gridCount) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Vertical grid lines (months)
      const months = trendData.labels.length;
      for (let i = 0; i < months; i++) {
        const x = (canvas.width / months) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
        
        // Draw month labels
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(trendData.labels[i], x + (canvas.width / months) / 2, canvas.height - 10);
      }
      
      // Draw data lines
      const datasetColors = ['#28a745', '#0d6efd', '#6f42c1'];
      
      trendData.datasets.forEach((dataset, datasetIndex) => {
        const maxDataValue = Math.max(...dataset.data);
        
        ctx.strokeStyle = datasetColors[datasetIndex];
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        dataset.data.forEach((value, index) => {
          const x = (canvas.width / months) * index + (canvas.width / months) / 2;
          const y = canvas.height - (value / maxDataValue) * (canvas.height - 40) - 20;
          
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        
        ctx.stroke();
      });
      
      // Draw legend
      const legendY = 20;
      let legendX = 20;
      
      trendData.datasets.forEach((dataset, index) => {
        ctx.fillStyle = datasetColors[index];
        ctx.fillRect(legendX, legendY, 15, 15);
        
        ctx.fillStyle = '#374151';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(dataset.name, legendX + 20, legendY + 12);
        
        legendX += ctx.measureText(dataset.name).width + 50;
      });
    }
  };

  // Responsive layout functions
  const renderHeader = () => (
    <div className="flex items-center justify-between p-6 bg-white border-b border-gray-100 mb-6">
      <div className="flex items-center">
        <div className="h-10 w-10 bg-green-50 rounded-md flex items-center justify-center mr-3 border border-green-200">
          <Leaf className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Fleet AI Command Center</h1>
          <p className="text-sm text-gray-500">Optimize your waste management fleet operations</p>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="text-right mr-6 hidden md:block">
          <div className="text-sm font-medium text-gray-900">{formattedDate}</div>
          <div className="text-xs text-gray-500">{formattedTime}</div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 bg-gray-50 rounded-full hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          <div className="flex items-center">
            <div className="h-9 w-9 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold mr-2">
              JD
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium text-gray-900">John Doe</div>
              <div className="text-xs text-gray-500">Operations Manager</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSummaryKPIs = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Fuel Saved</p>
              <div className="flex items-baseline mt-1">
                <h3 className="text-2xl font-bold text-gray-900">{formatNumber(efficiencyMetrics.fuelSaved)}</h3>
                <span className="ml-1 text-sm text-gray-500">gal</span>
              </div>
              <div className="mt-1 flex items-center text-xs text-green-600">
                <ArrowUp className="inline h-3 w-3 mr-1" />
                <span>{efficiencyMetrics.fuelConsumption.change}% from last {timeFilter}</span>
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Distance Reduced</p>
              <div className="flex items-baseline mt-1">
                <h3 className="text-2xl font-bold text-gray-900">{formatNumber(efficiencyMetrics.distanceSaved)}</h3>
                <span className="ml-1 text-sm text-gray-500">mi</span>
              </div>
              <div className="mt-1 flex items-center text-xs text-green-600">
                <ArrowUp className="inline h-3 w-3 mr-1" />
                <span>{efficiencyMetrics.routeEfficiency.change}% from last {timeFilter}</span>
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <Map className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Time Saved</p>
              <div className="flex items-baseline mt-1">
                <h3 className="text-2xl font-bold text-gray-900">{efficiencyMetrics.timeSaved}</h3>
                <span className="ml-1 text-sm text-gray-500">hrs</span>
              </div>
              <div className="mt-1 flex items-center text-xs text-green-600">
                <ArrowUp className="inline h-3 w-3 mr-1" />
                <span>{efficiencyMetrics.timeEfficiency.change}% from last {timeFilter}</span>
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">CO₂ Reduced</p>
              <div className="flex items-baseline mt-1">
                <h3 className="text-2xl font-bold text-gray-900">{formatNumber(efficiencyMetrics.co2Reduced)}</h3>
                <span className="ml-1 text-sm text-gray-500">kg</span>
              </div>
              <div className="mt-1 flex items-center text-xs text-green-600">
                <ArrowUp className="inline h-3 w-3 mr-1" />
                <span>{efficiencyMetrics.fuelConsumption.change * 1.2}% from last {timeFilter}</span>
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMainDashboard = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
      {/* Left Panel - Trend Chart (70% width) */}
      <div className="lg:col-span-8 space-y-6">
        <Card className="border border-gray-200 shadow-sm overflow-hidden">
          <CardHeader className="p-4 bg-white border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-800">Operational Trends</CardTitle>
              <CardDescription className="text-sm text-gray-500">Key metrics performance over time</CardDescription>
            </div>
            
            <div className="flex items-center space-x-3">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-32 h-8 text-xs bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  {timeFilterOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm" className="h-8 text-xs bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 flex items-center">
                <Filter className="h-3.5 w-3.5 mr-1" />
                Filter
              </Button>
            </div>
          </CardHeader>
          
          <div ref={chartContainerRef} className="h-[350px] w-full p-4">
            {/* Chart will be drawn here dynamically */}
          </div>
          
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex flex-wrap gap-3 justify-center sm:justify-between">
            <Button variant="outline" size="sm" className="text-xs h-8 bg-white">
              <RefreshCw className="h-3.5 w-3.5 mr-1" />
              Refresh Data
            </Button>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="text-xs h-8 bg-white">Weekly</Button>
              <Button variant="outline" size="sm" className="text-xs h-8 bg-green-50 border-green-200 text-green-700">Monthly</Button>
              <Button variant="outline" size="sm" className="text-xs h-8 bg-white">Quarterly</Button>
              <Button variant="outline" size="sm" className="text-xs h-8 bg-white">Yearly</Button>
            </div>
          </div>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Carbon Credits Summary */}
          <Card className="bg-white border border-gray-200 shadow-sm hover:border-green-300 transition-colors">
            <CardHeader className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-gray-800">Carbon Credits</CardTitle>
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
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
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">YTD Progress</span>
                  <span className="font-medium text-green-600">68%</span>
                </div>
                <Progress value={68} className="h-1.5" />
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link href="/carbon-tracking">
                <Button className="w-full text-xs btn-green">
                  View Carbon Credits
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          {/* Recycling Marketplace Summary */}
          <Card className="bg-white border border-gray-200 shadow-sm hover:border-green-300 transition-colors">
            <CardHeader className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-gray-800">Recycling Market</CardTitle>
                <Recycle className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
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
                <div className="text-base font-medium text-gray-800">{recyclingStats.mostValuableMaterial}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">Current Price</div>
                <div className="text-base font-medium text-green-600">${recyclingStats.materialPrice.toFixed(2)}/kg</div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link href="/recycling-marketplace">
                <Button className="w-full text-xs btn-green">
                  View Marketplace
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          {/* Citizen Engagement Summary */}
          <Card className="bg-white border border-gray-200 shadow-sm hover:border-green-300 transition-colors">
            <CardHeader className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-gray-800">Citizen Engagement</CardTitle>
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
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
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Community Engagement</span>
                  <span className="font-medium text-green-600">{citizenStats.communityEngagement}%</span>
                </div>
                <Progress value={citizenStats.communityEngagement} className="h-1.5" />
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link href="/citizen-engagement">
                <Button className="w-full text-xs btn-green">
                  View Reports
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Right Panel - Alerts and Insights (30% width) */}
      <div className="lg:col-span-4">
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="p-4 bg-white border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-800">Alerts & Insights</CardTitle>
                <CardDescription className="text-sm text-gray-500">AI-generated notifications</CardDescription>
              </div>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                5 New
              </Badge>
            </div>
          </CardHeader>
          
          <div className="max-h-[760px] overflow-y-auto">
            {alertsAndInsights.map((item) => (
              <div key={item.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                item.severity === 'high' ? 'border-l-2 border-l-red-500' : 
                item.severity === 'medium' ? 'border-l-2 border-l-amber-500' : 
                'border-l-2 border-l-green-500'
              }`}>
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900 text-sm">{item.title}</h3>
                      <span className="text-xs text-gray-500">{item.time}</span>
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
                        <Button variant="ghost" size="sm" className="h-8 text-xs text-green-600 hover:text-green-700 hover:bg-green-50 p-0">
                          <span>Take Action</span>
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
                <BellRing className="h-3.5 w-3.5 mr-1" />
                Manage Alerts
              </Button>
              <Link href="/alerts">
                <Button variant="outline" size="sm" className="text-xs h-8 bg-green-50 border-green-200 text-green-700 hover:bg-green-100">
                  View All Alerts
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
  
  const renderActiveFleetSection = () => (
    <Card className="border border-gray-200 shadow-sm mb-6">
      <CardHeader className="p-4 bg-white border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <div>
          <CardTitle className="text-lg font-semibold text-gray-800">Active Fleet Status</CardTitle>
          <CardDescription className="text-sm text-gray-500">Real-time vehicle status and operations</CardDescription>
        </div>
        
        <div className="flex space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></div>
            18 Active
          </Badge>
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mr-1.5"></div>
            3 Delayed
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-1.5"></div>
            4 Maintenance
          </Badge>
        </div>
      </CardHeader>
      
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Fleet Cards */}
        <Card className="border border-gray-200 hover:border-green-300 hover:shadow-md transition-all">
          <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h4 className="font-medium text-gray-800">WM-T18 Eco-Compactor</h4>
              <Badge variant="outline" className="mt-1 bg-green-50 text-green-700 border-green-200 text-xs">
                Active
              </Badge>
            </div>
            <div className="p-1.5 bg-green-50 rounded-full">
              <Truck className="h-5 w-5 text-green-600" />
            </div>
          </div>
          
          <CardContent className="p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Route:</span>
              <span className="font-medium text-gray-800">North District</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Completion:</span>
              <span className="font-medium text-gray-800">68%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '68%' }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">ETA:</span>
              <span className="font-medium text-green-600">15:45 EST</span>
            </div>
            
            <Link href="/route-map">
              <Button className="w-full text-xs h-8 mt-1 btn-green">View Route</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 hover:border-green-300 hover:shadow-md transition-all">
          <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h4 className="font-medium text-gray-800">WM-T22 Heavy Lifter</h4>
              <Badge variant="outline" className="mt-1 bg-orange-50 text-orange-700 border-orange-200 text-xs">
                Delayed
              </Badge>
            </div>
            <div className="p-1.5 bg-orange-50 rounded-full">
              <Truck className="h-5 w-5 text-orange-600" />
            </div>
          </div>
          
          <CardContent className="p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Route:</span>
              <span className="font-medium text-gray-800">East District</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Completion:</span>
              <span className="font-medium text-gray-800">42%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
              <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '42%' }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">ETA:</span>
              <span className="font-medium text-orange-600">+35 min delay</span>
            </div>
            
            <Link href="/route-map">
              <Button className="w-full text-xs h-8 mt-1 btn-green">View Route</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 hover:border-green-300 hover:shadow-md transition-all">
          <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h4 className="font-medium text-gray-800">WM-T15 Recycler</h4>
              <Badge variant="outline" className="mt-1 bg-green-50 text-green-700 border-green-200 text-xs">
                Active
              </Badge>
            </div>
            <div className="p-1.5 bg-green-50 rounded-full">
              <Truck className="h-5 w-5 text-green-600" />
            </div>
          </div>
          
          <CardContent className="p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Route:</span>
              <span className="font-medium text-gray-800">South District</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Completion:</span>
              <span className="font-medium text-gray-800">78%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '78%' }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">ETA:</span>
              <span className="font-medium text-green-600">14:15 EST</span>
            </div>
            
            <Link href="/route-map">
              <Button className="w-full text-xs h-8 mt-1 btn-green">View Route</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 hover:border-green-300 hover:shadow-md transition-all">
          <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h4 className="font-medium text-gray-800">WM-T08 Compactor</h4>
              <Badge variant="outline" className="mt-1 bg-blue-50 text-blue-700 border-blue-200 text-xs">
                Maintenance
              </Badge>
            </div>
            <div className="p-1.5 bg-blue-50 rounded-full">
              <Truck className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          
          <CardContent className="p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium text-gray-800">Scheduled Service</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium text-gray-800">4 hours</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Return to Service:</span>
              <span className="font-medium text-blue-600">Today, 16:30 EST</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Assigned Tech:</span>
              <span className="font-medium text-gray-800">M. Rodriguez</span>
            </div>
            
            <Button className="w-full text-xs h-8 mt-1 btn-green">View Details</Button>
          </CardContent>
        </Card>
      </div>
      
      <CardFooter className="p-4 bg-gray-50 border-t border-gray-100">
        <div className="w-full flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Total Fleet:</span> 25 Vehicles
          </div>
          <Link href="/performance">
            <Button variant="outline" size="sm" className="text-xs h-8 bg-green-50 border-green-200 text-green-700 hover:bg-green-100">
              View Fleet Dashboard
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
  
  return (
    <>
      {/* Dashboard Header */}
      {renderHeader()}
      
      {/* Summary KPIs */}
      {renderSummaryKPIs()}
      
      {/* Main Dashboard Content - Trends Chart and Alerts */}
      {renderMainDashboard()}
      
      {/* Active Fleet Section */}
      {renderActiveFleetSection()}
    </>
  );
}
