import { useState } from "react"
import { User, Mail, Phone, MapPin, Calendar, GraduationCap, Edit, Save } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@lms/components/ui/avatar"
import { Badge } from "@lms/components/ui/badge"
import { Button } from "@lms/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lms/components/ui/card"
import { Input } from "@lms/components/ui/input"
import { Label } from "@lms/components/ui/label"
import { Separator } from "@lms/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@lms/components/ui/tabs"
import { Textarea } from "@lms/components/ui/textarea"

const studentData = {
  personalInfo: {
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1998-08-15",
    address: "123 University Ave, College Town, CA 90210",
    emergencyContact: {
      name: "Sarah Johnson",
      relationship: "Mother",
      phone: "+1 (555) 987-6543"
    }
  },
  academicInfo: {
    studentId: "CS2022001",
    major: "Computer Science",
    secondMajor: "Mathematics",
    year: "Junior",
    gpa: 3.75,
    expectedGraduation: "May 2025",
    advisor: "Dr. Sarah Chen",
    status: "Active"
  },
  enrolledCourses: [
    { code: "CS-301", name: "Data Structures & Algorithms", credits: 4, semester: "Fall 2024" },
    { code: "MATH-201", name: "Calculus II", credits: 3, semester: "Fall 2024" },
    { code: "CHEM-301", name: "Organic Chemistry", credits: 4, semester: "Fall 2024" },
    { code: "ENG-302", name: "English Literature", credits: 3, semester: "Fall 2024" },
    { code: "ECON-201", name: "Microeconomics", credits: 3, semester: "Fall 2024" }
  ],
  achievements: [
    { title: "Dean's List", semester: "Spring 2024", description: "GPA above 3.5" },
    { title: "Programming Contest Winner", date: "March 2024", description: "1st place in university programming contest" },
    { title: "Research Assistant", period: "2023-2024", description: "AI/ML Research Lab" }
  ]
}

export function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(studentData.personalInfo)

  const handleSave = () => {
    // Here you would typically save the data to your backend
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal and academic information
          </p>
        </div>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          variant={isEditing ? "default" : "outline"}
        >
          {isEditing ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                <AvatarFallback className="text-lg">
                  {formData.firstName[0]}{formData.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <CardTitle>
                {formData.firstName} {formData.lastName}
              </CardTitle>
              <CardDescription>
                {studentData.academicInfo.major} Student
              </CardDescription>
              <div className="flex justify-center gap-2 mt-2">
                <Badge variant="outline">{studentData.academicInfo.year}</Badge>
                <Badge variant="default">{studentData.academicInfo.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span>Student ID: {studentData.academicInfo.studentId}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Expected Graduation: {studentData.academicInfo.expectedGraduation}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Advisor: {studentData.academicInfo.advisor}</span>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Academic Standing</h4>
                <div className="text-2xl font-bold text-center">
                  {studentData.academicInfo.gpa} GPA
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="space-y-4">
            <TabsList>
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="academic">Academic Info</TabsTrigger>
              <TabsTrigger value="courses">Current Courses</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      {isEditing ? (
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        />
                      ) : (
                        <div className="p-2 text-sm">{formData.firstName}</div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      {isEditing ? (
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        />
                      ) : (
                        <div className="p-2 text-sm">{formData.lastName}</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      ) : (
                        <span className="text-sm">{formData.email}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      ) : (
                        <span className="text-sm">{formData.phone}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                      {isEditing ? (
                        <Textarea
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                        />
                      ) : (
                        <span className="text-sm">{formData.address}</span>
                      )}
                    </div>
                  </div>

                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">Emergency Contact</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Name:</strong> {formData.emergencyContact.name}</div>
                      <div><strong>Relationship:</strong> {formData.emergencyContact.relationship}</div>
                      <div><strong>Phone:</strong> {formData.emergencyContact.phone}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="academic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Information</CardTitle>
                  <CardDescription>
                    Your academic program and progress details
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Major</Label>
                    <div className="mt-1 text-sm">{studentData.academicInfo.major}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Second Major</Label>
                    <div className="mt-1 text-sm">{studentData.academicInfo.secondMajor}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Academic Year</Label>
                    <div className="mt-1 text-sm">{studentData.academicInfo.year}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Current GPA</Label>
                    <div className="mt-1 text-sm">{studentData.academicInfo.gpa}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Expected Graduation</Label>
                    <div className="mt-1 text-sm">{studentData.academicInfo.expectedGraduation}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Academic Advisor</Label>
                    <div className="mt-1 text-sm">{studentData.academicInfo.advisor}</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Courses</CardTitle>
                  <CardDescription>
                    Courses you are enrolled in this semester
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {studentData.enrolledCourses.map((course, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{course.name}</div>
                          <div className="text-sm text-muted-foreground">{course.code}</div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{course.credits} credits</Badge>
                          <div className="text-sm text-muted-foreground mt-1">{course.semester}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements & Awards</CardTitle>
                  <CardDescription>
                    Your academic achievements and recognitions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {studentData.achievements.map((achievement, index) => (
                      <div key={index} className="border-l-4 border-primary pl-4">
                        <div className="font-semibold">{achievement.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {achievement.semester || achievement.date || achievement.period}
                        </div>
                        <div className="text-sm mt-1">{achievement.description}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 