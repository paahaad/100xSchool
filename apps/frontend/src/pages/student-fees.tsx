import { useState } from "react"
import { CreditCard, Download, AlertCircle, CheckCircle, Clock, DollarSign, Calendar, Calculator } from "lucide-react"
import { Alert, AlertDescription } from "@lms/components/ui/alert"
import { Badge } from "@lms/components/ui/badge"
import { Button } from "@lms/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lms/components/ui/card"
import { Progress } from "@lms/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@lms/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@lms/components/ui/tabs"

const feeStructure = {
  tuition: 18500,
  housing: 8200,
  mealPlan: 4800,
  technology: 450,
  recreation: 150,
  parking: 300,
  health: 200,
  total: 32600
}

const paymentSchedule = [
  {
    semester: "Fall 2024",
    dueDate: "2024-08-15",
    amount: 16300,
    status: "Paid",
    paidDate: "2024-08-10",
    method: "Bank Transfer"
  },
  {
    semester: "Spring 2025",
    dueDate: "2025-01-15",
    amount: 16300,
    status: "Pending",
    paidDate: null,
    method: null
  }
]

const paymentHistory = [
  {
    id: "PAY001",
    date: "2024-08-10",
    description: "Fall 2024 Tuition & Fees",
    amount: 16300,
    method: "Bank Transfer",
    status: "Completed",
    reference: "BT-2024-08-001"
  },
  {
    id: "PAY002",
    date: "2024-05-15",
    description: "Spring 2024 Tuition & Fees",
    amount: 16300,
    method: "Credit Card",
    status: "Completed",
    reference: "CC-2024-05-002"
  },
  {
    id: "PAY003",
    date: "2024-01-12",
    description: "Fall 2023 Tuition & Fees",
    amount: 15800,
    method: "Financial Aid",
    status: "Completed",
    reference: "FA-2024-01-003"
  }
]

const scholarships = [
  {
    name: "Merit Scholarship",
    amount: 5000,
    type: "Academic",
    semester: "Fall 2024 - Spring 2025",
    status: "Active"
  },
  {
    name: "Need-Based Grant",
    amount: 3000,
    type: "Financial Aid",
    semester: "Fall 2024 - Spring 2025",
    status: "Active"
  }
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid":
    case "completed":
      return "text-green-600 bg-green-50"
    case "pending":
      return "text-yellow-600 bg-yellow-50"
    case "overdue":
      return "text-red-600 bg-red-50"
    default:
      return "text-gray-600 bg-gray-50"
  }
}

export function StudentFees() {
  const [selectedSemester, setSelectedSemester] = useState("Fall 2024")

  const totalPaid = paymentHistory.reduce((sum, payment) => 
    payment.status === "Completed" ? sum + payment.amount : sum, 0
  )
  
  const pendingAmount = paymentSchedule
    .filter(payment => payment.status === "Pending")
    .reduce((sum, payment) => sum + payment.amount, 0)

  const scholarshipTotal = scholarships.reduce((sum, scholarship) => sum + scholarship.amount, 0)
  const netAmount = feeStructure.total - scholarshipTotal

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Fee Management</h1>
          <p className="text-muted-foreground">
            Manage your tuition fees, payments, and financial aid
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Statement
          </Button>
          <Button>
            <CreditCard className="mr-2 h-4 w-4" />
            Make Payment
          </Button>
        </div>
      </div>

      {pendingAmount > 0 && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            You have a pending payment of <strong>${pendingAmount.toLocaleString()}</strong> due on January 15, 2025.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${feeStructure.total.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Academic Year 2024-25
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scholarships</CardTitle>
            <Badge className="h-4 w-4 rounded-full bg-green-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">-${scholarshipTotal.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {scholarships.length} active scholarships
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Amount</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${netAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              After scholarships
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">${pendingAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Due January 15, 2025
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Fee Overview</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
          <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
          <TabsTrigger value="schedule">Payment Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fee Breakdown</CardTitle>
                <CardDescription>
                  Detailed breakdown of your fees for Academic Year 2024-25
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tuition</span>
                    <span className="font-medium">${feeStructure.tuition.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Housing</span>
                    <span className="font-medium">${feeStructure.housing.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Meal Plan</span>
                    <span className="font-medium">${feeStructure.mealPlan.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Technology Fee</span>
                    <span className="font-medium">${feeStructure.technology.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Recreation Fee</span>
                    <span className="font-medium">${feeStructure.recreation.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Parking</span>
                    <span className="font-medium">${feeStructure.parking.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Health Services</span>
                    <span className="font-medium">${feeStructure.health.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex items-center justify-between font-semibold">
                      <span>Total</span>
                      <span>${feeStructure.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Progress</CardTitle>
                <CardDescription>
                  Your payment progress for the current academic year
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Paid</span>
                    <span>${totalPaid.toLocaleString()}</span>
                  </div>
                  <Progress value={(totalPaid / netAmount) * 100} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {Math.round((totalPaid / netAmount) * 100)}% of net amount paid
                  </div>
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Fall 2024 - Paid</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span>Spring 2025 - Due Jan 15, 2025</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                All your previous payments and transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell className="font-medium">{payment.description}</TableCell>
                      <TableCell>${payment.amount.toLocaleString()}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{payment.reference}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scholarships" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scholarships & Financial Aid</CardTitle>
              <CardDescription>
                Your active scholarships and financial assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scholarships.map((scholarship, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{scholarship.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {scholarship.type} • {scholarship.semester}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">
                        ${scholarship.amount.toLocaleString()}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {scholarship.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Schedule</CardTitle>
              <CardDescription>
                Upcoming payment due dates and amounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Semester</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentSchedule.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{payment.semester}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {payment.dueDate}
                        </div>
                      </TableCell>
                      <TableCell>${payment.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {payment.status === "Pending" && (
                          <Button size="sm">Pay Now</Button>
                        )}
                        {payment.status === "Paid" && (
                          <Button variant="outline" size="sm">
                            Receipt
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 