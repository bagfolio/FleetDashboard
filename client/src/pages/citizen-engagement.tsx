import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import CitizenEngagement from "@/components/dashboard/CitizenEngagement";

export default function CitizenEngagementPage() {
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-neutral-800">Citizen Engagement</h2>
          <p className="text-sm text-neutral-500">
            Analyze and respond to citizen feedback and reports
          </p>
        </div>
        <Button>
          <Users className="mr-2 h-4 w-4" />
          Engagement Settings
        </Button>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <CitizenEngagement />
        
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-medium mb-2">Citizen Report Management</h3>
            <p className="text-neutral-500 mb-4">
              This section will contain detailed citizen reports and management tools.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
