import apiInterceptorService from './interceptor.service';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface UpdateUserData {
  name?: string;
  email?: string;
  role?: string;
  avatar?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface UserFilters {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

class UserService {
  private api = apiInterceptorService.getInstance();

  async getUsers(filters: UserFilters = {}): Promise<PaginatedResponse<User>> {
    try {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });

      const response = await this.api.get<PaginatedResponse<User>>(`/users?${params}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const response = await this.api.get<User>(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch user ${id}:`, error);
      throw error;
    }
  }

  async createUser(userData: CreateUserData): Promise<User> {
    try {
      const response = await this.api.post<User>('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  }

  async updateUser(id: string, userData: UpdateUserData): Promise<User> {
    try {
      const response = await this.api.put<User>(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update user ${id}:`, error);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.api.delete(`/users/${id}`);
    } catch (error) {
      console.error(`Failed to delete user ${id}:`, error);
      throw error;
    }
  }

  async uploadAvatar(id: string, file: File): Promise<User> {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await this.api.post<User>(`/users/${id}/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to upload avatar for user ${id}:`, error);
      throw error;
    }
  }

  async changePassword(id: string, currentPassword: string, newPassword: string): Promise<void> {
    try {
      await this.api.post(`/users/${id}/change-password`, {
        currentPassword,
        newPassword,
      });
    } catch (error) {
      console.error(`Failed to change password for user ${id}:`, error);
      throw error;
    }
  }

  async searchUsers(query: string): Promise<User[]> {
    try {
      const response = await this.api.get<{ users: User[] }>(`/users/search?q=${encodeURIComponent(query)}`);
      return response.data.users;
    } catch (error) {
      console.error('Failed to search users:', error);
      throw error;
    }
  }

  async getUsersByRole(role: string): Promise<User[]> {
    try {
      const response = await this.api.get<{ users: User[] }>(`/users/by-role/${role}`);
      return response.data.users;
    } catch (error) {
      console.error(`Failed to fetch users by role ${role}:`, error);
      throw error;
    }
  }

  async activateUser(id: string): Promise<User> {
    try {
      const response = await this.api.post<User>(`/users/${id}/activate`);
      return response.data;
    } catch (error) {
      console.error(`Failed to activate user ${id}:`, error);
      throw error;
    }
  }

  async deactivateUser(id: string): Promise<User> {
    try {
      const response = await this.api.post<User>(`/users/${id}/deactivate`);
      return response.data;
    } catch (error) {
      console.error(`Failed to deactivate user ${id}:`, error);
      throw error;
    }
  }
}

// Export singleton instance
export const userService = new UserService();
export default userService;
