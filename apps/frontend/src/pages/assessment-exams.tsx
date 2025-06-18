import { useState } from "react"
import { Button } from "@lms/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lms/components/ui/card"
import { Input } from "@lms/components/ui/input"
import { Label } from "@lms/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@lms/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@lms/components/ui/table"
import { Badge } from "@lms/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@lms/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@lms/components/ui/dialog"
import { Textarea } from "@lms/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@lms/components/ui/radio-group"
import { Checkbox } from "@lms/components/ui/checkbox"
import { Calendar } from "@lms/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@lms/components/ui/popover"
import { CalendarIcon, Plus, Clock, FileText, BarChart3, Play, Edit, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@lms/tailwind"

const exams = [
  {
    id: "EXM001",
    title: "Mid-term Mathematics",
    subject: "Mathematics",
    class: "Grade 10-A",
    date: "2024-02-15",
    duration: "2 hours",
    totalMarks: 100,
    students: 30,
    status: "Scheduled",
  },
  {
    id: "EXM002",
    title: "English Literature Quiz",
    subject: "English",
    class: "Grade 11-B",
    date: "2024-02-10",
    duration: "1 hour",
    totalMarks: 50,
    students: 28,
    status: "Completed",
  },
]

const quizzes = [
  {
    id: "QUZ001",
    title: "Basic Algebra Quiz",
    subject: "Mathematics",
    questions: 10,
    timeLimit: "30 min",
    attempts: 156,
    avgScore: "78%",
    status: "Active",
  },
  {
    id: "QUZ002",
    title: "Photosynthesis Quiz",
    subject: "Biology",
    questions: 15,
    timeLimit: "20 min",
    attempts: 89,
    avgScore: "82%",
    status: "Active",
  },
]

export function AssessmentExams() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isExamDialogOpen, setIsExamDialogOpen] = useState(false)
  const [isQuizDialogOpen, setIsQuizDialogOpen] = useState(false)
  const [questionType, setQuestionType] = useState("multiple-choice")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Assessment & Exams</h2>
          <p className="text-muted-foreground">Create and manage exams, quizzes, and assessments</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isQuizDialogOpen} onOpenChange={setIsQuizDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Play className="mr-2 h-4 w-4" />
                Create Quiz
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Online Quiz</DialogTitle>
                <DialogDescription>Build an interactive quiz with auto-grading</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="quizTitle">Quiz Title</Label>
                  <Input id="quizTitle" placeholder="e.g., Basic Algebra Quiz" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="math">Mathematics</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grade-10-a">Grade 10-A</SelectItem>
                        <SelectItem value="grade-10-b">Grade 10-B</SelectItem>
                        <SelectItem value="grade-11-a">Grade 11-A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                    <Input id="timeLimit" type="number" placeholder="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalMarks">Total Marks</Label>
                    <Input id="totalMarks" type="number" placeholder="50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructions">Instructions</Label>
                  <Textarea id="instructions" placeholder="Quiz instructions for students" />
                </div>
                <div className="space-y-4">
                  <Label>Add Questions</Label>
                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center gap-4">
                      <Label>Question Type:</Label>
                      <RadioGroup value={questionType} onValueChange={setQuestionType} className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="multiple-choice" id="mc" />
                          <Label htmlFor="mc">Multiple Choice</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true-false" id="tf" />
                          <Label htmlFor="tf">True/False</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="short-answer" id="sa" />
                          <Label htmlFor="sa">Short Answer</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="question">Question</Label>
                      <Textarea id="question" placeholder="Enter your question here" />
                    </div>
                    {questionType === "multiple-choice" && (
                      <div className="space-y-2">
                        <Label>Options</Label>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Checkbox id="option1" />
                            <Input placeholder="Option 1" />
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="option2" />
                            <Input placeholder="Option 2" />
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="option3" />
                            <Input placeholder="Option 3" />
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="option4" />
                            <Input placeholder="Option 4" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="marks">Marks for this question</Label>
                      <Input id="marks" type="number" placeholder="5" className="w-20" />
                    </div>
                    <Button variant="outline" size="sm">
                      Add Question
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsQuizDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsQuizDialogOpen(false)}>Create Quiz</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isExamDialogOpen} onOpenChange={setIsExamDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Exam
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Exam</DialogTitle>
                <DialogDescription>Schedule a new exam for your students</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="examTitle">Exam Title</Label>
                  <Input id="examTitle" placeholder="e.g., Mid-term Mathematics" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="math">Mathematics</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grade-10-a">Grade 10-A</SelectItem>
                        <SelectItem value="grade-10-b">Grade 10-B</SelectItem>
                        <SelectItem value="grade-11-a">Grade 11-A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Exam Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalMarks">Total Marks</Label>
                    <Input id="totalMarks" type="number" placeholder="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passingMarks">Passing Marks</Label>
                    <Input id="passingMarks" type="number" placeholder="40" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="examType">Exam Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="objective">Objective (MCQ)</SelectItem>
                      <SelectItem value="subjective">Subjective</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructions">Exam Instructions</Label>
                  <Textarea id="instructions" placeholder="Instructions for students" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsExamDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsExamDialogOpen(false)}>Create Exam</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Quizzes</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Available for students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Grades</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Awaiting grading</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="exams" className="space-y-4">
        <TabsList>
          <TabsTrigger value="exams">Exams</TabsTrigger>
          <TabsTrigger value="quizzes">Online Quizzes</TabsTrigger>
          <TabsTrigger value="grading">Grading</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="exams" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Exam Management</CardTitle>
              <CardDescription>Create and manage exams for your students</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exam Title</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium">{exam.title}</TableCell>
                      <TableCell>{exam.subject}</TableCell>
                      <TableCell>{exam.class}</TableCell>
                      <TableCell>{exam.date}</TableCell>
                      <TableCell>{exam.duration}</TableCell>
                      <TableCell>{exam.students}</TableCell>
                      <TableCell>
                        <Badge variant={exam.status === "Scheduled" ? "default" : "secondary"}>{exam.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Online Quiz Engine</CardTitle>
              <CardDescription>Interactive quizzes with auto-grading</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quiz Title</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Questions</TableHead>
                    <TableHead>Time Limit</TableHead>
                    <TableHead>Attempts</TableHead>
                    <TableHead>Avg. Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quizzes.map((quiz) => (
                    <TableRow key={quiz.id}>
                      <TableCell className="font-medium">{quiz.title}</TableCell>
                      <TableCell>{quiz.subject}</TableCell>
                      <TableCell>{quiz.questions}</TableCell>
                      <TableCell>{quiz.timeLimit}</TableCell>
                      <TableCell>{quiz.attempts}</TableCell>
                      <TableCell>{quiz.avgScore}</TableCell>
                      <TableCell>
                        <Badge variant="default">{quiz.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grading" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manual Grading</CardTitle>
              <CardDescription>Grade subjective answers and provide feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select exam" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exam1">Mid-term Mathematics</SelectItem>
                    <SelectItem value="exam2">English Literature</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grade-10-a">Grade 10-A</SelectItem>
                    <SelectItem value="grade-10-b">Grade 10-B</SelectItem>
                  </SelectContent>
                </Select>
                <Button>Load Papers</Button>
              </div>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Select an exam and class to start grading</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Exam Results</CardTitle>
              <CardDescription>Publish and manage exam results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select exam" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exam1">Mid-term Mathematics</SelectItem>
                    <SelectItem value="exam2">English Literature</SelectItem>
                  </SelectContent>
                </Select>
                <Button>View Results</Button>
                <Button variant="outline">Publish Results</Button>
                <Button variant="outline">Generate Report</Button>
              </div>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Select an exam to view results and statistics</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 