import { useState } from "react"
import { TrendingUp, TrendingDown, Award, BookOpen, Calendar, Filter } from "lucide-react"
import { Badge } from "@lms/components/ui/badge"
import { Button } from "@lms/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lms/components/ui/card"
import { Progress } from "@lms/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@lms/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@lms/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@lms/components/ui/tabs"

const currentGrades = [
  {
    course: "Data Structures & Algorithms",
    code: "CS-301",
    credits: 4,
    currentGrade: "A",
    percentage: 92,
    components: {
      assignments: { score: 95, weight: 30 },
      midterm: { score: 88, weight: 25 },
      final: { score: 0, weight: 35, pending: true },
      participation: { score: 90, weight: 10 }
    },
    instructor: "Dr. Sarah Chen"
  },
  {
    course: "Calculus II",
    code: "MATH-201",
    credits: 3,
    currentGrade: "B+",
    percentage: 87,
    components: {
      assignments: { score: 85, weight: 25 },
      midterm: { score: 82, weight: 30 },
      final: { score: 0, weight: 35, pending: true },
      quizzes: { score: 90, weight: 10 }
    },
    instructor: "Prof. Michael Brown"
  },
  {
    course: "Organic Chemistry",
    code: "CHEM-301",
    credits: 4,
    currentGrade: "A-",
    percentage: 89,
    components: {
      assignments: { score: 88, weight: 20 },
      labs: { score: 92, weight: 25 },
      midterm: { score: 85, weight: 25 },
      final: { score: 0, weight: 30, pending: true }
    },
    instructor: "Prof. Lisa Anderson"
  },
  {
    course: "English Literature",
    code: "ENG-302",
    credits: 3,
    currentGrade: "A",
    percentage: 94,
    components: {
      essays: { score: 96, weight: 40 },
      presentations: { score: 90, weight: 25 },
      final: { score: 0, weight: 25, pending: true },
      participation: { score: 95, weight: 10 }
    },
    instructor: "Dr. Emily Johnson"
  },
  {
    course: "Microeconomics",
    code: "ECON-201",
    credits: 3,
    currentGrade: "B",
    percentage: 84,
    components: {
      assignments: { score: 82, weight: 30 },
      midterm: { score: 78, weight: 30 },
      final: { score: 0, weight: 30, pending: true },
      participation: { score: 90, weight: 10 }
    },
    instructor: "Dr. James Taylor"
  }
]

const semesters = ["Current Semester", "Fall 2024", "Spring 2024", "Fall 2023"]

const getGradeColor = (grade: string) => {
  if (grade.startsWith("A")) return "text-green-600 bg-green-50"
  if (grade.startsWith("B")) return "text-blue-600 bg-blue-50"
  if (grade.startsWith("C")) return "text-yellow-600 bg-yellow-50"
  if (grade.startsWith("D")) return "text-orange-600 bg-orange-50"
  return "text-red-600 bg-red-50"
}

export function StudentGrades() {
  const [selectedSemester, setSelectedSemester] = useState("Current Semester")
  const [selectedCourse, setSelectedCourse] = useState("")

  const totalCredits = currentGrades.reduce((sum, course) => sum + course.credits, 0)
  const weightedGPA = currentGrades.reduce((sum, course) => {
    const gradePoints = course.currentGrade.startsWith("A") ? 4.0 : 
                      course.currentGrade.startsWith("B") ? 3.0 : 
                      course.currentGrade.startsWith("C") ? 2.0 : 1.0
    return sum + (gradePoints * course.credits)
  }, 0) / totalCredits

  const averagePercentage = currentGrades.reduce((sum, course) => sum + course.percentage, 0) / currentGrades.length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Grades</h1>
          <p className="text-muted-foreground">
            Track your academic performance and GPA
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {semesters.map((semester) => (
                <SelectItem key={semester} value={semester}>
                  {semester}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weightedGPA.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +0.2 from last semester
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averagePercentage.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Across {currentGrades.length} courses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credits</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCredits}</div>
            <p className="text-xs text-muted-foreground">
              This semester
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12/156</div>
            <p className="text-xs text-muted-foreground">
              Top 8% of class
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Grades</TabsTrigger>
          <TabsTrigger value="breakdown">Grade Breakdown</TabsTrigger>
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Grades</CardTitle>
              <CardDescription>
                Your current grades and performance in each course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Current Grade</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Instructor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentGrades.map((course, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{course.course}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{course.code}</Badge>
                      </TableCell>
                      <TableCell>{course.credits}</TableCell>
                      <TableCell>
                        <Badge className={getGradeColor(course.currentGrade)}>
                          {course.currentGrade}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{course.percentage}%</span>
                          <Progress value={course.percentage} className="w-20" />
                        </div>
                      </TableCell>
                      <TableCell>{course.instructor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-4">
          <div className="grid gap-4">
            {currentGrades.map((course, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{course.course}</CardTitle>
                      <CardDescription>{course.code} • {course.instructor}</CardDescription>
                    </div>
                    <Badge className={getGradeColor(course.currentGrade)}>
                      {course.currentGrade} ({course.percentage}%)
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(course.components).map(([component, data]) => (
                      <div key={component} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium capitalize">{component}</span>
                          <span className="text-sm text-muted-foreground">{data.weight}%</span>
                        </div>
                        {data.pending ? (
                          <div className="text-sm text-muted-foreground">Pending</div>
                        ) : (
                          <div className="space-y-1">
                            <div className="text-lg font-semibold">{data.score}%</div>
                            <Progress value={data.score} className="h-2" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>
                Your academic performance over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Performance trend chart will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 