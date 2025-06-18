import { DashboardCards } from "@lms/components/dashboard-cards"
import { Button } from "@lms/components/ui/button"

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome to 100xSchool - Your comprehensive school management system
          </p>
        </div>
      </div>
      <DashboardCards userRole="admin" />
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
              <Button className="w-full justify-start" variant="outline">
                Add New Student
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Create Course
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Schedule Exam
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Manage Fees
              </Button>
              <Button className="w-full justify-start" variant="outline">
                View Reports
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 