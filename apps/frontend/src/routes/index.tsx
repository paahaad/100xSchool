import { Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react"
import { StudentManagement } from "../pages/student-management"
import { CourseManagement } from "../pages/course-management"
import { TeacherPanel } from "../pages/teacher-panel"
import { AssessmentExams } from "../pages/assessment-exams"
import { FeeManagement } from "../pages/fee-management"
import { ReportsAnalytics } from "../pages/reports-analytics"
import { StudentDashboard } from "../pages/student-dashboard"
import { StudentCourses } from "../pages/student-courses"
import { StudentAssignments } from "../pages/student-assignments"
import { StudentExams } from "../pages/student-exams"
import { StudentAttendance } from "../pages/student-attendance"
import { StudentMaterials } from "../pages/student-materials"
import { StudentTimetable } from "../pages/student-timetable"
import { StudentGrades } from "../pages/student-grades"
import { StudentProfile } from "../pages/student-profile"
import { StudentFees } from "../pages/student-fees"
import { Timetable } from "../pages/timetable"
import { AcademicCalendar } from "../pages/academic-calendar"
import { Subjects } from "../pages/subjects"
import { Login } from "../pages/login"
import { Dashboard } from "./dashboard"
import { Layout } from "./layout"
import { AuthContext } from "../contexts/auth.context"

import { AllUsers, RolesPermissions, AddUser, ClassesGrades } from "@lms/components"

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useContext(AuthContext);
  
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useContext(AuthContext);
  
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
}

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      
      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        {/* Dashboard */}
        <Route index element={<Dashboard />} />
        
        {/* User Management Routes */}
        <Route path="/user">
          <Route index element={<Navigate to="/all-users" replace />} />
          <Route path="all-users" element={<AllUsers />} />
          <Route path="permissions" element={<RolesPermissions />} />
          <Route path="add-user" element={<AddUser />} />
        </Route>
        
        {/* Academic Management Routes */}
        <Route path="/academic">
          <Route index element={<Navigate to="classes" replace />} />
          <Route path="classes" element={<ClassesGrades />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="calendar" element={<AcademicCalendar />} />
        </Route>
        
        {/* Student Management Routes */}
        <Route path="/students">
          <Route index element={<StudentManagement />} />
        </Route>
        
        {/* Teacher Management Routes */}
        <Route path="/teachers">
          <Route index element={<TeacherPanel />} />
        </Route>
        
        {/* Course Management Routes */}
        <Route path="/courses">
          <Route index element={<CourseManagement />} />
        </Route>
        
        {/* Assessment Routes */}
        <Route path="/assessments">
          <Route index element={<AssessmentExams />} />
        </Route>
        
        {/* Fee Management Routes */}
        <Route path="/fees">
          <Route index element={<FeeManagement />} />
        </Route>
        
        {/* Reports Routes */}
        <Route path="/reports">
          <Route index element={<ReportsAnalytics />} />
        </Route>
        
        {/* Student Portal Routes */}
        <Route path="student">
          <Route index element={<StudentDashboard />} />
          <Route path="courses" element={<StudentCourses />} />
          <Route path="materials" element={<StudentMaterials />} />
          <Route path="timetable" element={<StudentTimetable />} />
          <Route path="assignments" element={<StudentAssignments />} />
          <Route path="exams" element={<StudentExams />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="grades" element={<StudentGrades />} />
          <Route path="fees" element={<StudentFees />} />
          <Route path="profile" element={<StudentProfile />} />
        </Route>
      </Route>
      
      {/* Catch all - redirect to login if not authenticated, dashboard if authenticated */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
