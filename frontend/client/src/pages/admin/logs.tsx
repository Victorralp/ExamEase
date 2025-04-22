import { useState } from "react";
import AdminLayout from "@/components/layouts/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, HelpCircle, Mail, File } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  ArrowUpDown,
  History,
  UserCircle,
  ShieldAlert,
  AlertCircle,
  CheckCircle,
  Eye,
  LogIn,
  LogOut,
  Pencil,
  Plus,
  Trash2,
  Download,
} from "lucide-react";

export default function AdminLogs() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false);

  // Sample logs data for UI demonstration
  const logs = [
    {
      id: 1,
      action: "LOGIN",
      entityType: "AUTH",
      userId: 2,
      userName: "Emily Chen",
      userRole: "STUDENT",
      details: { ip: "192.168.1.105", browser: "Chrome", device: "Desktop" },
      timestamp: "2023-06-12 09:45:12",
      status: "success",
    },
    {
      id: 2,
      action: "CREATE_EXAM",
      entityType: "EXAM",
      entityId: 10,
      userId: 1,
      userName: "John Smith",
      userRole: "ADMIN",
      details: {
        examId: 10,
        examName: "Introduction to Algorithms",
        questionCount: 35,
        duration: 60,
      },
      timestamp: "2023-06-12 10:15:27",
      status: "success",
    },
    {
      id: 3,
      action: "SUBMIT_EXAM",
      entityType: "EXAM_SESSION",
      entityId: 56,
      userId: 3,
      userName: "Michael Smith",
      userRole: "STUDENT",
      details: {
        examId: 8,
        examName: "Web Development Fundamentals",
        score: 78,
        duration: 42,
      },
      timestamp: "2023-06-12 11:30:05",
      status: "success",
    },
    {
      id: 4,
      action: "UPDATE_QUESTION",
      entityType: "QUESTION",
      entityId: 123,
      userId: 1,
      userName: "John Smith",
      userRole: "ADMIN",
      details: {
        questionId: 123,
        questionType: "multiple_choice",
        subject: "Computer Science",
      },
      timestamp: "2023-06-12 13:20:41",
      status: "success",
    },
    {
      id: 5,
      action: "DELETE_EXAM",
      entityType: "EXAM",
      entityId: 9,
      userId: 1,
      userName: "John Smith",
      userRole: "ADMIN",
      details: {
        examId: 9,
        examName: "Physics Midterm",
      },
      timestamp: "2023-06-12 14:45:10",
      status: "success",
    },
    {
      id: 6,
      action: "LOGIN",
      entityType: "AUTH",
      userId: 5,
      userName: "David Brown",
      userRole: "STUDENT",
      details: {
        ip: "192.168.1.110",
        browser: "Firefox",
        device: "Mobile",
        error: "Invalid password",
      },
      timestamp: "2023-06-12 15:10:33",
      status: "error",
    },
    {
      id: 7,
      action: "SEND_EMAIL",
      entityType: "EMAIL",
      userId: 1,
      userName: "John Smith",
      userRole: "ADMIN",
      details: {
        recipients: "all-students",
        subject: "Upcoming Final Exams",
        emailId: 56,
      },
      timestamp: "2023-06-12 16:05:19",
      status: "success",
    },
  ];

  const filteredLogs = logs.filter((log) => {
    // Filter by entity type
    if (
      activeTab !== "all" &&
      log.entityType.toLowerCase() !== activeTab.toLowerCase()
    ) {
      return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !log.action.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !log.userName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !log.entityType.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const getActionIcon = (action: string) => {
    switch (action) {
      case "LOGIN":
        return <LogIn className="h-4 w-4" />;
      case "LOGOUT":
        return <LogOut className="h-4 w-4" />;
      case "CREATE_EXAM":
      case "CREATE_QUESTION":
        return <Plus className="h-4 w-4" />;
      case "UPDATE_EXAM":
      case "UPDATE_QUESTION":
        return <Pencil className="h-4 w-4" />;
      case "DELETE_EXAM":
      case "DELETE_QUESTION":
        return <Trash2 className="h-4 w-4" />;
      case "SUBMIT_EXAM":
        return <CheckCircle className="h-4 w-4" />;
      case "SEND_EMAIL":
        return <Mail className="h-4 w-4" />;
      default:
        return <History className="h-4 w-4" />;
    }
  };

  const getEntityTypeIcon = (entityType: string) => {
    switch (entityType) {
      case "AUTH":
        return <UserCircle className="h-4 w-4" />;
      case "EXAM":
        return <FileText className="h-4 w-4" />;
      case "QUESTION":
        return <HelpCircle className="h-4 w-4" />;
      case "EXAM_SESSION":
        return <Clock className="h-4 w-4" />;
      case "EMAIL":
        return <Mail className="h-4 w-4" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "success") {
      return (
        <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 flex items-center">
          <CheckCircle className="h-3 w-3 mr-1" />
          Success
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 flex items-center">
        <AlertCircle className="h-3 w-3 mr-1" />
        Error
      </Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    if (role === "ADMIN") {
      return (
        <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 flex items-center">
          <ShieldAlert className="h-3 w-3 mr-1" />
          Admin
        </Badge>
      );
    }
    return (
      <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
        Student
      </Badge>
    );
  };

  const viewLogDetails = (log: any) => {
    setSelectedLog(log);
    setIsDetailDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">System Logs</h1>
          <p className="mt-1 text-muted-foreground">
            Track and monitor all system activities
          </p>
        </div>
        <Button className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search logs by action, user, or entity type..."
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
                  <SelectItem value="action">Action</SelectItem>
                  <SelectItem value="entity">Entity Type</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Logs</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="exam">Exams</TabsTrigger>
          <TabsTrigger value="question">Questions</TabsTrigger>
          <TabsTrigger value="exam_session">Exam Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>Log Entries</CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted text-muted-foreground text-sm">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center space-x-1">
                        <span>Timestamp</span>
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left">Action</th>
                    <th className="px-6 py-3 text-left">Entity Type</th>
                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center space-x-1">
                        <span>User</span>
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left">Role</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-center">View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-muted/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-foreground flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          {log.timestamp}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                            {getActionIcon(log.action)}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-foreground">
                              {log.action.replace(/_/g, " ")}
                            </div>
                            {log.entityId && (
                              <div className="text-xs text-muted-foreground">
                                ID: {log.entityId}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-6 w-6 flex items-center justify-center text-muted-foreground">
                            {getEntityTypeIcon(log.entityType)}
                          </div>
                          <span className="ml-2 text-sm text-foreground">
                            {log.entityType.replace(/_/g, " ")}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-foreground">
                          {log.userName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ID: {log.userId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getRoleBadge(log.userRole)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(log.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex justify-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => viewLogDetails(log)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View Details</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredLogs.length === 0 && (
                <div className="text-center py-12">
                  <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No logs found</h3>
                  <p className="text-muted-foreground mt-1">
                    {searchQuery
                      ? `No logs match your search for "${searchQuery}"`
                      : `No ${
                          activeTab !== "all" ? activeTab : ""
                        } logs available.`}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Log Details Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Log Details</DialogTitle>
          </DialogHeader>

          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">
                    Timestamp
                  </h4>
                  <p className="text-sm font-mono">{selectedLog.timestamp}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">
                    Status
                  </h4>
                  <div>{getStatusBadge(selectedLog.status)}</div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Action
                </h4>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-2">
                    {getActionIcon(selectedLog.action)}
                  </div>
                  <p className="text-sm font-medium">
                    {selectedLog.action.replace(/_/g, " ")}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">
                    Entity Type
                  </h4>
                  <div className="flex items-center">
                    <div className="h-5 w-5 flex items-center justify-center text-muted-foreground mr-2">
                      {getEntityTypeIcon(selectedLog.entityType)}
                    </div>
                    <p className="text-sm">
                      {selectedLog.entityType.replace(/_/g, " ")}
                    </p>
                  </div>
                </div>
                {selectedLog.entityId && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      Entity ID
                    </h4>
                    <p className="text-sm">{selectedLog.entityId}</p>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  User Information
                </h4>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-2">
                    {selectedLog.userName
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {selectedLog.userName}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        ID: {selectedLog.userId}
                      </span>
                      {getRoleBadge(selectedLog.userRole)}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Details
                </h4>
                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                  <pre className="text-xs font-mono">
                    {JSON.stringify(selectedLog.details, null, 2)}
                  </pre>
                </ScrollArea>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
