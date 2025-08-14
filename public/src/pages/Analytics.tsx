import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  // Mock data for comprehensive analytics
  const monthlyDeforestation = [
    { month: 'Jan', deforested: 0, reports: 0, verified: 0 },
    { month: 'Feb', deforested: 0, reports: 0, verified: 0 },
    { month: 'Mar', deforested: 0, reports: 0, verified: 0 },
    { month: 'Apr', deforested: 0, reports: 0, verified: 0 },
    { month: 'May', deforested: 0, reports: 0, verified: 0 },
    { month: 'Jun', deforested: 0, reports: 0, verified: 0 },
  ];

  const responseMetrics = [
    { metric: 'Average Response Time', value: '0 hours', change: '0%', positive: true },
    { metric: 'Verification Accuracy', value: '0%', change: '0%', positive: true },
    { metric: 'Community Participation', value: '0 users', change: '0%', positive: true },
    { metric: 'False Positive Rate', value: '0%', change: '0%', positive: true },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-forest-800 font-poppins">Forest Analytics</h1>
        <p className="text-forest-600 mt-1">Comprehensive insights into deforestation patterns and conservation efforts</p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {responseMetrics.map((metric, index) => (
          <Card key={index} className="data-visualization">
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-forest-700">{metric.metric}</p>
                <p className="text-2xl font-bold text-forest-800">{metric.value}</p>
                <div className="flex items-center gap-1">
                  <Badge 
                    variant={metric.positive ? "default" : "destructive"}
                    className={metric.positive ? "bg-green-100 text-green-800" : ""}
                  >
                    {metric.change}
                  </Badge>
                  <span className="text-xs text-forest-600">vs last month</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Deforestation Trends */}
        <Card className="data-visualization">
          <CardHeader>
            <CardTitle className="text-forest-800">Deforestation Trends</CardTitle>
            <CardDescription>Monthly deforestation incidents vs community reports</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyDeforestation}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="deforested" 
                  stroke="#dc2626" 
                  strokeWidth={3}
                  name="Deforested (hectares)"
                />
                <Line 
                  type="monotone" 
                  dataKey="reports" 
                  stroke="#16a34a" 
                  strokeWidth={3}
                  name="Community Reports"
                />
                <Line 
                  type="monotone" 
                  dataKey="verified" 
                  stroke="#0369a1" 
                  strokeWidth={3}
                  name="Verified Reports"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* System Performance */}
        <Card className="data-visualization">
          <CardHeader>
            <CardTitle className="text-forest-800">AI Model Performance</CardTitle>
            <CardDescription>Machine learning accuracy metrics over time</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <div className="space-y-6 pt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-forest-700">Deforestation Detection</span>
                  <span className="text-sm font-bold text-forest-800">0%</span>
                </div>
                <div className="w-full bg-forest-200 rounded-full h-2">
                  <div className="bg-forest-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-forest-700">Forest Type Classification</span>
                  <span className="text-sm font-bold text-forest-800">0%</span>
                </div>
                <div className="w-full bg-forest-200 rounded-full h-2">
                  <div className="bg-forest-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-forest-700">Area Estimation</span>
                  <span className="text-sm font-bold text-forest-800">0%</span>
                </div>
                <div className="w-full bg-forest-200 rounded-full h-2">
                  <div className="bg-forest-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-forest-700">Threat Classification</span>
                  <span className="text-sm font-bold text-forest-800">0%</span>
                </div>
                <div className="w-full bg-forest-200 rounded-full h-2">
                  <div className="bg-forest-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics Table */}
      <Card className="data-visualization">
        <CardHeader>
          <CardTitle className="text-forest-800">Conservation Impact Summary</CardTitle>
          <CardDescription>Comprehensive overview of forest protection achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-forest-700">0</div>
              <p className="text-sm text-forest-600">Hectares Protected</p>
              <Badge variant="outline" className="bg-gray-100 text-gray-700">
                0% this quarter
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
