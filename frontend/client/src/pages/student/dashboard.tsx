import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import StudentLayout from "@/components/layouts/student-layout";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  CheckCircle,
  Star,
  Clock,
  PlayCircle,
  Info,
  ArrowRight,
  ClipboardList
} from "lucide-react";

export default function StudentDashboard() {
  const { user } = useAuth();
  
  return (
    <StudentLayout>
      {/* Dashboard welcome section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Welcome back, {user?.firstName}!</h1>
        <p className="mt-1 text-muted-foreground">Here's an overview of your upcoming exams and recent performance.</p>
      </div>

      {/* Exam statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {/* Upcoming Exams Card */}
        <Card className="overflow-hidden hover:shadow-md transition-all">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground truncate">Upcoming Exams</dt>
                  <dd>
                    <div className="text-lg font-medium text-foreground">3</div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted px-5 py-3">
            <div className="text-sm">
              <Link href="/student/upcoming-exams">
                <a className="font-medium text-primary hover:text-primary/80 flex items-center">
                  View all
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Completed Exams Card */}
        <Card className="overflow-hidden hover:shadow-md transition-all">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground truncate">Completed Exams</dt>
                  <dd>
                    <div className="text-lg font-medium text-foreground">12</div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted px-5 py-3">
            <div className="text-sm">
              <Link href="/student/results">
                <a className="font-medium text-primary hover:text-primary/80 flex items-center">
                  View history
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Average Score Card */}
        <Card className="overflow-hidden hover:shadow-md transition-all">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground truncate">Average Score</dt>
                  <dd>
                    <div className="text-lg font-medium text-foreground">86%</div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted px-5 py-3">
            <div className="text-sm">
              <Link href="/student/progress">
                <a className="font-medium text-primary hover:text-primary/80 flex items-center">
                  View details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Time Spent Card */}
        <Card className="overflow-hidden hover:shadow-md transition-all">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground truncate">Study Time</dt>
                  <dd>
                    <div className="text-lg font-medium text-foreground">24h 35m</div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted px-5 py-3">
            <div className="text-sm">
              <Link href="/student/progress">
                <a className="font-medium text-primary hover:text-primary/80 flex items-center">
                  View activity
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Next upcoming exam */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Next Upcoming Exam</h2>
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center">
                  <div className="bg-primary/10 text-primary rounded-md p-2 mr-3">
                    <ClipboardList className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground">Data Structures & Algorithms</h3>
                    <p className="text-sm text-muted-foreground">Computer Science • 60 minutes • 40 questions</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>June 15, 2023</span>
                    <span className="mx-2">•</span>
                    <Clock className="mr-1 h-4 w-4" />
                    <span>10:00 AM - 11:00 AM</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <Button className="flex items-center">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Start Preparation
                </Button>
                <Button variant="outline" className="flex items-center">
                  <Info className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted px-6 py-4">
            <div className="w-full">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Preparation Progress</h4>
              <div className="w-full bg-muted-foreground/20 rounded-full h-2.5 mb-2">
                <div className="bg-green-500 h-2.5 rounded-full animate-progress" style={{"--progress-width": "65%"} as React.CSSProperties}></div>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Practice Questions: 26/40</span>
                <span className="text-xs font-medium text-green-600 dark:text-green-400">65% Complete</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Exam Results and Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent results */}
        <Card className="overflow-hidden">
          <div className="px-6 py-5 border-b border-border">
            <h3 className="text-lg font-medium leading-6 text-foreground">Recent Results</h3>
          </div>
          <CardContent className="p-6">
            <ul className="divide-y divide-border">
              <li className="py-4 flex items-center">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">Introduction to Databases</p>
                  <p className="text-sm text-muted-foreground">Taken on May 28, 2023</p>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                    Score: 92%
                  </span>
                </div>
              </li>
              <li className="py-4 flex items-center">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">Web Development Fundamentals</p>
                  <p className="text-sm text-muted-foreground">Taken on May 20, 2023</p>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400">
                    Score: 78%
                  </span>
                </div>
              </li>
              <li className="py-4 flex items-center">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">Operating Systems</p>
                  <p className="text-sm text-muted-foreground">Taken on May 14, 2023</p>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                    Score: 88%
                  </span>
                </div>
              </li>
            </ul>
            <div className="mt-4 text-center">
              <Link href="/student/results">
                <a className="text-sm font-medium text-primary hover:text-primary/80">
                  View all results <ArrowRight className="inline ml-1 h-4 w-4" />
                </a>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Progress by subject */}
        <Card className="overflow-hidden">
          <div className="px-6 py-5 border-b border-border">
            <h3 className="text-lg font-medium leading-6 text-foreground">Progress by Subject</h3>
          </div>
          <CardContent className="p-6">
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium text-foreground">Computer Science</h4>
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">92%</span>
                </div>
                <div className="mt-2 w-full bg-muted-foreground/20 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full animate-progress" style={{"--progress-width": "92%"} as React.CSSProperties}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium text-foreground">Mathematics</h4>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">78%</span>
                </div>
                <div className="mt-2 w-full bg-muted-foreground/20 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-progress" style={{"--progress-width": "78%"} as React.CSSProperties}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium text-foreground">English</h4>
                  <span className="text-sm font-medium text-teal-600 dark:text-teal-400">85%</span>
                </div>
                <div className="mt-2 w-full bg-muted-foreground/20 rounded-full h-2">
                  <div className="bg-teal-600 h-2 rounded-full animate-progress" style={{"--progress-width": "85%"} as React.CSSProperties}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium text-foreground">Physics</h4>
                  <span className="text-sm font-medium text-purple-600 dark:text-purple-400">63%</span>
                </div>
                <div className="mt-2 w-full bg-muted-foreground/20 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full animate-progress" style={{"--progress-width": "63%"} as React.CSSProperties}></div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link href="/student/progress">
                <a className="text-sm font-medium text-primary hover:text-primary/80">
                  View detailed progress <ArrowRight className="inline ml-1 h-4 w-4" />
                </a>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}
