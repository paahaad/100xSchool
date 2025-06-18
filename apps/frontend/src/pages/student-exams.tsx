//eslint-disable @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lms/components/ui/card"
import { Button } from "@lms/components/ui/button"
import { Badge } from "@lms/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@lms/components/ui/tabs"
import { Progress } from "@lms/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@lms/components/ui/radio-group"
import { Label } from "@lms/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@lms/components/ui/dialog"
import { AlertCircle, Calendar, Clock, FileText, Play, CheckCircle, Trophy, BookOpen } from "lucide-react"

const upcomingExams = [
  {
    id: "EXM001",
    title: "Mid-term Mathematics Exam",
    subject: "Advanced Mathematics",
    date: "2024-01-25",
    time: "09:00 AM",
    duration: "2 hours",
    room: "Room 101",
    totalMarks: 100,
    syllabus: ["Calculus", "Algebra", "Trigonometry"],
    type: "Written",
    daysLeft: 7,
  },
  {
    id: "EXM002",
    title: "Physics Lab Practical",
    subject: "Physics II",
    date: "2024-01-28",
    time: "10:00 AM",
    duration: "3 hours",
    room: "Lab 201",
    totalMarks: 50,
    syllabus: ["Optics", "Mechanics", "Thermodynamics"],
    type: "Practical",
    daysLeft: 10,
  },
  {
    id: "EXM003",
    title: "English Literature Essay",
    subject: "English Literature",
    date: "2024-01-30",
    time: "02:00 PM",
    duration: "2.5 hours",
    room: "Room 105",
    totalMarks: 75,
    syllabus: ["Modern Poetry", "Drama", "Novel Analysis"],
    type: "Written",
    daysLeft: 12,
  },
]

const availableQuizzes = [
  {
    id: "QUZ001",
    title: "Chemical Bonding Quiz",
    subject: "General Chemistry",
    questions: 15,
    timeLimit: 30,
    attempts: 2,
    attemptsUsed: 0,
    bestScore: null,
    totalMarks: 30,
    status: "available",
  },
  {
    id: "QUZ002",
    title: "Calculus Basics Quiz",
    subject: "Advanced Mathematics",
    questions: 10,
    timeLimit: 20,
    attempts: 3,
    attemptsUsed: 1,
    bestScore: 85,
    totalMarks: 20,
    status: "retake",
  },
  {
    id: "QUZ003",
    title: "Shakespeare Quiz",
    subject: "English Literature",
    questions: 12,
    timeLimit: 25,
    attempts: 1,
    attemptsUsed: 1,
    bestScore: 92,
    totalMarks: 24,
    status: "completed",
  },
]

const examResults = [
  {
    id: "RES001",
    examTitle: "Chemistry Mid-term",
    subject: "General Chemistry",
    date: "2024-01-10",
    totalMarks: 100,
    obtainedMarks: 85,
    grade: "B+",
    rank: 5,
    classAverage: 78,
    status: "published",
  },
  {
    id: "RES002",
    examTitle: "Physics Quiz 1",
    subject: "Physics II",
    date: "2024-01-08",
    totalMarks: 25,
    obtainedMarks: 23,
    grade: "A",
    rank: 2,
    classAverage: 19,
    status: "published",
  },
  {
    id: "RES003",
    examTitle: "Math Problem Set",
    subject: "Advanced Mathematics",
    date: "2024-01-05",
    totalMarks: 50,
    obtainedMarks: 46,
    grade: "A",
    rank: 1,
    classAverage: 38,
    status: "published",
  },
]

const sampleQuizQuestions = [
  {
    id: 1,
    question: "What is the chemical formula for water?",
    options: ["H2O", "CO2", "NaCl", "CH4"],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: "Which of the following is a noble gas?",
    options: ["Oxygen", "Nitrogen", "Helium", "Carbon"],
    correctAnswer: 2,
  },
]

