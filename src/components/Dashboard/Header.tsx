import { Clock, Bell, Plus, Globe, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';

interface HeaderProps {
  currentTime: Date;
  alertCount: number;
}

export function Header({ currentTime, alertCount }: HeaderProps) {
  const navigate = useNavigate();
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', {
      hour12: false,
      timeZone: 'Asia/Kolkata'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Left section - Logo and navigation */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">M</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              MoldRix™
            </h1>
          </div>
          
          <div className="flex items-center space-x-1">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Global View</span>
          </div>
        </div>

        {/* Center section - Live clock */}
        <div className="flex items-center space-x-2 glass rounded-lg px-4 py-2">
          <Clock className="w-4 h-4 text-primary animate-pulse-soft" />
          <div className="text-sm">
            <span className="font-mono font-bold text-primary">
              {formatTime(currentTime)}
            </span>
            <span className="text-muted-foreground ml-2">
              IST • {formatDate(currentTime)}
            </span>
          </div>
        </div>

        {/* Right section - User info and controls */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-sm">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">Admin: Sarah Chen</span>
          </div>
          
          <ThemeToggle />
          
          <Button variant="outline" size="sm" className="relative hover-lift">
            <Bell className="w-4 h-4" />
            {alertCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs animate-pulse-soft"
              >
                {alertCount}
              </Badge>
            )}
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            className="hover-lift"
            onClick={() => navigate('/add-plant')}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Plant
          </Button>
        </div>
      </div>
    </header>
  );
}