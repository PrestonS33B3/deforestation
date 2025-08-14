import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Calendar, Upload } from "lucide-react";

const Community = () => {
  const verificationQueue: any[] = [];

  const topContributors = [
    { name: 'No Contributors', reports: 0, verifications: 0, score: 0 },
    { name: 'No Contributors', reports: 0, verifications: 0, score: 0 },
    { name: 'No Contributors', reports: 0, verifications: 0, score: 0 },
    { name: 'No Contributors', reports: 0, verifications: 0, score: 0 },
    { name: 'No Contributors', reports: 0, verifications: 0, score: 0 }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium': return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'Low': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-forest-800 font-poppins">Community Hub</h1>
        <p className="text-forest-600 mt-1">Collaborate with fellow forest guardians to verify reports and protect Kenya's forests</p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="data-visualization">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-forest-700">0</div>
            <p className="text-sm text-forest-600">Active Members</p>
          </CardContent>
        </Card>

        <Card className="data-visualization">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-forest-700">0%</div>
            <p className="text-sm text-forest-600">Verification Rate</p>
          </CardContent>
        </Card>

        <Card className="data-visualization">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-forest-700">0</div>
            <p className="text-sm text-forest-600">Reports This Month</p>
          </CardContent>
        </Card>

        <Card className="data-visualization">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-forest-700">0h</div>
            <p className="text-sm text-forest-600">Avg Response Time</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Verification Confirmation */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="data-visualization border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-forest-800 flex items-center gap-2">
                ✅ Report Verification Complete
              </CardTitle>
              <CardDescription>Your forest image has been successfully analyzed and verified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-green-200 rounded-lg p-6 bg-white">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <span className="text-2xl">🌲</span>
                  </div>
                  <h3 className="text-xl font-semibold text-forest-800">Verification Successful!</h3>
                   <p className="text-forest-600">
                     Your report has been verified and is valid. Our AI analysis confirmed forest integrity with 0% confidence.
                   </p>
                   
                   <div className="bg-forest-50 rounded-lg p-4 mt-4">
                     <div className="flex items-center justify-center gap-2 text-forest-700">
                       <span className="font-medium">AI Confidence:</span>
                       <Badge className="bg-green-100 text-green-800 border-green-300">0%</Badge>
                     </div>
                   </div>
                  
                  <div className="pt-4">
                    <Button className="forest-gradient text-white">
                      View Detailed Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Community Leaderboard */}
        <div className="space-y-6">
          <Card className="data-visualization">
            <CardHeader>
              <CardTitle className="text-forest-800">Top Contributors</CardTitle>
              <CardDescription>Community members making the biggest impact</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topContributors.map((contributor, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full forest-gradient flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-forest-800">{contributor.name}</p>
                    <div className="flex gap-4 text-xs text-forest-600">
                      <span>{contributor.reports} reports</span>
                      <span>{contributor.verifications} verifications</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <span className="text-sky-500">★</span>
                      <span className="text-sm font-medium text-forest-800">{contributor.score}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="data-visualization">
            <CardHeader>
              <CardTitle className="text-forest-800">Your Impact</CardTitle>
              <CardDescription>Your contribution to forest protection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-forest-700">0</div>
                <p className="text-sm text-forest-600">Hectares Protected</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-forest-700">0</div>
                  <p className="text-xs text-forest-600">Reports Submitted</p>
                </div>
                <div>
                  <div className="text-xl font-bold text-forest-700">0</div>
                  <p className="text-xs text-forest-600">Verifications</p>
                </div>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="bg-forest-100 text-forest-700">
                  ⭐ Forest Guardian - Level 0
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Community;
