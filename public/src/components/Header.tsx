import { SidebarTrigger } from "../components/ui/sidebar";
import { Button } from "../components/ui/button";
import { Calendar } from "lucide-react";

export function Header() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="h-16 border-b border-forest-200 bg-white/80 backdrop-blur-sm flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-8 w-8" />
        <div className="hidden md:block">
          <h1 className="font-poppins font-semibold text-forest-800">Forest Protection Dashboard</h1>
          <p className="text-sm text-forest-600 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {currentDate}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button 
          size="sm" 
          className="forest-gradient text-white hover:shadow-lg transition-all duration-200"
        >
          Emergency Report
        </Button>
      </div>
    </header>
  );
}
