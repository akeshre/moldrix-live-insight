import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function KPICard({ title, icon, children, actionButton, className }: KPICardProps) {
  return (
    <Card className={`glass hover-lift animate-fade-in ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium flex items-center space-x-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
        <div className="live-indicator" />
      </CardHeader>
      <CardContent className="space-y-3">
        {children}
        {actionButton && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full hover-lift" 
            onClick={actionButton.onClick}
          >
            {actionButton.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

interface MetricRowProps {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  status?: 'success' | 'warning' | 'critical' | 'neutral';
}

export function MetricRow({ label, value, trend, trendValue, status }: MetricRowProps) {
  const getTrendIcon = () => {
    if (trend === 'up') return <ArrowUpRight className="w-3 h-3 text-success" />;
    if (trend === 'down') return <ArrowDownRight className="w-3 h-3 text-danger" />;
    return null;
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-danger';
      default: return 'text-foreground';
    }
  };

  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}:</span>
      <div className="flex items-center space-x-1">
        <span className={`font-medium ${getStatusColor()}`}>{value}</span>
        {trend && getTrendIcon()}
        {trendValue && (
          <span className={`text-xs ${trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-muted-foreground'}`}>
            {trendValue}
          </span>
        )}
      </div>
    </div>
  );
}

interface StatusBadgeProps {
  status: 'running' | 'warning' | 'critical' | 'maintenance' | 'idle';
  children: ReactNode;
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
  const getStatusClass = () => {
    switch (status) {
      case 'running': return 'status-running';
      case 'warning': return 'status-warning';
      case 'critical': return 'status-critical';
      case 'maintenance': return 'status-maintenance';
      case 'idle': return 'status-idle';
      default: return 'bg-muted';
    }
  };

  return (
    <Badge className={`${getStatusClass()} animate-pulse-soft`}>
      {children}
    </Badge>
  );
}