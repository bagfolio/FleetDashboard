import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import AlertsActivity from "@/components/dashboard/AlertsActivity";

export default function Alerts() {
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-neutral-800">Alerts & Notifications</h2>
          <p className="text-sm text-neutral-500">
            View and manage all system alerts, notifications, and activity logs
          </p>
        </div>
        <Button>
          <Bell className="mr-2 h-4 w-4" />
          Alert Settings
        </Button>
      </div>
      
      <AlertsActivity />
    </>
  );
}
