import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import StudentLayout from "@/components/layouts/student-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle2, Send, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const feedbackFormSchema = z.object({
  examId: z.string().min(1, "Please select an exam"),
  rating: z.string().min(1, "Please select a rating"),
  difficultyLevel: z.string().min(1, "Please select a difficulty level"),
  comments: z.string().min(10, "Please provide feedback of at least 10 characters"),
  suggestions: z.string().optional(),
});

type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

export default function StudentFeedback() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // This would be fetched from backend in production
  const recentExams = [
    { id: "1", name: "Data Structures & Algorithms" },
    { id: "2", name: "Introduction to Databases" },
    { id: "3", name: "Web Development Fundamentals" },
    { id: "4", name: "Operating Systems" },
  ];
  
  const pastFeedback = [
    {
      id: 1,
      examName: "Operating Systems",
      date: "May 14, 2023",
      rating: 4,
      difficultyLevel: "Medium",
      comments: "The exam was well-structured but some questions were ambiguous. Overall a good experience.",
      response: "Thank you for your feedback. We will work on making the questions clearer in future exams."
    },
    {
      id: 2,
      examName: "Web Development Fundamentals",
      date: "May 20, 2023",
      rating: 5,
      difficultyLevel: "Easy",
      comments: "Very practical questions that test real-world knowledge. Enjoyed it!",
      response: null
    }
  ];

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      examId: "",
      rating: "",
      difficultyLevel: "",
      comments: "",
      suggestions: "",
    },
  });

  function onSubmit(data: FeedbackFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Feedback submitted:", data);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      toast({
        title: "Feedback submitted",
        description: "Thank you for your valuable feedback!",
      });
      
      // Reset form after 2 seconds
      setTimeout(() => {
        form.reset();
        setIsSuccess(false);
      }, 2000);
    }, 1500);
  }

  return (
    <StudentLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Provide Feedback</h1>
        <p className="mt-1 text-muted-foreground">
          Share your thoughts about exams to help us improve
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Exam Feedback</CardTitle>
              <CardDescription>
                Your feedback helps us improve our examination experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="examId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Exam</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an exam" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {recentExams.map((exam) => (
                              <SelectItem key={exam.id} value={exam.id}>
                                {exam.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Overall Rating</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Rate the exam" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="5">★★★★★ Excellent</SelectItem>
                              <SelectItem value="4">★★★★☆ Good</SelectItem>
                              <SelectItem value="3">★★★☆☆ Average</SelectItem>
                              <SelectItem value="2">★★☆☆☆ Below Average</SelectItem>
                              <SelectItem value="1">★☆☆☆☆ Poor</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="difficultyLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Difficulty Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select difficulty" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="VeryEasy">Very Easy</SelectItem>
                              <SelectItem value="Easy">Easy</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Hard">Hard</SelectItem>
                              <SelectItem value="VeryHard">Very Hard</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Feedback Comments</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please share your experience with this exam..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Tell us what worked well and what could be improved
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="suggestions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Suggestions for Improvement</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any specific suggestions to improve the exam..."
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Optional: Provide specific suggestions for improvement
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full md:w-auto"
                    disabled={isSubmitting || isSuccess}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Submitted
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Feedback
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Previous Feedback</CardTitle>
              <CardDescription>Your feedback history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {pastFeedback.map((feedback) => (
                <div key={feedback.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">{feedback.examName}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm ml-1">{feedback.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Submitted on {feedback.date} • {feedback.difficultyLevel} difficulty
                  </p>
                  <p className="text-sm mb-2">{feedback.comments}</p>
                  
                  {feedback.response && (
                    <div className="bg-primary/10 p-3 rounded-md">
                      <p className="text-sm font-medium mb-1">Response:</p>
                      <p className="text-sm text-muted-foreground">{feedback.response}</p>
                    </div>
                  )}
                </div>
              ))}

              {pastFeedback.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No previous feedback found.</p>
                </div>
              )}
            </CardContent>
            {pastFeedback.length > 2 && (
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View All Feedback
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </StudentLayout>
  );
}
