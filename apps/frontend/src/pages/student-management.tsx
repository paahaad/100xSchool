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
import { Calendar } from "@lms/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@lms/components/ui/popover"
import { CalendarIcon, Plus, Search, Filter, Download, Eye, Edit, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@lms/tailwind"

const students = [
  {
    id: "STU001",
    name: "Alice Johnson",
    class: "Grade 10-A",
    rollNo: "101",
    email: "alice@example.com",
    phone: "+1234567890",
    status: "Active",
    admissionDate: "2023-04-15",
    feeStatus: "Paid",
  },
  {
    id: "STU002",
    name: "Bob Smith",
    class: "Grade 9-B",
    rollNo: "205",
    email: "bob@example.com",
    phone: "+1234567891",
    status: "Active",
    admissionDate: "2023-04-20",
    feeStatus: "Pending",
  },
  {
    id: "STU003",
    name: "Carol Davis",
    class: "Grade 11-A",
    rollNo: "301",
    email: "carol@example.com",
    phone: "+1234567892",
    status: "Inactive",
    admissionDate: "2023-03-10",
    feeStatus: "Overdue",
  },
]

export function StudentManagement() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isAdmissionDialogOpen, setIsAdmissionDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Student Management</h2>
          <p className="text-muted-foreground">Manage student admissions, profiles, and academic records</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isAdmissionDialogOpen} onOpenChange={setIsAdmissionDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Admission
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Student Admission Form</DialogTitle>
                <DialogDescription>Fill in the student details for admission</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter last name" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="student@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+1234567890" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
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
                    <Label htmlFor="gender">Gender</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="class">Class/Grade</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
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
                    <Label htmlFor="section">Section</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a">Section A</SelectItem>
                        <SelectItem value="b">Section B</SelectItem>
                        <SelectItem value="c">Section C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" placeholder="Enter full address" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Parent/Guardian Name</Label>
                    <Input id="parentName" placeholder="Enter parent name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">Parent Phone</Label>
                    <Input id="parentPhone" placeholder="+1234567890" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="documents">Upload Documents</Label>
                  <Input id="documents" type="file" multiple />
                  <p className="text-sm text-muted-foreground">
                    Upload birth certificate, previous school records, etc.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAdmissionDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAdmissionDialogOpen(false)}>Submit Admission</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all-students" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-students">All Students</TabsTrigger>
          <TabsTrigger value="admissions">Admissions</TabsTrigger>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
          <TabsTrigger value="profiles">Student Profiles</TabsTrigger>
        </TabsList>

        <TabsContent value="all-students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Directory</CardTitle>
              <CardDescription>View and manage all registered students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search students..." className="pl-8" />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="grade-9">Grade 9</SelectItem>
                    <SelectItem value="grade-10">Grade 10</SelectItem>
                    <SelectItem value="grade-11">Grade 11</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Fee Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.rollNo}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{student.email}</div>
                          <div className="text-muted-foreground">{student.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={student.status === "Active" ? "default" : "secondary"}>{student.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            student.feeStatus === "Paid"
                              ? "default"
                              : student.feeStatus === "Pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {student.feeStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
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

        <TabsContent value="admissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Admission Management</CardTitle>
              <CardDescription>Process new student admissions and applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">Awaiting review</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">Ready for enrollment</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total This Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">48</div>
                    <p className="text-xs text-muted-foreground">New admissions</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promotions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Promotions</CardTitle>
              <CardDescription>Manage student promotions to next grade/class</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Select>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select current grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grade-9">Grade 9</SelectItem>
                      <SelectItem value="grade-10">Grade 10</SelectItem>
                      <SelectItem value="grade-11">Grade 11</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Promote to grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grade-10">Grade 10</SelectItem>
                      <SelectItem value="grade-11">Grade 11</SelectItem>
                      <SelectItem value="grade-12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>Process Promotions</Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Select students from Grade 9 to promote to Grade 10 based on their academic performance.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profiles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Profiles</CardTitle>
              <CardDescription>Detailed student information and academic history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Select a student from the directory to view their detailed profile
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
