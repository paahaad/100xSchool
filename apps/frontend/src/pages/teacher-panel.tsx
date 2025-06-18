import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lms/components/ui/card"
import { Button } from "@lms/components/ui/button"
import { Badge } from "@lms/components/ui/badge"
import { Progress } from "@lms/components/ui/progress"
import { 
  BookOpen, 
  GraduationCap, 
  ClipboardList, 
  Calendar, 
  Users, 
  TrendingUp,
  FileText,
  Plus
} from "lucide-react"

export function TeacherPanel() {
  const upcomingClasses = [
    { time: "09:00 AM", subject: "Mathematics", class: "Grade 10-A", room: "Room 101" },
    { time: "11:00 AM", subject: "Physics", class: "Grade 11-B", room: "Lab 201" },
    { time: "02:00 PM", subject: "Mathematics", class: "Grade 10-B", room: "Room 101" },
  ]

  const recentAssignments = [
    { title: "Algebra Problem Set", class: "Grade 10-A", submitted: 25, total: 30, dueDate: "2024-01-20" },
    { title: "Physics Lab Report", class: "Grade 11-B", submitted: 18, total: 22, dueDate: "2024-01-22" },
    { title: "Calculus Quiz", class: "Grade 10-B", submitted: 28, total: 28, dueDate: "2024-01-18" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h2>
        <p className="text-muted-foreground">Welcome back! Here's your teaching overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Active this semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Across all classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Grades</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Assignments to grade</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">This week average</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((cls, index) => (
                <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="w-16 text-center">
                    <p className="font-medium text-sm">{cls.time}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{cls.subject}</p>
                    <p className="text-sm text-muted-foreground">{cls.class} • {cls.room}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Join
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Recent Assignments
            </CardTitle>
            <CardDescription>Track assignment submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAssignments.map((assignment, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{assignment.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {assignment.class} • Due: {assignment.dueDate}
                      </p>
                    </div>
                    <Badge variant={assignment.submitted === assignment.total ? "default" : "secondary"}>
                      {assignment.submitted}/{assignment.total}
                    </Badge>
                  </div>
                  <Progress 
                    value={(assignment.submitted / assignment.total) * 100} 
                    className="h-2" 
                  />
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
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Plus className="h-5 w-5" />
              Create Assignment
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Users className="h-5 w-5" />
              Take Attendance
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <FileText className="h-5 w-5" />
              Grade Papers
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 