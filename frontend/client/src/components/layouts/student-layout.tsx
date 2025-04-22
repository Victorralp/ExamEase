import { useState, ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/shared/search-bar";
import ProfileDropdown from "@/components/shared/profile-dropdown";
import { GraduationCap, Home, Calendar, BarChart2, PieChart, MessageSquare, Menu, Bell, X } from "lucide-react";

interface StudentLayoutProps {
  children: ReactNode;
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  const [location] = useLocation();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigation = [
    { name: "Dashboard", href: "/", icon: Home, current: location === "/" },
    { name: "Upcoming Exams", href: "/student/upcoming-exams", icon: Calendar, current: location === "/student/upcoming-exams" },
    { name: "My Results", href: "/student/results", icon: BarChart2, current: location === "/student/results" },
    { name: "My Progress", href: "/student/progress", icon: PieChart, current: location === "/student/progress" },
    { name: "Feedback", href: "/student/feedback", icon: MessageSquare, current: location === "/student/feedback" },
  ];

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Implement search functionality here
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="sidebar w-64 hidden md:block bg-card shadow-md transition-all">
        <div className="h-full flex flex-col">
          <div className="py-6 px-4 flex items-center border-b border-border">
            <GraduationCap className="h-6 w-6 text-primary mr-2" />
            <h1 className="text-2xl font-bold text-primary">ExamEase</h1>
          </div>
          
          <nav className="mt-6 flex-1 px-2 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <a
                  className={`group flex items-center px-3 py-3 text-sm font-medium rounded-md ${
                    item.current
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      item.current ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground"
                    }`}
                  />
                  {item.name}
                </a>
              </Link>
            ))}
          </nav>
          
          <div className="border-t border-border p-4">
            <Link href="/student/profile">
              <a className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-foreground">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">Student</p>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${mobileMenuOpen ? "" : "hidden"}`}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)}></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-card">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <div className="pt-5 pb-4 border-b border-border">
            <div className="flex items-center flex-shrink-0 px-4">
              <GraduationCap className="h-6 w-6 text-primary mr-2" />
              <h1 className="text-2xl font-bold text-primary">ExamEase</h1>
            </div>
          </div>
          
          <div className="flex-1 h-0 overflow-y-auto">
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-md ${
                      item.current
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        item.current ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground"
                      }`}
                    />
                    {item.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex-shrink-0 border-t border-border p-4">
            <Link href="/student/profile">
              <a className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-foreground">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">Student</p>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <div className="bg-card shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <button
                  className="md:hidden px-4 text-muted-foreground focus:outline-none"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                </button>
                <div className="flex-1 flex items-center ml-2 md:ml-0">
                  <h1 className="text-xl font-semibold text-foreground md:hidden">ExamEase</h1>
                </div>
              </div>
              <div className="flex items-center">
                <SearchBar placeholder="Search exams..." onSearch={handleSearch} />
                <div className="ml-4 flex items-center md:ml-6">
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-5 w-5" />
                  </Button>
                  
                  {/* Profile dropdown */}
                  <div className="ml-3 relative">
                    <ProfileDropdown userRole="STUDENT" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-background p-4 sm:p-6 md:p-8">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
