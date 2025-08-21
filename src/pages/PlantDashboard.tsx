import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Users, Wrench, BarChart3, Cog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/ThemeToggle';

interface Machine {
  id: string;
  name: string;
  status: 'running' | 'warning' | 'critical' | 'maintenance' | 'idle';
  shotsToday: number;
  moldTemp: number;
  machineTemp: number;
  cycleTime: number;
  efficiency: number;
  operator: string;
  moldId?: string;
}

export default function PlantDashboard() {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [machines, setMachines] = useState<Machine[]>([
    {
      id: 'M-001',
      name: 'Machine M-001',
      status: 'running',
      shotsToday: 2847,
      moldTemp: 174.2,
      machineTemp: 48.3,
      cycleTime: 23.2,
      efficiency: 94.8,
      operator: 'John Smith',
      moldId: '2024-15A'
    },
    {
      id: 'M-002',
      name: 'Machine M-002', 
      status: 'warning',
      shotsToday: 2234,
      moldTemp: 183.1,
      machineTemp: 52.1,
      cycleTime: 25.8,
      efficiency: 87.3,
      operator: 'Sarah Lee',
      moldId: '2024-22B'
    },
    {
      id: 'M-003',
      name: 'Machine M-003',
      status: 'critical',
      shotsToday: 1905,
      moldTemp: 189.4,
      machineTemp: 55.2,
      cycleTime: 28.4,
      efficiency: 75.2,
      operator: 'Mike Johnson',
      moldId: '2024-08C'
    },
    {
      id: 'M-004',
      name: 'Machine M-004',
      status: 'maintenance',
      shotsToday: 0,
      moldTemp: 0,
      machineTemp: 23.1,
      cycleTime: 0,
      efficiency: 0,
      operator: 'Maintenance Team'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-status-running';
      case 'warning': return 'text-status-warning';
      case 'critical': return 'text-status-critical';
      case 'maintenance': return 'text-status-maintenance';
      case 'idle': return 'text-status-idle';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'running': return 'default';
      case 'warning': return 'secondary';
      case 'critical': return 'destructive';
      case 'maintenance': return 'outline';
      case 'idle': return 'secondary';
      default: return 'outline';
    }
  };

  const handleMachineClick = (machineId: string) => {
    navigate(`/plant/${plantId}/machine/${machineId}`);
  };

  const handleAddMachine = () => {
    navigate(`/add-machine/${plantId}`);
  };

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMachines(prev => prev.map(machine => ({
        ...machine,
        shotsToday: machine.status === 'running' ? machine.shotsToday + Math.floor(Math.random() * 3) + 1 : machine.shotsToday,
        moldTemp: machine.status === 'running' ? 
          Math.round((machine.moldTemp + (Math.random() - 0.5) * 2) * 10) / 10 : machine.moldTemp,
        cycleTime: machine.status === 'running' ? 
          Math.round((machine.cycleTime + (Math.random() - 0.5) * 0.5) * 10) / 10 : machine.cycleTime
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const plantData = {
    mumbai: { name: 'Mumbai Plant', manager: 'Raj Patel', shift: 'Shift A' },
    chennai: { name: 'Chennai Plant', manager: 'Priya Kumar', shift: 'Shift B' },
    delhi: { name: 'Delhi Plant', manager: 'Arjun Singh', shift: 'Shift A' },
    pune: { name: 'Pune Plant', manager: 'Sneha Desai', shift: 'Shift C' }
  };

  const currentPlant = plantData[plantId as keyof typeof plantData] || { name: 'Unknown Plant', manager: 'Unknown', shift: 'Unknown' };
  const totalShots = machines.reduce((sum, m) => sum + m.shotsToday, 0);
  const runningMachines = machines.filter(m => m.status === 'running').length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="hover-lift">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Global
            </Button>
            <div className="h-4 w-px bg-border" />
            <div>
              <h1 className="text-lg font-bold text-primary">{currentPlant.name}</h1>
              <p className="text-sm text-muted-foreground">
                Manager: {currentPlant.manager} • {currentPlant.shift}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-sm text-muted-foreground">
              Machines: {machines.length} • Running: {runningMachines}
            </div>
            <ThemeToggle />
            <Button variant="default" size="sm" onClick={handleAddMachine} className="hover-lift">
              <Plus className="w-4 h-4 mr-1" />
              Add Machine
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Plant KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Machines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{machines.length}</div>
              <p className="text-sm text-muted-foreground">
                {runningMachines} running • {machines.filter(m => m.status === 'maintenance').length} maintenance
              </p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Shots Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{totalShots.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">
                Avg: {Math.round(totalShots / runningMachines || 0)} per machine
              </p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Plant Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {Math.round(machines.reduce((sum, m) => sum + m.efficiency, 0) / machines.length)}%
              </div>
              <p className="text-sm text-muted-foreground">Across all machines</p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-danger">
                {machines.filter(m => m.status === 'critical').length}
              </div>
              <p className="text-sm text-muted-foreground">
                {machines.filter(m => m.status === 'warning').length} warnings
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Machine Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
            <Cog className="w-6 h-6 text-primary" />
            <span>MACHINE STATUS GRID</span>
            <div className="flex items-center space-x-2 ml-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse-soft" />
              <span className="text-sm text-muted-foreground">Live Updates</span>
            </div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {machines.map((machine) => (
              <Card 
                key={machine.id} 
                className="glass hover-lift cursor-pointer transition-all duration-300"
                onClick={() => handleMachineClick(machine.id)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg font-bold">{machine.name}</span>
                    <Badge variant={getStatusBadgeVariant(machine.status)}>
                      {machine.status.toUpperCase()}
                    </Badge>
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    Op: {machine.operator}
                    {machine.moldId && <span> • Mold: #{machine.moldId}</span>}
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Shots Today:</span>
                    <span className="font-medium">{machine.shotsToday.toLocaleString()}</span>
                  </div>

                  {machine.status !== 'maintenance' && (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Mold Temp:</span>
                        <span className={`font-medium ${machine.moldTemp > 185 ? 'text-danger' : 
                          machine.moldTemp > 180 ? 'text-warning' : 'text-success'}`}>
                          {machine.moldTemp}°C
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Cycle Time:</span>
                        <span className="font-medium">{machine.cycleTime}s</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Efficiency:</span>
                        <span className={`font-medium ${getStatusColor(machine.status)}`}>
                          {machine.efficiency}%
                        </span>
                      </div>
                    </>
                  )}

                  {machine.status === 'maintenance' && (
                    <div className="text-center py-4">
                      <Wrench className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Under Maintenance</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="outline" size="sm" className="hover-lift">
            <Users className="w-4 h-4 mr-1" />
            Manage Operators
          </Button>
          <Button variant="outline" size="sm" className="hover-lift">
            <Wrench className="w-4 h-4 mr-1" />
            Schedule Maintenance
          </Button>
          <Button variant="outline" size="sm" className="hover-lift">
            <BarChart3 className="w-4 h-4 mr-1" />
            Plant Analytics
          </Button>
        </div>
      </main>
    </div>
  );
}