export function StudentExams() {
  const [isQuizDialogOpen, setIsQuizDialogOpen] = useState(false)
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizStarted, setQuizStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes in seconds

  const formatTime = (seconds: any) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getStatusColor = (status: any) => {
    switch (status) {
      case "available":
        return "text-green-600 bg-green-50"
      case "retake":
        return "text-blue-600 bg-blue-50"
      case "completed":
        return "text-gray-600 bg-gray-50"
      default:
        return "text-gray-600 bg-gray-50"
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
          <h2 className="text-3xl font-bold tracking-tight">Exams & Quizzes</h2>
          <p className="text-muted-foreground">View upcoming exams, take quizzes, and check results</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-orange-500">
            {upcomingExams.length} Upcoming
          </Badge>
          <Badge variant="outline" className="text-blue-500">
            {availableQuizzes.filter((q) => q.status === "available").length} Quizzes Available
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Exams</TabsTrigger>
          <TabsTrigger value="quizzes">Online Quizzes</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="schedule">Exam Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4">
            {upcomingExams.map((exam) => (
              <Card key={exam.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{exam.title}</CardTitle>
                      <CardDescription className="mt-1">{exam.subject}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{exam.type}</Badge>
                      <Badge variant="outline">{exam.totalMarks} marks</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{exam.date}</p>
                        <p className="text-muted-foreground">{exam.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{exam.duration}</p>
                        <p className="text-muted-foreground">Duration</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{exam.room}</p>
                        <p className="text-muted-foreground">Venue</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle
                        className={`h-4 w-4 ${exam.daysLeft <= 3 ? "text-red-500" : "text-muted-foreground"}`}
                      />
                      <div>
                        <p className={`font-medium ${exam.daysLeft <= 3 ? "text-red-500" : ""}`}>
                          {exam.daysLeft} days
                        </p>
                        <p className="text-muted-foreground">Remaining</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Syllabus Coverage:</p>
                    <div className="flex flex-wrap gap-2">
                      {exam.syllabus.map((topic, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Study Materials
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Add to Calendar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-4">
          <div className="grid gap-4">
            {availableQuizzes.map((quiz) => (
              <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                      <CardDescription className="mt-1">{quiz.subject}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(quiz.status)}>{quiz.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="font-medium">{quiz.questions}</p>
                      <p className="text-muted-foreground">Questions</p>
                    </div>
                    <div>
                      <p className="font-medium">{quiz.timeLimit} min</p>
                      <p className="text-muted-foreground">Time Limit</p>
                    </div>
                    <div>
                      <p className="font-medium">
                        {quiz.attemptsUsed}/{quiz.attempts}
                      </p>
                      <p className="text-muted-foregroun">Attempts</p>
                    </div>
                    <div>
                      <p className="font-medium">{quiz.bestScore ? `${quiz.bestScore}%` : "N/A"}</p>
                      <p className="text-muted-foreground">Best Score</p>
                    </div>
                  </div>

                  {quiz.bestScore && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Best Performance</span>
                        <span className="text-sm text-muted-foreground">{quiz.bestScore}%</span>
                      </div>
                      <Progress value={quiz.bestScore} className="h-2" />
                    </div>
                  )}

                  <div className="flex gap-2">
                    {quiz.status === "available" || quiz.status === "retake" ? (
                      <Dialog open={isQuizDialogOpen} onOpenChange={setIsQuizDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            className="flex-1"
                            onClick={() => {
                              setSelectedQuiz(quiz)
                              setQuizStarted(false)
                              setCurrentQuestion(0)
                              setQuizAnswers({})
                            }}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            {quiz.status === "retake" ? "Retake Quiz" : "Start Quiz"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{selectedQuiz?.title}</DialogTitle>
                            <DialogDescription>
                              {!quizStarted
                                ? "Quiz Instructions"
                                : `Question ${currentQuestion + 1} of ${sampleQuizQuestions.length}`}
                            </DialogDescription>
                          </DialogHeader>

                          {!quizStarted ? (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="font-medium">Questions: {selectedQuiz?.questions}</p>
                                  <p className="font-medium">Time Limit: {selectedQuiz?.timeLimit} minutes</p>
                                  <p className="font-medium">Total Marks: {selectedQuiz?.totalMarks}</p>
                                </div>
                                <div>
                                  <p className="font-medium">
                                    Attempts Remaining:{" "}
                                    {selectedQuiz ? selectedQuiz.attempts - selectedQuiz.attemptsUsed : 0}
                                  </p>
                                  {selectedQuiz?.bestScore && (
                                    <p className="font-medium">Best Score: {selectedQuiz.bestScore}%</p>
                                  )}
                                </div>
                              </div>
                              <div className="p-4 bg-muted rounded-lg">
                                <h4 className="font-medium mb-2">Instructions:</h4>
                                <ul className="text-sm space-y-1 text-muted-foreground">
                                  <li>• Read each question carefully</li>
                                  <li>• Select the best answer for each question</li>
                                  <li>• You can navigate between questions</li>
                                  <li>• Submit before time runs out</li>
                                </ul>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <Badge variant="outline">
                                  Question {currentQuestion + 1} of {sampleQuizQuestions.length}
                                </Badge>
                                <Badge variant="outline" className="text-red-500">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {formatTime(timeLeft)}
                                </Badge>
                              </div>

                              <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                  {sampleQuizQuestions[currentQuestion]?.question}
                                </h3>

                                <RadioGroup
                                  value={quizAnswers[currentQuestion]?.toString()}
                                  onValueChange={(value) => {
                                    setQuizAnswers((prev) => ({
                                      ...prev,
                                      [currentQuestion]: Number.parseInt(value),
                                    }))
                                  }}
                                >
                                  {sampleQuizQuestions[currentQuestion]?.options.map((option, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                                      <Label htmlFor={`option-${index}`}>{option}</Label>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </div>
                            </div>
                          )}

                          <DialogFooter>
                            {!quizStarted ? (
                              <Button onClick={() => setQuizStarted(true)}>Start Quiz</Button>
                            ) : (
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                                  disabled={currentQuestion === 0}
                                >
                                  Previous
                                </Button>
                                {currentQuestion < sampleQuizQuestions.length - 1 ? (
                                  <Button onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</Button>
                                ) : (
                                  <Button onClick={() => setIsQuizDialogOpen(false)}>Submit Quiz</Button>
                                )}
                              </div>
                            )}
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button variant="outline" className="flex-1" disabled>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <div className="grid gap-4">
            {examResults.map((result) => (
              <Card key={result.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{result.examTitle}</CardTitle>
                      <CardDescription className="mt-1">
                        {result.subject} • {result.date}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getGradeColor(result.grade)}>{result.grade}</Badge>
                      <Badge variant="outline">Rank #{result.rank}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">{result.obtainedMarks}</p>
                      <p className="text-sm text-muted-foreground">Your Score</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{result.totalMarks}</p>
                      <p className="text-sm text-muted-foreground">Total Marks</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-muted-foreground">{result.classAverage}</p>
                      <p className="text-sm text-muted-foreground">Class Average</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Performance</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round((result.obtainedMarks / result.totalMarks) * 100)}%
                      </span>
                    </div>
                    <Progress value={(result.obtainedMarks / result.totalMarks) * 100} className="h-2" />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <FileText className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Trophy className="h-4 w-4 mr-2" />
                      Class Ranking
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Exam Schedule</CardTitle>
              <CardDescription>Complete exam timetable for this semester</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingExams.map((exam) => (
                  <div key={exam.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-16 text-center">
                      <p className="text-lg font-bold">{exam.date.split("-")[2]}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(exam.date).toLocaleDateString("en-US", { month: "short" })}
                      </p>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{exam.title}</h4>
                      <p className="text-sm text-muted-foreground">{exam.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{exam.time}</p>
                      <p className="text-sm text-muted-foreground">{exam.room}</p>
                    </div>
                    <Badge variant="outline">{exam.duration}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
