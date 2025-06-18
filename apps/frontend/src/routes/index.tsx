
import { Routes, Route, Navigate } from "react-router-dom"
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
import { Dashboard } from "./dashboard"
import { Layout } from "./layout"

import { AllUsers, RolesPermissions, AddUser, ClassesGrades } from "@lms/components"

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Dashboard */}
        <Route index element={<Dashboard />} />
        
        {/* User Management Routes */}
        <Route path="user">
          <Route index element={<Navigate to="all-users" replace />} />
          <Route path="all-users" element={<AllUsers />} />
          <Route path="permissions" element={<RolesPermissions />} />
          <Route path="add-user" element={<AddUser />} />
        </Route>
        
        {/* Academic Management Routes */}
        <Route path="academic">
          <Route index element={<Navigate to="classes" replace />} />
          <Route path="classes" element={<ClassesGrades />} />
        </Route>
        
        {/* Student Management Routes */}
        <Route path="students">
          <Route index element={<StudentManagement />} />
        </Route>
        
        {/* Teacher Management Routes */}
        <Route path="teachers">
          <Route index element={<TeacherPanel />} />
        </Route>
        
        {/* Course Management Routes */}
        <Route path="courses">
          <Route index element={<CourseManagement />} />
        </Route>
        
        {/* Assessment Routes */}
        <Route path="assessments">
          <Route index element={<AssessmentExams />} />
        </Route>
        
        {/* Fee Management Routes */}
        <Route path="fees">
          <Route index element={<FeeManagement />} />
        </Route>
        
        {/* Reports Routes */}
        <Route path="reports">
          <Route index element={<ReportsAnalytics />} />
        </Route>
        
        {/* Student Portal Routes */}
        <Route path="student">
          <Route index element={<StudentDashboard />} />
          <Route path="courses" element={<StudentCourses />} />
          <Route path="assignments" element={<StudentAssignments />} />
          <Route path="exams" element={<StudentExams />} />
          <Route path="attendance" element={<StudentAttendance />} />
        </Route>
      </Route>
    </Routes>
  )
}
