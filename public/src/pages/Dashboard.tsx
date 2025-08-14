import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard = () => {
  // Mock data for demonstration
  const forestCoverageData = [
    { month: 'Jan', coverage: 82 },
    { month: 'Feb', coverage: 81.5 },
    { month: 'Mar', coverage: 81 },
    { month: 'Apr', coverage: 80.2 },
    { month: 'May', coverage: 79.8 },
    { month: 'Jun', coverage: 79.1 },
  ];

  const alertsData = [
    { region: 'Mau Forest', alerts: 15 },
    { region: 'Aberdare', alerts: 8 },
    { region: 'Mt. Kenya', alerts: 12 },
    { region: 'Kakamega', alerts: 6 },
    { region: 'Arabuko', alerts: 4 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-forest-800 font-poppins">Forest Monitoring Dashboard</h1>
          <p className="text-forest-600 mt-1">Real-time overview of Kenya's forest protection status</p>
        </div>
          <Badge variant="outline" className="bg-forest-100 text-forest-700 border-forest-300">
            Last updated: Never
          </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="data-visualization">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Forest Coverage</CardTitle>
            <span className="text-2xl">🌲</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-forest-700">0%</div>
            <p className="text-xs text-red-600">0% from last year</p>
            <Progress value={0} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="data-visualization">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <span className="text-2xl">🚨</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">0</div>
            <p className="text-xs text-forest-600">0 from yesterday</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="destructive" className="text-xs">0 Critical</Badge>
              <Badge variant="secondary" className="text-xs">0 Moderate</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="data-visualization">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Reports</CardTitle>
            <span className="text-2xl">👥</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-forest-700">0</div>
            <p className="text-xs text-forest-600">This month</p>
            <div className="text-xs text-green-600 mt-1">0% verified</div>
          </CardContent>
        </Card>

        <Card className="data-visualization">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <span className="text-2xl">⚡</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-forest-700">0h</div>
            <p className="text-xs text-green-600">0h improvement</p>
            <div className="text-xs text-forest-600 mt-1">Average alert response</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="data-visualization">
          <CardHeader>
            <CardTitle className="text-forest-800">Forest Coverage Trend</CardTitle>
            <CardDescription>Monthly forest coverage percentage across Kenya</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forestCoverageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="coverage" 
                  stroke="#16a34a" 
                  strokeWidth={3}
                  dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="data-visualization">
          <CardHeader>
            <CardTitle className="text-forest-800">Active Alerts by Region</CardTitle>
            <CardDescription>Current deforestation alerts across major forest areas</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={alertsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="alerts" 
                  fill="#0ea5e9"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="data-visualization">
        <CardHeader>
          <CardTitle className="text-forest-800">Recent Activity</CardTitle>
          <CardDescription>Latest deforestation reports and system updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-center p-8 text-center">
              <div className="text-forest-600">
                <p className="text-sm">No recent activity</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
