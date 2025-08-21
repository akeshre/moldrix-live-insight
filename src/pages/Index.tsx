import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLiveData } from '@/hooks/useLiveData';
import { Header } from '@/components/Dashboard/Header';
import { GlobalKPIs } from '@/components/Dashboard/GlobalKPIs';
import { PlantCard } from '@/components/Dashboard/PlantCard';
import { ControlPanel } from '@/components/Dashboard/ControlPanel';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const { globalData, plantsData, currentTime } = useLiveData();
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState('3s');
  const { toast } = useToast();

  const totalAlerts = globalData.criticalAlerts + globalData.warningAlerts;

  const handleEnterPlant = (plantId: string) => {
    navigate(`/plant/${plantId}`);
  };

  const handleViewReports = (plantId: string) => {
    toast({
      title: "Generating Reports",
      description: `Loading analytics for ${plantId} plant...`,
    });
  };

  const handleViewAlerts = (plantId: string) => {
    toast({
      title: "Alert Center",
      description: `Opening alert dashboard for ${plantId} plant...`,
    });
  };

  const handleToggleAutoRefresh = () => {
    setIsAutoRefresh(!isAutoRefresh);
    toast({
      title: isAutoRefresh ? "Auto-refresh disabled" : "Auto-refresh enabled",
      description: `Data updates ${isAutoRefresh ? 'paused' : `every ${refreshInterval}`}`,
    });
  };

  const handleRefreshIntervalChange = (interval: string) => {
    setRefreshInterval(interval);
    toast({
      title: "Refresh interval updated",
      description: `Data will update every ${interval}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background">
      <Header currentTime={currentTime} alertCount={totalAlerts} />
      
      <main className="container mx-auto px-6 py-8">
        {/* Control Panel */}
        <ControlPanel
          isAutoRefresh={isAutoRefresh}
          refreshInterval={refreshInterval}
          onToggleAutoRefresh={handleToggleAutoRefresh}
          onRefreshIntervalChange={handleRefreshIntervalChange}
        />

        {/* Global KPIs */}
        <GlobalKPIs data={globalData} />

        {/* Plant Locations & Status */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
            <span>🗺️</span>
            <span>PLANT LOCATIONS & STATUS</span>
            <div className="flex items-center space-x-2 ml-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse-soft" />
              <span className="text-sm text-muted-foreground">Live Updates</span>
            </div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {plantsData.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onEnterPlant={handleEnterPlant}
                onViewReports={handleViewReports}
                onViewAlerts={handleViewAlerts}
              />
            ))}
          </div>
        </section>

        {/* Footer Info */}
        <footer className="glass rounded-lg p-6 mt-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>MoldRix™ Manufacturing Dashboard v2.1</span>
              <span>•</span>
              <span>Last System Check: All systems operational ✅</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>System Status:</span>
              <span className="text-success font-medium">Online</span>
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft" />
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
