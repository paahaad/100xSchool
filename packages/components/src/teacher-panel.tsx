import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Textarea } from "./ui/textarea"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import {
  CalendarIcon,
  Plus,
  Upload,
  FileText,
  Video,
  Link,
  MessageSquare,
  GraduationCap,
  ClipboardList,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@lms/tailwind"

const assignments = [
  {
    id: "ASG001",
    title: "Quadratic Equations Practice",
    subject: "Mathematics",
    class: "Grade 10-A",
    dueDate: "2024-01-15",
    submissions: 23,
    totalStudents: 30,
    status: "Active",
  },
  {
    id: "ASG002",
    title: "Essay on Climate Change",
    subject: "English",
    class: "Grade 10-B",
    dueDate: "2024-01-20",
    submissions: 18,
    totalStudents: 28,
    status: "Active",
  },
]

const materials = [
  {
    id: "MAT001",
    title: "Introduction to Algebra",
    type: "PDF",
    subject: "Mathematics",
    uploadDate: "2024-01-10",
    downloads: 45,
  },
  {
    id: "MAT002",
    title: "Photosynthesis Explained",
    type: "Video",
    subject: "Biology",
    uploadDate: "2024-01-08",
    downloads: 32,
  },
]

export function TeacherPanel() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false)
  const [isMaterialDialogOpen, setIsMaterialDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Teacher Panel</h2>
          <p className="text-muted-foreground">Manage your classes, assignments, and teaching materials</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isMaterialDialogOpen} onOpenChange={setIsMaterialDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Material
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Teaching Material</DialogTitle>
                <DialogDescription>Add videos, PDFs, or links for your students</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="materialTitle">Title</Label>
                  <Input id="materialTitle" placeholder="e.g., Introduction to Algebra" />
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
                <div className="space-y-2">
                  <Label htmlFor="materialType">Material Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="link">External Link</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">Upload File or Enter Link</Label>
                  <Input id="file" type="file" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Brief description of the material" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsMaterialDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsMaterialDialogOpen(false)}>Upload Material</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isAssignmentDialogOpen} onOpenChange={setIsAssignmentDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Assignment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Assignment</DialogTitle>
                <DialogDescription>Create an assignment for your students</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="assignmentTitle">Assignment Title</Label>
                  <Input id="assignmentTitle" placeholder="e.g., Quadratic Equations Practice" />
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
                <div className="space-y-2">
                  <Label>Due Date</Label>
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
                  <Label htmlFor="instructions">Instructions</Label>
                  <Textarea id="instructions" placeholder="Assignment instructions and requirements" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxMarks">Maximum Marks</Label>
                  <Input id="maxMarks" type="number" placeholder="100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attachments">Attachments</Label>
                  <Input id="attachments" type="file" multiple />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAssignmentDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAssignmentDialogOpen(false)}>Create Assignment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Classes</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle className="text-sm font-medium">Materials Uploaded</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="assignments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="materials">Teaching Materials</TabsTrigger>
          <TabsTrigger value="gradebook">Gradebook</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Assignments</CardTitle>
              <CardDescription>Manage assignments and track student submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Submissions</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">{assignment.title}</TableCell>
                      <TableCell>{assignment.subject}</TableCell>
                      <TableCell>{assignment.class}</TableCell>
                      <TableCell>{assignment.dueDate}</TableCell>
                      <TableCell>
                        {assignment.submissions}/{assignment.totalStudents}
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">{assignment.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            Grade
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

        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Teaching Materials</CardTitle>
              <CardDescription>Your uploaded videos, PDFs, and links</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materials.map((material) => (
                    <TableRow key={material.id}>
                      <TableCell className="font-medium">{material.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {material.type === "PDF" && <FileText className="h-4 w-4" />}
                          {material.type === "Video" && <Video className="h-4 w-4" />}
                          {material.type === "Link" && <Link className="h-4 w-4" />}
                          {material.type}
                        </div>
                      </TableCell>
                      <TableCell>{material.subject}</TableCell>
                      <TableCell>{material.uploadDate}</TableCell>
                      <TableCell>{material.downloads}</TableCell>
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

        <TabsContent value="gradebook" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gradebook Management</CardTitle>
              <CardDescription>Grade assignments and manage student performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
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
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select assignment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asg001">Quadratic Equations</SelectItem>
                    <SelectItem value="asg002">Climate Change Essay</SelectItem>
                  </SelectContent>
                </Select>
                <Button>Load Gradebook</Button>
              </div>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Select a class and assignment to view the gradebook</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Classroom Announcements</CardTitle>
              <CardDescription>Send announcements to your students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="announcementClass">Select Class</Label>
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
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="announcementTitle">Title</Label>
                  <Input id="announcementTitle" placeholder="Announcement title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="announcementMessage">Message</Label>
                  <Textarea id="announcementMessage" placeholder="Type your announcement here..." />
                </div>
                <Button>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Announcement
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
