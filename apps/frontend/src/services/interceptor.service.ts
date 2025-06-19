// TODO: move this to separate package: @100x/services
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

// Types for better TypeScript support
interface RequestLog {
  id: string;
  method: string;
  url: string;
  timestamp: number;
  headers?: Record<string, string>;
  data?: any;
}

interface ResponseLog {
  id: string;
  status: number;
  statusText: string;
  timestamp: number;
  duration: number;
  data?: any;
  headers?: Record<string, string>;
}

interface ErrorLog {
  id: string;
  message: string;
  status?: number;
  timestamp: number;
  duration: number;
  url?: string;
  method?: string;
}

class ApiInterceptorService {
  private axiosInstance: AxiosInstance;
  private requestLogs: Map<string, RequestLog> = new Map();
  private responseLogs: ResponseLog[] = [];
  private errorLogs: ErrorLog[] = [];
  private isDebugMode: boolean = import.meta.env.MODE === 'development';

  constructor(baseURL?: string, timeout = 10000) {
    this.axiosInstance = axios.create({
      baseURL: baseURL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
      timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.setupRequestInterceptor();
    this.setupResponseInterceptor();
  }

  private setupRequestInterceptor(): void {
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const requestId = this.generateRequestId();
        const timestamp = Date.now();

        // Add request ID to config for tracking
        config.metadata = { requestId, startTime: timestamp };

        // Get auth token from localStorage or context
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Log request in debug mode
        if (this.isDebugMode) {
          const requestLog: RequestLog = {
            id: requestId,
            method: config.method?.toUpperCase() || 'GET',
            url: this.buildFullUrl(config),
            timestamp,
            headers: config.headers as Record<string, string>,
            data: config.data,
          };

          this.requestLogs.set(requestId, requestLog);
          this.logRequest(requestLog);
        }

        return config;
      },
      (error: AxiosError) => {
        this.logError('Request Interceptor Error', error);
        return Promise.reject(error);
      }
    );
  }

