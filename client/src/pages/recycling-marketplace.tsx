import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Recycle, 
  Search, 
  ChevronDown, 
  Smartphone, 
  Monitor, 
  Tablet,
  Battery,
  Printer,
  Watch,
  ShoppingCart,
  TrendingUp,
  Camera,
  BarChart3,
  Upload
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RecyclingMarketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [viewMode, setViewMode] = useState("sell");
  
  // Stats
  const marketStats = {
    totalItems: 458,
    totalValue: 12580,
    avgItemValue: 27.5,
    mostValuable: "Computers & Laptops"
  };
  
  // Sample recycling items for sale
  const recyclingItems = [
    {
      id: 1,
      name: "iPhone 11",
      status: "Working",
      price: 45.00,
      image: "smartphone",
      condition: "Good",
      materials: ["Gold", "Silver", "Copper", "Lithium"]
    },
    {
      id: 2,
      name: "Dell XPS 13",
      status: "Not Working",
      price: 85.00,
      image: "laptop",
      condition: "Damaged",
      materials: ["Aluminum", "Copper", "Gold", "Palladium"]
    },
    {
      id: 3,
      name: "iPad Pro",
      status: "Working",
      price: 65.00,
      image: "tablet",
      condition: "Excellent",
      materials: ["Aluminum", "Gold", "Silver", "Lithium"]
    },
    {
      id: 4,
      name: "HP LaserJet",
      status: "Not Working",
      price: 25.00,
      image: "printer",
      condition: "For Parts",
      materials: ["Plastic", "Copper", "Steel"]
    },
    {
      id: 5,
      name: "Car Battery",
      status: "Used",
      price: 15.00,
      image: "battery",
      condition: "Used",
      materials: ["Lead", "Acid", "Plastic"]
    },
    {
      id: 6,
      name: "Apple Watch",
      status: "Working",
      price: 35.00,
      image: "watch",
      condition: "Good",
      materials: ["Aluminum", "Gold", "Lithium"]
    }
  ];
  
  // Material prices
  const materialPrices = [
    { name: "Gold", price: 62.50, unit: "/g", change: "+1.5%" },
    { name: "Silver", price: 0.85, unit: "/g", change: "+0.8%" },
    { name: "Copper", price: 8.75, unit: "/kg", change: "+0.3%" },
    { name: "Aluminum", price: 1.65, unit: "/kg", change: "-0.2%" },
    { name: "Lithium", price: 15.20, unit: "/kg", change: "+2.1%" },
    { name: "Palladium", price: 52.30, unit: "/g", change: "+1.7%" }
  ];
  
  // Categories
  const categories = [
    "All Categories",
    "Smartphones",
    "Computers & Laptops",
    "Tablets",
    "Printers",
    "Batteries",
    "Wearables"
  ];
  
  // Helper function to render item icon
  const getItemIcon = (type: string) => {
    switch (type) {
      case "smartphone":
        return <Smartphone className="h-8 w-8 text-green-600" />;
      case "laptop":
        return <Monitor className="h-8 w-8 text-green-600" />;
      case "tablet":
        return <Tablet className="h-8 w-8 text-green-600" />;
      case "printer":
        return <Printer className="h-8 w-8 text-green-600" />;
      case "battery":
        return <Battery className="h-8 w-8 text-green-600" />;
      case "watch":
        return <Watch className="h-8 w-8 text-green-600" />;
      default:
        return <Recycle className="h-8 w-8 text-green-600" />;
    }
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-2">Digital Recycling Marketplace</h1>
        <p className="text-sm text-gray-500">Buy and sell valuable materials for recycling and earn rewards for sustainability</p>
      </div>
      
      {/* Marketplace Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card-stats">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="stat-label">Items Available</h3>
              <ShoppingCart className="h-5 w-5 text-green-600" />
            </div>
            <div className="stat-value">{marketStats.totalItems}</div>
            <div className="text-xs text-gray-500">Items listed for recycling</div>
            <div className="stat-change-positive">
              <TrendingUp className="h-3.5 w-3.5 mr-1" /> +24 items this week
            </div>
          </div>
        </div>
        
        <div className="card-stats">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="stat-label">Total Marketplace Value</h3>
              <BarChart3 className="h-5 w-5 text-green-600" />
            </div>
            <div className="stat-value">${marketStats.totalValue.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Value of all listed items</div>
            <div className="stat-change-positive">
              <TrendingUp className="h-3.5 w-3.5 mr-1" /> +6.8% from last month
            </div>
          </div>
        </div>
        
        <div className="card-stats">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="stat-label">Avg. Item Value</h3>
              <Recycle className="h-5 w-5 text-green-600" />
            </div>
            <div className="stat-value">${marketStats.avgItemValue.toFixed(2)}</div>
            <div className="text-xs text-gray-500">Average price per item</div>
            <div className="stat-change-positive">
              <TrendingUp className="h-3.5 w-3.5 mr-1" /> +$1.20 from last month
            </div>
          </div>
        </div>
        
        <div className="card-stats">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="stat-label">Most Valuable Category</h3>
              <Monitor className="h-5 w-5 text-green-600" />
            </div>
            <div className="stat-value-sm">{marketStats.mostValuable}</div>
            <div className="text-xs text-gray-500">Highest value per item</div>
            <div className="text-xs text-green-600 mt-1">
              Avg. $85.40 per item
            </div>
          </div>
        </div>
      </div>
      
      {/* Buy/Sell Tabs */}
      <div className="flex mb-6 border-b border-gray-200">
        <button 
          className={`px-4 py-2 font-medium text-sm ${viewMode === 'sell' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-500'}`}
          onClick={() => setViewMode('sell')}
        >
          Sell Items
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm ${viewMode === 'buy' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-500'}`}
          onClick={() => setViewMode('buy')}
        >
          Buy Materials
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Search and Filter */}
          <div className="card-section mb-6">
            <div className="card-header">
              <h3>{viewMode === 'sell' ? 'List Your Items' : 'Browse Materials'}</h3>
              <Button className="btn-green-light text-xs">
                {viewMode === 'sell' ? <Upload className="h-3.5 w-3.5 mr-1" /> : <ShoppingCart className="h-3.5 w-3.5 mr-1" />}
                {viewMode === 'sell' ? 'Upload Photo' : 'View Cart'}
              </Button>
            </div>
            <div className="p-4 flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Input 
                  type="text"
                  placeholder={viewMode === 'sell' ? "Search items to list..." : "Search materials to buy..."} 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
              </div>
              
              <div className="w-full md:w-48">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-gray-50 border border-gray-200">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category, idx) => (
                      <SelectItem key={idx} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Recycling Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {recyclingItems.map((item) => (
              <Card key={item.id} className="overflow-hidden border border-gray-200 hover:border-green-300 hover:shadow-md transition-all">
                <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Badge variant="outline" className={`text-xs px-2 py-0 ${
                        item.condition === 'Excellent' ? 'bg-green-50 text-green-700 border-green-200' :
                        item.condition === 'Good' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        item.condition === 'Damaged' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                        'bg-gray-50 text-gray-700 border-gray-200'
                      }`}>
                        {item.condition}
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-green-50 p-2 rounded-full">
                    {getItemIcon(item.image)}
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">Valuable Materials:</div>
                    <div className="flex flex-wrap gap-1">
                      {item.materials.map((material, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600">${item.price.toFixed(2)}</span>
                    <Button size="sm" className="btn-green text-xs">
                      {viewMode === 'sell' ? 'List Item' : 'Add to Cart'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mb-8">
            <Button className="btn-green flex items-center">
              <Recycle className="h-4 w-4 mr-2" />
              {viewMode === 'sell' ? 'Register New Item' : 'Browse More Materials'}
            </Button>
          </div>
        </div>
        
        <div>
          {/* Material Value Card */}
          <Card className="border border-gray-200 mb-6">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium text-gray-800">Material Value</h3>
              <p className="text-xs text-gray-500">Current market rates for recyclable materials</p>
            </div>
            
            <CardContent className="p-4">
              <div className="space-y-4">
                {materialPrices.map((material, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-700 font-medium">{material.name}</span>
                      <p className="text-xs text-gray-500">Raw Material</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-800">
                        <span className={material.name === "Gold" || material.name === "Palladium" ? "text-yellow-600 font-semibold" : ""}>
                          ${material.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-500">{material.unit}</span>
                      </div>
                      <div className={`text-xs ${material.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {material.change}
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="pt-3 mt-3 border-t border-gray-100">
                  <Button className="w-full text-xs btn-green-light">View All Materials</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* AI Detection Features */}
          <Card className="border border-gray-200">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium text-gray-800">AI Material Detection</h3>
              <p className="text-xs text-gray-500">How our system identifies valuable materials</p>
            </div>
            
            <CardContent className="p-0">
              <div className="border-b border-gray-100 p-4">
                <div className="flex items-start">
                  <div className="p-1.5 bg-green-50 rounded-full mr-3">
                    <Smartphone className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Device Database</h4>
                    <p className="text-xs text-gray-500">Comprehensive database of electronic devices and their material composition</p>
                  </div>
                </div>
              </div>
              
              <div className="border-b border-gray-100 p-4">
                <div className="flex items-start">
                  <div className="p-1.5 bg-indigo-50 rounded-full mr-3">
                    <Camera className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-indigo-600 mb-1">Image Recognition</h4>
                    <p className="text-xs text-gray-500">AI identifies device models from photos to determine recyclable materials</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start">
                  <div className="p-1.5 bg-purple-50 rounded-full mr-3">
                    <BarChart3 className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-purple-600 mb-1">Market Value API</h4>
                    <p className="text-xs text-gray-500">Real-time material pricing from global commodity markets</p>
                  </div>
                </div>
              </div>
              
              <div className="px-4 pb-4">
                <Button className="w-full text-xs h-8 bg-gray-100 text-gray-700 hover:bg-gray-200">
                  <Camera className="h-3.5 w-3.5 mr-1" />
                  Try Material Scanner
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}