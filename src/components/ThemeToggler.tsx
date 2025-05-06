'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggler() {
  const { setTheme } = useTheme();

  return (
    <div className="relative h-[1.2rem] w-[1.2rem] cursor-pointer">
      <Sun
        onClick={() => setTheme('dark')}
        className="absolute inset-0 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        onClick={() => setTheme('light')}
        className="absolute inset-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
    </div>
  );
}
