import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      onClick={toggleTheme}
      className="shadow-none"
      variant="outline"
      size="icon"
    >
      <Sun
        className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all ${
          theme === 'dark' ? 'hidden' : 'block'
        }`}
      />
      <Moon
        className={`h-[1.2rem] w-[1.2rem]  transition-all ${
          theme === 'dark' ? 'block' : 'hidden'
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
