import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export default function Reports() {
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-neutral-800">Reports</h2>
          <p className="text-sm text-neutral-500">
            View and generate reports about operations, efficiency, and carbon metrics
          </p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-medium mb-2">Reports Dashboard</h3>
          <p className="text-neutral-500 mb-4">
            This page will contain reports, analytics, and data visualization features.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
