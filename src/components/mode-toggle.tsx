import { SunIcon, MoonIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      onClick={toggleTheme}
      className="shadow-none rounded-[2px]"
      variant="outline"
      size="icon"
    >
      <SunIcon
        weight="duotone"
        className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all ${theme === "dark" ? "hidden" : "block"
          }`}
      />
      <MoonIcon
        weight="duotone"
        className={`h-[1.2rem] w-[1.2rem]  transition-all ${theme === "dark" ? "block" : "hidden"
          }`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
