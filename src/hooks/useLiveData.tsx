import { useState, useEffect } from 'react';

export interface PlantData {
  id: string;
  name: string;
  manager: string;
  shift: string;
  machinesTotal: number;
  machinesRunning: number;
  shotsToday: number;
  shotsTarget: number;
  efficiency: number;
  alerts: {
    critical: number;
    warning: number;
  };
  status: 'running' | 'warning' | 'critical' | 'maintenance';
}

export interface GlobalKPIData {
  plantsActive: number;
  plantsOffline: number;
  machinesRunning: number;
  machinesMaintenance: number;
  totalShotsToday: number;
  shotsLastHour: number;
  globalEfficiency: number;
  targetEfficiency: number;
  globalMoldTemp: number;
  tempChange: number;
  criticalAlerts: number;
  warningAlerts: number;
  infoAlerts: number;
  responseTime: number;
}

// Simulate real-time data updates
export function useLiveData() {
  const [globalData, setGlobalData] = useState<GlobalKPIData>({
    plantsActive: 8,
    plantsOffline: 0,
    machinesRunning: 45,
    machinesMaintenance: 3,
    totalShotsToday: 125847,
    shotsLastHour: 2450,
    globalEfficiency: 89.2,
    targetEfficiency: 85,
    globalMoldTemp: 174.5,
    tempChange: 1.2,
    criticalAlerts: 5,
    warningAlerts: 18,
    infoAlerts: 12,
    responseTime: 3.8
  });

  const [plantsData, setPlantsData] = useState<PlantData[]>([
    {
      id: 'mumbai',
      name: 'Mumbai Plant',
      manager: 'Raj Patel',
      shift: 'Shift A',
      machinesTotal: 12,
      machinesRunning: 10,
      shotsToday: 28847,
      shotsTarget: 30000,
      efficiency: 94.8,
      alerts: { critical: 0, warning: 2 },
      status: 'running'
    },
    {
      id: 'chennai',
      name: 'Chennai Plant',
      manager: 'Priya Kumar',
      shift: 'Shift B',
      machinesTotal: 8,
      machinesRunning: 7,
      shotsToday: 19230,
      shotsTarget: 22000,
      efficiency: 87.4,
      alerts: { critical: 1, warning: 1 },
      status: 'critical'
    },
    {
      id: 'delhi',
      name: 'Delhi Plant',
      manager: 'Arjun Singh',
      shift: 'Shift A',
      machinesTotal: 10,
      machinesRunning: 9,
      shotsToday: 24560,
      shotsTarget: 26000,
      efficiency: 91.2,
      alerts: { critical: 0, warning: 3 },
      status: 'running'
    },
    {
      id: 'pune',
      name: 'Pune Plant',
      manager: 'Sneha Desai',
      shift: 'Shift C',
      machinesTotal: 6,
      machinesRunning: 5,
      shotsToday: 15670,
      shotsTarget: 18000,
      efficiency: 86.1,
      alerts: { critical: 1, warning: 1 },
      status: 'warning'
    }
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  // Simulate live data updates every 3 seconds
  useEffect(() => {
    const dataInterval = setInterval(() => {
      // Update global KPIs with realistic variations
      setGlobalData(prev => ({
        ...prev,
        totalShotsToday: prev.totalShotsToday + Math.floor(Math.random() * 50) + 20,
        shotsLastHour: Math.floor(Math.random() * 200) + 2300,
        globalEfficiency: Math.round((prev.globalEfficiency + (Math.random() - 0.5) * 0.5) * 10) / 10,
        globalMoldTemp: Math.round((prev.globalMoldTemp + (Math.random() - 0.5) * 2) * 10) / 10,
        tempChange: Math.round(((Math.random() - 0.5) * 3) * 10) / 10,
        criticalAlerts: Math.max(0, prev.criticalAlerts + Math.floor((Math.random() - 0.7) * 3)),
        responseTime: Math.round((3.5 + Math.random() * 1) * 10) / 10
      }));

      // Update plants data
      setPlantsData(prev => prev.map(plant => ({
        ...plant,
        shotsToday: plant.shotsToday + Math.floor(Math.random() * 30) + 10,
        efficiency: Math.round((plant.efficiency + (Math.random() - 0.5) * 0.3) * 10) / 10,
        alerts: {
          critical: Math.max(0, plant.alerts.critical + Math.floor((Math.random() - 0.8) * 2)),
          warning: Math.max(0, plant.alerts.warning + Math.floor((Math.random() - 0.6) * 2))
        }
      })));
    }, 3000);

    return () => clearInterval(dataInterval);
  }, []);

  return {
    globalData,
    plantsData,
    currentTime
  };
}