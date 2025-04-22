import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/shared/theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import { Moon, Sun, LogOut, Settings, User } from "lucide-react";

interface ProfileDropdownProps {
  userRole: "STUDENT" | "ADMIN";
}

export default function ProfileDropdown({ userRole }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, logoutMutation } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const getInitials = () => {
    if (!user?.firstName || !user?.lastName) return "U";
    return `${user.firstName[0]}${user.lastName[0]}`;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const basePath = userRole === "ADMIN" ? "/admin" : "/student";

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="sr-only">Open user menu</span>
        <Avatar>
          <AvatarImage src="" alt="Profile picture" />
          <AvatarFallback>{getInitials()}</AvatarFallback>
        </Avatar>
      </button>
      
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-card ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-medium text-foreground">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-muted-foreground">{userRole === "ADMIN" ? "Administrator" : "Student"}</p>
          </div>
          
          <Link href={`${basePath}/profile`}>
            <a className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground">
              <User className="mr-2 h-4 w-4" />
              Your Profile
            </a>
          </Link>
          
          <Link href="/settings">
            <a className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </a>
          </Link>
          
          <Button
            variant="ghost"
            className="w-full justify-start rounded-none px-4 py-2 text-sm font-normal h-auto"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <>
                <Sun className="mr-2 h-4 w-4" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="mr-2 h-4 w-4" />
                Dark Mode
              </>
            )}
          </Button>
          
          <button 
            className="flex w-full items-center px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
