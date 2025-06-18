

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lms/components/ui/card"
import { Button } from "@lms/components/ui/button"
import { Badge } from "@lms/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@lms/components/ui/tabs"
import { Input } from "@lms/components/ui/input"
import { Label } from "@lms/components/ui/label"
import { Textarea } from "@lms/components/ui/textarea"
import { Progress } from "@lms/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@lms/components/ui/dialog"
import { Calendar, CheckCircle, Clock, Upload, Download, Eye } from "lucide-react"

const pendingAssignments = [
  {
    id: "ASG001",
    title: "Calculus Problem Set 5",
    subject: "Advanced Mathematics",
    teacher: "Dr. Smith",
    dueDate: "2024-01-20",
    daysLeft: 2,
    maxMarks: 100,
    description: "Solve problems 1-15 from Chapter 8. Show all work and provide detailed explanations.",
    attachments: ["problem_set_5.pdf"],
    priority: "high",
  },
  {
    id: "ASG002",
    title: "Lab Report: Pendulum Experiment",
    subject: "Physics II",
    teacher: "Prof. Johnson",
    dueDate: "2024-01-22",
    daysLeft: 4,
    maxMarks: 50,
    description: "Write a comprehensive lab report on the pendulum experiment conducted last week.",
    attachments: ["lab_instructions.pdf", "data_template.xlsx"],
    priority: "medium",
  },
  {
    id: "ASG003",
    title: "Essay: Modern Literature Analysis",
    subject: "English Literature",
    teacher: "Ms. Davis",
    dueDate: "2024-01-25",
    daysLeft: 7,
    maxMarks: 75,
    description: "Analyze the themes in contemporary literature. 1500-2000 words.",
    attachments: ["essay_guidelines.pdf"],
    priority: "low",
  },
]

const submittedAssignments = [
  {
    id: "ASG004",
    title: "Chemical Bonding Worksheet",
    subject: "General Chemistry",
    teacher: "Dr. Wilson",
    submittedDate: "2024-01-15",
    dueDate: "2024-01-16",
    maxMarks: 50,
    status: "submitted",
    submittedOn: "On time",
  },
  {
    id: "ASG005",
    title: "Quadratic Equations Test",
    subject: "Advanced Mathematics",
    teacher: "Dr. Smith",
    submittedDate: "2024-01-12",
    dueDate: "2024-01-12",
    maxMarks: 100,
    status: "submitted",
    submittedOn: "On time",
  },
]

const gradedAssignments = [
  {
    id: "ASG006",
    title: "Physics Lab Report 1",
    subject: "Physics II",
    teacher: "Prof. Johnson",
    submittedDate: "2024-01-08",
    gradedDate: "2024-01-10",
    maxMarks: 50,
    obtainedMarks: 43,
    grade: "B+",
    feedback: "Good analysis but could improve on conclusion. Well-structured report overall.",
    status: "graded",
  },
  {
    id: "ASG007",
    title: "Shakespeare Essay",
    subject: "English Literature",
    teacher: "Ms. Davis",
    submittedDate: "2024-01-05",
    gradedDate: "2024-01-08",
    maxMarks: 75,
    obtainedMarks: 67,
    grade: "A-",
    feedback: "Excellent analysis of themes. Strong arguments with good supporting evidence.",
    status: "graded",
  },
  {
    id: "ASG008",
    title: "Algebra Problem Set 3",
    subject: "Advanced Mathematics",
    teacher: "Dr. Smith",
    submittedDate: "2024-01-03",
    gradedDate: "2024-01-05",
    maxMarks: 100,
    obtainedMarks: 92,
    grade: "A",
    feedback: "Outstanding work! All solutions are correct with clear explanations.",
    status: "graded",
  },
]

