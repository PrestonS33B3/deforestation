import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Calendar, Search } from "lucide-react";
import { Input } from "../components/ui/input";

const Alerts = () => {
  // Mock alert data
  const alertSummary = [
    { level: "Critical", count: 12, color: "red", trend: "+3" },
    { level: "High", count: 28, color: "orange", trend: "-2" },
    { level: "Medium", count: 42, color: "sky", trend: "+8" },
    { level: "Total Active", count: 82, color: "forest" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-forest-800 font-poppins">Active Alerts Scale</h1>
          <p className="text-forest-600 mt-1">Real-time alert severity monitoring</p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-forest-400" />
            <Input 
              placeholder="Search alerts..." 
              className="pl-10 border-forest-200 focus-visible:ring-forest-300"
            />
          </div>
          <Button variant="outline" className="border-forest-200 text-forest-700 hover:bg-forest-50">
            <Calendar className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Alert Summary Scale */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {alertSummary.map((alert, index) => (
          <Card 
            key={index} 
            className={`border border-${alert.color}-200 shadow-sm transition-all hover:shadow-md`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-forest-700">{alert.level}</p>
                  <p className={`text-2xl font-bold text-${alert.color}-600 mt-1`}>
                    {alert.count}
                  </p>
                  {alert.trend && (
                    <Badge 
                      variant="outline" 
                      className={`mt-1 text-xs ${
                        alert.trend.startsWith('+') 
                          ? 'bg-red-100 text-red-800 border-red-200' 
                          : 'bg-green-100 text-green-800 border-green-200'
                      }`}
                    >
                      {alert.trend} today
                    </Badge>
                  )}
                </div>
                <div className={`w-3 h-3 rounded-full bg-${alert.color}-500 ${
                  alert.level === "Critical" ? "animate-pulse" : ""
                }`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Alerts Table */}
      <Card className="border border-forest-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-forest-800">Recent Critical Alerts</CardTitle>
          <CardDescription>Requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-forest-50">
                <tr>
                  <th className="p-3 text-left text-forest-700 font-medium">Location</th>
                  <th className="p-3 text-left text-forest-700 font-medium">Detected</th>
                  <th className="p-3 text-left text-forest-700 font-medium">Area</th>
                  <th className="p-3 text-left text-forest-700 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-forest-100 hover:bg-forest-50">
                    <td className="p-3 text-forest-800">Amazon Rainforest Zone {i+1}</td>
                    <td className="p-3 text-forest-700">2 hours ago</td>
                    <td className="p-3 text-forest-700">{12.5 + i*2} hectares</td>
                    <td className="p-3">
                      <Badge 
                        variant="destructive" 
                        className="bg-red-100 text-red-800 px-2 py-1 rounded-full"
                      >
                        Unverified
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex justify-center">
            <Button variant="outline" className="border-forest-300 text-forest-700">
              View All Alerts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Alerts;