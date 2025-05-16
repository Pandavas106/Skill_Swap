
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">S</span>
            <span className="font-playfair text-lg font-semibold">SkillSwap</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/marketplace" className="text-muted-foreground hover:text-foreground transition-colors">
              Marketplace
            </Link>
            <Link to="/matches" className="text-muted-foreground hover:text-foreground transition-colors">
              Matches
            </Link>
            <Link to="/schedule" className="text-muted-foreground hover:text-foreground transition-colors">
              Schedule
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <div className="hidden md:flex items-center gap-2">
            <Link to="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-16 z-50 bg-background px-6 py-8 transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col gap-6">
          <Link 
            to="/marketplace" 
            className="text-foreground text-lg font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Marketplace
          </Link>
          <Link 
            to="/matches" 
            className="text-foreground text-lg font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Matches
          </Link>
          <Link 
            to="/schedule" 
            className="text-foreground text-lg font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Schedule
          </Link>
          <div className="flex flex-col gap-2 mt-4">
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="w-full">Log in</Button>
            </Link>
            <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full">Sign up</Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
