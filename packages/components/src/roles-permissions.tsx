import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Switch } from "./ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Plus, Edit, Trash2, Shield, Users, Settings, BookOpen, BarChart3, UserCheck, School } from "lucide-react"
import { Checkbox } from "./ui/checkbox"

interface Permission {
  id: string
  name: string
  description: string
  category: string
  isActive: boolean
}

interface Role {
  id: string
  name: string
  description: string
  userCount: number
  permissions: string[]
  isDefault: boolean
  createdAt: string
}

// Mock permissions data
const mockPermissions: Permission[] = [
  // User Management
  { id: 'users.view', name: 'View Users', description: 'Can view user list and profiles', category: 'User Management', isActive: true },
  { id: 'users.create', name: 'Create Users', description: 'Can create new user accounts', category: 'User Management', isActive: true },
  { id: 'users.edit', name: 'Edit Users', description: 'Can modify user information', category: 'User Management', isActive: true },
  { id: 'users.delete', name: 'Delete Users', description: 'Can delete user accounts', category: 'User Management', isActive: true },
  
  // Course Management
  { id: 'courses.view', name: 'View Courses', description: 'Can view course list and details', category: 'Course Management', isActive: true },
  { id: 'courses.create', name: 'Create Courses', description: 'Can create new courses', category: 'Course Management', isActive: true },
  { id: 'courses.edit', name: 'Edit Courses', description: 'Can modify course information', category: 'Course Management', isActive: true },
  { id: 'courses.delete', name: 'Delete Courses', description: 'Can delete courses', category: 'Course Management', isActive: true },
  
  // Student Management
  { id: 'students.view', name: 'View Students', description: 'Can view student information', category: 'Student Management', isActive: true },
  { id: 'students.grades', name: 'Manage Grades', description: 'Can assign and modify grades', category: 'Student Management', isActive: true },
  { id: 'students.attendance', name: 'Manage Attendance', description: 'Can mark and modify attendance', category: 'Student Management', isActive: true },
  
  // Reports & Analytics
  { id: 'reports.view', name: 'View Reports', description: 'Can access reports and analytics', category: 'Reports & Analytics', isActive: true },
  { id: 'reports.export', name: 'Export Reports', description: 'Can export reports to files', category: 'Reports & Analytics', isActive: true },
  
  // System Settings
  { id: 'system.settings', name: 'System Settings', description: 'Can modify system configuration', category: 'System Settings', isActive: true },
  { id: 'system.backup', name: 'System Backup', description: 'Can manage system backups', category: 'System Settings', isActive: true },
]

// Mock roles data
const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    userCount: 2,
    permissions: mockPermissions.map(p => p.id),
    isDefault: false,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Admin',
    description: 'Administrative access with most permissions',
    userCount: 5,
    permissions: ['users.view', 'users.create', 'users.edit', 'courses.view', 'courses.create', 'courses.edit', 'students.view', 'students.grades', 'students.attendance', 'reports.view'],
    isDefault: false,
    createdAt: '2024-01-01'
  },
  {
    id: '3',
    name: 'Teacher',
    description: 'Teaching staff with course and student management',
    userCount: 25,
    permissions: ['courses.view', 'students.view', 'students.grades', 'students.attendance', 'reports.view'],
    isDefault: true,
    createdAt: '2024-01-01'
  },
  {
    id: '4',
    name: 'Student',
    description: 'Student access to personal information and courses',
    userCount: 150,
    permissions: ['courses.view'],
    isDefault: true,
    createdAt: '2024-01-01'
  }
]

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'User Management': return <Users className="h-4 w-4" />
    case 'Course Management': return <BookOpen className="h-4 w-4" />
    case 'Student Management': return <School className="h-4 w-4" />
    case 'Reports & Analytics': return <BarChart3 className="h-4 w-4" />
    case 'System Settings': return <Settings className="h-4 w-4" />
    default: return <Shield className="h-4 w-4" />
  }
}

