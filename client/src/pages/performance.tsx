import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartBarStacked } from "lucide-react";
import VehiclePerformance from "@/components/dashboard/VehiclePerformance";

export default function Performance() {
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-neutral-800">Performance Analytics</h2>
          <p className="text-sm text-neutral-500">
            Track vehicle and operational performance metrics
          </p>
        </div>
        <Button>
          <ChartBarStacked className="mr-2 h-4 w-4" />
          Performance Metrics
        </Button>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <VehiclePerformance />
        
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-medium mb-2">Fleet Performance Overview</h3>
            <p className="text-neutral-500 mb-4">
              This section will contain additional fleet-wide performance metrics and analytics.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