export function StudentAssignments() {
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState(null)

  const getPriorityColor = (priority: any) => {
    switch (priority) {
      case "high":
        return "text-red-500 bg-red-50"
      case "medium":
        return "text-yellow-500 bg-yellow-50"
      case "low":
        return "text-green-500 bg-green-50"
      default:
        return "text-gray-500 bg-gray-50"
    }
  }

  const getGradeColor = (grade) => {
    if (grade.startsWith("A")) return "text-green-600 bg-green-50"
    if (grade.startsWith("B")) return "text-blue-600 bg-blue-50"
    if (grade.startsWith("C")) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Assignments</h2>
          <p className="text-muted-foreground">Track and manage your assignments</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-red-500">
            {pendingAssignments.length} Pending
          </Badge>
          <Badge variant="outline" className="text-blue-500">
            {submittedAssignments.length} Submitted
          </Badge>
          <Badge variant="outline" className="text-green-500">
            {gradedAssignments.length} Graded
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingAssignments.length})</TabsTrigger>
          <TabsTrigger value="submitted">Submitted ({submittedAssignments.length})</TabsTrigger>
          <TabsTrigger value="graded">Graded ({gradedAssignments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {pendingAssignments.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {assignment.subject} • {assignment.teacher}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(assignment.priority)}>{assignment.priority} priority</Badge>
                      <Badge variant="outline">{assignment.maxMarks} marks</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{assignment.description}</p>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Due: {assignment.dueDate}
                    </div>
                    <div
                      className={`flex items-center gap-1 ${assignment.daysLeft <= 2 ? "text-red-500" : "text-muted-foreground"}`}
                    >
                      <Clock className="h-4 w-4" />
                      {assignment.daysLeft} days left
                    </div>
                  </div>

                  {assignment.attachments && assignment.attachments.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Attachments:</p>
                      <div className="flex flex-wrap gap-2">
                        {assignment.attachments.map((file, index) => (
                          <Button key={index} variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            {file}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="flex-1" onClick={() => setSelectedAssignment(assignment)}>
                          <Upload className="h-4 w-4 mr-2" />
                          Submit Assignment
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Submit Assignment</DialogTitle>
                          <DialogDescription>Submit your work for: {selectedAssignment?.title}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="submission-text">Written Response</Label>
                            <Textarea
                              id="submission-text"
                              placeholder="Type your response here..."
                              className="min-h-[100px]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="file-upload">Upload Files</Label>
                            <Input id="file-upload" type="file" multiple />
                            <p className="text-sm text-muted-foreground">
                              You can upload multiple files (PDF, DOC, images)
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="comments">Additional Comments</Label>
                            <Textarea id="comments" placeholder="Any additional notes or comments..." />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>
                            Save Draft
                          </Button>
                          <Button onClick={() => setIsSubmitDialogOpen(false)}>Submit Assignment</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4">
          <div className="grid gap-4">
            {submittedAssignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {assignment.subject} • {assignment.teacher}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Submitted
                      </Badge>
                      <Badge variant="outline">{assignment.maxMarks} marks</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div>Submitted: {assignment.submittedDate}</div>
                    <div>Due: {assignment.dueDate}</div>
                    <div className="text-green-600">{assignment.submittedOn}</div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Submission
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="graded" className="space-y-4">
          <div className="grid gap-4">
            {gradedAssignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {assignment.subject} • {assignment.teacher}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getGradeColor(assignment.grade)}>{assignment.grade}</Badge>
                      <Badge variant="outline">
                        {assignment.obtainedMarks}/{assignment.maxMarks}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Score</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round((assignment.obtainedMarks / assignment.maxMarks) * 100)}%
                      </span>
                    </div>
                    <Progress value={(assignment.obtainedMarks / assignment.maxMarks) * 100} className="h-2" />
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div>Submitted: {assignment.submittedDate}</div>
                    <div>Graded: {assignment.gradedDate}</div>
                  </div>

                  {assignment.feedback && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-1">Teacher Feedback:</p>
                      <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Submission
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Feedback
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
