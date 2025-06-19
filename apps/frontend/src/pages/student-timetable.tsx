import { useState } from "react"
import { Clock, MapPin, User, Download, Printer } from "lucide-react"
import { Badge } from "@lms/components/ui/badge"
import { Button } from "@lms/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lms/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@lms/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@lms/components/ui/table"

const timetableData = [
  { 
    time: "8:00 AM - 9:30 AM", 
    monday: { subject: "Data Structures", instructor: "Dr. Sarah Chen", room: "CS-201", type: "Lecture" },
    tuesday: { subject: "Calculus II", instructor: "Prof. Michael Brown", room: "MATH-105", type: "Lecture" },
    wednesday: { subject: "Data Structures", instructor: "Dr. Sarah Chen", room: "CS-201", type: "Lecture" },
    thursday: { subject: "English Literature", instructor: "Dr. Emily Johnson", room: "ENG-302", type: "Seminar" },
    friday: { subject: "Physics Lab", instructor: "Dr. Robert Wilson", room: "PHY-LAB-1", type: "Lab" }
  },
  { 
    time: "9:45 AM - 11:15 AM", 
    monday: { subject: "Organic Chemistry", instructor: "Prof. Lisa Anderson", room: "CHEM-204", type: "Lecture" },
    tuesday: { subject: "Microeconomics", instructor: "Dr. James Taylor", room: "ECON-101", type: "Lecture" },
    wednesday: { subject: "Chemistry Lab", instructor: "Prof. Lisa Anderson", room: "CHEM-LAB-2", type: "Lab" },
    thursday: { subject: "Data Structures", instructor: "Dr. Sarah Chen", room: "CS-201", type: "Tutorial" },
    friday: { subject: "Psychology", instructor: "Dr. Maria Garcia", room: "PSYC-205", type: "Lecture" }
  },
  { 
    time: "11:30 AM - 1:00 PM", 
    monday: { subject: "Business Strategy", instructor: "Prof. David Lee", room: "BUS-301", type: "Case Study" },
    tuesday: { subject: "Physics", instructor: "Dr. Robert Wilson", room: "PHY-103", type: "Lecture" },
    wednesday: { subject: "Calculus II", instructor: "Prof. Michael Brown", room: "MATH-105", type: "Tutorial" },
    thursday: { subject: "Organic Chemistry", instructor: "Prof. Lisa Anderson", room: "CHEM-204", type: "Lecture" },
    friday: null
  },
  { 
    time: "2:00 PM - 3:30 PM", 
    monday: { subject: "English Literature", instructor: "Dr. Emily Johnson", room: "ENG-302", type: "Lecture" },
    tuesday: { subject: "Psychology", instructor: "Dr. Maria Garcia", room: "PSYC-205", type: "Lecture" },
    wednesday: { subject: "Business Strategy", instructor: "Prof. David Lee", room: "BUS-301", type: "Lecture" },
    thursday: { subject: "Calculus II", instructor: "Prof. Michael Brown", room: "MATH-105", type: "Lecture" },
    friday: { subject: "Microeconomics", instructor: "Dr. James Taylor", room: "ECON-101", type: "Tutorial" }
  },
  { 
    time: "3:45 PM - 5:15 PM", 
    monday: null,
    tuesday: { subject: "Study Group", instructor: "", room: "Library", type: "Study" },
    wednesday: { subject: "Research Methods", instructor: "Dr. Amanda Rodriguez", room: "RES-101", type: "Workshop" },
    thursday: { subject: "Physics", instructor: "Dr. Robert Wilson", room: "PHY-103", type: "Tutorial" },
    friday: { subject: "Academic Writing", instructor: "Prof. Thomas Clark", room: "ENG-201", type: "Workshop" }
  }
]

const semesterOptions = ["Current Semester", "Fall 2024", "Spring 2024", "Summer 2024"]

export function StudentTimetable() {
  const [selectedSemester, setSelectedSemester] = useState("Current Semester")

  const getClassColor = (type: string) => {
    switch (type) {
      case "Lecture": return "bg-blue-100 text-blue-800 border-blue-200"
      case "Lab": return "bg-green-100 text-green-800 border-green-200"
      case "Tutorial": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Seminar": return "bg-purple-100 text-purple-800 border-purple-200"
      case "Workshop": return "bg-orange-100 text-orange-800 border-orange-200"
      case "Study": return "bg-gray-100 text-gray-800 border-gray-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const upcomingClasses = [
    { time: "9:45 AM", subject: "Organic Chemistry", instructor: "Prof. Lisa Anderson", room: "CHEM-204", type: "Lecture" },
    { time: "11:30 AM", subject: "Business Strategy", instructor: "Prof. David Lee", room: "BUS-301", type: "Case Study" },
    { time: "2:00 PM", subject: "English Literature", instructor: "Dr. Emily Johnson", room: "ENG-302", type: "Lecture" }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Timetable</h1>
          <p className="text-muted-foreground">
            Your personalized class schedule and upcoming sessions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {semesterOptions.map((semester) => (
                <SelectItem key={semester} value={semester}>
                  {semester}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>
                Your complete class timetable for the current semester
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Time
                        </div>
                      </TableHead>
                      <TableHead>Monday</TableHead>
                      <TableHead>Tuesday</TableHead>
                      <TableHead>Wednesday</TableHead>
                      <TableHead>Thursday</TableHead>
                      <TableHead>Friday</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timetableData.map((slot, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-sm">
                          {slot.time}
                        </TableCell>
                        {["monday", "tuesday", "wednesday", "thursday", "friday"].map((day) => {
                          const classData = slot[day as keyof typeof slot];
                          return (
                            <TableCell key={day} className="p-2">
                              {classData && typeof classData === 'object' && (
                                <div className={`p-3 rounded-lg border ${getClassColor(classData.type || "")}`}>
                                  <div className="font-medium text-sm mb-1">
                                    {classData.subject}
                                  </div>
                                  <div className="text-xs space-y-1">
                                    {classData.instructor && (
                                      <div className="flex items-center gap-1">
                                        <User className="h-3 w-3" />
                                        {classData.instructor}
                                      </div>
                                    )}
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {classData.room}
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                      {classData.type}
                                    </Badge>
                                  </div>
                                </div>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Classes</CardTitle>
              <CardDescription>Upcoming classes for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingClasses.map((cls, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{cls.time}</span>
                    <Badge variant="outline" className="text-xs">
                      {cls.type}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium text-sm">{cls.subject}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {cls.instructor}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {cls.room}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Classes/Week</span>
                <span className="font-medium">18</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Lectures</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Labs</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Tutorials</span>
                <span className="font-medium">3</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
                <span className="text-xs">Lecture</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
                <span className="text-xs">Lab</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
                <span className="text-xs">Tutorial</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-100 border border-purple-200 rounded"></div>
                <span className="text-xs">Seminar</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-100 border border-orange-200 rounded"></div>
                <span className="text-xs">Workshop</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 