import StudentLayout from "@/components/layouts/student-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function StudentProgress() {
  // This would be fetched from backend in production
  const subjectProgress = [
    { subject: "Computer Science", progress: 92 },
    { subject: "Mathematics", progress: 78 },
    { subject: "English", progress: 85 },
    { subject: "Physics", progress: 63 },
    { subject: "Web Development", progress: 81 },
    { subject: "Database Systems", progress: 75 },
  ];

  const monthlyPerformance = [
    { month: "Jan", score: 75 },
    { month: "Feb", score: 68 },
    { month: "Mar", score: 73 },
    { month: "Apr", score: 80 },
    { month: "May", score: 85 },
    { month: "Jun", score: 82 },
  ];

  const subjectDistribution = [
    { name: "Computer Science", value: 45 },
    { name: "Mathematics", value: 20 },
    { name: "Physics", value: 15 },
    { name: "Web Development", value: 10 },
    { name: "English", value: 10 },
  ];

  const weakTopics = [
    { topic: "Binary Trees", score: 55, subject: "Computer Science" },
    { topic: "Integration", score: 60, subject: "Mathematics" },
    { topic: "Angular Momentum", score: 62, subject: "Physics" },
    { topic: "API Design", score: 65, subject: "Web Development" },
    { topic: "SQL Joins", score: 68, subject: "Database Systems" },
  ];

  const strongTopics = [
    { topic: "Arrays & Sorting", score: 95, subject: "Computer Science" },
    { topic: "Linear Algebra", score: 92, subject: "Mathematics" },
    { topic: "HTML & CSS", score: 98, subject: "Web Development" },
    { topic: "Database Design", score: 91, subject: "Database Systems" },
    { topic: "Grammar & Composition", score: 90, subject: "English" },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "bg-green-600";
    if (progress >= 75) return "bg-blue-600";
    if (progress >= 60) return "bg-yellow-600";
    return "bg-red-600";
  };

  return (
    <StudentLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">My Progress</h1>
        <p className="mt-1 text-muted-foreground">
          Track your performance and identify areas for improvement
        </p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={subjectDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {subjectDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={monthlyPerformance}
                    margin={{
                      top: 5, right: 20, left: 0, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="score" stroke="#6366f1" activeDot={{ r: 8 }} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weak Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weakTopics.map((topic, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <div>
                          <span className="text-sm font-medium text-foreground">{topic.topic}</span>
                          <span className="text-xs text-muted-foreground ml-2">({topic.subject})</span>
                        </div>
                        <span className="text-sm font-medium text-red-600 dark:text-red-400">{topic.score}%</span>
                      </div>
                      <Progress value={topic.score} className="h-2 bg-muted-foreground/20" indicatorClassName="bg-red-600" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Strong Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {strongTopics.map((topic, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <div>
                          <span className="text-sm font-medium text-foreground">{topic.topic}</span>
                          <span className="text-xs text-muted-foreground ml-2">({topic.subject})</span>
                        </div>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">{topic.score}%</span>
                      </div>
                      <Progress value={topic.score} className="h-2 bg-muted-foreground/20" indicatorClassName="bg-green-600" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjectProgress.map((subject, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{subject.subject}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium">{subject.progress}%</span>
                  </div>
                  <Progress 
                    value={subject.progress} 
                    className="h-2.5 bg-muted-foreground/20" 
                    indicatorClassName={getProgressColor(subject.progress)} 
                  />
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Exams Taken</p>
                      <p className="text-xl font-medium">{Math.floor(Math.random() * 6) + 2}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Best Score</p>
                      <p className="text-xl font-medium">{subject.progress + Math.floor(Math.random() * 8)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Exam</p>
                      <p className="text-sm font-medium">
                        {new Date(2023, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Score Distribution by Subject</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={subjectProgress}
                    margin={{
                      top: 5, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="progress" name="Progress (%)" fill="#6366f1" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Time Spent vs. Score</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    margin={{
                      top: 5, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="hours" 
                      type="number" 
                      domain={[0, 10]} 
                      label={{ value: 'Hours Spent', position: 'bottom' }}
                    />
                    <YAxis 
                      domain={[0, 100]} 
                      label={{ value: 'Score (%)', angle: -90, position: 'left' }}
                    />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#6366f1" 
                      data={[
                        { hours: 1, score: 50 },
                        { hours: 2, score: 60 },
                        { hours: 3, score: 70 },
                        { hours: 5, score: 80 },
                        { hours: 8, score: 90 },
                        { hours: 10, score: 95 },
                      ]}
                      name="Score by Study Hours"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Focus Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {weakTopics.map((topic, index) => (
                    <li key={index} className="border-l-4 border-red-500 pl-4 py-2">
                      <h4 className="font-medium">{topic.topic}</h4>
                      <p className="text-sm text-muted-foreground">{topic.subject}</p>
                      <div className="mt-2 flex items-center">
                        <Progress value={topic.score} className="h-2 flex-1 bg-muted-foreground/20" indicatorClassName="bg-red-600" />
                        <span className="ml-2 text-sm text-red-600 dark:text-red-400 font-medium">{topic.score}%</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Study Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <div className="font-medium">Binary Trees</div>
                    <div className="text-sm text-muted-foreground">3 hours/week</div>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <div className="font-medium">Integration</div>
                    <div className="text-sm text-muted-foreground">2 hours/week</div>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <div className="font-medium">Angular Momentum</div>
                    <div className="text-sm text-muted-foreground">2 hours/week</div>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <div className="font-medium">API Design</div>
                    <div className="text-sm text-muted-foreground">1.5 hours/week</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-medium">SQL Joins</div>
                    <div className="text-sm text-muted-foreground">1.5 hours/week</div>
                  </div>

                  <div className="bg-muted p-4 rounded-md mt-6">
                    <h4 className="font-medium text-foreground mb-2">Suggested Resources</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• <a href="#" className="text-primary">Binary Trees & Traversal</a> - Interactive Tutorial</li>
                      <li>• <a href="#" className="text-primary">Calculus: Integration Techniques</a> - Video Course</li>
                      <li>• <a href="#" className="text-primary">SQL Masterclass</a> - Practice Exercises</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </StudentLayout>
  );
}
