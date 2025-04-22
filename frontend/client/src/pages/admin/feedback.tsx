import { useState } from "react";
import AdminLayout from "@/components/layouts/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Search,
  Filter,
  MessageSquare,
  Star,
  Calendar,
  Reply,
  CheckCircle,
  Clock,
  ArrowUpDown,
  MessageCircle,
  CircleAlert,
  MessageSquareX,
  Loader2,
} from "lucide-react";

const responseFormSchema = z.object({
  response: z.string().min(10, "Response must be at least 10 characters"),
});

type ResponseFormValues = z.infer<typeof responseFormSchema>;

export default function AdminFeedback() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [isResponseDialogOpen, setIsResponseDialogOpen] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Sample feedback data for UI demonstration
  const feedbackItems = [
    {
      id: 1,
      examName: "Data Structures & Algorithms",
      subject: "Computer Science",
      studentName: "Alex Johnson",
      studentId: 1,
      date: "2023-06-10",
      rating: 4,
      difficultyLevel: "Medium",
      comments:
        "The exam was well-structured with clear questions. Some algorithms questions were quite challenging but overall a good experience.",
      suggestions:
        "It would be helpful to have more practice questions before the exam.",
      response: null,
      status: "pending",
    },
    {
      id: 2,
      examName: "Introduction to Databases",
      subject: "Computer Science",
      studentName: "Emily Chen",
      studentId: 2,
      date: "2023-06-08",
      rating: 5,
      difficultyLevel: "Easy",
      comments:
        "Very informative and practical questions. I enjoyed the SQL section the most as it helped me apply what I learned in class.",
      suggestions: "Perhaps add more real-world database design scenarios.",
      response:
        "Thank you for your positive feedback! We'll consider adding more practical scenarios in future exams.",
      respondedBy: "Admin",
      respondedDate: "2023-06-09",
      status: "responded",
    },
    {
      id: 3,
      examName: "Web Development Fundamentals",
      subject: "Web Development",
      studentName: "Michael Smith",
      studentId: 3,
      date: "2023-06-05",
      rating: 3,
      difficultyLevel: "Medium",
      comments:
        "Some questions were ambiguous, especially in the JavaScript section. The HTML and CSS sections were good though.",
      suggestions:
        "Please make JavaScript questions clearer and provide more context.",
      response: null,
      status: "pending",
    },
    {
      id: 4,
      examName: "Operating Systems",
      subject: "Computer Science",
      studentName: "Jessica Williams",
      studentId: 4,
      date: "2023-06-03",
      rating: 2,
      difficultyLevel: "Hard",
      comments:
        "The exam was much harder than expected. Many questions covered topics that weren't emphasized in the materials.",
      suggestions:
        "Better alignment between study materials and exam content would be appreciated.",
      response:
        "We apologize for the difficulty disparity. We're reviewing our exam preparation materials to ensure better alignment with exam content. Thank you for your feedback.",
      respondedBy: "Admin",
      respondedDate: "2023-06-04",
      status: "responded",
    },
    {
      id: 5,
      examName: "Python Programming",
      subject: "Programming",
      studentName: "David Brown",
      studentId: 5,
      date: "2023-06-01",
      rating: 4,
      difficultyLevel: "Medium",
      comments:
        "Good coverage of Python concepts. The coding problems were interesting and practical.",
      suggestions:
        "Maybe include more advanced topics for those who want to push themselves.",
      response: null,
      status: "pending",
    },
  ];

  const form = useForm<ResponseFormValues>({
    resolver: zodResolver(responseFormSchema),
    defaultValues: {
      response: "",
    },
  });

  const filteredFeedback = feedbackItems.filter((feedback) => {
    // Filter by status
    if (activeTab === "pending" && feedback.status !== "pending") {
      return false;
    }
    if (activeTab === "responded" && feedback.status !== "responded") {
      return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !feedback.examName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !feedback.studentName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !feedback.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !feedback.comments.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const getRatingBadge = (rating: number) => {
    const starColor =
      rating >= 4
        ? "text-yellow-500"
        : rating >= 3
        ? "text-blue-500"
        : "text-red-500";

    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${
              index < rating
                ? starColor + " fill-current"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return (
          <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
            {difficulty}
          </Badge>
        );
      case "Medium":
        return (
          <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400">
            {difficulty}
          </Badge>
        );
      case "Hard":
        return (
          <Badge className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">
            {difficulty}
          </Badge>
        );
      default:
        return <Badge variant="outline">{difficulty}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "responded") {
      return (
        <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 flex items-center">
          <CheckCircle className="h-3 w-3 mr-1" />
          Responded
        </Badge>
      );
    }
    return (
      <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 flex items-center">
        <Clock className="h-3 w-3 mr-1" />
        Pending
      </Badge>
    );
  };

  const openResponseDialog = (feedback: any) => {
    setSelectedFeedback(feedback);
    form.reset({
      response: feedback.response || "",
    });
    setIsResponseDialogOpen(true);
  };

  function onSubmit(values: ResponseFormValues) {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Response submitted:", values);
      setIsSubmitting(false);
      setIsResponseDialogOpen(false);

      toast({
        title: "Response submitted",
        description: "Your response has been sent to the student.",
      });

      // Update the feedback item in the UI
      const updatedFeedbackItems = feedbackItems.map((item) => {
        if (item.id === selectedFeedback.id) {
          return {
            ...item,
            response: values.response,
            status: "responded",
            respondedBy: "Admin",
            respondedDate: new Date().toISOString().split("T")[0],
          };
        }
        return item;
      });

      // This would update the state in a real application
      console.log("Updated feedback items:", updatedFeedbackItems);
    }, 1500);
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Student Feedback
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage and respond to student feedback on exams
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-3">
                <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-medium">Total Feedback</h3>
              <p className="text-3xl font-bold mt-1">78</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full mb-3">
                <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-lg font-medium">Pending Responses</h3>
              <p className="text-3xl font-bold mt-1">12</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mb-3">
                <Star className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-medium">Avg. Rating</h3>
              <p className="text-3xl font-bold mt-1">4.2</p>
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
                placeholder="Search by exam, student, or feedback content..."
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
                  <SelectItem value="rating_high">Highest Rating</SelectItem>
                  <SelectItem value="rating_low">Lowest Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Feedback</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="responded">Responded</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>Feedback List</CardTitle>
            </CardHeader>
            <div className="space-y-4 p-6">
              {filteredFeedback.map((feedback) => (
                <Card
                  key={feedback.id}
                  className="overflow-hidden hover:shadow-md transition-all"
                >
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                          <div className="flex items-center mb-2">
                            <div className="flex-shrink-0 h-9 w-9 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-3">
                              {feedback.studentName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-foreground">
                                {feedback.studentName}
                              </h3>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3 mr-1" />
                                {feedback.date}
                              </div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <span className="text-sm font-medium text-foreground">
                              {feedback.examName}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {" "}
                              • {feedback.subject}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:items-end space-y-2">
                          <div className="inline-flex items-center space-x-2">
                            {getRatingBadge(feedback.rating)}
                            <span className="text-sm ml-1">
                              {feedback.rating}/5
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getDifficultyBadge(feedback.difficultyLevel)}
                            {getStatusBadge(feedback.status)}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 bg-muted/30 rounded-lg p-4">
                        <h4 className="text-sm font-medium mb-1">Feedback</h4>
                        <p className="text-sm text-foreground">
                          {feedback.comments}
                        </p>

                        {feedback.suggestions && (
                          <div className="mt-3">
                            <h4 className="text-sm font-medium mb-1">
                              Suggestions
                            </h4>
                            <p className="text-sm text-foreground">
                              {feedback.suggestions}
                            </p>
                          </div>
                        )}
                      </div>

                      {feedback.response && (
                        <div className="mt-4 bg-primary/10 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-medium mb-1 flex items-center">
                              <Reply className="h-4 w-4 mr-1" />
                              Your Response
                            </h4>
                            <div className="text-xs text-muted-foreground">
                              {feedback.respondedDate}
                            </div>
                          </div>
                          <p className="text-sm text-foreground">
                            {feedback.response}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="bg-muted px-6 py-3 flex justify-end">
                      <Button
                        variant={
                          feedback.status === "responded"
                            ? "outline"
                            : "default"
                        }
                        className="flex items-center"
                        onClick={() => openResponseDialog(feedback)}
                      >
                        {feedback.status === "responded" ? (
                          <>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Response
                          </>
                        ) : (
                          <>
                            <Reply className="mr-2 h-4 w-4" />
                            Respond
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredFeedback.length === 0 && (
                <div className="text-center py-12">
                  <MessageSquareX className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No feedback found</h3>
                  <p className="text-muted-foreground mt-1">
                    {searchQuery
                      ? `No feedback matches your search for "${searchQuery}"`
                      : `No ${
                          activeTab !== "all" ? activeTab : ""
                        } feedback available.`}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Response Dialog */}
      <Dialog
        open={isResponseDialogOpen}
        onOpenChange={setIsResponseDialogOpen}
      >
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              {selectedFeedback?.status === "responded"
                ? "Edit Response"
                : "Respond to Feedback"}
            </DialogTitle>
            <DialogDescription>
              Provide a thoughtful response to the student's feedback
            </DialogDescription>
          </DialogHeader>

          {selectedFeedback && (
            <>
              <div className="bg-muted rounded-lg p-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">
                    {selectedFeedback.studentName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {selectedFeedback.date}
                  </span>
                </div>
                <p className="text-sm">{selectedFeedback.comments}</p>

                {selectedFeedback.suggestions && (
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Suggestions: </span>
                    {selectedFeedback.suggestions}
                  </div>
                )}

                <div className="flex justify-between mt-3">
                  <div className="flex items-center">
                    {getRatingBadge(selectedFeedback.rating)}
                    <span className="text-xs ml-1">
                      {selectedFeedback.rating}/5
                    </span>
                  </div>
                  <div>
                    {getDifficultyBadge(selectedFeedback.difficultyLevel)}
                  </div>
                </div>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="response"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Response</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write your response here..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsResponseDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : selectedFeedback.status === "responded" ? (
                        "Update Response"
                      ) : (
                        "Send Response"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
