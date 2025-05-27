import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, ShoppingBag, Users, Calendar, TestTube, User } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="w-full z-50">
      <nav
        className="
          fixed top-0 left-1/2 -translate-x-1/2
          w-full max-w-6xl
          flex items-center justify-between
          bg-[#232136]/95
          backdrop-blur-xl
          rounded-full
          border border-[#28283a]
          shadow-lg
          px-6 py-2.5
          mt-4
          z-50
          transition-all
        "
        style={{ minHeight: 64 }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group select-none">
          <span className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-md border border-white/10 transition-transform group-hover:scale-110">
            S
          </span>
          <span className="font-playfair text-2xl font-semibold group-hover:text-primary transition-colors tracking-wide text-white">
            SkillSwap
          </span>
        </Link>

        {/* Center: Nav Links with icons */}
        <div className="flex items-center gap-2 mx-4">
          <Link 
            to="/marketplace" 
            className="flex items-center gap-2 px-4 py-2 rounded-full text-base font-medium text-white/90 hover:bg-[#28284a] transition-colors border border-transparent hover:border-[#3a2e5a]"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="hidden sm:inline">Marketplace</span>
          </Link>
          <Link 
            to="/matches" 
            className="flex items-center gap-2 px-4 py-2 rounded-full text-base font-medium text-white/90 hover:bg-[#28284a] transition-colors border border-transparent hover:border-[#3a2e5a]"
          >
            <Users className="h-5 w-5" />
            <span className="hidden sm:inline">Matches</span>
          </Link>
          <Link 
            to="/schedule" 
            className="flex items-center gap-2 px-4 py-2 rounded-full text-base font-medium text-white/90 hover:bg-[#28284a] transition-colors border border-transparent hover:border-[#3a2e5a]"
          >
            <Calendar className="h-5 w-5" />
            <span className="hidden sm:inline">Schedule</span>
          </Link>
          <Link 
            to="/test" 
            className="flex items-center gap-2 px-4 py-2 rounded-full text-base font-medium text-white/90 hover:bg-[#28284a] transition-colors border border-transparent hover:border-[#3a2e5a]"
          >
            <TestTube className="h-5 w-5" />
            <span className="hidden sm:inline">Take Test</span>
          </Link>
        </div>

        {/* Right: Theme toggle & Profile */}
        <div className="flex items-center gap-2">
                <Button 
            variant="ghost"
            size="icon"
            className="rounded-full text-yellow-400 hover:bg-[#28284a]"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full px-4 py-2 text-base font-medium bg-[#28284a] text-white border border-[#3a2e5a] hover:bg-[#2d2d44]">
                  <User className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">{user.email?.split('@')[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-2xl shadow-lg border border-[#3a2e5a] mt-2 bg-[#23233a] text-white">
                <DropdownMenuLabel>Signed in as <span className="font-semibold">{user.email}</span></DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className="text-red-500">Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            ) : (
              <>
              <Link to="/auth">
                <Button variant="outline" className="rounded-full px-4 py-2 text-base font-medium border border-[#3a2e5a] text-white bg-transparent hover:bg-[#28284a]">
                    Log in
                  </Button>
                </Link>
              <Link to="/signup">
                <Button className="rounded-full px-4 py-2 text-base font-medium bg-gradient-to-r from-primary to-purple-500 text-white border-0 shadow-md">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      {/* Spacer to prevent content from being hidden under the fixed navbar */}
      <div style={{ height: 88 }}></div>
    </header>
  );
}
