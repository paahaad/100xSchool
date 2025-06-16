"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  BookOpen,
  Calendar,
  Clock,
  FileText,
  GraduationCap,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Star,
  Award,
} from "lucide-react"

const upcomingClasses = [
  { subject: "Mathematics", time: "09:00 AM", room: "Room 101", teacher: "Dr. Smith" },
  { subject: "Physics", time: "11:00 AM", room: "Lab 201", teacher: "Prof. Johnson" },
  { subject: "English", time: "02:00 PM", room: "Room 105", teacher: "Ms. Davis" },
]

const recentGrades = [
  { subject: "Mathematics", assignment: "Algebra Test", grade: "A", score: 92, date: "2024-01-15" },
  { subject: "Physics", assignment: "Lab Report", grade: "B+", score: 87, date: "2024-01-12" },
  { subject: "English", assignment: "Essay Writing", grade: "A-", score: 89, date: "2024-01-10" },
]

const pendingTasks = [
  {
    title: "Chemistry Lab Report",
    subject: "Chemistry",
    dueDate: "2024-01-20",
    priority: "high",
    type: "assignment",
  },
  {
    title: "History Essay",
    subject: "History",
    dueDate: "2024-01-22",
    priority: "medium",
    type: "assignment",
  },
  {
    title: "Math Quiz",
    subject: "Mathematics",
    dueDate: "2024-01-18",
    priority: "high",
    type: "quiz",
  },
]

const achievements = [
  { title: "Perfect Attendance", description: "No absences this month", icon: Award, color: "text-green-500" },
  { title: "Top Performer", description: "Highest score in Physics", icon: Star, color: "text-yellow-500" },
  {
    title: "Assignment Streak",
    description: "5 assignments submitted on time",
    icon: CheckCircle,
    color: "text-blue-500",
  },
]

export function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, Jane!</h2>
          <p className="text-muted-foreground">Here's what's happening with your studies today</p>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder-user.jpg" alt="Student" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">Jane Smith</p>
            <p className="text-sm text-muted-foreground">Grade 11-A • Student ID: STU001</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +0.2 from last semester
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Due this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Today's Schedule */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today's Classes
            </CardTitle>
            <CardDescription>Your schedule for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((class_, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">{class_.subject}</p>
                    <p className="text-sm text-muted-foreground">{class_.teacher}</p>
                    <p className="text-xs text-muted-foreground">{class_.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{class_.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Pending Tasks
            </CardTitle>
            <CardDescription>Assignments and quizzes due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingTasks.map((task, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div
                    className={`w-2 h-8 rounded-full ${
                      task.priority === "high"
                        ? "bg-red-500"
                        : task.priority === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">{task.subject}</p>
                    <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                  </div>
                  <Badge variant={task.type === "assignment" ? "default" : "secondary"}>{task.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Grades */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Recent Grades
            </CardTitle>
            <CardDescription>Your latest assignment results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentGrades.map((grade, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold">{grade.grade}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{grade.assignment}</p>
                    <p className="text-sm text-muted-foreground">{grade.subject}</p>
                    <p className="text-xs text-muted-foreground">{grade.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{grade.score}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Progress</CardTitle>
            <CardDescription>Your performance across subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Mathematics</span>
                  <span className="text-sm text-muted-foreground">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Physics</span>
                  <span className="text-sm text-muted-foreground">87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">English</span>
                  <span className="text-sm text-muted-foreground">89%</span>
                </div>
                <Progress value={89} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Chemistry</span>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
            <CardDescription>Your accomplishments this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <achievement.icon className={`h-8 w-8 ${achievement.color}`} />
                  <div className="flex-1">
                    <p className="font-medium">{achievement.title}</p>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-20 flex-col gap-2" variant="outline">
              <FileText className="h-6 w-6" />
              Submit Assignment
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <BookOpen className="h-6 w-6" />
              View Course Materials
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Calendar className="h-6 w-6" />
              Check Attendance
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <GraduationCap className="h-6 w-6" />
              View Grades
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
