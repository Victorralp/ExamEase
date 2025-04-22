import { useState } from "react";
import AdminLayout from "@/components/layouts/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Search, 
  Filter, 
  Pencil,
  Trash2,
  Copy,
  HelpCircle,
  ArrowUpDown,
  CheckCircle2,
  Tag,
  Circle,
  CheckCircle,
  MoreHorizontal
} from "lucide-react";

const questionFormSchema = z.object({
  question: z.string().min(10, "Question must be at least 10 characters"),
  questionType: z.string().min(1, "Question type is required"),
  subject: z.string().min(1, "Subject is required"),
  difficulty: z.string().min(1, "Difficulty is required"),
  correctAnswer: z.string().min(1, "Correct answer is required").optional(),
  options: z.array(z.string()).optional(),
  explanation: z.string().optional(),
  tags: z.string().optional(),
});

type QuestionFormValues = z.infer<typeof questionFormSchema>;

export default function AdminQuestions() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [questionType, setQuestionType] = useState<string>("multiple_choice");
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  
  // Sample questions data for UI demonstration
  const questions = [
    {
      id: 1,
      question: "What is the time complexity of the quick sort algorithm in the worst case?",
      questionType: "multiple_choice",
      subject: "Computer Science",
      topic: "Algorithms",
      difficulty: "medium",
      options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
      correctAnswer: "O(n^2)",
      usageCount: 5,
      createdAt: "2023-05-10",
      tags: ["algorithms", "complexity", "sorting"]
    },
    {
      id: 2,
      question: "What is SQL?",
      questionType: "multiple_choice",
      subject: "Computer Science",
      topic: "Databases",
      difficulty: "easy",
      options: ["A programming language", "A query language for databases", "A markup language", "An operating system"],
      correctAnswer: "A query language for databases",
      usageCount: 12,
      createdAt: "2023-05-15",
      tags: ["databases", "sql", "fundamentals"]
    },
    {
      id: 3,
      question: "Explain the concept of inheritance in object-oriented programming.",
      questionType: "short_answer",
      subject: "Computer Science",
      topic: "Object-Oriented Programming",
      difficulty: "medium",
      correctAnswer: "",
      usageCount: 8,
      createdAt: "2023-05-20",
      tags: ["oop", "inheritance", "programming"]
    },
    {
      id: 4,
      question: "True or False: JavaScript is a strongly typed language.",
      questionType: "true_false",
      subject: "Web Development",
      topic: "JavaScript",
      difficulty: "easy",
      correctAnswer: "False",
      usageCount: 15,
      createdAt: "2023-06-01",
      tags: ["javascript", "web development", "programming languages"]
    },
    {
      id: 5,
      question: "Which of the following are valid HTTP methods? (Select all that apply)",
      questionType: "multiple_select",
      subject: "Web Development",
      topic: "Web Protocols",
      difficulty: "medium",
      options: ["GET", "POST", "FETCH", "PUT", "SUBMIT", "DELETE"],
      correctAnswer: ["GET", "POST", "PUT", "DELETE"],
      usageCount: 7,
      createdAt: "2023-06-05",
      tags: ["http", "web protocols", "rest api"]
    }
  ];

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      question: "",
      questionType: "multiple_choice",
      subject: "",
      difficulty: "medium",
      correctAnswer: "",
      options: [],
      explanation: "",
      tags: "",
    },
  });

  const handleQuestionTypeChange = (value: string) => {
    setQuestionType(value);
    form.setValue("questionType", value);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const filteredQuestions = questions.filter(question => {
    // Filter by type
    if (activeTab !== "all" && question.questionType !== activeTab) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !question.question.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !question.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !question.topic.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">Easy</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400">Medium</Badge>;
      case "hard":
        return <Badge className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">Hard</Badge>;
      default:
        return <Badge variant="outline">{difficulty}</Badge>;
    }
  };

  const getQuestionTypeBadge = (type: string) => {
    switch (type) {
      case "multiple_choice":
        return <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">Multiple Choice</Badge>;
      case "short_answer":
        return <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400">Short Answer</Badge>;
      case "true_false":
        return <Badge className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-400">True/False</Badge>;
      case "multiple_select":
        return <Badge className="bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-400">Multiple Select</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  function onSubmit(values: QuestionFormValues) {
    setIsSubmitting(true);
    
    // Include options if relevant
    if (["multiple_choice", "multiple_select"].includes(questionType)) {
      values.options = options.filter(o => o.trim() !== "");
    }
    
    // Simulate API call
    setTimeout(() => {
      console.log("Question created:", values);
      setIsSubmitting(false);
      setIsCreateDialogOpen(false);
      
      toast({
        title: "Question created",
        description: "The question has been added to the question bank.",
      });
      
      form.reset();
      setOptions(['', '', '', '']);
      setQuestionType("multiple_choice");
    }, 1500);
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Question Bank</h1>
          <p className="mt-1 text-muted-foreground">
            Create, manage, and organize questions for your exams
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Question</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a question to the bank
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter the question" 
                          className="resize-none min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="questionType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question Type</FormLabel>
                        <Select 
                          onValueChange={(value) => handleQuestionTypeChange(value)} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                            <SelectItem value="true_false">True/False</SelectItem>
                            <SelectItem value="short_answer">Short Answer</SelectItem>
                            <SelectItem value="multiple_select">Multiple Select</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="computer_science">Computer Science</SelectItem>
                            <SelectItem value="mathematics">Mathematics</SelectItem>
                            <SelectItem value="web_development">Web Development</SelectItem>
                            <SelectItem value="physics">Physics</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Options for multiple choice or multiple select questions */}
                {['multiple_choice', 'multiple_select'].includes(questionType) && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <FormLabel>Answer Options</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addOption}
                        className="h-8 text-xs"
                      >
                        Add Option
                      </Button>
                    </div>
                    
                    {options.map((option, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="mt-2">
                          {questionType === 'multiple_choice' ? (
                            <RadioGroup
                              value={form.watch("correctAnswer")}
                              onValueChange={(value) => form.setValue("correctAnswer", value)}
                            >
                              <RadioGroupItem value={option || `option_${index}`} id={`option_${index}`} />
                            </RadioGroup>
                          ) : (
                            <Checkbox 
                              id={`option_${index}`}
                              checked={(form.watch("correctAnswer") || "").includes(option)}
                              onCheckedChange={(checked) => {
                                const current = form.watch("correctAnswer") || "";
                                const currentArray = current ? current.split(',') : [];
                                
                                if (checked) {
                                  form.setValue("correctAnswer", [...currentArray, option].join(','));
                                } else {
                                  form.setValue(
                                    "correctAnswer", 
                                    currentArray.filter(item => item !== option).join(',')
                                  );
                                }
                              }}
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <Input
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                          />
                        </div>
                        {options.length > 2 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeOption(index)}
                            className="h-10 w-10 p-0 text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <FormDescription>
                      {questionType === 'multiple_choice' 
                        ? 'Select the radio button next to the correct answer.' 
                        : 'Check all options that are correct answers.'}
                    </FormDescription>
                  </div>
                )}
                
                {/* True/False question type */}
                {questionType === 'true_false' && (
                  <FormField
                    control={form.control}
                    name="correctAnswer"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Correct Answer</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="True" id="true" />
                              <FormLabel htmlFor="true" className="font-normal">
                                True
                              </FormLabel>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="False" id="false" />
                              <FormLabel htmlFor="false" className="font-normal">
                                False
                              </FormLabel>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                {/* Short answer question type */}
                {questionType === 'short_answer' && (
                  <FormField
                    control={form.control}
                    name="correctAnswer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model Answer (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter a model answer" 
                            className="resize-none min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          This will be used as a reference for grading but won't be displayed to students.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <FormField
                  control={form.control}
                  name="explanation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Explanation (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Provide an explanation for the correct answer" 
                          className="resize-none min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        This will be shown to students after they answer the question.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="algorithms, sorting, complexity" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Separate tags with commas for easier categorization.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </>
                    ) : (
                      'Create Question'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search questions by text, subject, or topic..."
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
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px] h-10">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="usage">Most Used</SelectItem>
                  <SelectItem value="difficulty">Difficulty</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Questions</TabsTrigger>
          <TabsTrigger value="multiple_choice">Multiple Choice</TabsTrigger>
          <TabsTrigger value="true_false">True/False</TabsTrigger>
          <TabsTrigger value="short_answer">Short Answer</TabsTrigger>
          <TabsTrigger value="multiple_select">Multiple Select</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>Question List</CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted text-muted-foreground text-sm">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center space-x-1">
                        <span>Question</span>
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left">Type</th>
                    <th className="px-6 py-3 text-left">Subject/Topic</th>
                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center space-x-1">
                        <span>Difficulty</span>
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left">Tags</th>
                    <th className="px-6 py-3 text-left">Usage</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredQuestions.map((question) => (
                    <tr key={question.id} className="hover:bg-muted/50">
                      <td className="px-6 py-4">
                        <div className="max-w-lg">
                          <div className="text-sm font-medium text-foreground line-clamp-2">
                            {question.question}
                          </div>
                          {question.correctAnswer && typeof question.correctAnswer === 'string' && (
                            <div className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              {question.correctAnswer.length > 30 
                                ? question.correctAnswer.substring(0, 30) + "..." 
                                : question.correctAnswer}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getQuestionTypeBadge(question.questionType)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-foreground">{question.subject}</div>
                        <div className="text-xs text-muted-foreground mt-1">{question.topic}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getDifficultyBadge(question.difficulty)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {question.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs flex items-center">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-foreground">
                          Used in <strong>{question.usageCount}</strong> exams
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Created: {question.createdAt}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex justify-center space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Duplicate</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredQuestions.length === 0 && (
                <div className="text-center py-12">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No questions found</h3>
                  <p className="text-muted-foreground mt-1">
                    {searchQuery 
                      ? `No questions match your search for "${searchQuery}"`
                      : `No ${activeTab !== 'all' ? activeTab : ''} questions available.`}
                  </p>
                  <Button className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Question
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
