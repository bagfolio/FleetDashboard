import { pgTable, text, serial, integer, boolean, timestamp, jsonb, real, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  role: text("role").default("operator"),
  avatar: text("avatar"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  role: true,
  avatar: true,
});

export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  vehicleId: text("vehicle_id").notNull().unique(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  district: text("district"),
  driver: text("driver"),
  status: text("status").default("active"),
  fuelLevel: integer("fuel_level").default(100),
  fuelCapacity: integer("fuel_capacity").default(100),
  maintenanceStatus: text("maintenance_status").default("good"),
  currentMileage: real("current_mileage").default(0),
  idleTime: integer("idle_time").default(0),
  fuelEfficiency: real("fuel_efficiency"),
  image: text("image"),
});

export const insertVehicleSchema = createInsertSchema(vehicles).omit({
  id: true,
});

export const routes = pgTable("routes", {
  id: serial("id").primaryKey(),
  routeId: text("route_id").notNull().unique(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  district: text("district"),
  status: text("status").default("planned"),
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  estimatedEndTime: timestamp("estimated_end_time"),
  totalStops: integer("total_stops").default(0),
  completedStops: integer("completed_stops").default(0),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  pathData: jsonb("path_data"),
});

export const insertRouteSchema = createInsertSchema(routes).omit({
  id: true,
});

export const locationHistory = pgTable("location_history", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").references(() => vehicles.id).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  speed: real("speed"),
  heading: real("heading"),
  status: text("status"),
});

export const insertLocationHistorySchema = createInsertSchema(locationHistory).omit({
  id: true,
});

export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  severity: text("severity").default("info"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  routeId: integer("route_id").references(() => routes.id),
  isRead: boolean("is_read").default(false),
  actionTaken: text("action_taken"),
});

export const insertAlertSchema = createInsertSchema(alerts).omit({
  id: true,
});

export const citizenReports = pgTable("citizen_reports", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  description: text("description").notNull(),
  status: text("status").default("new"),
  address: text("address").notNull(),
  latitude: real("latitude"),
  longitude: real("longitude"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  reporterId: text("reporter_id"),
  assignedVehicleId: integer("assigned_vehicle_id").references(() => vehicles.id),
});

export const insertCitizenReportSchema = createInsertSchema(citizenReports).omit({
  id: true,
});

export const carbonMetrics = pgTable("carbon_metrics", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  totalEmissions: real("total_emissions").notNull(),
  savedEmissions: real("saved_emissions").default(0),
  targetEmissions: real("target_emissions"),
  routesOptimized: integer("routes_optimized").default(0),
  fuelSaved: real("fuel_saved").default(0),
});

export const insertCarbonMetricsSchema = createInsertSchema(carbonMetrics).omit({
  id: true,
});

export const appUsage = pgTable("app_usage", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  totalUsers: integer("total_users").notNull(),
  reportsFiled: integer("reports_filed").default(0),
  satisfaction: integer("satisfaction"),
});

export const insertAppUsageSchema = createInsertSchema(appUsage).omit({
  id: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Vehicle = typeof vehicles.$inferSelect;
export type InsertVehicle = z.infer<typeof insertVehicleSchema>;

export type Route = typeof routes.$inferSelect;
export type InsertRoute = z.infer<typeof insertRouteSchema>;

export type LocationHistory = typeof locationHistory.$inferSelect;
export type InsertLocationHistory = z.infer<typeof insertLocationHistorySchema>;

export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = z.infer<typeof insertAlertSchema>;

export type CitizenReport = typeof citizenReports.$inferSelect;
export type InsertCitizenReport = z.infer<typeof insertCitizenReportSchema>;

export type CarbonMetric = typeof carbonMetrics.$inferSelect;
export type InsertCarbonMetric = z.infer<typeof insertCarbonMetricsSchema>;

export type AppUsage = typeof appUsage.$inferSelect;
export type InsertAppUsage = z.infer<typeof insertAppUsageSchema>;
