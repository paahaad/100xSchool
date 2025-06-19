import { useState, useContext } from "react"
import { Outlet, useLocation, Link, useNavigate } from "react-router-dom"
import { AppSidebar } from "@lms/components/app-sidebar"
import { ThemeToggle } from "@lms/components/theme-toggle"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@lms/components/ui/select"
import { AuthContext } from "../contexts/auth.context"
import { authService } from "../services/auth.service"

export function Layout() {
  const [userRole, setUserRole] = useState<"admin" | "teacher" | "student" | "parent">("admin")
  const location = useLocation()
  const navigate = useNavigate()
  const { setToken } = useContext(AuthContext)

  const handleLogout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear auth context and navigate to login
      setToken(null)
      navigate('/login', { replace: true })
    }
  }

  const getBreadcrumbTitle = () => {
    const path = location.pathname
    if (path.includes('/user')) return 'User Management'
    if (path.includes('/academic')) return 'Academic Management'
    if (path.includes('/students')) return 'Student Management'
    if (path.includes('/teachers')) return 'Teacher Management'
    if (path.includes('/assessments')) return 'Assessment & Exams'
    if (path.includes('/fees')) return 'Fee Management'
    if (path.includes('/reports')) return 'Reports & Analytics'
    return 'Dashboard'
  }

  return (
    <SidebarProvider>
      <AppSidebar userRole={userRole} onLogout={handleLogout} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                  <Link to="/">100xSchool</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{getBreadcrumbTitle()}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
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
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 