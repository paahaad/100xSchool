import { useState } from "react"
import { Book, Plus, Edit, Trash2, Users, Clock } from "lucide-react"
import { Badge } from "@lms/components/ui/badge"
import { Button } from "@lms/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lms/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@lms/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@lms/components/ui/tabs"
import { Input } from "@lms/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@lms/components/ui/select"

const subjects = [
  {
    id: 1,
    name: "Mathematics",
    code: "MATH101",
    teacher: "Ms. Johnson",
    grade: "10",
    students: 32,
    hoursPerWeek: 5,
    status: "Active",
    description: "Advanced algebra and geometry"
  },
  {
    id: 2,
    name: "English Literature",
    code: "ENG201",
    teacher: "Mr. Smith",
    grade: "11",
    students: 28,
    hoursPerWeek: 4,
    status: "Active",
    description: "Classical and modern literature"
  },
  {
    id: 3,
    name: "Physics",
    code: "PHY301",
    teacher: "Dr. Brown",
    grade: "12",
    students: 25,
    hoursPerWeek: 6,
    status: "Active",
    description: "Mechanics and thermodynamics"
  },
  {
    id: 4,
    name: "Chemistry",
    code: "CHEM201",
    teacher: "Prof. Davis",
    grade: "11",
    students: 30,
    hoursPerWeek: 5,
    status: "Active",
    description: "Organic and inorganic chemistry"
  },
  {
    id: 5,
    name: "History",
    code: "HIST101",
    teacher: "Ms. Wilson",
    grade: "10",
    students: 35,
    hoursPerWeek: 3,
    status: "Inactive",
    description: "World history and civilizations"
  }
]

const grades = ["All Grades", "Grade 9", "Grade 10", "Grade 11", "Grade 12"]
const statusOptions = ["All Status", "Active", "Inactive"]

export function Subjects() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGrade, setSelectedGrade] = useState("All Grades")
  const [selectedStatus, setSelectedStatus] = useState("All Status")

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGrade = selectedGrade === "All Grades" || subject.grade === selectedGrade.split(" ")[1]
    const matchesStatus = selectedStatus === "All Status" || subject.status === selectedStatus
    
    return matchesSearch && matchesGrade && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Subject Management</h1>
          <p className="text-muted-foreground">
            Manage subjects, curricula, and teaching assignments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Book className="mr-2 h-4 w-4" />
            Import Curriculum
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Subject
          </Button>
        </div>
      </div>

      <Tabs defaultValue="subjects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="subjects">All Subjects</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="assignments">Teacher Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Subject List</CardTitle>
                  <CardDescription>
                    Manage all subjects across different grades
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <Input
                    placeholder="Search subjects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                  <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Hours/Week</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubjects.map((subject) => (
                    <TableRow key={subject.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{subject.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {subject.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{subject.code}</Badge>
                      </TableCell>
                      <TableCell>{subject.teacher}</TableCell>
                      <TableCell>Grade {subject.grade}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {subject.students}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {subject.hoursPerWeek}h
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={subject.status === "Active" ? "default" : "secondary"}
                        >
                          {subject.status}
                        </Badge>
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

        <TabsContent value="curriculum" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Curriculum Management</CardTitle>
              <CardDescription>
                Define learning objectives and course content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Curriculum management coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Assignments</CardTitle>
              <CardDescription>
                Assign teachers to subjects and manage workloads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Teacher assignment management coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 