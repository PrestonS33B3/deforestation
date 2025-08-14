import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { ArrowDown, Database, Search, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Main Menu Section */}
      <div className="container mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-poppins text-white">
            EcoGuardian Kenya
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white/90">
            AI-Powered Community Platform for Real-Time Forest Protection
          </p>
          
          {/* Menu Options */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 px-12 py-6 text-lg font-semibold min-h-[80px] flex flex-col gap-2"
              onClick={() => navigate('/dashboard')}
            >
              <Database className="h-8 w-8" />
              Launch Dashboard
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-primary px-12 py-6 text-lg font-semibold min-h-[80px] flex flex-col gap-2"
              onClick={() => navigate('/reports')}
            >
              <Upload className="h-8 w-8" />
              Report Deforestation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
