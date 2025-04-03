import { Route, Switch } from "wouter";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Dashboard from "@/pages/dashboard";
import RouteMap from "@/pages/route-map";
import Reports from "@/pages/reports";
import Alerts from "@/pages/alerts";
import Performance from "@/pages/performance";
import CarbonTracking from "@/pages/carbon-tracking";
import CitizenEngagement from "@/pages/citizen-engagement";
import RecyclingMarketplace from "@/pages/recycling-marketplace";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <DashboardLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/route-map" component={RouteMap} />
        <Route path="/reports" component={Reports} />
        <Route path="/alerts" component={Alerts} />
        <Route path="/performance" component={Performance} />
        <Route path="/carbon-tracking" component={CarbonTracking} />
        <Route path="/citizen-engagement" component={CitizenEngagement} />
        <Route path="/recycling-marketplace" component={RecyclingMarketplace} />
        <Route component={NotFound} />
      </Switch>
    </DashboardLayout>
  );
}

export default App;
