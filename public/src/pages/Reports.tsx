import { useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Upload, Image, Calendar, MapPin, AlertTriangle, CheckCircle, FileInput } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const Reports = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Simulate AI analysis progress
      setAnalysisProgress(0);
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      
      toast({
        title: "Image uploaded successfully",
        description: `${file.name} is being analyzed by our AI system`,
      });
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Report submitted successfully",
        description: "Your deforestation report has been received and will be reviewed by our team.",
      });
    }, 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-forest-50 to-forest-100 rounded-xl p-6 border border-forest-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full forest-gradient flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-forest-800" />
          </div>
          <h1 className="text-3xl font-bold text-forest-800 font-poppins">Report Deforestation</h1>
        </div>
        <p className="text-forest-600">Help protect Kenya's forests by reporting suspected deforestation activity. Your reports help us respond quickly to threats.</p>
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Main Report Form */}
        <div className="xl:col-span-2">
          <Card className="data-visualization shadow-lg">
            <CardHeader className="bg-gradient-to-r from-forest-600 to-forest-700 text-black rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Submit New Report
              </CardTitle>
              <CardDescription className="text-forest-800">
                Provide detailed information about the suspected deforestation activity
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-red-500 font-medium">Location *</Label>
                    <Input 
                      id="location" 
                      placeholder="e.g., Mau Forest Complex, Nakuru County"
                      className="border-forest-200 focus:border-forest-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coordinates" className="text-red-500 font-medium">GPS Coordinates</Label>
                    <Input 
                      id="coordinates" 
                      placeholder="e.g., -0.5, 36.0"
                      className="border-forest-200 focus:border-forest-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="region" className="text-forest-700 font-medium">Forest Region *</Label>
                    <Select required>
                      <SelectTrigger className="border-forest-200 focus:border-forest-500">
                        <SelectValue placeholder="Select forest region" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="mau">Mau Forest Complex</SelectItem>
                        <SelectItem value="aberdare">Aberdare Forest</SelectItem>
                        <SelectItem value="mount-kenya">Mount Kenya Forest</SelectItem>
                        <SelectItem value="kakamega">Kakamega Forest</SelectItem>
                        <SelectItem value="arabuko">Arabuko-Sokoke Forest</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="severity" className="text-forest-700 font-medium">Severity Level *</Label>
                    <Select required>
                      <SelectTrigger className="border-forest-200 focus:border-forest-500">
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="low">🟢 Low - Small scale clearing</SelectItem>
                        <SelectItem value="medium">🟡 Medium - Moderate deforestation</SelectItem>
                        <SelectItem value="high">🟠 High - Large scale destruction</SelectItem>
                        <SelectItem value="critical">🔴 Critical - Immediate action needed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-red-500 font-medium">Description *</Label>
                  <Textarea 
                    id="description"
                    placeholder="Describe what you observed: logging equipment, cleared areas, smoke, etc. Include time of observation and any other relevant details."
                    rows={4}
                    className="border-forest-200 focus:border-forest-500"
                    required
                  />
                </div>

                {/* Enhanced Image Upload */}
                <div className="space-y-3">
                  <Label className="text-forest-700 font-medium">Evidence (Photos/Satellite Images)</Label>
                  <div className="border-2 border-dashed border-forest-300 rounded-lg p-8 text-center bg-forest-50/50 hover:bg-forest-50 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="h-12 w-12 mx-auto mb-3 text-forest-600" />
                      <p className="text-lg font-medium text-forest-700 mb-1">Click to upload image</p>
                      <p className="text-sm text-forest-500">PNG, JPG up to 10MB • Supports satellite imagery</p>
                    </label>
                    
                    {selectedFile && (
                      <div className="mt-6 p-4 bg-white rounded-lg border border-forest-200">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded bg-forest-100 flex items-center justify-center">
                            <Image className="h-4 w-4 text-forest-600" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-forest-700">{selectedFile.name}</p>
                            <p className="text-sm text-forest-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                          <Badge variant="outline" className="ml-auto bg-forest-100 text-forest-700">
                            {analysisProgress === 100 ? <CheckCircle className="h-3 w-3 mr-1" /> : null}
                            {analysisProgress === 100 ? 'Analysis Complete' : 'Analyzing'}
                          </Badge>
                        </div>
                        
                        {analysisProgress < 100 && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-forest-600">AI Analysis Progress</span>
                              <span className="text-forest-700 font-medium">{analysisProgress}%</span>
                            </div>
                            <Progress value={analysisProgress} className="h-2" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full forest-gradient text-black py-3 text-lg font-medium hover:shadow-lg transition-all duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting Report...' : 'Submit Report for Review'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Analysis Results */}
          <Card className="data-visualization shadow-lg">
            <CardHeader className="bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                AI Analysis Results
              </CardTitle>
              <CardDescription className="text-forest-800">
                Real-time image classification
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {selectedFile && analysisProgress === 100 ? (
                <div className="space-y-4">
                  <div className="aspect-video bg-forest-50 rounded-lg border-2 border-dashed border-forest-200 flex items-center justify-center">
                    <div className="text-center">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <p className="text-sm font-medium text-forest-700">Image processed successfully</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                     <div className="flex justify-between items-center p-3 bg-forest-50 rounded-lg">
                       <span className="text-sm font-medium text-forest-700">Deforestation Probability:</span>
                       <Badge className="bg-orange-100 text-orange-700">0% No Risk</Badge>
                     </div>
                     <div className="flex justify-between items-center p-3 bg-forest-50 rounded-lg">
                       <span className="text-sm font-medium text-forest-700">Forest Type Detected:</span>
                       <span className="text-sm text-forest-600">None</span>
                     </div>
                     <div className="flex justify-between items-center p-3 bg-forest-50 rounded-lg">
                       <span className="text-sm font-medium text-forest-700">Estimated Affected Area:</span>
                       <span className="text-sm text-forest-600">0 hectares</span>
                     </div>
                  </div>
                </div>
              ) : selectedFile ? (
                <div className="space-y-4">
                  <div className="aspect-video bg-forest-50 rounded-lg border-2 border-dashed border-forest-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-forest-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="text-sm text-forest-600">Processing image...</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-forest-50 rounded-lg border-2 border-dashed border-forest-200 flex items-center justify-center">
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-forest-400" 
                    onClick={handleIconClick}
                    />
                    <Input
                    ref={fileInputRef}
                    id="attachment"
                    type="file"
                    className="hidden"
                    />
                    <p className="text-sm text-forest-600">Upload an image to see AI analysis</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Community Reports */}
          <Card className="data-visualization shadow-lg">
            <CardHeader>
              <CardTitle className="text-forest-800 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Reports
              </CardTitle>
              <CardDescription>Latest community submissions</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  { location: 'Mau Forest Complex', time: '2 hours ago', status: 'Verified', severity: 'High', reporter: 'Community Member' },
                  { location: 'Mount Kenya Forest', time: '5 hours ago', status: 'Under Review', severity: 'Medium', reporter: 'Forest Ranger' },
                  { location: 'Aberdare Forest', time: '1 day ago', status: 'Verified', severity: 'Low', reporter: 'Research Team' },
                ].map((report, index) => (
                  <div key={index} className="p-4 bg-forest-50/50 rounded-lg border border-forest-100 hover:bg-forest-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-forest-800">{report.location}</p>
                        <p className="text-sm text-forest-600 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {report.time} • by {report.reporter}
                        </p>
                      </div>
                      <Badge 
                        variant={report.status === 'Verified' ? 'default' : 'secondary'}
                        className={report.status === 'Verified' ? 'bg-green-100 text-green-700' : ''}
                      >
                        {report.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-forest-600">Severity:</span>
                      <Badge 
                        variant="outline" 
                        className={
                          report.severity === 'High' ? 'border-red-200 text-red-700' :
                          report.severity === 'Medium' ? 'border-orange-200 text-orange-700' :
                          'border-green-200 text-green-700'
                        }
                      >
                        {report.severity}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;