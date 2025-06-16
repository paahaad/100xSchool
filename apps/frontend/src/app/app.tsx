import { useState } from "react"
import { AppSidebar } from "@lms/components/app-sidebar"
import { DashboardCards } from "@lms/components/dashboard-cards"
import { StudentManagement } from "@lms/components/student-management"
import { CourseManagement } from "@lms/components/course-management"
import { TeacherPanel } from "@lms/components/teacher-panel"
import { AssessmentExams } from "@lms/components/assessment-exams"
import { FeeManagement } from "@lms/components/fee-management"
import { ReportsAnalytics } from "@lms/components/reports-analytics"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@lms/components/ui/breadcrumb"
import { Separator } from "@lms/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@lms/components/ui/sidebar"
import { Button } from "@lms/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@lms/components/ui/select"

import { StudentDashboard } from "@lms/components/student-dashboard"
import { StudentCourses } from "@lms/components/student-courses"
import { StudentAssignments } from "@lms/components/student-assignments"
import { StudentExams } from "@lms/components/student-exams"
import { StudentAttendance } from "@lms/components/student-attendance"

export default function App() {
  const [userRole, setUserRole] = useState<"admin" | "teacher" | "student" | "parent">("admin")
  const [currentView, setCurrentView] = useState("dashboard")

  const renderContent = () => {
    switch (currentView) {
      case "students":
        return <StudentManagement />
      case "courses":
        return userRole === "student" ? <StudentCourses /> : <CourseManagement />
      case "teacher-panel":
        return <TeacherPanel />
      case "assessments":
        return userRole === "student" ? <StudentExams /> : <AssessmentExams />
      case "fees":
        return <FeeManagement />
      case "reports":
        return <ReportsAnalytics />
      case "assignments":
        return <StudentAssignments />
      case "attendance":
        return <StudentAttendance />
      default:
        return userRole === "student" ? (
          <StudentDashboard />
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">
                  Welcome to EduManage - Your comprehensive school management system
                </p>
              </div>
            </div>
            <DashboardCards userRole={userRole} />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="col-span-2 lg:col-span-2">
                <div className="h-[400px] rounded-lg border bg-muted/50 p-4">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New student admission</p>
                        <p className="text-xs text-muted-foreground">Alice Johnson joined Grade 10-A</p>
                      </div>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Fee payment received</p>
                        <p className="text-xs text-muted-foreground">₹21,700 from Bob Smith</p>
                      </div>
                      <span className="text-xs text-muted-foreground">4 hours ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Assignment submitted</p>
                        <p className="text-xs text-muted-foreground">Math homework by Grade 10-A</p>
                      </div>
                      <span className="text-xs text-muted-foreground">6 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="h-[400px] rounded-lg border bg-muted/50 p-4">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => setCurrentView("students")}
                    >
                      Add New Student
                    </Button>
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => setCurrentView("courses")}
                    >
                      Create Course
                    </Button>
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => setCurrentView("assessments")}
                    >
                      Schedule Exam
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={() => setCurrentView("fees")}>
                      Manage Fees
                    </Button>
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => setCurrentView("reports")}
                    >
                      View Reports
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  const getBreadcrumbTitle = () => {
    switch (currentView) {
      case "students":
        return "Student Management"
      case "courses":
        return "Course Management"
      case "teacher-panel":
        return "Teacher Panel"
      case "assessments":
        return "Assessment & Exams"
      case "fees":
        return "Fee Management"
      case "reports":
        return "Reports & Analytics"
      default:
        return "Dashboard"
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar userRole={userRole} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#" onClick={() => setCurrentView("dashboard")}>
                  EduManage
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{getBreadcrumbTitle()}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center gap-2">
            <Select
              value={userRole}
              onValueChange={(value: "admin" | "teacher" | "student" | "parent") => setUserRole(value)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin View</SelectItem>
                <SelectItem value="teacher">Teacher View</SelectItem>
                <SelectItem value="student">Student View</SelectItem>
                <SelectItem value="parent">Parent View</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{renderContent()}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
