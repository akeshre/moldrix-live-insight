import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Thermometer, Clock, Target, TrendingUp, Settings, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function MachineDashboard() {
  const { plantId, machineId } = useParams();
  const navigate = useNavigate();
  
  const [machineData, setMachineData] = useState({
    name: `Machine ${machineId}`,
    status: 'running' as const,
    operator: 'John Smith',
    moldId: '2024-15A',
    shotsToday: 2847,
    targetShots: 3200,
    moldTemp: 174.2,
    machineTemp: 48.3,
    cycleTime: 23.2,
    avgCycleTime: 23.8,
    bestCycleTime: 22.1,
    efficiency: 94.8,
    uptime: '6h 32m',
    lastMaintenance: '15 days ago'
  });

  const [tempHistory, setTempHistory] = useState<number[]>([172.1, 173.4, 174.2, 175.8, 174.2]);
  const [shotHistory, setShotHistory] = useState<number[]>([2800, 2820, 2835, 2847]);

  // Live data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMachineData(prev => ({
        ...prev,
        shotsToday: prev.shotsToday + Math.floor(Math.random() * 3) + 1,
        moldTemp: Math.round((prev.moldTemp + (Math.random() - 0.5) * 2) * 10) / 10,
        cycleTime: Math.round((prev.cycleTime + (Math.random() - 0.5) * 0.5) * 10) / 10
      }));

      setTempHistory(prev => [...prev.slice(-4), machineData.moldTemp]);
      setShotHistory(prev => [...prev.slice(-3), machineData.shotsToday]);
    }, 2000);

    return () => clearInterval(interval);
  }, [machineData.moldTemp, machineData.shotsToday]);

  const progressPercentage = (machineData.shotsToday / machineData.targetShots) * 100;
  const timeToTarget = Math.max(0, Math.round((machineData.targetShots - machineData.shotsToday) / (machineData.shotsToday / 8))); // Assuming 8 hours elapsed

  const handleMoldClick = () => {
    if (machineData.moldId) {
      navigate(`/plant/${plantId}/machine/${machineId}/mold/${machineData.moldId}`);
    }
  };

  const plantNames: { [key: string]: string } = {
    mumbai: 'Mumbai Plant',
    chennai: 'Chennai Plant',
    delhi: 'Delhi Plant',
    pune: 'Pune Plant'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(`/plant/${plantId}`)} className="hover-lift">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Plant
            </Button>
            <div className="h-4 w-px bg-border" />
            <div>
              <h1 className="text-lg font-bold text-primary">{machineData.name}</h1>
              <p className="text-sm text-muted-foreground">
                {plantNames[plantId as string]} • Op: {machineData.operator} • Uptime: {machineData.uptime}
              </p>
            </div>
            <Badge variant={machineData.status === 'running' ? 'default' : 'secondary'}>
              🟢 {machineData.status.toUpperCase()}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Button variant="outline" size="sm" className="hover-lift">
              <Settings className="w-4 h-4 mr-1" />
              Machine Settings
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Live KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Target className="w-4 h-4 mr-1" />
                Live Production
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{machineData.shotsToday.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground mb-2">
                Target: {machineData.targetShots.toLocaleString()} ({progressPercentage.toFixed(1)}%)
              </p>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                ⏰ {timeToTarget}h to target
              </p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Thermometer className="w-4 h-4 mr-1" />
                Temperature Monitor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${machineData.moldTemp > 185 ? 'text-danger' : 
                machineData.moldTemp > 180 ? 'text-warning' : 'text-primary'}`}>
                {machineData.moldTemp}°C
              </div>
              <p className="text-sm text-muted-foreground">
                Mold temp • Machine: {machineData.machineTemp}°C
              </p>
              <div className="flex items-center mt-2">
                <div className="text-xs text-muted-foreground">
                  Trend: {tempHistory[tempHistory.length-1] > tempHistory[tempHistory.length-2] ? '↗️' : '↘️'}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Cycle Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{machineData.cycleTime}s</div>
              <p className="text-sm text-muted-foreground">
                Avg: {machineData.avgCycleTime}s • Best: {machineData.bestCycleTime}s 🏆
              </p>
              <div className="text-xs text-success mt-1">
                96.4% consistency ✅
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{machineData.efficiency}%</div>
              <p className="text-sm text-muted-foreground">
                Efficiency Score
              </p>
              <div className="text-xs text-success mt-1">
                📈 +2.3% vs yesterday
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Shot Progression (Live)</span>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse-soft" />
                  <span>Auto Refresh</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 flex items-end space-x-2">
                {shotHistory.map((shots, index) => (
                  <div 
                    key={index}
                    className="flex-1 bg-primary/20 rounded-t transition-all duration-300"
                    style={{ 
                      height: `${(shots / Math.max(...shotHistory)) * 100}%`,
                      backgroundColor: index === shotHistory.length - 1 ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.3)'
                    }}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Current: {machineData.shotsToday.toLocaleString()} shots
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Temperature Trends</span>
                <Badge variant={machineData.moldTemp > 185 ? "destructive" : 
                  machineData.moldTemp > 180 ? "secondary" : "default"}>
                  {machineData.moldTemp > 185 ? '🔴 Critical' : 
                   machineData.moldTemp > 180 ? '🟡 Warning' : '✅ Normal'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 flex items-end space-x-2">
                {tempHistory.map((temp, index) => (
                  <div 
                    key={index}
                    className="flex-1 rounded-t transition-all duration-300"
                    style={{ 
                      height: `${((temp - 160) / 30) * 100}%`,
                      backgroundColor: temp > 185 ? 'hsl(var(--destructive))' : 
                        temp > 180 ? 'hsl(var(--warning))' : 'hsl(var(--primary))'
                    }}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Current: {machineData.moldTemp}°C • Threshold: 185°C
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mold Information */}
        {machineData.moldId && (
          <Card className="glass mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Current Mold: #{machineData.moldId}</span>
                <Button variant="outline" size="sm" onClick={handleMoldClick} className="hover-lift">
                  View Mold Details →
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">Injection Mold</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Install Date</p>
                  <p className="font-medium">Jan 15, 2024</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Next Maintenance</p>
                  <p className="font-medium text-warning">Jan 28, 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Machine Controls */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Machine Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" className="hover-lift">
                <Pause className="w-4 h-4 mr-1" />
                Pause Production
              </Button>
              <Button variant="outline" size="sm" className="hover-lift">
                <Settings className="w-4 h-4 mr-1" />
                Adjust Settings
              </Button>
              <Button variant="outline" size="sm" className="hover-lift">
                🔄 Reset Counter
              </Button>
              <Button variant="outline" size="sm" className="hover-lift">
                👤 Change Operator
              </Button>
              <Button variant="outline" size="sm" className="hover-lift">
                🔧 Request Maintenance
              </Button>
              <Button variant="destructive" size="sm" className="hover-lift">
                ⚠️ Emergency Stop
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}