import { useState } from "react"
import { Plus, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import { Badge } from "@lms/components/ui/badge"
import { Button } from "@lms/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lms/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@lms/components/ui/select"

const events = [
  { id: 1, title: "First Day of School", date: "2024-01-15", type: "academic", color: "bg-blue-500" },
  { id: 2, title: "Mid-term Exams", date: "2024-02-20", type: "exam", color: "bg-red-500" },
  { id: 3, title: "Spring Break", date: "2024-03-25", type: "holiday", color: "bg-green-500" },
  { id: 4, title: "Parent-Teacher Conference", date: "2024-04-10", type: "meeting", color: "bg-purple-500" },
  { id: 5, title: "Final Exams", date: "2024-05-15", type: "exam", color: "bg-red-500" },
  { id: 6, title: "Graduation Ceremony", date: "2024-06-01", type: "ceremony", color: "bg-yellow-500" },
]

export function AcademicCalendar() {
  const [selectedView, setSelectedView] = useState("month")
  const [selectedFilter, setSelectedFilter] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Academic Calendar</h1>
          <p className="text-muted-foreground">
            Manage important dates and academic events
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter events" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="exam">Exams</SelectItem>
              <SelectItem value="holiday">Holidays</SelectItem>
              <SelectItem value="meeting">Meetings</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            View Options
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>January 2024</CardTitle>
                  <CardDescription>Academic calendar overview</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Select value={selectedView} onValueChange={setSelectedView}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Month</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                      <SelectItem value="day">Day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <div key={day} className="aspect-square p-2 text-center text-sm border rounded-lg hover:bg-accent cursor-pointer">
                    <div className="font-medium">{day}</div>
                    {day === 15 && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1"></div>
                    )}
                    {day === 20 && (
                      <div className="w-2 h-2 bg-red-500 rounded-full mx-auto mt-1"></div>
                    )}
                    {day === 25 && (
                      <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-1"></div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Next academic events and deadlines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.slice(0, 6).map((event) => (
                <div key={event.id} className="flex items-start gap-3">
                  <div className={`w-3 h-3 rounded-full ${event.color} mt-1.5 flex-shrink-0`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{event.title}</div>
                    <div className="text-xs text-muted-foreground">{event.date}</div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {event.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Events</span>
                <span className="font-medium">{events.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">This Month</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Exams</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Holidays</span>
                <span className="font-medium">2</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 