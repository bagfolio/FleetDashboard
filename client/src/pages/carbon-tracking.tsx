import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

export default function CarbonTracking() {
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-neutral-800">Carbon Emissions Tracking</h2>
          <p className="text-sm text-neutral-500">
            Monitor your carbon footprint and sustainability metrics
          </p>
        </div>
        <Button>
          <Leaf className="mr-2 h-4 w-4" />
          Sustainability Report
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-medium mb-2">Carbon Emissions Dashboard</h3>
          <p className="text-neutral-500 mb-4">
            This page will contain carbon emissions metrics, sustainability indicators, and reduction goals.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
