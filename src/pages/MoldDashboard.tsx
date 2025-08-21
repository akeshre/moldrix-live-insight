import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Thermometer, BarChart3, AlertTriangle, Calendar, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function MoldDashboard() {
  const { plantId, machineId, moldId } = useParams();
  const navigate = useNavigate();
  
  const [moldData, setMoldData] = useState({
    id: moldId,
    name: `Mold #${moldId}`,
    type: 'Injection Mold',
    part: 'Auto Component',
    installDate: 'Jan 15, 2024',
    totalShots: 117450,
    maxShots: 150000,
    shotsToday: 2847,
    lifecycle: 78.2,
    nextMaintenance: 'Jan 28, 2024',
    currentTemp: 174.2,
    tempRangeToday: { min: 168, max: 179.8 },
    thermalStress: 2.1,
    qualityRate: 99.2,
    goodPartsToday: 2825,
    defects: { flash: 12, shortShot: 8, sink: 2 },
    eolDays: 28,
    maintenanceCost: { preventive: 850, reactive: 2400 },
    failureRisk: 23
  });

  const [tempTrend, setTempTrend] = useState<number[]>([168, 172, 174, 178, 174.2]);
  const [qualityTrend, setQualityTrend] = useState<number[]>([99.1, 99.0, 99.3, 99.2]);

  // Live data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMoldData(prev => ({
        ...prev,
        totalShots: prev.totalShots + Math.floor(Math.random() * 3) + 1,
        shotsToday: prev.shotsToday + Math.floor(Math.random() * 3) + 1,
        currentTemp: Math.round((prev.currentTemp + (Math.random() - 0.5) * 2) * 10) / 10,
        qualityRate: Math.round((prev.qualityRate + (Math.random() - 0.5) * 0.1) * 10) / 10
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const remainingShots = moldData.maxShots - moldData.totalShots;
  const dailyAverage = 2400;
  const daysRemaining = Math.ceil(remainingShots / dailyAverage);

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
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(`/plant/${plantId}/machine/${machineId}`)} 
              className="hover-lift"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Machine
            </Button>
            <div className="h-4 w-px bg-border" />
            <div>
              <h1 className="text-lg font-bold text-primary">{moldData.name}</h1>
              <p className="text-sm text-muted-foreground">
                {plantNames[plantId as string]} • Machine {machineId} • {moldData.type}
              </p>
            </div>
            <Badge variant="outline" className="animate-pulse-soft">
              {moldData.lifecycle.toFixed(1)}% Used
            </Badge>
          </div>
          
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Button variant="outline" size="sm" className="hover-lift">
              ✏️ Edit Mold
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Mold Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Target className="w-4 h-4 mr-1" />
                Shot Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{moldData.totalShots.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground mb-2">
                Max: {moldData.maxShots.toLocaleString()} • Remaining: {remainingShots.toLocaleString()}
              </p>
              <Progress value={moldData.lifecycle} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                ⏰ {daysRemaining} days remaining
              </p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Thermometer className="w-4 h-4 mr-1" />
                Thermal Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${moldData.currentTemp > 185 ? 'text-danger' : 
                moldData.currentTemp > 180 ? 'text-warning' : 'text-primary'}`}>
                {moldData.currentTemp}°C
              </div>
              <p className="text-sm text-muted-foreground">
                Range: {moldData.tempRangeToday.min}-{moldData.tempRangeToday.max}°C
              </p>
              <div className="text-xs mt-1">
                <span className="text-warning">Thermal Stress: {moldData.thermalStress}M index</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <BarChart3 className="w-4 h-4 mr-1" />
                Quality Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{moldData.qualityRate}%</div>
              <p className="text-sm text-muted-foreground">
                {moldData.goodPartsToday}/{moldData.shotsToday} good parts today
              </p>
              <div className="text-xs text-success mt-1">
                ✅ Strong temp-quality link (R² = 0.87)
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{moldData.eolDays}</div>
              <p className="text-sm text-muted-foreground">
                Days to next maintenance
              </p>
              <div className="text-xs text-warning mt-1">
                📅 Scheduled: {moldData.nextMaintenance}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Predictive Analytics Panel */}
        <Card className="glass mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🔮</span>
              <span>PREDICTIVE INSIGHTS</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Remaining Life Forecast */}
            <div>
              <h4 className="font-semibold mb-3">Remaining Life Forecast</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Optimistic (35 days)</span>
                  <div className="flex-1 mx-4">
                    <Progress value={68} className="h-2" />
                  </div>
                  <span className="text-sm text-muted-foreground">68%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Expected (28 days)</span>
                  <div className="flex-1 mx-4">
                    <Progress value={58} className="h-2" />
                  </div>
                  <span className="text-sm text-muted-foreground">58%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Conservative (22 days)</span>
                  <div className="flex-1 mx-4">
                    <Progress value={48} className="h-2" />
                  </div>
                  <span className="text-sm text-muted-foreground">48%</span>
                </div>
              </div>
              <div className="mt-3 p-3 bg-primary/10 rounded-lg">
                <p className="text-sm">
                  💡 <strong>Recommendation:</strong> Schedule maintenance in 12-15 days for optimal ROI
                </p>
              </div>
            </div>

            {/* Cost Optimization */}
            <div>
              <h4 className="font-semibold mb-3">Maintenance Cost Optimization</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-success">Preventive (15 days)</span>
                    <span className="text-2xl font-bold text-success">${moldData.maintenanceCost.preventive}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Scheduled maintenance</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-danger">Reactive (failure)</span>
                    <span className="text-2xl font-bold text-danger">${moldData.maintenanceCost.reactive}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Emergency repair cost</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-success font-medium">
                  Savings Potential: ${moldData.maintenanceCost.reactive - moldData.maintenanceCost.preventive} ✅
                </span>
                <span className="text-warning">
                  Risk of Failure: {moldData.failureRisk}% 🎲
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Defect Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Temperature Profile (Last 24 Hours)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 flex items-end space-x-2">
                {tempTrend.map((temp, index) => (
                  <div 
                    key={index}
                    className="flex-1 rounded-t transition-all duration-300"
                    style={{ 
                      height: `${((temp - 160) / 25) * 100}%`,
                      backgroundColor: temp > 185 ? 'hsl(var(--destructive))' : 
                        temp > 180 ? 'hsl(var(--warning))' : 'hsl(var(--primary))'
                    }}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Optimal range: 170-180°C • Time in range: 94.2% ✅
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Defect Breakdown (Today)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Flash</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div 
                        className="bg-warning rounded-full h-2" 
                        style={{ width: `${(moldData.defects.flash / 22) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{moldData.defects.flash}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Short Shot</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div 
                        className="bg-danger rounded-full h-2" 
                        style={{ width: `${(moldData.defects.shortShot / 22) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{moldData.defects.shortShot}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sink Marks</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2" 
                        style={{ width: `${(moldData.defects.sink / 22) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{moldData.defects.sink}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-success">
                Total defects: {Object.values(moldData.defects).reduce((a, b) => a + b, 0)} 
                ({((Object.values(moldData.defects).reduce((a, b) => a + b, 0) / moldData.shotsToday) * 100).toFixed(1)}%)
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button variant="default" size="sm" className="hover-lift">
            💾 Schedule Preventive
          </Button>
          <Button variant="outline" size="sm" className="hover-lift">
            📊 Cost Analysis
          </Button>
          <Button variant="outline" size="sm" className="hover-lift">
            ⚠️ Risk Assessment
          </Button>
          <Button variant="outline" size="sm" className="hover-lift">
            <Wrench className="w-4 h-4 mr-1" />
            Maintenance Log
          </Button>
          <Button variant="outline" size="sm" className="hover-lift">
            📈 Export Data
          </Button>
          <Button variant="outline" size="sm" className="hover-lift">
            🔄 Transfer Mold
          </Button>
        </div>
      </main>
    </div>
  );
}