import { useState } from "react"
import { Download, FileText, Video, Link, Filter, BookOpen, Eye } from "lucide-react"
import { Badge } from "@lms/components/ui/badge"
import { Button } from "@lms/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lms/components/ui/card"
import { Input } from "@lms/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@lms/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@lms/components/ui/tabs"

const materials = [
  {
    id: 1,
    title: "Data Structures and Algorithms - Lecture Notes",
    course: "Computer Science",
    type: "pdf",
    size: "2.4 MB",
    uploadDate: "2024-01-15",
    downloads: 45,
    description: "Comprehensive notes on arrays, linked lists, trees, and graph algorithms"
  },
  {
    id: 2,
    title: "Calculus II Video Lectures",
    course: "Mathematics",
    type: "video",
    size: "1.2 GB",
    uploadDate: "2024-01-12",
    downloads: 32,
    description: "Series of video lectures covering integration techniques and applications"
  },
  {
    id: 3,
    title: "Organic Chemistry Lab Manual",
    course: "Chemistry",
    type: "pdf",
    size: "15.8 MB",
    uploadDate: "2024-01-10",
    downloads: 28,
    description: "Complete lab procedures and safety guidelines for organic chemistry experiments"
  },
  {
    id: 4,
    title: "Macroeconomics Case Studies",
    course: "Economics",
    type: "document",
    size: "3.1 MB",
    uploadDate: "2024-01-08",
    downloads: 21,
    description: "Real-world case studies analyzing economic policies and market behaviors"
  },
  {
    id: 5,
    title: "Shakespeare's Hamlet - Analysis",
    course: "English Literature",
    type: "pdf",
    size: "1.8 MB",
    uploadDate: "2024-01-05",
    downloads: 38,
    description: "Detailed character analysis and thematic interpretation of Hamlet"
  },
  {
    id: 6,
    title: "Quantum Mechanics Problem Sets",
    course: "Physics", 
    type: "pdf",
    size: "4.2 MB",
    uploadDate: "2024-01-03",
    downloads: 17,
    description: "Practice problems with solutions for quantum mechanics concepts"
  },
  {
    id: 7,
    title: "Business Strategy Framework",
    course: "Business Administration",
    type: "presentation",
    size: "8.7 MB",
    uploadDate: "2024-01-01",
    downloads: 29,
    description: "Strategic planning frameworks and competitive analysis tools"
  },
  {
    id: 8,
    title: "Cognitive Psychology Research Papers",
    course: "Psychology",
    type: "link",
    size: "N/A",
    uploadDate: "2023-12-28",
    downloads: 15,
    description: "Collection of recent research papers on memory and learning processes"
  }
]

const courses = ["All Courses", "Computer Science", "Mathematics", "Chemistry", "Economics", "English Literature", "Physics", "Business Administration", "Psychology"]
const materialTypes = ["All Types", "PDF", "Video", "Document", "Presentation", "Link"]

export function StudentMaterials() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("All Courses")
  const [selectedType, setSelectedType] = useState("All Types")

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = selectedCourse === "All Courses" || material.course === selectedCourse
    const matchesType = selectedType === "All Types" || material.type.toLowerCase() === selectedType.toLowerCase()
    
    return matchesSearch && matchesCourse && matchesType
  })

  const getFileIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="h-5 w-5 text-blue-500" />
      case "pdf": return <FileText className="h-5 w-5 text-red-500" />
      case "link": return <Link className="h-5 w-5 text-green-500" />
      default: return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const recentMaterials = materials.slice(0, 4)
  const favoritesMaterials = materials.filter(m => m.downloads > 30)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Course Materials</h1>
          <p className="text-muted-foreground">
            Access all your course materials and resources
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filter
          </Button>
          <Button variant="outline">
            <BookOpen className="mr-2 h-4 w-4" />
            Reading List
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Materials</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
          <TabsTrigger value="favorites">Most Downloaded</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Course Materials</CardTitle>
                  <CardDescription>
                    Browse and download materials from all your courses
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <Input
                    placeholder="Search materials..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {materialTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {filteredMaterials.map((material) => (
                  <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50">
                    <div className="flex items-start gap-4">
                      {getFileIcon(material.type)}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm">{material.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{material.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="outline">{material.course}</Badge>
                          <span className="text-xs text-muted-foreground">{material.size}</span>
                          <span className="text-xs text-muted-foreground">{material.uploadDate}</span>
                          <span className="text-xs text-muted-foreground">{material.downloads} downloads</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Added Materials</CardTitle>
              <CardDescription>Latest materials uploaded by your instructors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {recentMaterials.map((material) => (
                  <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50">
                    <div className="flex items-start gap-4">
                      {getFileIcon(material.type)}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm">{material.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{material.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="outline">{material.course}</Badge>
                          <span className="text-xs text-muted-foreground">{material.size}</span>
                          <span className="text-xs text-muted-foreground">{material.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Most Downloaded Materials</CardTitle>
              <CardDescription>Popular materials among students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {favoritesMaterials.map((material) => (
                  <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50">
                    <div className="flex items-start gap-4">
                      {getFileIcon(material.type)}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm">{material.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{material.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="outline">{material.course}</Badge>
                          <span className="text-xs text-muted-foreground">{material.size}</span>
                          <span className="text-xs text-muted-foreground">{material.downloads} downloads</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
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