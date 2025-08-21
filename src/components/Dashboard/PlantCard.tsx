import { Factory, User, Cog, AlertTriangle, BarChart3, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PlantData } from '@/hooks/useLiveData';
import { StatusBadge } from './KPICard';

interface PlantCardProps {
  plant: PlantData;
  onEnterPlant: (plantId: string) => void;
  onViewReports: (plantId: string) => void;
  onViewAlerts: (plantId: string) => void;
}

export function PlantCard({ plant, onEnterPlant, onViewReports, onViewAlerts }: PlantCardProps) {
  const progressPercentage = (plant.shotsToday / plant.shotsTarget) * 100;
  const hasAlerts = plant.alerts.critical > 0 || plant.alerts.warning > 0;

  const getStatusIcon = () => {
    switch (plant.status) {
      case 'running':
        return <div className="w-3 h-3 bg-status-running rounded-full animate-pulse-soft" />;
      case 'warning':
        return <div className="w-3 h-3 bg-status-warning rounded-full animate-pulse-soft" />;
      case 'critical':
        return <div className="w-3 h-3 bg-status-critical rounded-full animate-pulse-soft" />;
      case 'maintenance':
        return <div className="w-3 h-3 bg-status-maintenance rounded-full animate-pulse-soft" />;
      default:
        return <div className="w-3 h-3 bg-status-idle rounded-full" />;
    }
  };

  return (
    <Card className="glass hover-lift animate-scale-in transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Factory className="w-5 h-5 text-primary" />
            <span className="text-lg font-bold">{plant.name}</span>
            {getStatusIcon()}
          </div>
          <StatusBadge status={plant.status}>
            {plant.status.toUpperCase()}
          </StatusBadge>
        </CardTitle>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <User className="w-3 h-3" />
            <span>Manager: {plant.manager}</span>
          </div>
          <div className="text-primary font-medium">{plant.shift}</div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Machine Status */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Machines:</span>
          <div className="flex items-center space-x-2">
            <span className="font-medium">{plant.machinesTotal}</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-success font-medium">Running: {plant.machinesRunning}</span>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft" />
          </div>
        </div>

        {/* Production Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Shots Today:</span>
            <span className="font-medium">
              {plant.shotsToday.toLocaleString()}/{plant.shotsTarget.toLocaleString()}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="text-xs text-muted-foreground text-right">
            {progressPercentage.toFixed(1)}% complete
          </div>
        </div>

        {/* Efficiency */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Efficiency:</span>
          <div className="flex items-center space-x-1">
            <span className={`font-medium ${plant.efficiency > 90 ? 'text-success' : plant.efficiency > 85 ? 'text-warning' : 'text-danger'}`}>
              {plant.efficiency}%
            </span>
            <BarChart3 className="w-3 h-3 text-primary" />
          </div>
        </div>

        {/* Alerts */}
        {hasAlerts && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Alerts:</span>
            <div className="flex items-center space-x-2">
              {plant.alerts.critical > 0 && (
                <Badge variant="destructive" className="animate-pulse-soft">
                  {plant.alerts.critical} Critical 🔴
                </Badge>
              )}
              {plant.alerts.warning > 0 && (
                <Badge className="status-warning">
                  {plant.alerts.warning} Warning 🟡
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1 hover-lift"
            onClick={() => onEnterPlant(plant.id)}
          >
            <Eye className="w-3 h-3 mr-1" />
            Enter Plant
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 hover-lift"
            onClick={() => onViewReports(plant.id)}
          >
            <BarChart3 className="w-3 h-3 mr-1" />
            Reports
          </Button>
          {hasAlerts && (
            <Button 
              variant="outline" 
              size="sm" 
              className="hover-lift"
              onClick={() => onViewAlerts(plant.id)}
            >
              <AlertTriangle className="w-3 h-3 text-danger" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}