export function RolesPermissions() {
  const [roles, setRoles] = useState<Role[]>(mockRoles)
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [rolePermissions, setRolePermissions] = useState<string[]>([])

  const handleCreateRole = () => {
    setSelectedRole(null)
    setRolePermissions([])
    setIsEditMode(false)
    setIsRoleDialogOpen(true)
  }

  const handleEditRole = (role: Role) => {
    setSelectedRole(role)
    setRolePermissions(role.permissions)
    setIsEditMode(true)
    setIsRoleDialogOpen(true)
  }

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter(role => role.id !== roleId))
  }

  const handlePermissionToggle = (permissionId: string) => {
    setRolePermissions(prev => 
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    )
  }

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = []
    }
    acc[permission.category].push(permission)
    return acc
  }, {} as Record<string, Permission[]>)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Roles & Permissions</h2>
          <p className="text-muted-foreground">
            Manage user roles and their associated permissions
          </p>
        </div>
        <Button onClick={handleCreateRole}>
          <Plus className="mr-2 h-4 w-4" />
          Add Role
        </Button>
      </div>

      <Tabs defaultValue="roles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4">
          {/* Roles Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{roles.length}</div>
                <p className="text-xs text-muted-foreground">
                  +1 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{roles.reduce((sum, role) => sum + role.userCount, 0)}</div>
                <p className="text-xs text-muted-foreground">
                  Across all roles
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Permissions</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{permissions.filter(p => p.isActive).length}</div>
                <p className="text-xs text-muted-foreground">
                  Out of {permissions.length} total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Default Roles</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{roles.filter(r => r.isDefault).length}</div>
                <p className="text-xs text-muted-foreground">
                  System default roles
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Roles Table */}
          <Card>
            <CardHeader>
              <CardTitle>Roles</CardTitle>
              <CardDescription>Manage user roles and their permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>
                        <div className="font-medium">{role.name}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground max-w-xs truncate">
                          {role.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{role.userCount} users</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{role.permissions.length} permissions</Badge>
                      </TableCell>
                      <TableCell>
                        {role.isDefault ? (
                          <Badge variant="default">Default</Badge>
                        ) : (
                          <Badge variant="secondary">Custom</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditRole(role)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {!role.isDefault && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Role</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete the "{role.name}" role? 
                                    This action cannot be undone and will affect {role.userCount} users.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteRole(role.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          {/* Permissions by Category */}
          {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {getCategoryIcon(category)}
                  <span>{category}</span>
                </CardTitle>
                <CardDescription>
                  Manage permissions for {category.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {categoryPermissions.map((permission) => (
                    <div key={permission.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="font-medium">{permission.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {permission.description}
                        </div>
                      </div>
                      <Switch
                        checked={permission.isActive}
                        onCheckedChange={(checked) => {
                          setPermissions(prev => 
                            prev.map(p => 
                              p.id === permission.id ? { ...p, isActive: checked } : p
                            )
                          )
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Role Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Role' : 'Create New Role'}
            </DialogTitle>
            <DialogDescription>
              {isEditMode 
                ? 'Update role information and permissions.' 
                : 'Create a new role and assign permissions.'
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="role-name">Role Name</Label>
                <Input
                  id="role-name"
                  placeholder="Enter role name"
                  defaultValue={selectedRole?.name || ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role-description">Description</Label>
                <Textarea
                  id="role-description"
                  placeholder="Describe the role and its responsibilities"
                  defaultValue={selectedRole?.description || ''}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <Label>Permissions</Label>
              <div className="max-h-60 overflow-y-auto space-y-4">
                {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center space-x-2 font-medium">
                      {getCategoryIcon(category)}
                      <span>{category}</span>
                    </div>
                    <div className="ml-6 space-y-2">
                      {categoryPermissions.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={permission.id}
                            checked={rolePermissions.includes(permission.id)}
                            onCheckedChange={() => handlePermissionToggle(permission.id)}
                          />
                          <div className="flex-1">
                            <Label htmlFor={permission.id} className="text-sm font-normal">
                              {permission.name}
                            </Label>
                            <div className="text-xs text-muted-foreground">
                              {permission.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? 'Update Role' : 'Create Role'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 