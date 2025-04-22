import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import AdminLayout from "@/components/layouts/admin-layout";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  ClipboardList,
  HelpCircle,
  MessageSquare,
  ArrowRight,
  Plus,
  UserPlus,
  BarChart2,
  PieChart,
  CheckSquare,
  PlusCircle
} from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  
  return (
    <AdminLayout>
      {/* Dashboard welcome section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Monitor and manage all exams, students, and system activity.</p>
      </div>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {/* Total Students Card */}
        <Card className="overflow-hidden hover:shadow-md transition-all">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground truncate">Total Students</dt>
                  <dd>
                    <div className="text-lg font-medium text-foreground">452</div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted px-5 py-3">
            <div className="text-sm">
              <Link href="/admin/students">
                <a className="font-medium text-primary hover:text-primary/80 flex items-center">
                  View all
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Active Exams Card */}
        <Card className="overflow-hidden hover:shadow-md transition-all">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <ClipboardList className="h-5 w-5 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground truncate">Active Exams</dt>
                  <dd>
                    <div className="text-lg font-medium text-foreground">8</div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted px-5 py-3">
            <div className="text-sm">
              <Link href="/admin/exams">
                <a className="font-medium text-primary hover:text-primary/80 flex items-center">
                  Manage exams
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Total Questions Card */}
        <Card className="overflow-hidden hover:shadow-md transition-all">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <HelpCircle className="h-5 w-5 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground truncate">Total Questions</dt>
                  <dd>
                    <div className="text-lg font-medium text-foreground">1,245</div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted px-5 py-3">
            <div className="text-sm">
              <Link href="/admin/questions">
                <a className="font-medium text-primary hover:text-primary/80 flex items-center">
                  Question bank
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Feedback Card */}
        <Card className="overflow-hidden hover:shadow-md transition-all">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground truncate">New Feedback</dt>
                  <dd>
                    <div className="text-lg font-medium text-foreground">6</div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted px-5 py-3">
            <div className="text-sm">
              <Link href="/admin/feedback">
                <a className="font-medium text-primary hover:text-primary/80 flex items-center">
                  View feedback
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Recent Activity */}
        <Card className="overflow-hidden lg:col-span-2">
          <div className="px-6 py-5 border-b border-border">
            <h3 className="text-lg font-medium leading-6 text-foreground flex items-center">
              Recent Activity
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Last 24 hours
              </span>
            </h3>
          </div>
          <CardContent className="p-4 max-h-96 overflow-y-auto">
            <ul className="divide-y divide-border">
              <li className="py-4 flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    <a href="#" className="hover:underline">New student registered</a>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Emily Chen created an account
                  </p>
                  <div className="mt-1 flex items-center text-xs text-muted-foreground">
                    <span>35 minutes ago</span>
                  </div>
                </div>
              </li>
              <li className="py-4 flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                    <CheckSquare className="h-5 w-5" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    <a href="#" className="hover:underline">Exam completed</a>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Data Structures exam completed by 28 students
                  </p>
                  <div className="mt-1 flex items-center text-xs text-muted-foreground">
                    <span>2 hours ago</span>
                  </div>
                </div>
              </li>
              <li className="py-4 flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <PlusCircle className="h-5 w-5" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    <a href="#" className="hover:underline">New exam created</a>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Introduction to Algorithms exam has been created
                  </p>
                  <div className="mt-1 flex items-center text-xs text-muted-foreground">
                    <span>5 hours ago</span>
                  </div>
                </div>
              </li>
              <li className="py-4 flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    <a href="#" className="hover:underline">New feedback received</a>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    3 new feedback submissions for Web Development exam
                  </p>
                  <div className="mt-1 flex items-center text-xs text-muted-foreground">
                    <span>8 hours ago</span>
                  </div>
                </div>
              </li>
            </ul>
            <div className="mt-4 text-center">
              <Link href="/admin/logs">
                <a className="text-sm font-medium text-primary hover:text-primary/80">
                  View all activity <ArrowRight className="inline ml-1 h-4 w-4" />
                </a>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="overflow-hidden">
          <div className="px-6 py-5 border-b border-border">
            <h3 className="text-lg font-medium leading-6 text-foreground">Quick Actions</h3>
          </div>
          <CardContent className="p-6 space-y-4">
            <Link href="/admin/exams">
              <a className="flex items-center p-4 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                <div className="flex-shrink-0 bg-primary/10 rounded-md p-3 mr-4">
                  <Plus className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-medium text-foreground">Create Exam</h4>
                  <p className="text-sm text-muted-foreground">Set up a new exam with questions</p>
                </div>
              </a>
            </Link>
            <Link href="/admin/students">
              <a className="flex items-center p-4 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 rounded-md p-3 mr-4">
                  <UserPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-medium text-foreground">Add Students</h4>
                  <p className="text-sm text-muted-foreground">Enroll new students to the system</p>
                </div>
              </a>
            </Link>
            <Link href="/admin/questions">
              <a className="flex items-center p-4 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/30 rounded-md p-3 mr-4">
                  <HelpCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-medium text-foreground">Manage Questions</h4>
                  <p className="text-sm text-muted-foreground">Create and organize question bank</p>
                </div>
              </a>
            </Link>
            <Link href="/admin/results">
              <a className="flex items-center p-4 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900/30 rounded-md p-3 mr-4">
                  <PieChart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-medium text-foreground">View Reports</h4>
                  <p className="text-sm text-muted-foreground">Analyze exam results and statistics</p>
                </div>
              </a>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Exams Section */}
      <Card className="overflow-hidden mb-6">
        <div className="px-6 py-5 border-b border-border flex justify-between items-center">
          <h3 className="text-lg font-medium leading-6 text-foreground">Recent Exams</h3>
          <Link href="/admin/exams">
            <Button className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Create Exam
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Exam Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Subject
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Students
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                      <ClipboardList className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-foreground">
                        Data Structures & Algorithms
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Final Exam
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">Computer Science</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">60 minutes</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  42 / 45
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    <Button size="sm" variant="ghost" className="text-primary h-8 w-8 p-0">
                      <span className="sr-only">Edit</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                      </svg>
                    </Button>
                    <Button size="sm" variant="ghost" className="text-indigo-600 dark:text-indigo-400 h-8 w-8 p-0">
                      <span className="sr-only">Results</span>
                      <BarChart2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive h-8 w-8 p-0">
                      <span className="sr-only">Delete</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                    </Button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                      <ClipboardList className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-foreground">
                        Introduction to Databases
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Midterm Exam
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">Computer Science</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">45 minutes</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400">
                    Scheduled
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  0 / 38
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    <Button size="sm" variant="ghost" className="text-primary h-8 w-8 p-0">
                      <span className="sr-only">Edit</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                      </svg>
                    </Button>
                    <Button size="sm" variant="ghost" className="text-indigo-600 dark:text-indigo-400 h-8 w-8 p-0">
                      <span className="sr-only">Results</span>
                      <BarChart2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive h-8 w-8 p-0">
                      <span className="sr-only">Delete</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                    </Button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                      <ClipboardList className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-foreground">
                        Web Development Fundamentals
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Final Project
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">Web Development</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">90 minutes</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-300">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  32 / 32
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    <Button size="sm" variant="ghost" className="text-primary h-8 w-8 p-0">
                      <span className="sr-only">Edit</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                      </svg>
                    </Button>
                    <Button size="sm" variant="ghost" className="text-indigo-600 dark:text-indigo-400 h-8 w-8 p-0">
                      <span className="sr-only">Results</span>
                      <BarChart2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive h-8 w-8 p-0">
                      <span className="sr-only">Delete</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-muted px-6 py-4 text-right">
          <Link href="/admin/exams">
            <a className="text-sm font-medium text-primary hover:text-primary/80 flex items-center justify-end">
              View all exams <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Link>
        </div>
      </Card>
    </AdminLayout>
  );
}
