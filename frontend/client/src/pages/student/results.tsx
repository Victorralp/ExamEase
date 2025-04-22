import { useState } from "react";
import StudentLayout from "@/components/layouts/student-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, BarChart2, Download } from "lucide-react";

export default function StudentResults() {
  const [activeTab, setActiveTab] = useState("all");
  
  // This would be fetched from backend in production
  const results = [
    {
      id: 1,
      examName: "Introduction to Databases",
      date: "May 28, 2023",
      score: 92,
      status: "passed",
      subject: "Computer Science",
      questions: 40,
      correctAnswers: 37,
      timeSpent: "45 minutes",
    },
    {
      id: 2,
      examName: "Web Development Fundamentals",
      date: "May 20, 2023",
      score: 78,
      status: "passed",
      subject: "Web Development",
      questions: 35,
      correctAnswers: 27,
      timeSpent: "52 minutes",
    },
    {
      id: 3,
      examName: "Operating Systems",
      date: "May 14, 2023",
      score: 88,
      status: "passed",
      subject: "Computer Science",
      questions: 30,
      correctAnswers: 26,
      timeSpent: "38 minutes",
    },
    {
      id: 4,
      examName: "Python Programming",
      date: "April 25, 2023",
      score: 65,
      status: "passed",
      subject: "Programming",
      questions: 45,
      correctAnswers: 29,
      timeSpent: "55 minutes",
    },
    {
      id: 5,
      examName: "Discrete Mathematics",
      date: "April 10, 2023",
      score: 72,
      status: "passed",
      subject: "Mathematics",
      questions: 25,
      correctAnswers: 18,
      timeSpent: "40 minutes",
    }
  ];

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400";
    if (score >= 75) return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400";
    if (score >= 60) return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400";
    return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400";
  };

  const renderExamCard = (exam: any) => (
    <Card key={exam.id} className="mb-4 overflow-hidden hover:shadow-md transition-all">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-medium text-foreground">{exam.examName}</h3>
              <p className="text-sm text-muted-foreground">{exam.subject} • {exam.date}</p>
            </div>
            <div className="mt-2 sm:mt-0">
              <Badge className={`${getScoreBadgeColor(exam.score)} text-sm font-medium px-2.5 py-0.5`}>
                Score: {exam.score}%
              </Badge>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Questions</span>
              <span className="text-sm font-medium">{exam.questions}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Correct Answers</span>
              <span className="text-sm font-medium">{exam.correctAnswers}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Time Spent</span>
              <span className="text-sm font-medium">{exam.timeSpent}</span>
            </div>
          </div>
        </div>
        <div className="bg-muted px-6 py-3 flex justify-end space-x-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            View Details
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <BarChart2 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const filteredResults = activeTab === "all" 
    ? results 
    : results.filter(r => r.subject.toLowerCase().includes(activeTab));

  return (
    <StudentLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">My Results</h1>
        <p className="mt-1 text-muted-foreground">
          View your performance across all completed exams
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-primary/10 rounded-lg p-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium text-muted-foreground">Average Score</h3>
              <p className="text-3xl font-bold text-primary mt-2">79%</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium text-muted-foreground">Exams Taken</h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">12</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium text-muted-foreground">Best Score</h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">95%</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium text-muted-foreground">Subject Focus</h3>
              <p className="text-xl font-bold text-purple-600 dark:text-purple-400 mt-2">CS</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Subjects</TabsTrigger>
            <TabsTrigger value="computer">Computer Science</TabsTrigger>
            <TabsTrigger value="web">Web Development</TabsTrigger>
            <TabsTrigger value="mathematics">Mathematics</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        {filteredResults.map(renderExamCard)}

        {filteredResults.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No results found for this subject.</p>
          </div>
        )}

        {filteredResults.length > 0 && filteredResults.length < results.length && (
          <div className="text-center mt-4">
            <Button variant="link" className="text-primary flex items-center mx-auto">
              Load more results
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
