import { useState } from "react"
import { Calendar, Clock, Plus, Edit } from "lucide-react"
import { Badge } from "@lms/components/ui/badge"
import { Button } from "@lms/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lms/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@lms/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@lms/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@lms/components/ui/tabs"

const timetableData = [
  { 
    time: "9:00 AM - 10:00 AM", 
    monday: { subject: "Mathematics", teacher: "Ms. Johnson", room: "Room 101" },
    tuesday: { subject: "English", teacher: "Mr. Smith", room: "Room 102" },
    wednesday: { subject: "Mathematics", teacher: "Ms. Johnson", room: "Room 101" },
    thursday: { subject: "Science", teacher: "Dr. Brown", room: "Lab 1" },
    friday: { subject: "Mathematics", teacher: "Ms. Johnson", room: "Room 101" }
  },
  { 
    time: "10:00 AM - 11:00 AM", 
    monday: { subject: "English", teacher: "Mr. Smith", room: "Room 102" },
    tuesday: { subject: "Science", teacher: "Dr. Brown", room: "Lab 1" },
    wednesday: { subject: "English", teacher: "Mr. Smith", room: "Room 102" },
    thursday: { subject: "Mathematics", teacher: "Ms. Johnson", room: "Room 101" },
    friday: { subject: "Science", teacher: "Dr. Brown", room: "Lab 1" }
  },
  { 
    time: "11:00 AM - 12:00 PM", 
    monday: { subject: "Science", teacher: "Dr. Brown", room: "Lab 1" },
    tuesday: { subject: "Mathematics", teacher: "Ms. Johnson", room: "Room 101" },
    wednesday: { subject: "Science", teacher: "Dr. Brown", room: "Lab 1" },
    thursday: { subject: "English", teacher: "Mr. Smith", room: "Room 102" },
    friday: { subject: "English", teacher: "Mr. Smith", room: "Room 102" }
  },
  { 
    time: "2:00 PM - 3:00 PM", 
    monday: { subject: "History", teacher: "Prof. Davis", room: "Room 201" },
    tuesday: { subject: "Geography", teacher: "Ms. Wilson", room: "Room 202" },
    wednesday: { subject: "History", teacher: "Prof. Davis", room: "Room 201" },
    thursday: { subject: "Art", teacher: "Mrs. Taylor", room: "Art Studio" },
    friday: { subject: "Physical Education", teacher: "Coach Miller", room: "Gymnasium" }
  },
  { 
    time: "3:00 PM - 4:00 PM", 
    monday: { subject: "Art", teacher: "Mrs. Taylor", room: "Art Studio" },
    tuesday: { subject: "Physical Education", teacher: "Coach Miller", room: "Gymnasium" },
    wednesday: { subject: "Music", teacher: "Mr. Garcia", room: "Music Room" },
    thursday: { subject: "History", teacher: "Prof. Davis", room: "Room 201" },
    friday: { subject: "Geography", teacher: "Ms. Wilson", room: "Room 202" }
  }
]

const classes = [
  { id: "grade-10-a", name: "Grade 10-A", students: 32 },
  { id: "grade-10-b", name: "Grade 10-B", students: 28 },
  { id: "grade-11-a", name: "Grade 11-A", students: 30 },
  { id: "grade-11-b", name: "Grade 11-B", students: 25 },
  { id: "grade-12-a", name: "Grade 12-A", students: 27 },
  { id: "grade-12-b", name: "Grade 12-B", students: 29 }
]

export function Timetable() {
  const [selectedClass, setSelectedClass] = useState("grade-10-a")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Timetable Management</h1>
          <p className="text-muted-foreground">
            Manage class schedules and weekly timetables
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Academic Calendar
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Schedule
          </Button>
        </div>
      </div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Schedule</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Changes</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Weekly Timetable</CardTitle>
                  <CardDescription>
                    Current schedule for selected class
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name} ({cls.students} students)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Schedule
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Time Slot
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
                        <TableCell className="font-medium">
                          {slot.time}
                        </TableCell>
                        <TableCell>
                          {slot.monday && (
                            <div className="space-y-1">
                              <Badge variant="outline" className="block w-fit">
                                {slot.monday.subject}
                              </Badge>
                              <div className="text-xs text-muted-foreground">
                                {slot.monday.teacher} • {slot.monday.room}
                              </div>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {slot.tuesday && (
                            <div className="space-y-1">
                              <Badge variant="outline" className="block w-fit">
                                {slot.tuesday.subject}
                              </Badge>
                              <div className="text-xs text-muted-foreground">
                                {slot.tuesday.teacher} • {slot.tuesday.room}
                              </div>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {slot.wednesday && (
                            <div className="space-y-1">
                              <Badge variant="outline" className="block w-fit">
                                {slot.wednesday.subject}
                              </Badge>
                              <div className="text-xs text-muted-foreground">
                                {slot.wednesday.teacher} • {slot.wednesday.room}
                              </div>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {slot.thursday && (
                            <div className="space-y-1">
                              <Badge variant="outline" className="block w-fit">
                                {slot.thursday.subject}
                              </Badge>
                              <div className="text-xs text-muted-foreground">
                                {slot.thursday.teacher} • {slot.thursday.room}
                              </div>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {slot.friday && (
                            <div className="space-y-1">
                              <Badge variant="outline" className="block w-fit">
                                {slot.friday.subject}
                              </Badge>
                              <div className="text-xs text-muted-foreground">
                                {slot.friday.teacher} • {slot.friday.room}
                              </div>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Schedule Changes</CardTitle>
              <CardDescription>
                Review and approve pending timetable modifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                No upcoming schedule changes
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Templates</CardTitle>
              <CardDescription>
                Create and manage reusable timetable templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                No templates created yet
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 