import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
  // Vehicles routes
  app.get("/api/vehicles", async (req, res) => {
    try {
      const vehicles = await storage.getVehicles();
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vehicles" });
    }
  });

  app.get("/api/vehicles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const vehicle = await storage.getVehicle(id);
      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }
      res.json(vehicle);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vehicle" });
    }
  });

  // Routes routes
  app.get("/api/routes", async (req, res) => {
    try {
      const routes = await storage.getRoutes();
      res.json(routes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch routes" });
    }
  });

  app.get("/api/routes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const route = await storage.getRoute(id);
      if (!route) {
        return res.status(404).json({ message: "Route not found" });
      }
      res.json(route);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch route" });
    }
  });

  app.get("/api/vehicle/:vehicleId/routes", async (req, res) => {
    try {
      const vehicleId = parseInt(req.params.vehicleId);
      const routes = await storage.getRoutesByVehicleId(vehicleId);
      res.json(routes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch routes for vehicle" });
    }
  });

  // Location routes
  app.get("/api/vehicle/:vehicleId/locations", async (req, res) => {
    try {
      const vehicleId = parseInt(req.params.vehicleId);
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const locations = await storage.getLocationHistory(vehicleId, limit);
      res.json(locations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch location history" });
    }
  });

  // Alerts routes
  app.get("/api/alerts", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const alerts = await storage.getAlerts(limit);
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch alerts" });
    }
  });

  app.get("/api/alerts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const alert = await storage.getAlert(id);
      if (!alert) {
        return res.status(404).json({ message: "Alert not found" });
      }
      res.json(alert);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch alert" });
    }
  });

  app.patch("/api/alerts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const alert = await storage.updateAlert(id, req.body);
      if (!alert) {
        return res.status(404).json({ message: "Alert not found" });
      }
      res.json(alert);
    } catch (error) {
      res.status(500).json({ message: "Failed to update alert" });
    }
  });

  // Citizen reports routes
  app.get("/api/citizen-reports", async (req, res) => {
    try {
      let reports;
      if (req.query.type) {
        reports = await storage.getCitizenReportsByType(req.query.type as string);
      } else {
        reports = await storage.getCitizenReports();
      }
      res.json(reports);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch citizen reports" });
    }
  });

  // Carbon metrics routes
  app.get("/api/carbon-metrics", async (req, res) => {
    try {
      const days = req.query.days ? parseInt(req.query.days as string) : 7;
      const metrics = await storage.getCarbonMetrics(days);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch carbon metrics" });
    }
  });

  // App usage routes
  app.get("/api/app-usage", async (req, res) => {
    try {
      const days = req.query.days ? parseInt(req.query.days as string) : 30;
      const usage = await storage.getAppUsage(days);
      res.json(usage);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch app usage" });
    }
  });

  // Summary stats API
  app.get("/api/dashboard/summary", async (req, res) => {
    try {
      const vehicles = await storage.getVehicles();
      const routes = await storage.getRoutes();
      const alerts = await storage.getAlerts(100);
      const carbonMetrics = await storage.getCarbonMetrics(1);
      
      const activeRoutes = routes.filter(route => route.status === "in_progress" || route.status === "planned").length;
      const activeVehicles = vehicles.filter(vehicle => vehicle.status === "active").length;
      const delayedVehicles = routes.filter(route => route.status === "delayed").length;
      const fuelConsumption = vehicles.reduce((sum, vehicle) => {
        return sum + (vehicle.fuelCapacity - vehicle.fuelLevel) * 0.1;  // Approximation based on fuel level
      }, 0);
      const carbonEmissions = carbonMetrics.length > 0 ? carbonMetrics[0].totalEmissions : 0;
      const carbonSaved = carbonMetrics.length > 0 ? carbonMetrics[0].savedEmissions : 0;
      
      res.json({
        activeRoutes,
        activeVehicles,
        delayedVehicles,
        fuelConsumption,
        carbonEmissions,
        carbonSaved,
        alertCount: alerts.filter(alert => !alert.isRead).length
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard summary" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
