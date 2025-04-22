import StudentLayout from "@/components/layouts/student-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, PlayCircle, Info, ClipboardList } from "lucide-react";

export default function UpcomingExams() {
  // Mock data for upcoming exams
  const upcomingExams = [
    {
      id: 1,
      name: "Data Structures & Algorithms",
      subject: "Computer Science",
      type: "Final Exam",
      date: "June 15, 2023",
      time: "10:00 AM - 11:00 AM",
      duration: "60 minutes",
      questionsCount: 40,
      progress: 65
    },
    {
      id: 2,
      name: "Introduction to Databases",
      subject: "Computer Science",
      type: "Midterm Exam",
      date: "June 20, 2023",
      time: "2:00 PM - 3:00 PM",
      duration: "60 minutes",
      questionsCount: 35,
      progress: 40
    },
    {
      id: 3,
      name: "Web Development Basics",
      subject: "Web Development",
      type: "Quiz",
      date: "June 25, 2023",
      time: "11:00 AM - 11:30 AM",
      duration: "30 minutes",
      questionsCount: 20,
      progress: 10
    }
  ];

  return (
    <StudentLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Upcoming Exams</h1>
        <p className="mt-1 text-muted-foreground">Prepare for your scheduled exams and track your progress.</p>
      </div>

      <div className="space-y-6">
        {upcomingExams.map((exam) => (
          <Card key={exam.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center">
                    <div className="bg-primary/10 text-primary rounded-md p-2 mr-3">
                      <ClipboardList className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-foreground">{exam.name}</h3>
                      <p className="text-sm text-muted-foreground">{exam.subject} • {exam.duration} • {exam.questionsCount} questions</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>{exam.date}</span>
                      <span className="mx-2">•</span>
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{exam.time}</span>
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
              <div className="mt-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Preparation Progress</h4>
                <div className="w-full bg-muted-foreground/20 rounded-full h-2.5 mb-2">
                  <div className="bg-green-500 h-2.5 rounded-full animate-progress" style={{"--progress-width": `${exam.progress}%`} as React.CSSProperties}></div>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">
                    Practice Questions: {Math.round(exam.questionsCount * exam.progress / 100)}/{exam.questionsCount}
                  </span>
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">{exam.progress}% Complete</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </StudentLayout>
  );
}
