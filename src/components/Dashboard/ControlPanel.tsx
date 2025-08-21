import { 
  Plus, 
  Wrench, 
  Users, 
  Download, 
  Search, 
  Calendar, 
  Bell,
  RotateCcw,
  Play,
  Pause
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface ControlPanelProps {
  isAutoRefresh: boolean;
  refreshInterval: string;
  onToggleAutoRefresh: () => void;
  onRefreshIntervalChange: (interval: string) => void;
}

export function ControlPanel({ 
  isAutoRefresh, 
  refreshInterval, 
  onToggleAutoRefresh, 
  onRefreshIntervalChange 
}: ControlPanelProps) {
  return (
    <div className="glass rounded-lg p-6 mb-8 animate-slide-up">
      {/* Quick Actions Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <span>🎛️</span>
          <span>GLOBAL CONTROL PANEL</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          <Button variant="default" size="sm" className="hover-lift">
            <Plus className="w-4 h-4 mr-1" />
            Add Plant
          </Button>
          
          <Button variant="outline" size="sm" className="hover-lift">
            <Wrench className="w-4 h-4 mr-1" />
            Maintenance
          </Button>
          
          <Button variant="outline" size="sm" className="hover-lift">
            <Users className="w-4 h-4 mr-1" />
            Users
          </Button>
          
          <Button variant="outline" size="sm" className="hover-lift">
            <Download className="w-4 h-4 mr-1" />
            Export Data
          </Button>
          
          <Button variant="outline" size="sm" className="hover-lift">
            <Bell className="w-4 h-4 mr-1" />
            Alert Settings
          </Button>
          
          <Button variant="outline" size="sm" className="hover-lift">
            <RotateCcw className="w-4 h-4 mr-1" />
            Backup Data
          </Button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search: Plants/Machines/Molds" 
            className="pl-10 hover-lift focus:ring-2 focus:ring-primary/20"
          />
        </div>
        
        <Select defaultValue="today">
          <SelectTrigger className="hover-lift">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2">
          <Button
            variant={isAutoRefresh ? "default" : "outline"}
            size="sm"
            onClick={onToggleAutoRefresh}
            className="hover-lift"
          >
            {isAutoRefresh ? (
              <Pause className="w-4 h-4 mr-1" />
            ) : (
              <Play className="w-4 h-4 mr-1" />
            )}
            Auto-Refresh
          </Button>
          
          <Select value={refreshInterval} onValueChange={onRefreshIntervalChange}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2s">2s</SelectItem>
              <SelectItem value="5s">5s</SelectItem>
              <SelectItem value="10s">10s</SelectItem>
              <SelectItem value="30s">30s</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Data Refresh Status */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span>⟳ AUTO-REFRESH:</span>
            <Badge variant={isAutoRefresh ? "default" : "secondary"} className="animate-pulse-soft">
              {isAutoRefresh ? `🟢 ${refreshInterval.toUpperCase()}` : '🔴 OFF'}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <span>📊 DATA RANGE:</span>
            <Badge variant="outline">⏰ Live</Badge>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span>Last Update:</span>
          <span className="text-primary font-medium">
            {isAutoRefresh ? `${refreshInterval} ago` : 'Manual'}
          </span>
          <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft" />
        </div>
      </div>
    </div>
  );
}