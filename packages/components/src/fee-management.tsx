

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Textarea } from "./ui/textarea"
import { Plus, DollarSign, CreditCard, FileText, Download, Search, Filter } from "lucide-react"

const feeStructures = [
  {
    id: "FEE001",
    grade: "Grade 9",
    category: "Regular",
    tuitionFee: 15000,
    examFee: 2000,
    libraryFee: 1000,
    totalFee: 18000,
    status: "Active",
  },
  {
    id: "FEE002",
    grade: "Grade 10",
    category: "Regular",
    tuitionFee: 18000,
    examFee: 2500,
    libraryFee: 1200,
    totalFee: 21700,
    status: "Active",
  },
]

const payments = [
  {
    id: "PAY001",
    studentId: "STU001",
    studentName: "Alice Johnson",
    class: "Grade 10-A",
    amount: 21700,
    paymentDate: "2024-01-15",
    method: "UPI",
    status: "Completed",
    receiptNo: "RCP001",
  },
  {
    id: "PAY002",
    studentId: "STU002",
    studentName: "Bob Smith",
    class: "Grade 9-B",
    amount: 18000,
    paymentDate: "2024-01-10",
    method: "Bank Transfer",
    status: "Pending",
    receiptNo: "-",
  },
]

const scholarships = [
  {
    id: "SCH001",
    name: "Merit Scholarship",
    type: "Academic",
    discount: "50%",
    criteria: "Above 90% marks",
    students: 12,
    status: "Active",
  },
  {
    id: "SCH002",
    name: "Need-based Aid",
    type: "Financial",
    discount: "₹10,000",
    criteria: "Family income < ₹2L",
    students: 8,
    status: "Active",
  },
]

export function FeeManagement() {
  const [isFeeDialogOpen, setIsFeeDialogOpen] = useState(false)
  const [isScholarshipDialogOpen, setIsScholarshipDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Fee Management</h2>
          <p className="text-muted-foreground">Manage fee structures, payments, and scholarships</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isScholarshipDialogOpen} onOpenChange={setIsScholarshipDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Scholarship
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Scholarship Program</DialogTitle>
                <DialogDescription>Set up a new scholarship or concession program</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="scholarshipName">Scholarship Name</Label>
                  <Input id="scholarshipName" placeholder="e.g., Merit Scholarship" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="scholarshipType">Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">Academic Merit</SelectItem>
                        <SelectItem value="financial">Financial Need</SelectItem>
                        <SelectItem value="sports">Sports Excellence</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discountType">Discount Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select discount" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountValue">Discount Value</Label>
                  <Input id="discountValue" placeholder="e.g., 50 or 10000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="criteria">Eligibility Criteria</Label>
                  <Textarea id="criteria" placeholder="Describe the eligibility criteria" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxStudents">Maximum Students</Label>
                  <Input id="maxStudents" type="number" placeholder="10" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsScholarshipDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsScholarshipDialogOpen(false)}>Create Scholarship</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isFeeDialogOpen} onOpenChange={setIsFeeDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Set Fee Structure
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Set Fee Structure</DialogTitle>
                <DialogDescription>Define fee structure for a class/category</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade/Class</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grade-9">Grade 9</SelectItem>
                        <SelectItem value="grade-10">Grade 10</SelectItem>
                        <SelectItem value="grade-11">Grade 11</SelectItem>
                        <SelectItem value="grade-12">Grade 12</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="regular">Regular</SelectItem>
                        <SelectItem value="science">Science Stream</SelectItem>
                        <SelectItem value="commerce">Commerce Stream</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tuitionFee">Tuition Fee (₹)</Label>
                  <Input id="tuitionFee" type="number" placeholder="15000" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="examFee">Exam Fee (₹)</Label>
                    <Input id="examFee" type="number" placeholder="2000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="libraryFee">Library Fee (₹)</Label>
                    <Input id="libraryFee" type="number" placeholder="1000" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="labFee">Lab Fee (₹)</Label>
                    <Input id="labFee" type="number" placeholder="1500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sportsFee">Sports Fee (₹)</Label>
                    <Input id="sportsFee" type="number" placeholder="500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="otherFees">Other Fees</Label>
                  <Textarea id="otherFees" placeholder="List any additional fees" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsFeeDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsFeeDialogOpen(false)}>Set Fee Structure</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12,34,567</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2,45,890</div>
            <p className="text-xs text-muted-foreground">156 students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scholarships</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1,25,000</div>
            <p className="text-xs text-muted-foreground">20 students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="fee-structure" className="space-y-4">
        <TabsList>
          <TabsTrigger value="fee-structure">Fee Structure</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
        </TabsList>

        <TabsContent value="fee-structure" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fee Structure Management</CardTitle>
              <CardDescription>Set and manage fee structures by class and category</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Grade</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Tuition Fee</TableHead>
                    <TableHead>Exam Fee</TableHead>
                    <TableHead>Library Fee</TableHead>
                    <TableHead>Total Fee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feeStructures.map((fee) => (
                    <TableRow key={fee.id}>
                      <TableCell className="font-medium">{fee.grade}</TableCell>
                      <TableCell>{fee.category}</TableCell>
                      <TableCell>₹{fee.tuitionFee.toLocaleString()}</TableCell>
                      <TableCell>₹{fee.examFee.toLocaleString()}</TableCell>
                      <TableCell>₹{fee.libraryFee.toLocaleString()}</TableCell>
                      <TableCell className="font-medium">₹{fee.totalFee.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="default">{fee.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            Copy
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Management</CardTitle>
              <CardDescription>Track and manage student fee payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search payments..." className="pl-8" />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payments</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Receipt</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{payment.studentName}</div>
                          <div className="text-sm text-muted-foreground">{payment.studentId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{payment.class}</TableCell>
                      <TableCell className="font-medium">₹{payment.amount.toLocaleString()}</TableCell>
                      <TableCell>{payment.paymentDate}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            payment.status === "Completed"
                              ? "default"
                              : payment.status === "Pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{payment.receiptNo}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Management</CardTitle>
              <CardDescription>Generate and manage fee invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grade-9">Grade 9</SelectItem>
                    <SelectItem value="grade-10">Grade 10</SelectItem>
                    <SelectItem value="grade-11">Grade 11</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="january">January 2024</SelectItem>
                    <SelectItem value="february">February 2024</SelectItem>
                    <SelectItem value="march">March 2024</SelectItem>
                  </SelectContent>
                </Select>
                <Button>Generate Invoices</Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Bulk Download
                </Button>
              </div>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Select class and month to generate invoices</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scholarships" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scholarship Programs</CardTitle>
              <CardDescription>Manage scholarships and concessions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scholarship Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Criteria</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scholarships.map((scholarship) => (
                    <TableRow key={scholarship.id}>
                      <TableCell className="font-medium">{scholarship.name}</TableCell>
                      <TableCell>{scholarship.type}</TableCell>
                      <TableCell>{scholarship.discount}</TableCell>
                      <TableCell className="max-w-xs truncate">{scholarship.criteria}</TableCell>
                      <TableCell>{scholarship.students}</TableCell>
                      <TableCell>
                        <Badge variant="default">{scholarship.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
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
