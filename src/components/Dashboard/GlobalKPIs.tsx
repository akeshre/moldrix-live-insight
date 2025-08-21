import { Globe, Thermometer, AlertTriangle, TrendingUp } from 'lucide-react';
import { KPICard, MetricRow, StatusBadge } from './KPICard';
import { GlobalKPIData } from '@/hooks/useLiveData';

interface GlobalKPIsProps {
  data: GlobalKPIData;
}

export function GlobalKPIs({ data }: GlobalKPIsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Global Production Status */}
      <KPICard
        title="GLOBAL PRODUCTION"
        icon={<Globe className="w-4 h-4 text-primary" />}
        actionButton={{
          label: "View All Plants →",
          onClick: () => console.log('View all plants')
        }}
      >
        <MetricRow 
          label="Plants" 
          value={`${data.plantsActive} Active | ${data.plantsOffline} Offline`}
          status="success"
        />
        <MetricRow 
          label="Machines" 
          value={`${data.machinesRunning} Running | ${data.machinesMaintenance} Maintenance`}
          status="success"
        />
        <MetricRow 
          label="Total Shots Today" 
          value={data.totalShotsToday.toLocaleString()}
          trend="up"
          trendValue={`(+${data.shotsLastHour} last hour)`}
          status="success"
        />
        <MetricRow 
          label="Efficiency" 
          value={`${data.globalEfficiency}%`}
          trend={data.globalEfficiency > data.targetEfficiency ? 'up' : 'down'}
          trendValue={`Target: ${data.targetEfficiency}%`}
          status={data.globalEfficiency > data.targetEfficiency ? 'success' : 'warning'}
        />
      </KPICard>

      {/* Live Temperature Monitor */}
      <KPICard
        title="TEMPERATURE STATUS"
        icon={<Thermometer className="w-4 h-4 text-warning" />}
        actionButton={{
          label: "Temperature Map →",
          onClick: () => console.log('Temperature map')
        }}
      >
        <MetricRow 
          label="Global Mold Avg" 
          value={`${data.globalMoldTemp}°C`}
          trend={data.tempChange > 0 ? 'up' : 'down'}
          trendValue={`(${data.tempChange > 0 ? '+' : ''}${data.tempChange}°C)`}
          status={data.globalMoldTemp > 180 ? 'warning' : 'success'}
        />
        <MetricRow 
          label="Critical Alerts" 
          value={`${data.criticalAlerts} molds >185°C`}
          status={data.criticalAlerts > 0 ? 'critical' : 'success'}
        />
        <MetricRow 
          label="Machine Temps" 
          value="45-52°C"
          status="success"
        />
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Cooling Issues:</span>
          <StatusBadge status={data.criticalAlerts > 0 ? 'warning' : 'running'}>
            {data.criticalAlerts > 0 ? 'Plant Mumbai (2 units)' : 'All Normal'}
          </StatusBadge>
        </div>
      </KPICard>

      {/* Real-Time Alerts Dashboard */}
      <KPICard
        title="ACTIVE ALERTS"
        icon={<AlertTriangle className="w-4 h-4 text-danger" />}
        actionButton={{
          label: "Alert Center →",
          onClick: () => console.log('Alert center')
        }}
      >
        <MetricRow 
          label="Critical" 
          value={`${data.criticalAlerts} 🔴`}
          trendValue="(2 new in last 10 min)"
          status="critical"
        />
        <MetricRow 
          label="Warnings" 
          value={`${data.warningAlerts} 🟡`}
          trendValue="(Mold EOL approaching)"
          status="warning"
        />
        <MetricRow 
          label="Info" 
          value={`${data.infoAlerts} 🔵`}
          trendValue="(Maintenance scheduled)"
          status="neutral"
        />
        <MetricRow 
          label="Response Time" 
          value={`${data.responseTime} min avg`}
          status={data.responseTime < 5 ? 'success' : 'warning'}
        />
      </KPICard>

      {/* Production Performance */}
      <KPICard
        title="PERFORMANCE METRICS"
        icon={<TrendingUp className="w-4 h-4 text-success" />}
        actionButton={{
          label: "Rankings →",
          onClick: () => console.log('Rankings')
        }}
      >
        <MetricRow 
          label="Top Plant" 
          value="Mumbai 🏆 94.8%"
          status="success"
        />
        <MetricRow 
          label="Best Machine" 
          value="M-045 ⭐ 18.2 sec cycle"
          status="success"
        />
        <MetricRow 
          label="Shots/Hour Global" 
          value="5,234"
          trend="up"
          trendValue="(+347)"
          status="success"
        />
        <MetricRow 
          label="Quality Rate" 
          value="98.7%"
          trend="up"
          trendValue="(+0.3%)"
          status="success"
        />
      </KPICard>
    </div>
  );
}