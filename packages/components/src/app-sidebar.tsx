import type * as React from "react"
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
    url: "#",
    icon: Home,
  },
  {
    title: "User Management",
    icon: Users,
    items: [
      { title: "All Users", url: "#users" },
      { title: "Roles & Permissions", url: "#roles" },
      { title: "Add New User", url: "#add-user" },
    ],
  },
  {
    title: "Academic Management",
    icon: BookOpen,
    items: [
      { title: "Classes & Grades", url: "#classes" },
      { title: "Subjects", url: "#subjects" },
      { title: "Timetable", url: "#timetable" },
      { title: "Academic Calendar", url: "#calendar" },
    ],
  },
  {
    title: "Student Management",
    icon: GraduationCap,
    items: [
      { title: "All Students", url: "#students" },
      { title: "Admissions", url: "#admissions" },
      { title: "Student Profiles", url: "#student-profiles" },
      { title: "Promotions", url: "#promotions" },
    ],
  },
  {
    title: "Teacher Management",
    icon: UserCheck,
    items: [
      { title: "All Teachers", url: "#teachers" },
      { title: "Teacher Assignments", url: "#teacher-assignments" },
      { title: "Performance", url: "#teacher-performance" },
    ],
  },
  {
    title: "Assessments",
    icon: ClipboardList,
    items: [
      { title: "Exam Management", url: "#exams" },
      { title: "Quiz Engine", url: "#quizzes" },
      { title: "Grading", url: "#grading" },
      { title: "Results", url: "#results" },
    ],
  },
  {
    title: "Fee Management",
    icon: DollarSign,
    items: [
      { title: "Fee Structure", url: "#fee-structure" },
      { title: "Payments", url: "#payments" },
      { title: "Invoices", url: "#invoices" },
      { title: "Scholarships", url: "#scholarships" },
    ],
  },
  {
    title: "Reports & Analytics",
    icon: BarChart3,
    items: [
      { title: "Attendance Reports", url: "#attendance-reports" },
      { title: "Academic Reports", url: "#academic-reports" },
      { title: "Financial Reports", url: "#financial-reports" },
      { title: "Performance Analytics", url: "#analytics" },
    ],
  },
]

const teacherNavigation = [
  {
    title: "Dashboard",
    url: "#teacher-dashboard",
    icon: Home,
  },
  {
    title: "My Classes",
    icon: BookOpen,
    items: [
      { title: "Class Schedule", url: "#schedule" },
      { title: "Attendance", url: "#attendance" },
      { title: "Class Materials", url: "#materials" },
    ],
  },
  {
    title: "Students",
    icon: GraduationCap,
    items: [
      { title: "My Students", url: "#my-students" },
      { title: "Student Performance", url: "#student-performance" },
    ],
  },
  {
    title: "Assignments",
    icon: FileText,
    items: [
      { title: "Create Assignment", url: "#create-assignment" },
      { title: "Grade Assignments", url: "#grade-assignments" },
      { title: "Assignment History", url: "#assignment-history" },
    ],
  },
  {
    title: "Assessments",
    icon: ClipboardList,
    items: [
      { title: "Create Exam", url: "#create-exam" },
      { title: "Grade Exams", url: "#grade-exams" },
      { title: "Results", url: "#exam-results" },
    ],
  },
]

const studentNavigation = [
  {
    title: "Dashboard",
    url: "#student-dashboard",
    icon: Home,
  },
  {
    title: "My Courses",
    icon: BookOpen,
    items: [
      { title: "All Courses", url: "#courses" },
      { title: "Course Materials", url: "#course-materials" },
      { title: "Timetable", url: "#my-timetable" },
    ],
  },
  {
    title: "Assignments",
    icon: FileText,
    items: [
      { title: "Pending", url: "#pending-assignments" },
      { title: "Submitted", url: "#submitted-assignments" },
      { title: "Graded", url: "#graded-assignments" },
    ],
  },
  {
    title: "Exams & Quizzes",
    icon: ClipboardList,
    items: [
      { title: "Upcoming Exams", url: "#upcoming-exams" },
      { title: "Take Quiz", url: "#take-quiz" },
      { title: "Results", url: "#my-results" },
      { title: "Exam Schedule", url: "#exam-schedule" },
    ],
  },
  {
    title: "Attendance",
    url: "#my-attendance",
    icon: Calendar,
  },
  {
    title: "Grades & Results",
    icon: BarChart3,
    items: [
      { title: "Current Grades", url: "#current-grades" },
      { title: "Report Cards", url: "#report-cards" },
      { title: "Progress Tracking", url: "#progress-tracking" },
    ],
  },
  {
    title: "Fees",
    icon: CreditCard,
    items: [
      { title: "Fee Status", url: "#fee-status" },
      { title: "Payment History", url: "#payment-history" },
      { title: "Make Payment", url: "#make-payment" },
    ],
  },
  {
    title: "Profile",
    url: "#student-profile",
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
            <GraduationCap className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">EduManage</span>
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
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    )}
                  </SidebarMenuButton>
                  {item.items && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
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
