import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  TrendingUp, 
  BarChart, 
  Download, 
  BadgeCheck,
  Award,
  BarChart3
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function CarbonTracking() {
  const [timeFrame, setTimeFrame] = useState("month");
  
  // Carbon credit data
  const carbonData = {
    totalCredits: 352,
    availableCredits: 214,
    soldCredits: 138,
    averagePrice: 27.50,
    totalRevenue: 3795,
    monthlySavings: [
      { month: "Jan", tons: 28 },
      { month: "Feb", tons: 32 },
      { month: "Mar", tons: 35 },
      { month: "Apr", tons: 38 },
      { month: "May", tons: 42 },
      { month: "Jun", tons: 40 },
      { month: "Jul", tons: 45 },
      { month: "Aug", tons: 50 },
      { month: "Sep", tons: 47 },
      { month: "Oct", tons: 53 },
      { month: "Nov", tons: 58 },
      { month: "Dec", tons: 55 }
    ],
    certifications: [
      { name: "Gold Standard", progress: 82 },
      { name: "Verra VCS", progress: 67 },
      { name: "Climate Action Reserve", progress: 45 }
    ]
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-2">Carbon Credits</h1>
        <p className="text-sm text-gray-500">Track and monetize carbon reduction through efficient waste management operations</p>
      </div>
      
      {/* Carbon Credit Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card-stats">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="stat-label">Total Carbon Credits</h3>
              <Leaf className="h-5 w-5 text-green-600" />
            </div>
            <div className="stat-value">{carbonData.totalCredits}</div>
            <div className="text-xs text-gray-500">Total carbon credits earned</div>
            <div className="stat-change-positive">
              <TrendingUp className="h-3.5 w-3.5 mr-1" /> +14% from last month
            </div>
          </div>
        </div>
        
        <div className="card-stats">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="stat-label">Available Credits</h3>
              <BadgeCheck className="h-5 w-5 text-green-600" />
            </div>
            <div className="stat-value">{carbonData.availableCredits}</div>
            <div className="text-xs text-gray-500">Credits available for trading</div>
            <div className="flex justify-between items-center mt-1">
              <div className="h-1.5 bg-gray-100 rounded-full w-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full" 
                  style={{ width: `${(carbonData.availableCredits / carbonData.totalCredits) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 ml-2">
                {Math.round((carbonData.availableCredits / carbonData.totalCredits) * 100)}%
              </span>
            </div>
          </div>
        </div>
        
        <div className="card-stats">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="stat-label">Average Credit Price</h3>
              <BarChart3 className="h-5 w-5 text-green-600" />
            </div>
            <div className="stat-value">${carbonData.averagePrice.toFixed(2)}</div>
            <div className="text-xs text-gray-500">Per metric ton of CO₂</div>
            <div className="stat-change-positive">
              <TrendingUp className="h-3.5 w-3.5 mr-1" /> +3.5% from last month
            </div>
          </div>
        </div>
        
        <div className="card-stats">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="stat-label">Total Revenue</h3>
              <Award className="h-5 w-5 text-green-600" />
            </div>
            <div className="stat-value">${carbonData.totalRevenue.toLocaleString()}</div>
            <div className="text-xs text-gray-500">From sold carbon credits</div>
            <div className="stat-change-positive">
              <TrendingUp className="h-3.5 w-3.5 mr-1" /> +18% from last month
            </div>
          </div>
        </div>
      </div>
      
      {/* Carbon Savings Chart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2 card-section">
          <div className="card-header">
            <h3>Carbon Savings Over Time</h3>
            <Button variant="outline" size="sm" className="text-xs bg-green-50 border-green-200 text-green-700 hover:bg-green-100">
              <Download className="h-4 w-4 mr-1" />
              Export Data
            </Button>
          </div>
          
          <div className="h-80 p-4">
            <div className="h-full flex items-end justify-between">
              {carbonData.monthlySavings.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-8 bg-green-500 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
                    style={{ height: `${item.tons * 1.2}px` }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-2">{item.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="card-section">
          <div className="card-header">
            <h3>Certification Progress</h3>
          </div>
          
          <div className="space-y-6 p-4">
            {carbonData.certifications.map((cert, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-gray-700">{cert.name}</h4>
                  <span className="text-sm font-medium text-green-600">{cert.progress}%</span>
                </div>
                <Progress value={cert.progress} className="h-2 bg-gray-100" indicatorClassName="bg-green-500" />
                <p className="text-xs text-gray-500 mt-1">
                  {cert.progress < 50 ? 'In progress' : cert.progress < 80 ? 'Advanced' : 'Almost complete'}
                </p>
              </div>
            ))}
            
            <Button className="w-full btn-green mt-4">Apply for Certification</Button>
          </div>
        </div>
      </div>
      
      {/* Carbon Credit Trading */}
      <div className="card-section mb-6">
        <div className="card-header">
          <h3>Carbon Credit Trading</h3>
          <Button className="btn-green-light text-xs">View Marketplace</Button>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700">Gold Standard</h4>
                  <div className="p-1.5 bg-yellow-50 rounded-full">
                    <Award className="h-4 w-4 text-yellow-600" />
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-800">76 Credits</div>
                <div className="text-xs text-gray-500 mb-3">Current Market Value: $32.80/ton</div>
                <Button className="w-full text-xs h-8 btn-green">Sell Credits</Button>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700">Verra VCS</h4>
                  <div className="p-1.5 bg-blue-50 rounded-full">
                    <BadgeCheck className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-800">52 Credits</div>
                <div className="text-xs text-gray-500 mb-3">Current Market Value: $25.40/ton</div>
                <Button className="w-full text-xs h-8 btn-green">Sell Credits</Button>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700">Climate Action</h4>
                  <div className="p-1.5 bg-green-50 rounded-full">
                    <Leaf className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-800">86 Credits</div>
                <div className="text-xs text-gray-500 mb-3">Current Market Value: $28.15/ton</div>
                <Button className="w-full text-xs h-8 btn-green">Sell Credits</Button>
              </CardContent>
            </Card>
            
            <div className="flex flex-col justify-center items-center p-4 border border-dashed border-gray-300 rounded-lg">
              <Leaf className="h-10 w-10 text-gray-300 mb-2" />
              <p className="text-sm text-gray-500 text-center">Apply for additional certification programs</p>
              <Button variant="outline" className="mt-3 text-xs">Explore Options</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
