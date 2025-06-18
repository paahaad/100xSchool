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
import { Plus, Search, Edit, Trash2, Users, BookOpen, Calendar } from "lucide-react"

const courses = [
  {
    id: "MATH101",
    name: "Advanced Mathematics",
    grade: "Grade 10",
    teacher: "Dr. Smith",
    students: 28,
    schedule: "Mon, Wed, Fri - 9:00 AM",
    status: "Active",
  },
  {
    id: "ENG101",
    name: "English Literature",
    grade: "Grade 10",
    teacher: "Ms. Johnson",
    students: 30,
    schedule: "Tue, Thu - 10:00 AM",
    status: "Active",
  },
  {
    id: "SCI101",
    name: "Physics",
    grade: "Grade 11",
    teacher: "Dr. Brown",
    students: 25,
    schedule: "Mon, Wed - 2:00 PM",
    status: "Active",
  },
]

const timetable = [
  { time: "9:00 AM", monday: "Math", tuesday: "English", wednesday: "Math", thursday: "Science", friday: "Math" },
  {
    time: "10:00 AM",
    monday: "English",
    tuesday: "Science",
    wednesday: "English",
    thursday: "Math",
    friday: "Science",
  },
  {
    time: "11:00 AM",
    monday: "Science",
    tuesday: "Math",
    wednesday: "Science",
    thursday: "English",
    friday: "English",
  },
  { time: "2:00 PM", monday: "History", tuesday: "Geography", wednesday: "History", thursday: "Art", friday: "PE" },
  { time: "3:00 PM", monday: "Art", tuesday: "PE", wednesday: "Music", thursday: "History", friday: "Geography" },
]

export function CourseManagement() {
  const [isCourseDialogOpen, setIsCourseDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Course Management</h2>
          <p className="text-muted-foreground">Manage courses, subjects, timetables, and teacher assignments</p>
        </div>
        <Dialog open={isCourseDialogOpen} onOpenChange={setIsCourseDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>Create a new course/subject for the academic year</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="courseName">Course Name</Label>
                <Input id="courseName" placeholder="e.g., Advanced Mathematics" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseCode">Course Code</Label>
                <Input id="courseCode" placeholder="e.g., MATH101" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade/Class</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grade-9">Grade 9</SelectItem>
                      <SelectItem value="grade-10">Grade 10</SelectItem>
                      <SelectItem value="grade-11">Grade 11</SelectItem>
                      <SelectItem value="grade-12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacher">Assign Teacher</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                      <SelectItem value="ms-johnson">Ms. Johnson</SelectItem>
                      <SelectItem value="dr-brown">Dr. Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Course Description</Label>
                <Textarea id="description" placeholder="Brief description of the course" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="credits">Credits</Label>
                  <Input id="credits" type="number" placeholder="3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (weeks)</Label>
                  <Input id="duration" type="number" placeholder="16" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCourseDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCourseDialogOpen(false)}>Create Course</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="timetable">Timetable</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="assignments">Teacher Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">Across all grades</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38</div>
                <p className="text-xs text-muted-foreground">Currently running</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">Enrolled students</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Class Size</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <p className="text-xs text-muted-foreground">Students per class</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Course Directory</CardTitle>
              <CardDescription>Manage all courses and subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search courses..." className="pl-8" />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    <SelectItem value="grade-9">Grade 9</SelectItem>
                    <SelectItem value="grade-10">Grade 10</SelectItem>
                    <SelectItem value="grade-11">Grade 11</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Code</TableHead>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.id}</TableCell>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.grade}</TableCell>
                      <TableCell>{course.teacher}</TableCell>
                      <TableCell>{course.students}</TableCell>
                      <TableCell className="text-sm">{course.schedule}</TableCell>
                      <TableCell>
                        <Badge variant="default">{course.status}</Badge>
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

        <TabsContent value="timetable" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Class Timetable</CardTitle>
              <CardDescription>Weekly schedule for Grade 10-A</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-4">
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grade-10-a">Grade 10-A</SelectItem>
                    <SelectItem value="grade-10-b">Grade 10-B</SelectItem>
                    <SelectItem value="grade-11-a">Grade 11-A</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Edit Timetable
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Monday</TableHead>
                      <TableHead>Tuesday</TableHead>
                      <TableHead>Wednesday</TableHead>
                      <TableHead>Thursday</TableHead>
                      <TableHead>Friday</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timetable.map((slot, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{slot.time}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{slot.monday}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{slot.tuesday}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{slot.wednesday}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{slot.thursday}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{slot.friday}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Tracking</CardTitle>
              <CardDescription>Daily and subject-wise attendance management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Today's Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">92%</div>
                    <p className="text-xs text-muted-foreground">1,134 of 1,234 present</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">This Week</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">89%</div>
                    <p className="text-xs text-muted-foreground">Average attendance</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">100</div>
                    <p className="text-xs text-muted-foreground">Students absent</p>
                  </CardContent>
                </Card>
              </div>
              <div className="flex items-center gap-4">
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grade-10-a">Grade 10-A</SelectItem>
                    <SelectItem value="grade-10-b">Grade 10-B</SelectItem>
                    <SelectItem value="grade-11-a">Grade 11-A</SelectItem>
                  </SelectContent>
                </Select>
                <Button>Take Attendance</Button>
                <Button variant="outline">View Reports</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Assignments</CardTitle>
              <CardDescription>Assign teachers to subjects and manage their workload</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Select>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                      <SelectItem value="ms-johnson">Ms. Johnson</SelectItem>
                      <SelectItem value="dr-brown">Dr. Brown</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>Assign Subject</Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Current assignments will be displayed here with options to modify or remove assignments.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 