import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function CitizenEngagement() {
  const { data: appUsage = [], isLoading: isLoadingUsage } = useQuery({
    queryKey: ['/api/app-usage'],
  });

  const { data: reports = [], isLoading: isLoadingReports } = useQuery({
    queryKey: ['/api/citizen-reports'],
  });

  // Sample data for the demo
  const usage = appUsage[0] || {
    totalUsers: 8632,
    reportsFiled: 164,
    satisfaction: 86
  };

  // Count reports by type
  const reportsByType = {
    missed_pickup: 42,
    overflow: 27,
    improper_disposal: 18,
    damaged_bin: 14,
    other: 9
  };

  return (
    <Card className="bg-white rounded-lg shadow-sm border border-neutral-100">
      <div className="p-4 border-b border-neutral-100 flex justify-between items-center">
        <h3 className="font-medium text-neutral-800">Citizen Engagement & Reports</h3>
        <div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-primary font-medium hover:text-primary/90 px-0"
          >
            Full Report
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="p-3 bg-neutral-50 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-neutral-600">App Usage</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-lg font-semibold text-neutral-800">{new Intl.NumberFormat().format(usage.totalUsers)}</span>
            </div>
            <div className="text-xs text-success-500">+12% from last month</div>
          </div>
          
          <div className="p-3 bg-neutral-50 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-neutral-600">Reports Filed</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-lg font-semibold text-neutral-800">{usage.reportsFiled}</span>
            </div>
            <div className="text-xs text-error-500">+8% from last month</div>
          </div>
          
          <div className="p-3 bg-neutral-50 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-neutral-600">Satisfaction</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-lg font-semibold text-neutral-800">{usage.satisfaction}%</span>
            </div>
            <div className="text-xs text-success-500">+3% from last month</div>
          </div>
        </div>
        
        <h4 className="text-sm font-medium text-neutral-700 mb-3">Recent Reports by Category</h4>
        <div className="mb-4">
          <div className="h-40 chart-container">
            <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
              <rect x="10" y="10" width="40" height="80" fill="hsl(217, 71%, 45%)" opacity="0.7" />
              <rect x="60" y="30" width="40" height="60" fill="#26a69a" opacity="0.7" />
              <rect x="110" y="50" width="40" height="40" fill="#ff9800" opacity="0.7" />
              <rect x="160" y="65" width="40" height="25" fill="#f44336" opacity="0.7" />
              <rect x="210" y="75" width="40" height="15" fill="#9c27b0" opacity="0.7" />
              <text x="30" y="95" textAnchor="middle" fontSize="8" fill="#5a6a79">Missed</text>
              <text x="80" y="95" textAnchor="middle" fontSize="8" fill="#5a6a79">Overflow</text>
              <text x="130" y="95" textAnchor="middle" fontSize="8" fill="#5a6a79">Improper</text>
              <text x="180" y="95" textAnchor="middle" fontSize="8" fill="#5a6a79">Damaged</text>
              <text x="230" y="95" textAnchor="middle" fontSize="8" fill="#5a6a79">Other</text>
            </svg>
          </div>
        </div>
        
        <h4 className="text-sm font-medium text-neutral-700 mb-3">Reported Locations</h4>
        <div 
          className="relative h-40 bg-neutral-50 rounded-lg overflow-hidden mb-4" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83')",
            backgroundSize: "cover"
          }}
        >
          <div className="absolute inset-0 bg-neutral-900 bg-opacity-10"></div>
          <div className="absolute top-1/4 left-1/4 h-3 w-3 bg-error-500 rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 h-3 w-3 bg-error-500 rounded-full"></div>
          <div className="absolute top-3/4 left-2/3 h-3 w-3 bg-error-500 rounded-full"></div>
          <div className="absolute top-1/3 left-3/4 h-3 w-3 bg-warning-500 rounded-full"></div>
          <div className="absolute top-2/3 left-1/2 h-3 w-3 bg-warning-500 rounded-full"></div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-neutral-700">
          <div>
            <span className="inline-block h-2 w-2 rounded-full bg-error-500 mr-1"></span>
            Missed Pickup ({reportsByType.missed_pickup})
          </div>
          <div>
            <span className="inline-block h-2 w-2 rounded-full bg-warning-500 mr-1"></span>
            Overflow Bin ({reportsByType.overflow})
          </div>
          <div>
            <span className="inline-block h-2 w-2 rounded-full bg-primary mr-1"></span>
            Others ({reportsByType.other})
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
