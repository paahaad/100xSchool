

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Calendar } from "./ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { TrendingUp, AlertTriangle, CheckCircle, X, CalendarIcon as CalendarLucide } from "lucide-react"
import { useState } from "react"

const attendanceOverview = {
  totalDays: 120,
  presentDays: 113,
  absentDays: 7,
  percentage: 94.2,
  thisMonth: {
    totalDays: 22,
    presentDays: 21,
    absentDays: 1,
    percentage: 95.5,
  },
  lastMonth: {
    percentage: 92.8,
  },
}

const subjectAttendance = [
  { subject: "Advanced Mathematics", present: 45, total: 48, percentage: 93.8 },
  { subject: "Physics II", present: 38, total: 40, percentage: 95.0 },
  { subject: "English Literature", present: 35, total: 36, percentage: 97.2 },
  { subject: "General Chemistry", present: 42, total: 44, percentage: 95.5 },
  { subject: "History", present: 28, total: 32, percentage: 87.5 },
  { subject: "Physical Education", present: 30, total: 32, percentage: 93.8 },
]

const monthlyAttendance = [
  { month: "Sep", percentage: 96.2 },
  { month: "Oct", percentage: 94.1 },
  { month: "Nov", percentage: 92.8 },
  { month: "Dec", percentage: 95.5 },
  { month: "Jan", percentage: 94.2 },
]

const dailyAttendance = [
  { date: "2024-01-15", status: "present", subjects: ["Math", "Physics", "English", "Chemistry"] },
  { date: "2024-01-16", status: "present", subjects: ["Math", "History", "PE", "Chemistry"] },
  { date: "2024-01-17", status: "absent", subjects: ["Physics", "English", "Math"], reason: "Sick leave" },
  { date: "2024-01-18", status: "present", subjects: ["Math", "Physics", "English", "Chemistry"] },
  { date: "2024-01-19", status: "present", subjects: ["History", "PE", "English", "Chemistry"] },
  { date: "2024-01-22", status: "present", subjects: ["Math", "Physics", "English", "Chemistry"] },
  { date: "2024-01-23", status: "present", subjects: ["Math", "History", "PE", "Chemistry"] },
]

const attendanceCalendarData = {
  "2024-01-15": "present",
  "2024-01-16": "present",
  "2024-01-17": "absent",
  "2024-01-18": "present",
  "2024-01-19": "present",
  "2024-01-22": "present",
  "2024-01-23": "present",
  "2024-01-24": "present",
  "2024-01-25": "present",
  "2024-01-26": "absent",
}

export function StudentAttendance() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedMonth, setSelectedMonth] = useState("january")

  const getAttendanceColor = (percentage) => {
    if (percentage >= 95) return "text-green-600"
    if (percentage >= 85) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "absent":
        return <X className="h-4 w-4 text-red-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Attendance</h2>
          <p className="text-muted-foreground">Track your attendance across all subjects</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="january">January 2024</SelectItem>
              <SelectItem value="december">December 2023</SelectItem>
              <SelectItem value="november">November 2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
            <CalendarLucide className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceOverview.percentage}%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +2.7% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Present</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceOverview.presentDays}</div>
            <p className="text-xs text-muted-foreground">Out of {attendanceOverview.totalDays} days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Absent</CardTitle>
            <X className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{attendanceOverview.absentDays}</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceOverview.thisMonth.percentage}%</div>
            <p className="text-xs text-muted-foreground">
              {attendanceOverview.thisMonth.presentDays}/{attendanceOverview.thisMonth.totalDays} days
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subject-wise">Subject-wise</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="daily">Daily Records</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Trend</CardTitle>
                <CardDescription>Your attendance percentage over the last 5 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyAttendance.map((month, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{month.month} 2024</span>
                        <span className={`text-sm font-medium ${getAttendanceColor(month.percentage)}`}>
                          {month.percentage}%
                        </span>
                      </div>
                      <Progress value={month.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Status</CardTitle>
                <CardDescription>Current semester breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Present Days</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">{attendanceOverview.presentDays}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <X className="h-5 w-5 text-red-500" />
                      <span className="font-medium">Absent Days</span>
                    </div>
                    <span className="text-lg font-bold text-red-600">{attendanceOverview.absentDays}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CalendarLucide className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Total Days</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">{attendanceOverview.totalDays}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {attendanceOverview.percentage < 85 && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <AlertTriangle className="h-5 w-5" />
                  Attendance Warning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-yellow-700">
                  Your attendance is below the required 85% minimum. Please ensure regular attendance to avoid academic
                  penalties.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="subject-wise" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subject-wise Attendance</CardTitle>
              <CardDescription>Your attendance breakdown by subject</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectAttendance.map((subject, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{subject.subject}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {subject.present}/{subject.total}
                        </span>
                        <span className={`font-medium ${getAttendanceColor(subject.percentage)}`}>
                          {subject.percentage}%
                        </span>
                      </div>
                    </div>
                    <Progress value={subject.percentage} className="h-2" />
                    {subject.percentage < 85 && (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Below minimum requirement
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Calendar</CardTitle>
              <CardDescription>Visual representation of your daily attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-6">
                <div className="flex-1">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    modifiers={{
                      present: (date) => {
                        const dateStr = date.toISOString().split("T")[0]
                        return attendanceCalendarData[dateStr] === "present"
                      },
                      absent: (date) => {
                        const dateStr = date.toISOString().split("T")[0]
                        return attendanceCalendarData[dateStr] === "absent"
                      },
                    }}
                    modifiersStyles={{
                      present: { backgroundColor: "#dcfce7", color: "#166534" },
                      absent: { backgroundColor: "#fecaca", color: "#dc2626" },
                    }}
                  />
                </div>
                <div className="w-64 space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Legend</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-200 rounded"></div>
                        <span>Present</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-200 rounded"></div>
                        <span>Absent</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-100 rounded border"></div>
                        <span>No class</span>
                      </div>
                    </div>
                  </div>
                  {selectedDate && (
                    <div className="p-3 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">{selectedDate.toLocaleDateString()}</h4>
                      <p className="text-sm text-muted-foreground">
                        Click on a date to see detailed attendance information for that day.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Attendance Records</CardTitle>
              <CardDescription>Detailed day-by-day attendance history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dailyAttendance.map((day, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-20 text-center">
                      <p className="font-medium">{day.date.split("-")[2]}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(day.date).toLocaleDateString("en-US", { month: "short" })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(day.status)}
                      <span
                        className={`font-medium capitalize ${
                          day.status === "present" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {day.status}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-1">
                        {day.subjects.map((subject, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                      {day.reason && <p className="text-sm text-muted-foreground mt-1">Reason: {day.reason}</p>}
                    </div>
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
