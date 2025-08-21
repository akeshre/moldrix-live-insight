import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="h-9 w-9 p-0 transition-all duration-300 hover-lift"
    >
      <div className="relative w-4 h-4">
        <Sun 
          className={`absolute inset-0 h-4 w-4 rotate-0 scale-100 transition-all duration-300 ${
            theme === 'dark' ? 'rotate-90 scale-0' : ''
          }`} 
        />
        <Moon 
          className={`absolute inset-0 h-4 w-4 rotate-90 scale-0 transition-all duration-300 ${
            theme === 'dark' ? 'rotate-0 scale-100' : ''
          }`} 
        />
      </div>
      <span className="sr-only">
        {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      </span>
    </Button>
  );
}