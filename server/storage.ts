import {
  users, User, InsertUser,
  vehicles, Vehicle, InsertVehicle,
  routes, Route, InsertRoute,
  locationHistory, LocationHistory, InsertLocationHistory,
  alerts, Alert, InsertAlert,
  citizenReports, CitizenReport, InsertCitizenReport,
  carbonMetrics, CarbonMetric, InsertCarbonMetric,
  appUsage, AppUsage, InsertAppUsage
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Vehicle methods
  getVehicles(): Promise<Vehicle[]>;
  getVehicle(id: number): Promise<Vehicle | undefined>;
  getVehicleByVehicleId(vehicleId: string): Promise<Vehicle | undefined>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  updateVehicle(id: number, vehicle: Partial<InsertVehicle>): Promise<Vehicle | undefined>;

  // Route methods
  getRoutes(): Promise<Route[]>;
  getRoute(id: number): Promise<Route | undefined>;
  getRouteByRouteId(routeId: string): Promise<Route | undefined>;
  createRoute(route: InsertRoute): Promise<Route>;
  updateRoute(id: number, route: Partial<InsertRoute>): Promise<Route | undefined>;
  getRoutesByVehicleId(vehicleId: number): Promise<Route[]>;

  // Location history methods
  getLocationHistory(vehicleId: number, limit: number): Promise<LocationHistory[]>;
  createLocationHistory(location: InsertLocationHistory): Promise<LocationHistory>;

  // Alert methods
  getAlerts(limit: number): Promise<Alert[]>;
  getAlert(id: number): Promise<Alert | undefined>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  updateAlert(id: number, alert: Partial<InsertAlert>): Promise<Alert | undefined>;
  
  // Citizen report methods
  getCitizenReports(): Promise<CitizenReport[]>;
  getCitizenReportsByType(type: string): Promise<CitizenReport[]>;
  createCitizenReport(report: InsertCitizenReport): Promise<CitizenReport>;
  updateCitizenReport(id: number, report: Partial<InsertCitizenReport>): Promise<CitizenReport | undefined>;

  // Carbon metrics methods
  getCarbonMetrics(days: number): Promise<CarbonMetric[]>;
  createCarbonMetric(metric: InsertCarbonMetric): Promise<CarbonMetric>;

  // App usage methods
  getAppUsage(days: number): Promise<AppUsage[]>;
  createAppUsage(usage: InsertAppUsage): Promise<AppUsage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private vehicles: Map<number, Vehicle>;
  private routes: Map<number, Route>;
  private locationHistory: Map<number, LocationHistory>;
  private alerts: Map<number, Alert>;
  private citizenReports: Map<number, CitizenReport>;
  private carbonMetrics: Map<number, CarbonMetric>;
  private appUsage: Map<number, AppUsage>;
  
  private userIdCounter: number;
  private vehicleIdCounter: number;
  private routeIdCounter: number;
  private locationHistoryIdCounter: number;
  private alertIdCounter: number;
  private citizenReportIdCounter: number;
  private carbonMetricIdCounter: number;
  private appUsageIdCounter: number;

  constructor() {
    this.users = new Map();
    this.vehicles = new Map();
    this.routes = new Map();
    this.locationHistory = new Map();
    this.alerts = new Map();
    this.citizenReports = new Map();
    this.carbonMetrics = new Map();
    this.appUsage = new Map();
    
    this.userIdCounter = 1;
    this.vehicleIdCounter = 1;
    this.routeIdCounter = 1;
    this.locationHistoryIdCounter = 1;
    this.alertIdCounter = 1;
    this.citizenReportIdCounter = 1;
    this.carbonMetricIdCounter = 1;
    this.appUsageIdCounter = 1;

    this.initializeSampleData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Vehicle methods
  async getVehicles(): Promise<Vehicle[]> {
    return Array.from(this.vehicles.values());
  }

  async getVehicle(id: number): Promise<Vehicle | undefined> {
    return this.vehicles.get(id);
  }

  async getVehicleByVehicleId(vehicleId: string): Promise<Vehicle | undefined> {
    return Array.from(this.vehicles.values()).find(
      (vehicle) => vehicle.vehicleId === vehicleId,
    );
  }

  async createVehicle(vehicle: InsertVehicle): Promise<Vehicle> {
    const id = this.vehicleIdCounter++;
    const newVehicle: Vehicle = { ...vehicle, id };
    this.vehicles.set(id, newVehicle);
    return newVehicle;
  }

  async updateVehicle(id: number, vehicle: Partial<InsertVehicle>): Promise<Vehicle | undefined> {
    const existingVehicle = this.vehicles.get(id);
    if (!existingVehicle) return undefined;
    
    const updatedVehicle = { ...existingVehicle, ...vehicle };
    this.vehicles.set(id, updatedVehicle);
    return updatedVehicle;
  }

  // Route methods
  async getRoutes(): Promise<Route[]> {
    return Array.from(this.routes.values());
  }

  async getRoute(id: number): Promise<Route | undefined> {
    return this.routes.get(id);
  }

  async getRouteByRouteId(routeId: string): Promise<Route | undefined> {
    return Array.from(this.routes.values()).find(
      (route) => route.routeId === routeId,
    );
  }

  async createRoute(route: InsertRoute): Promise<Route> {
    const id = this.routeIdCounter++;
    const newRoute: Route = { ...route, id };
    this.routes.set(id, newRoute);
    return newRoute;
  }

  async updateRoute(id: number, route: Partial<InsertRoute>): Promise<Route | undefined> {
    const existingRoute = this.routes.get(id);
    if (!existingRoute) return undefined;
    
    const updatedRoute = { ...existingRoute, ...route };
    this.routes.set(id, updatedRoute);
    return updatedRoute;
  }

  async getRoutesByVehicleId(vehicleId: number): Promise<Route[]> {
    return Array.from(this.routes.values()).filter(
      (route) => route.vehicleId === vehicleId,
    );
  }

  // Location history methods
  async getLocationHistory(vehicleId: number, limit: number): Promise<LocationHistory[]> {
    return Array.from(this.locationHistory.values())
      .filter((location) => location.vehicleId === vehicleId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  async createLocationHistory(location: InsertLocationHistory): Promise<LocationHistory> {
    const id = this.locationHistoryIdCounter++;
    const newLocation: LocationHistory = { ...location, id };
    this.locationHistory.set(id, newLocation);
    return newLocation;
  }

  // Alert methods
  async getAlerts(limit: number): Promise<Alert[]> {
    return Array.from(this.alerts.values())
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  async getAlert(id: number): Promise<Alert | undefined> {
    return this.alerts.get(id);
  }

  async createAlert(alert: InsertAlert): Promise<Alert> {
    const id = this.alertIdCounter++;
    const newAlert: Alert = { ...alert, id };
    this.alerts.set(id, newAlert);
    return newAlert;
  }

  async updateAlert(id: number, alert: Partial<InsertAlert>): Promise<Alert | undefined> {
    const existingAlert = this.alerts.get(id);
    if (!existingAlert) return undefined;
    
    const updatedAlert = { ...existingAlert, ...alert };
    this.alerts.set(id, updatedAlert);
    return updatedAlert;
  }

  // Citizen report methods
  async getCitizenReports(): Promise<CitizenReport[]> {
    return Array.from(this.citizenReports.values());
  }

  async getCitizenReportsByType(type: string): Promise<CitizenReport[]> {
    return Array.from(this.citizenReports.values()).filter(
      (report) => report.type === type,
    );
  }

  async createCitizenReport(report: InsertCitizenReport): Promise<CitizenReport> {
    const id = this.citizenReportIdCounter++;
    const newReport: CitizenReport = { ...report, id };
    this.citizenReports.set(id, newReport);
    return newReport;
  }

  async updateCitizenReport(id: number, report: Partial<InsertCitizenReport>): Promise<CitizenReport | undefined> {
    const existingReport = this.citizenReports.get(id);
    if (!existingReport) return undefined;
    
    const updatedReport = { ...existingReport, ...report };
    this.citizenReports.set(id, updatedReport);
    return updatedReport;
  }

  // Carbon metrics methods
  async getCarbonMetrics(days: number): Promise<CarbonMetric[]> {
    return Array.from(this.carbonMetrics.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, days);
  }

  async createCarbonMetric(metric: InsertCarbonMetric): Promise<CarbonMetric> {
    const id = this.carbonMetricIdCounter++;
    const newMetric: CarbonMetric = { ...metric, id };
    this.carbonMetrics.set(id, newMetric);
    return newMetric;
  }

  // App usage methods
  async getAppUsage(days: number): Promise<AppUsage[]> {
    return Array.from(this.appUsage.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, days);
  }

  async createAppUsage(usage: InsertAppUsage): Promise<AppUsage> {
    const id = this.appUsageIdCounter++;
    const newUsage: AppUsage = { ...usage, id };
    this.appUsage.set(id, newUsage);
    return newUsage;
  }

  private initializeSampleData() {
    // Create sample user
    const user: InsertUser = {
      username: "alex.morgan",
      password: "password123",
      fullName: "Alex Morgan",
      role: "operations_manager",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    };
    this.createUser(user);

    // Create sample vehicles
    const vehicles: InsertVehicle[] = [
      {
        vehicleId: "WM-T18",
        name: "Eco-Compactor",
        type: "Waste Collection",
        district: "Northeast",
        driver: "Michael Chen",
        status: "active",
        fuelLevel: 68,
        fuelCapacity: 100,
        maintenanceStatus: "good",
        currentMileage: 42.8,
        idleTime: 43,
        fuelEfficiency: 5.7,
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b"
      },
      {
        vehicleId: "WM-T12",
        name: "Recycler Pro",
        type: "Recycling",
        district: "Downtown",
        driver: "Sarah Johnson",
        status: "maintenance",
        fuelLevel: 45,
        fuelCapacity: 100,
        maintenanceStatus: "needs_service",
        currentMileage: 31.2,
        idleTime: 22,
        fuelEfficiency: 4.9,
        image: "https://images.unsplash.com/photo-1590847638075-83a135a9e712"
      },
      {
        vehicleId: "WM-T24",
        name: "Green Hauler",
        type: "Waste Collection",
        district: "Southeast",
        driver: "David Wilson",
        status: "active",
        fuelLevel: 82,
        fuelCapacity: 100,
        maintenanceStatus: "good",
        currentMileage: 28.6,
        idleTime: 31,
        fuelEfficiency: 5.2,
        image: "https://images.unsplash.com/photo-1591065550889-a42597daa498"
      }
    ];

    vehicles.forEach(vehicle => this.createVehicle(vehicle));

    // Create sample routes
    const routes: InsertRoute[] = [
      {
        routeId: "WM-1043",
        name: "Northeast Residential Collection",
        type: "residential",
        district: "Northeast",
        status: "in_progress",
        startTime: new Date(new Date().setHours(8, 0, 0)),
        estimatedEndTime: new Date(new Date().setHours(15, 45, 0)),
        totalStops: 142,
        completedStops: 78,
        vehicleId: 1,
        pathData: { coordinates: [] }
      },
      {
        routeId: "WM-1039",
        name: "Downtown Commercial",
        type: "commercial",
        district: "Downtown",
        status: "completed",
        startTime: new Date(new Date().setHours(7, 0, 0)),
        endTime: new Date(new Date().setHours(14, 30, 0)),
        estimatedEndTime: new Date(new Date().setHours(15, 0, 0)),
        totalStops: 35,
        completedStops: 35,
        vehicleId: 1,
        pathData: { coordinates: [] }
      },
      {
        routeId: "WM-1034",
        name: "Northeast Recycling",
        type: "recycling",
        district: "Northeast",
        status: "completed",
        startTime: new Date(new Date().setHours(6, 0, 0)),
        endTime: new Date(new Date().setHours(11, 45, 0)),
        estimatedEndTime: new Date(new Date().setHours(12, 0, 0)),
        totalStops: 92,
        completedStops: 92,
        vehicleId: 1,
        pathData: { coordinates: [] }
      },
      {
        routeId: "WM-1084",
        name: "Southeast Commercial",
        type: "commercial",
        district: "Southeast",
        status: "delayed",
        startTime: new Date(new Date().setHours(9, 0, 0)),
        estimatedEndTime: new Date(new Date().setHours(16, 30, 0)),
        totalStops: 48,
        completedStops: 20,
        vehicleId: 3,
        pathData: { coordinates: [] }
      },
      {
        routeId: "WM-1076",
        name: "Downtown Office Buildings",
        type: "commercial",
        district: "Downtown",
        status: "completed",
        startTime: new Date(new Date().setHours(6, 30, 0)),
        endTime: new Date(new Date().setHours(11, 42, 0)),
        estimatedEndTime: new Date(new Date().setHours(12, 0, 0)),
        totalStops: 38,
        completedStops: 38,
        vehicleId: 2,
        pathData: { coordinates: [] }
      }
    ];

    routes.forEach(route => this.createRoute(route));

    // Create sample location histories
    const locationHistories: InsertLocationHistory[] = [
      {
        vehicleId: 1,
        timestamp: new Date(),
        latitude: 40.7128,
        longitude: -74.0060,
        speed: 15.2,
        heading: 90,
        status: "moving"
      },
      {
        vehicleId: 2,
        timestamp: new Date(),
        latitude: 40.7138,
        longitude: -74.0070,
        speed: 0,
        heading: 0,
        status: "stopped"
      },
      {
        vehicleId: 3,
        timestamp: new Date(),
        latitude: 40.7118,
        longitude: -74.0050,
        speed: 12.8,
        heading: 180,
        status: "moving"
      }
    ];

    locationHistories.forEach(location => this.createLocationHistory(location));

    // Create sample alerts
    const alerts: InsertAlert[] = [
      {
        type: "traffic_delay",
        title: "Traffic Delay Alert",
        message: "Route #WM-1084 experiencing heavy traffic on Main St. Expected delay of 15-20 minutes.",
        severity: "warning",
        timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 14)),
        routeId: 4,
        vehicleId: 3
      },
      {
        type: "maintenance",
        title: "Vehicle Maintenance Required",
        message: "Vehicle WM-T12 reporting engine temperature above threshold. Maintenance check required.",
        severity: "error",
        timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 47)),
        vehicleId: 2
      },
      {
        type: "route_completion",
        title: "Route #WM-1076 Completed",
        message: "Commercial route completed 18 minutes ahead of schedule. All 38 stops serviced.",
        severity: "success",
        timestamp: new Date(new Date().setHours(new Date().getHours() - 1)),
        routeId: 5,
        vehicleId: 2
      },
      {
        type: "citizen_report",
        title: "Citizen Report: Missed Pickup",
        message: "Resident at 1342 Oak Street reports missed recycling pickup from yesterday's route.",
        severity: "info",
        timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 82))
      },
      {
        type: "carbon_milestone",
        title: "Reduced Carbon Milestone",
        message: "Weekly carbon reduction goal achieved! 5.2 metric tons of CO₂ saved through optimized routing.",
        severity: "success",
        timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 130))
      }
    ];

    alerts.forEach(alert => this.createAlert(alert));

    // Create sample citizen reports
    const citizenReports: InsertCitizenReport[] = [
      {
        type: "missed_pickup",
        description: "Recycling bin not emptied on scheduled day",
        status: "new",
        address: "1342 Oak Street",
        latitude: 40.7128,
        longitude: -74.0060,
        timestamp: new Date(new Date().setDate(new Date().getDate() - 1))
      },
      {
        type: "overflow",
        description: "Public trash bin overflowing at park entrance",
        status: "assigned",
        address: "Central Park North Entrance",
        latitude: 40.7138,
        longitude: -74.0070,
        timestamp: new Date(new Date().setHours(new Date().getHours() - 3)),
        assignedVehicleId: 3
      },
      {
        type: "improper_disposal",
        description: "Construction materials in residential waste bin",
        status: "resolved",
        address: "987 Maple Avenue",
        latitude: 40.7118,
        longitude: -74.0050,
        timestamp: new Date(new Date().setDate(new Date().getDate() - 2))
      },
      {
        type: "damaged_bin",
        description: "Recycling bin has broken lid",
        status: "new",
        address: "456 Elm Street",
        latitude: 40.7108,
        longitude: -74.0040,
        timestamp: new Date(new Date().setHours(new Date().getHours() - 5))
      }
    ];

    citizenReports.forEach(report => this.createCitizenReport(report));

    // Create sample carbon metrics
    const today = new Date();
    const carbonMetrics: InsertCarbonMetric[] = [
      {
        date: today,
        totalEmissions: 3.2,
        savedEmissions: 0.7,
        targetEmissions: 2.8,
        routesOptimized: 18,
        fuelSaved: 42.5
      },
      {
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
        totalEmissions: 3.5,
        savedEmissions: 0.6,
        targetEmissions: 2.8,
        routesOptimized: 16,
        fuelSaved: 38.2
      },
      {
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2),
        totalEmissions: 3.8,
        savedEmissions: 0.5,
        targetEmissions: 2.8,
        routesOptimized: 15,
        fuelSaved: 32.7
      },
      {
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3),
        totalEmissions: 3.4,
        savedEmissions: 0.8,
        targetEmissions: 2.8,
        routesOptimized: 17,
        fuelSaved: 45.3
      },
      {
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4),
        totalEmissions: 3.7,
        savedEmissions: 0.4,
        targetEmissions: 2.8,
        routesOptimized: 14,
        fuelSaved: 28.9
      },
      {
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5),
        totalEmissions: 3.3,
        savedEmissions: 0.7,
        targetEmissions: 2.8,
        routesOptimized: 16,
        fuelSaved: 41.2
      },
      {
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6),
        totalEmissions: 3.9,
        savedEmissions: 0.3,
        targetEmissions: 2.8,
        routesOptimized: 13,
        fuelSaved: 24.5
      }
    ];

    carbonMetrics.forEach(metric => this.createCarbonMetric(metric));

    // Create sample app usage
    const appUsage: InsertAppUsage[] = [
      {
        date: today,
        totalUsers: 8632,
        reportsFiled: 164,
        satisfaction: 86
      },
      {
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30),
        totalUsers: 7710,
        reportsFiled: 152,
        satisfaction: 83
      }
    ];

    appUsage.forEach(usage => this.createAppUsage(usage));
  }
}

export const storage = new MemStorage();
