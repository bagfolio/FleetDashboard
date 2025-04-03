import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";
import MapView from "@/components/dashboard/MapView";

export default function RouteMap() {
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-neutral-800">Route Map</h2>
          <p className="text-sm text-neutral-500">
            Interactive map with real-time vehicle locations and route tracking
          </p>
        </div>
        <Button>
          <Map className="mr-2 h-4 w-4" />
          Create New Route
        </Button>
      </div>
      
      <MapView />
    </>
  );
}
