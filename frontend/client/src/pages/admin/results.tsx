import { useState } from "react";
import AdminLayout from "@/components/layouts/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Download,
  FileText,
  Eye,
  Mail,
  BarChart2,
  Calendar,
  Clock,
  ArrowUpDown,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function AdminResults() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [isAnalyticsDialogOpen, setIsAnalyticsDialogOpen] = useState<boolean>(false);
  
  // Sample results data for UI demonstration
  const results = [
    {
      id: 1,
      examName: "Data Structures & Algorithms",
      subject: "Computer Science",
      studentName: "Alex Johnson",
      studentId: 1,
      date: "2023-06-10",
      time: "10:15 AM",
      score: 92,
      totalQuestions: 40,
      correctAnswers: 37,
      timeSpent: "54 minutes",
      status: "passed"
    },
    {
      id: 2,
      examName: "Introduction to Databases",
      subject: "Computer Science",
      studentName: "Emily Chen",
      studentId: 2,
      date: "2023-06-08",
      time: "02:30 PM",
      score: 85,
      totalQuestions: 35,
      correctAnswers: 30,
      timeSpent: "48 minutes",
      status: "passed"
    },
    {
      id: 3,
      examName: "Web Development Fundamentals",
      subject: "Web Development",
      studentName: "Michael Smith",
      studentId: 3,
      date: "2023-06-05",
      time: "11:45 AM",
      score: 78,
      totalQuestions: 30,
      correctAnswers: 23,
      timeSpent: "42 minutes",
      status: "passed"
    },
    {
      id: 4,
      examName: "Python Programming",
      subject: "Programming",
      studentName: "Jessica Williams",
      studentId: 4,
      date: "2023-06-03",
      time: "09:00 AM",
      score: 65,
      totalQuestions: 45,
      correctAnswers: 29,
      timeSpent: "60 minutes",
      status: "passed"
    },
    {
      id: 5,
      examName: "Operating Systems",
      subject: "Computer Science",
      studentName: "David Brown",
      studentId: 5,
      date: "2023-06-01",
      time: "03:15 PM",
      score: 55,
      totalQuestions: 50,
      correctAnswers: 28,
      timeSpent: "65 minutes",
      status: "failed"
    }
  ];

  // Sample analytics data
  const examAnalytics = {
    scoreDistribution: [
      { score: "91-100", count: 5 },
      { score: "81-90", count: 12 },
      { score: "71-80", count: 18 },
      { score: "61-70", count: 8 },
      { score: "51-60", count: 4 },
      { score: "0-50", count: 3 },
    ],
    timeSpentDistribution: [
      { time: "0-15", count: 2 },
      { time: "16-30", count: 10 },
      { time: "31-45", count: 25 },
      { time: "46-60", count: 13 },
    ],
    questionPerformance: [
      { id: 1, correct: 42, incorrect: 8 },
      { id: 2, correct: 38, incorrect: 12 },
      { id: 3, correct: 35, incorrect: 15 },
      { id: 4, correct: 45, incorrect: 5 },
      { id: 5, correct: 30, incorrect: 20 },
      { id: 6, correct: 25, incorrect: 25 },
      { id: 7, correct: 40, incorrect: 10 },
      { id: 8, correct: 33, incorrect: 17 },
      { id: 9, correct: 28, incorrect: 22 },
      { id: 10, correct: 37, incorrect: 13 },
    ],
    passFailRate: [
      { name: "Passed", value: 42 },
      { name: "Failed", value: 8 },
    ],
    difficultyBreakdown: [
      { name: "Easy", correct: 85, incorrect: 15 },
      { name: "Medium", correct: 65, incorrect: 35 },
      { name: "Hard", correct: 45, incorrect: 55 },
    ]
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B'];

  const filteredResults = results.filter(result => {
    // Filter by status
    if (activeTab === "passed" && result.status !== "passed") {
      return false;
    }
    if (activeTab === "failed" && result.status !== "failed") {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && 
        !result.examName.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !result.studentName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !result.subject.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const getScoreBadge = (score: number) => {
    if (score >= 90) return <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">{score}%</Badge>;
    if (score >= 75) return <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">{score}%</Badge>;
    if (score >= 60) return <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400">{score}%</Badge>;
    return <Badge className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">{score}%</Badge>;
  };

  const getStatusBadge = (status: string) => {
    if (status === "passed") {
      return (
        <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 flex items-center">
          <CheckCircle className="h-3 w-3 mr-1" />
          Passed
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 flex items-center">
        <XCircle className="h-3 w-3 mr-1" />
        Failed
      </Badge>
    );
  };

  const openAnalyticsDialog = (exam: any) => {
    setSelectedExam(exam);
    setIsAnalyticsDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Exam Results</h1>
          <p className="mt-1 text-muted-foreground">
            View and analyze student performance across all exams
          </p>
        </div>
        <Button className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Export Results
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-3">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-medium">Total Exams</h3>
              <p className="text-3xl font-bold mt-1">126</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mb-3">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-medium">Pass Rate</h3>
              <p className="text-3xl font-bold mt-1">82%</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mb-3">
                <BarChart2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-medium">Avg. Score</h3>
              <p className="text-3xl font-bold mt-1">78%</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full mb-3">
                <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-lg font-medium">Avg. Duration</h3>
              <p className="text-3xl font-bold mt-1">46m</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by exam name, student, or subject..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="h-10">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Select defaultValue="date_desc">
                <SelectTrigger className="w-[180px] h-10">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date_desc">Newest First</SelectItem>
                  <SelectItem value="date_asc">Oldest First</SelectItem>
                  <SelectItem value="score_high">Highest Score</SelectItem>
                  <SelectItem value="score_low">Lowest Score</SelectItem>
                  <SelectItem value="name_asc">Exam Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Results</TabsTrigger>
          <TabsTrigger value="passed">Passed</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>Results List</CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted text-muted-foreground text-sm">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center space-x-1">
                        <span>Exam</span>
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center space-x-1">
                        <span>Student</span>
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center space-x-1">
                        <span>Score</span>
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left">Time Spent</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredResults.map((result) => (
                    <tr key={result.id} className="hover:bg-muted/50">
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <div className="text-sm font-medium text-foreground">
                            {result.examName}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {result.subject}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                            {result.studentName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-foreground">
                              {result.studentName}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              ID: {result.studentId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-foreground flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          {result.date}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {result.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getScoreBadge(result.score)}
                          <span className="text-xs text-muted-foreground ml-2">
                            {result.correctAnswers}/{result.totalQuestions}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-foreground">{result.timeSpent}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(result.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex justify-center space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View Details</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => openAnalyticsDialog(result)}
                          >
                            <BarChart2 className="h-4 w-4" />
                            <span className="sr-only">Analytics</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Mail className="h-4 w-4" />
                            <span className="sr-only">Email Student</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredResults.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No results found</h3>
                  <p className="text-muted-foreground mt-1">
                    {searchQuery 
                      ? `No results match your search for "${searchQuery}"`
                      : `No ${activeTab !== 'all' ? activeTab : ''} results available.`}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Analytics Dialog */}
      <Dialog open={isAnalyticsDialogOpen} onOpenChange={setIsAnalyticsDialogOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedExam?.examName} - Analytics</DialogTitle>
            <DialogDescription>
              Detailed performance analytics for this exam
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Score Distribution */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Score Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={examAnalytics.scoreDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="score" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#6366f1" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Pass/Fail Rate */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Pass/Fail Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={examAnalytics.passFailRate}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {examAnalytics.passFailRate.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? '#4ade80' : '#f87171'} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Question Performance */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Question Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={examAnalytics.questionPerformance}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="id" label={{ value: 'Question #', position: 'insideBottom', offset: -5 }} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="correct" stackId="a" fill="#4ade80" name="Correct" />
                      <Bar dataKey="incorrect" stackId="a" fill="#f87171" name="Incorrect" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Time Spent Distribution */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Time Spent (minutes)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={examAnalytics.timeSpentDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#6366f1" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Difficulty Breakdown */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Difficulty Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={examAnalytics.difficultyBreakdown}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="correct" stackId="a" fill="#4ade80" name="Correct" />
                        <Bar dataKey="incorrect" stackId="a" fill="#f87171" name="Incorrect" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setIsAnalyticsDialogOpen(false)}>
              Close
            </Button>
            <Button className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