  private setupResponseInterceptor(): void {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        const requestId = response.config.metadata?.requestId;
        const startTime = response.config.metadata?.startTime;
        const timestamp = Date.now();
        const duration = startTime ? timestamp - startTime : 0;

        if (this.isDebugMode && requestId) {
          const responseLog: ResponseLog = {
            id: requestId,
            status: response.status,
            statusText: response.statusText,
            timestamp,
            duration,
            data: response.data,
            headers: response.headers as Record<string, string>,
          };

          this.responseLogs.push(responseLog);
          this.logResponse(responseLog);

          // Clean up request log
          this.requestLogs.delete(requestId);
        }

        return response;
      },
      (error: AxiosError) => {
        const requestId = error.config?.metadata?.requestId;
        const startTime = error.config?.metadata?.startTime;
        const timestamp = Date.now();
        const duration = startTime ? timestamp - startTime : 0;

        const errorLog: ErrorLog = {
          id: requestId || this.generateRequestId(),
          message: error.message,
          status: error.response?.status,
          timestamp,
          duration,
          url: error.config ? this.buildFullUrl(error.config) : undefined,
          method: error.config?.method?.toUpperCase(),
        };

        this.errorLogs.push(errorLog);
        this.logError('Response Error', error, errorLog);

        // Clean up request log
        if (requestId) {
          this.requestLogs.delete(requestId);
        }

        // Handle specific error cases
        return this.handleError(error);
      }
    );
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getAuthToken(): string | null {
    // Try multiple sources for the token
    return (
      localStorage.getItem('authToken') ||
      localStorage.getItem('accessToken') ||
      sessionStorage.getItem('authToken') ||
      null
    );
  }

  private buildFullUrl(config: AxiosRequestConfig | InternalAxiosRequestConfig): string {
    const baseURL = config.baseURL || this.axiosInstance.defaults.baseURL || '';
    const url = config.url || '';
    return `${baseURL}${url}`;
  }

  private logRequest(requestLog: RequestLog): void {
    console.group(`🚀 API Request: ${requestLog.method} ${requestLog.url}`);
    console.log('📋 Request ID:', requestLog.id);
    console.log('⏰ Timestamp:', new Date(requestLog.timestamp).toISOString());
    console.log('📤 Headers:', requestLog.headers);
    if (requestLog.data) {
      console.log('📦 Payload:', requestLog.data);
    }
    console.groupEnd();
  }

  private logResponse(responseLog: ResponseLog): void {
    const statusColor = responseLog.status >= 400 ? '🔴' : responseLog.status >= 300 ? '🟡' : '🟢';
    
    console.group(`${statusColor} API Response: ${responseLog.status} ${responseLog.statusText} (${responseLog.duration}ms)`);
    console.log('📋 Request ID:', responseLog.id);
    console.log('⏰ Timestamp:', new Date(responseLog.timestamp).toISOString());
    console.log('⚡ Duration:', `${responseLog.duration}ms`);
    console.log('📥 Headers:', responseLog.headers);
    console.log('📦 Data:', responseLog.data);
    console.groupEnd();
  }

  private logError(title: string, error: AxiosError, errorLog?: ErrorLog): void {
    console.group(`🔴 ${title}`);
    if (errorLog) {
      console.log('📋 Request ID:', errorLog.id);
      console.log('⏰ Timestamp:', new Date(errorLog.timestamp).toISOString());
      console.log('⚡ Duration:', `${errorLog.duration}ms`);
      console.log('🌐 URL:', errorLog.url);
      console.log('📝 Method:', errorLog.method);
    }
    console.log('❌ Error:', error.message);
    console.log('📊 Status:', error.response?.status);
    console.log('📦 Response Data:', error.response?.data);
    console.log('🔧 Config:', error.config);
    console.groupEnd();
  }

  private async handleError(error: AxiosError): Promise<never> {
    const status = error.response?.status;

    switch (status) {
      case 401:
        // Unauthorized - redirect to login or refresh token
        this.handleUnauthorized();
        break;
      case 403:
        // Forbidden - show appropriate message
        this.handleForbidden();
        break;
      case 404:
        // Not found - handle gracefully
        this.handleNotFound();
        break;
      case 429:
        // Rate limited - implement retry logic
        return this.handleRateLimit(error);
      case 500:
      case 502:
      case 503:
      case 504:
        // Server errors - show user-friendly message
        this.handleServerError();
        break;
      default:
        // Network errors or other issues
        this.handleNetworkError(error);
        break;
    }

    return Promise.reject(error);
  }

  private handleUnauthorized(): void {
    // Clear stored tokens
    localStorage.removeItem('authToken');
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('authToken');
    
    // Redirect to login (you might want to use React Router's navigate)
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }

  private handleForbidden(): void {
    console.warn('Access forbidden - insufficient permissions');
    // You might want to show a toast notification here
  }

  private handleNotFound(): void {
    console.warn('Resource not found');
    // Handle gracefully - maybe redirect to 404 page
  }

  private async handleRateLimit(error: AxiosError): Promise<never> {
    const retryAfter = error.response?.headers['retry-after'];
    const delay = retryAfter ? parseInt(retryAfter) * 1000 : 5000;
    
    console.warn(`Rate limited. Retrying after ${delay}ms`);
    
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Retry the original request
    if (error.config) {
      return this.axiosInstance.request(error.config);
    }
    
    return Promise.reject(error);
  }

  private handleServerError(): void {
    console.error('Server error occurred');
    // Show user-friendly error message
  }

  private handleNetworkError(error: AxiosError): void {
    if (!navigator.onLine) {
      console.error('Network connection lost');
      // Show offline message
    } else {
      console.error('Network error:', error.message);
    }
  }

  // Public methods for the API instance
  public getInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  public setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  public removeAuthToken(): void {
    localStorage.removeItem('authToken');
    delete this.axiosInstance.defaults.headers.common['Authorization'];
  }

  public enableDebugMode(enabled = true): void {
    this.isDebugMode = enabled;
  }

  // Debug methods for development
  public getRequestLogs(): Map<string, RequestLog> {
    return this.requestLogs;
  }

  public getResponseLogs(): ResponseLog[] {
    return this.responseLogs;
  }

  public getErrorLogs(): ErrorLog[] {
    return this.errorLogs;
  }

  public clearLogs(): void {
    this.requestLogs.clear();
    this.responseLogs = [];
    this.errorLogs = [];
  }

  public exportLogs(): {
    requests: RequestLog[];
    responses: ResponseLog[];
    errors: ErrorLog[];
  } {
    return {
      requests: Array.from(this.requestLogs.values()),
      responses: this.responseLogs,
      errors: this.errorLogs,
    };
  }
}

// Create a singleton instance
const axios100x = new ApiInterceptorService();

// Export the singleton instance and the class for testing
export { axios100x, ApiInterceptorService };
export default axios100x;

// Extend the AxiosRequestConfig type to include our metadata
declare module 'axios' {
  interface AxiosRequestConfig {
    metadata?: {
      requestId: string;
      startTime: number;
    };
  }
  interface InternalAxiosRequestConfig {
    metadata?: {
      requestId: string;
      startTime: number;
    };
  }
}
