import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Plus, Edit, Trash2, Users, BookOpen } from "lucide-react"

export function ClassesGrades() {
  const [searchTerm, setSearchTerm] = useState("")

  const classes = [
    { id: 1, name: "Grade 1-A", students: 28, subjects: 5, teacher: "Ms. Johnson" },
    { id: 2, name: "Grade 1-B", students: 25, subjects: 5, teacher: "Mr. Brown" },
    { id: 3, name: "Grade 2-A", students: 30, subjects: 6, teacher: "Ms. Davis" },
    { id: 4, name: "Grade 2-B", students: 27, subjects: 6, teacher: "Mr. Wilson" },
    { id: 5, name: "Grade 3-A", students: 32, subjects: 7, teacher: "Ms. Taylor" },
  ]

  const grades = [
    { id: 1, name: "Grade 1", totalClasses: 2, totalStudents: 53, ageRange: "6-7 years" },
    { id: 2, name: "Grade 2", totalClasses: 2, totalStudents: 57, ageRange: "7-8 years" },
    { id: 3, name: "Grade 3", totalClasses: 1, totalStudents: 32, ageRange: "8-9 years" },
    { id: 4, name: "Grade 4", totalClasses: 2, totalStudents: 60, ageRange: "9-10 years" },
    { id: 5, name: "Grade 5", totalClasses: 2, totalStudents: 58, ageRange: "10-11 years" },
  ]

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredGrades = grades.filter(grade =>
    grade.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Classes & Grades</h2>
          <p className="text-muted-foreground">
            Manage academic classes and grade levels
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Class
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search classes or teachers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Tabs defaultValue="classes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="grades">Grade Levels</TabsTrigger>
        </TabsList>

        <TabsContent value="classes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredClasses.map((cls) => (
              <Card key={cls.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{cls.name}</CardTitle>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    Class Teacher: {cls.teacher}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{cls.students} Students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>{cls.subjects} Subjects</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="grades" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Grade Levels Overview</CardTitle>
              <CardDescription>
                Summary of all grade levels in the school
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Grade Level</TableHead>
                    <TableHead>Total Classes</TableHead>
                    <TableHead>Total Students</TableHead>
                    <TableHead>Age Range</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGrades.map((grade) => (
                    <TableRow key={grade.id}>
                      <TableCell className="font-medium">{grade.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{grade.totalClasses}</Badge>
                      </TableCell>
                      <TableCell>{grade.totalStudents}</TableCell>
                      <TableCell>{grade.ageRange}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
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
      </Tabs>
    </div>
  )
} 