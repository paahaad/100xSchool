"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Input } from "./ui/input"
import { Progress } from "./ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { BookOpen, Clock, Download, FileText, Play, Search, Users, Video, MapPin } from "lucide-react"

const enrolledCourses = [
  {
    id: "MATH101",
    name: "Advanced Mathematics",
    teacher: "Dr. Smith",
    schedule: "Mon, Wed, Fri - 9:00 AM",
    room: "Room 101",
    progress: 75,
    grade: "A",
    credits: 4,
    materials: 12,
    assignments: 8,
    nextClass: "2024-01-18 09:00",
  },
  {
    id: "PHYS201",
    name: "Physics II",
    teacher: "Prof. Johnson",
    schedule: "Tue, Thu - 11:00 AM",
    room: "Lab 201",
    progress: 68,
    grade: "B+",
    credits: 4,
    materials: 15,
    assignments: 6,
    nextClass: "2024-01-18 11:00",
  },
  {
    id: "ENG101",
    name: "English Literature",
    teacher: "Ms. Davis",
    schedule: "Mon, Wed - 2:00 PM",
    room: "Room 105",
    progress: 82,
    grade: "A-",
    credits: 3,
    materials: 8,
    assignments: 10,
    nextClass: "2024-01-19 14:00",
  },
  {
    id: "CHEM101",
    name: "General Chemistry",
    teacher: "Dr. Wilson",
    schedule: "Tue, Thu - 10:00 AM",
    room: "Lab 301",
    progress: 60,
    grade: "B",
    credits: 4,
    materials: 18,
    assignments: 7,
    nextClass: "2024-01-18 10:00",
  },
]

const courseMaterials = [
  {
    id: 1,
    title: "Introduction to Calculus",
    type: "PDF",
    course: "Advanced Mathematics",
    uploadDate: "2024-01-15",
    size: "2.5 MB",
    downloaded: false,
  },
  {
    id: 2,
    title: "Quantum Mechanics Lecture",
    type: "Video",
    course: "Physics II",
    uploadDate: "2024-01-14",
    duration: "45 min",
    watched: true,
  },
  {
    id: 3,
    title: "Shakespeare Analysis Guide",
    type: "PDF",
    course: "English Literature",
    uploadDate: "2024-01-13",
    size: "1.8 MB",
    downloaded: true,
  },
  {
    id: 4,
    title: "Chemical Bonding Presentation",
    type: "PPT",
    course: "General Chemistry",
    uploadDate: "2024-01-12",
    size: "5.2 MB",
    downloaded: false,
  },
]

const timetable = [
  { time: "9:00 AM", monday: "Math", tuesday: "", wednesday: "Math", thursday: "", friday: "Math" },
  { time: "10:00 AM", monday: "", tuesday: "Chemistry", wednesday: "", thursday: "Chemistry", friday: "" },
  { time: "11:00 AM", monday: "", tuesday: "Physics", wednesday: "", thursday: "Physics", friday: "" },
  { time: "2:00 PM", monday: "English", tuesday: "", wednesday: "English", thursday: "", friday: "" },
  { time: "3:00 PM", monday: "", tuesday: "Lab", wednesday: "", thursday: "Lab", friday: "" },
]

export function StudentCourses() {
  const [selectedCourse, setSelectedCourse] = useState(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Courses</h2>
          <p className="text-muted-foreground">Manage your enrolled courses and access materials</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search courses..." className="pl-8 w-64" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="materials">Course Materials</TabsTrigger>
          <TabsTrigger value="timetable">Timetable</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Users className="h-4 w-4" />
                        {course.teacher}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {course.credits} Credits
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.schedule}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {course.room}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Course Progress</span>
                      <span className="text-sm text-muted-foreground">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{course.grade}</p>
                        <p className="text-xs text-muted-foreground">Current Grade</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold">{course.materials}</p>
                        <p className="text-xs text-muted-foreground">Materials</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold">{course.assignments}</p>
                        <p className="text-xs text-muted-foreground">Assignments</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="flex-1" onClick={() => setSelectedCourse(course)}>
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{course.name}</DialogTitle>
                          <DialogDescription>Course details and information</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">Course Information</h4>
                              <div className="space-y-2 text-sm">
                                <p>
                                  <strong>Instructor:</strong> {course.teacher}
                                </p>
                                <p>
                                  <strong>Schedule:</strong> {course.schedule}
                                </p>
                                <p>
                                  <strong>Room:</strong> {course.room}
                                </p>
                                <p>
                                  <strong>Credits:</strong> {course.credits}
                                </p>
                                <p>
                                  <strong>Current Grade:</strong> {course.grade}
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Progress Overview</h4>
                              <div className="space-y-3">
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Overall Progress</span>
                                    <span>{course.progress}%</span>
                                  </div>
                                  <Progress value={course.progress} className="h-2" />
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-center">
                                  <div className="p-2 bg-muted rounded">
                                    <p className="text-lg font-bold">{course.materials}</p>
                                    <p className="text-xs text-muted-foreground">Materials</p>
                                  </div>
                                  <div className="p-2 bg-muted rounded">
                                    <p className="text-lg font-bold">{course.assignments}</p>
                                    <p className="text-xs text-muted-foreground">Assignments</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button className="flex-1">Access Course Materials</Button>
                            <Button variant="outline" className="flex-1">
                              View Assignments
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Materials
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Materials</CardTitle>
              <CardDescription>Access all your course materials in one place</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courseMaterials.map((material) => (
                  <div key={material.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex-shrink-0">
                      {material.type === "PDF" && <FileText className="h-8 w-8 text-red-500" />}
                      {material.type === "Video" && <Video className="h-8 w-8 text-blue-500" />}
                      {material.type === "PPT" && <FileText className="h-8 w-8 text-orange-500" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{material.title}</h4>
                      <p className="text-sm text-muted-foreground">{material.course}</p>
                      <p className="text-xs text-muted-foreground">
                        Uploaded: {material.uploadDate} • {material.size || material.duration}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {material.type === "Video" && material.watched && <Badge variant="secondary">Watched</Badge>}
                      {material.type !== "Video" && material.downloaded && (
                        <Badge variant="secondary">Downloaded</Badge>
                      )}
                      <Button size="sm" variant="outline">
                        {material.type === "Video" ? (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Watch
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timetable" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Timetable</CardTitle>
              <CardDescription>Your weekly class schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Time</th>
                      <th className="text-left p-3 font-medium">Monday</th>
                      <th className="text-left p-3 font-medium">Tuesday</th>
                      <th className="text-left p-3 font-medium">Wednesday</th>
                      <th className="text-left p-3 font-medium">Thursday</th>
                      <th className="text-left p-3 font-medium">Friday</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timetable.map((slot, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-3 font-medium">{slot.time}</td>
                        <td className="p-3">
                          {slot.monday && (
                            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{slot.monday}</div>
                          )}
                        </td>
                        <td className="p-3">
                          {slot.tuesday && (
                            <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">{slot.tuesday}</div>
                          )}
                        </td>
                        <td className="p-3">
                          {slot.wednesday && (
                            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{slot.wednesday}</div>
                          )}
                        </td>
                        <td className="p-3">
                          {slot.thursday && (
                            <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">{slot.thursday}</div>
                          )}
                        </td>
                        <td className="p-3">
                          {slot.friday && (
                            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{slot.friday}</div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
