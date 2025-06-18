import type * as React from "react"
import { Link } from "react-router-dom"
import {
  BookOpen,
  Calendar,
  ChevronRight,
  CreditCard,
  FileText,
  GraduationCap,
  Home,
  Settings,
  Users,
  UserCheck,
  ClipboardList,
  DollarSign,
  BarChart3,
  Bell,
  LogOut,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "./ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

// Navigation data based on user roles
const adminNavigation = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "User Management",
    icon: Users,
    items: [
      { title: "All Users", url: "/user/all-users" },
      { title: "Roles & Permissions", url: "/user/permissions" },
      { title: "Add New User", url: "/user/add-user" },
    ],
  },
  {
    title: "Academic Management",
    icon: BookOpen,
    items: [
      { title: "Classes & Grades", url: "/academic/classes" },
      { title: "Subjects", url: "/academic/subjects" },
      { title: "Timetable", url: "/academic/timetable" },
      { title: "Academic Calendar", url: "/academic/calendar" },
    ],
  },
  {
    title: "Student Management",
    icon: GraduationCap,
    items: [
      { title: "All Students", url: "/students" },
      { title: "Admissions", url: "/students/admissions" },
      { title: "Student Profiles", url: "/students/profiles" },
      { title: "Promotions", url: "/students/promotions" },
    ],
  },
  {
    title: "Teacher Management",
    icon: UserCheck,
    items: [
      { title: "All Teachers", url: "/teachers" },
      { title: "Teacher Assignments", url: "/teachers/assignments" },
      { title: "Performance", url: "/teachers/performance" },
    ],
  },
  {
    title: "Course Management",
    icon: BookOpen,
    items: [
      { title: "All Courses", url: "/courses" },
      { title: "Course Materials", url: "/courses/materials" },
      { title: "Curriculum", url: "/courses/curriculum" },
    ],
  },
  {
    title: "Assessments",
    icon: ClipboardList,
    items: [
      { title: "Exam Management", url: "/assessments" },
      { title: "Quiz Engine", url: "/assessments/quizzes" },
      { title: "Grading", url: "/assessments/grading" },
      { title: "Results", url: "/assessments/results" },
    ],
  },
  {
    title: "Fee Management",
    icon: DollarSign,
    items: [
      { title: "Fee Management", url: "/fees" },
      { title: "Payments", url: "/fees/payments" },
      { title: "Invoices", url: "/fees/invoices" },
      { title: "Scholarships", url: "/fees/scholarships" },
    ],
  },
  {
    title: "Reports & Analytics",
    icon: BarChart3,
    items: [
      { title: "Reports", url: "/reports" },
      { title: "Attendance Reports", url: "/reports/attendance" },
      { title: "Academic Reports", url: "/reports/academic" },
      { title: "Financial Reports", url: "/reports/financial" },
    ],
  },
]

const teacherNavigation = [
  {
    title: "Dashboard",
    url: "/teacher",
    icon: Home,
  },
  {
    title: "My Classes",
    icon: BookOpen,
    items: [
      { title: "Class Schedule", url: "/teacher/schedule" },
      { title: "Attendance", url: "/teacher/attendance" },
      { title: "Class Materials", url: "/teacher/materials" },
    ],
  },
  {
    title: "Students",
    icon: GraduationCap,
    items: [
      { title: "My Students", url: "/teacher/students" },
      { title: "Student Performance", url: "/teacher/performance" },
    ],
  },
  {
    title: "Assignments",
    icon: FileText,
    items: [
      { title: "Create Assignment", url: "/teacher/assignments/create" },
      { title: "Grade Assignments", url: "/teacher/assignments/grade" },
      { title: "Assignment History", url: "/teacher/assignments/history" },
    ],
  },
  {
    title: "Assessments",
    icon: ClipboardList,
    items: [
      { title: "Create Exam", url: "/teacher/assessments/create" },
      { title: "Grade Exams", url: "/teacher/assessments/grade" },
      { title: "Results", url: "/teacher/assessments/results" },
    ],
  },
]

const studentNavigation = [
  {
    title: "Dashboard",
    url: "/student",
    icon: Home,
  },
  {
    title: "My Courses",
    icon: BookOpen,
    items: [
      { title: "All Courses", url: "/student/courses" },
      { title: "Course Materials", url: "/student/materials" },
      { title: "Timetable", url: "/student/timetable" },
    ],
  },
  {
    title: "Assignments",
    icon: FileText,
    items: [
      { title: "All Assignments", url: "/student/assignments" },
      { title: "Pending", url: "/student/assignments/pending" },
      { title: "Submitted", url: "/student/assignments/submitted" },
      { title: "Graded", url: "/student/assignments/graded" },
    ],
  },
  {
    title: "Exams & Quizzes",
    icon: ClipboardList,
    items: [
      { title: "All Exams", url: "/student/exams" },
      { title: "Upcoming Exams", url: "/student/exams/upcoming" },
      { title: "Take Quiz", url: "/student/exams/quiz" },
      { title: "Results", url: "/student/exams/results" },
    ],
  },
  {
    title: "Attendance",
    url: "/student/attendance",
    icon: Calendar,
  },
  {
    title: "Grades & Results",
    icon: BarChart3,
    items: [
      { title: "Current Grades", url: "/student/grades" },
      { title: "Report Cards", url: "/student/reports" },
      { title: "Progress Tracking", url: "/student/progress" },
    ],
  },
  {
    title: "Fees",
    icon: CreditCard,
    items: [
      { title: "Fee Status", url: "/student/fees" },
      { title: "Payment History", url: "/student/fees/history" },
      { title: "Make Payment", url: "/student/fees/payment" },
    ],
  },
  {
    title: "Profile",
    url: "/student/profile",
    icon: Users,
  },
]

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole?: "admin" | "teacher" | "student" | "parent"
}

export function AppSidebar({ userRole = "admin", ...props }: AppSidebarProps) {
  const getNavigation = () => {
    switch (userRole) {
      case "teacher":
        return teacherNavigation
      case "student":
        return studentNavigation
      default:
        return adminNavigation
    }
  }

  const navigation = getNavigation()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <img src="/logo.png" alt="100xSchool"></img>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">100xSchool</span>
            <span className="truncate text-xs capitalize">{userRole} Portal</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navigation.map((item) => (
              <Collapsible key={item.title} asChild defaultOpen={item.title === "Dashboard"}>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    {item.items ? (
                      <CollapsibleTrigger className="w-full">
                        <item.icon />
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </CollapsibleTrigger>
                    ) : (
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                  {item.items && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link to={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback className="rounded-lg">
                      {userRole === "admin" ? "AD" : userRole === "teacher" ? "TC" : "ST"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {userRole === "admin" ? "Admin User" : userRole === "teacher" ? "John Teacher" : "Jane Student"}
                    </span>
                    <span className="truncate text-xs capitalize">{userRole}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src="/placeholder-user.jpg" alt="User" />
                      <AvatarFallback className="rounded-lg">
                        {userRole === "admin" ? "AD" : userRole === "teacher" ? "TC" : "ST"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {userRole === "admin" ? "Admin User" : userRole === "teacher" ? "John Teacher" : "Jane Student"}
                      </span>
                      <span className="truncate text-xs capitalize">{userRole}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
