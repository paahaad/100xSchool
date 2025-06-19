import axios100x from './interceptor.service';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
  refreshToken: string;
}

class AuthService {
  private api = axios100x.getInstance();

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.api.post<AuthResponse>('/auth/login', credentials);
      
      // Store token using the interceptor service
      if (response.data.token) {
        axios100x.setAuthToken(response.data.token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await this.api.post<AuthResponse>('/auth/register', userData);
      
      // Store token using the interceptor service
      if (response.data.token) {
        axios100x.setAuthToken(response.data.token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.api.post('/auth/logout');
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      // Always clear token regardless of API response
      axios100x.removeAuthToken();
    }
  }

  async refreshToken(): Promise<string> {
    try {
      const response = await this.api.post<{ token: string }>('/auth/refresh');
      
      if (response.data.token) {
        axios100x.setAuthToken(response.data.token);
        return response.data.token;
      }
      
      throw new Error('No token received');
    } catch (error) {
      console.error('Token refresh failed:', error);
      axios100x.removeAuthToken();
      throw error;
    }
  }

  async getCurrentUser(): Promise<AuthResponse['user']> {
    try {
      const response = await this.api.get<{ user: AuthResponse['user'] }>('/auth/me');
      return response.data.user;
    } catch (error) {
      console.error('Failed to get current user:', error);
      throw error;
    }
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    try {
      const response = await this.api.post<{ message: string }>('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      console.error('Forgot password request failed:', error);
      throw error;
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    try {
      const response = await this.api.post<{ message: string }>('/auth/reset-password', {
        token,
        password: newPassword,
      });
      return response.data;
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem('authToken'));
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
