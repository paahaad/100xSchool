// TODO: move this to separate package: @100x/hooks
import { useState, useEffect, useCallback } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import apiInterceptorService from '../services/interceptor.service';

/**
 * Generic hook for API calls with loading, error, and data states
 * 
 * @example
 * // Basic usage - Fetching user data
 * const { data: user, loading, error, refetch } = useApi<User>(
 *   () => userService.getCurrentUser()
 * );
 * 
 * @example
 * // With dependencies - Fetch user by ID when userId changes
 * const { data: user, loading, error } = useApi<User>(
 *   () => userService.getUserById(userId),
 *   [userId]
 * );
 * 
 * @example
 * // Fetching list of students
 * const { data: students, loading, error, refetch } = useApi<Student[]>(
 *   () => studentService.getAllStudents()
 * );
 * 
 * @example
 * // Usage in component with conditional rendering
 * function UserProfile() {
 *   const { data: user, loading, error, refetch } = useApi<User>(
 *     () => userService.getCurrentUser()
 *   );
 * 
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 *   if (!user) return <div>No user found</div>;
 * 
 *   return (
 *     <div>
 *       <h1>{user.name}</h1>
 *       <button onClick={refetch}>Refresh</button>
 *     </div>
 *   );
 * }
 * 
 * @example
 * // With search functionality - dependencies array will trigger refetch when searchTerm changes
 * const [searchTerm, setSearchTerm] = useState('');
 * const { data: courses, loading, error } = useApi<Course[]>(
 *   () => courseService.searchCourses(searchTerm),
 *   [searchTerm]
 * );
 */
export function useApi<T>(
  apiCall: () => Promise<AxiosResponse<T>>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiCall();
      setData(response.data);
    } catch (err) {
      const errorMessage = err instanceof AxiosError 
        ? err.response?.data?.message || err.message 
        : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refetch: execute };
}

// Hook for manual API calls (e.g., POST, PUT, DELETE)
export function useApiMutation<T, P = any>(
  apiCall: (params: P) => Promise<AxiosResponse<T>>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: P): Promise<T> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiCall(params);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof AxiosError 
        ? err.response?.data?.message || err.message 
        : 'An unexpected error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, mutate, reset };
}

// Hook to access debug information from the interceptor
export function useApiDebug() {
  const [logs, setLogs] = useState({
    requests: [] as any[],
    responses: [] as any[],
    errors: [] as any[],
  });

  const refreshLogs = useCallback(() => {
    const exportedLogs = apiInterceptorService.exportLogs();
    setLogs(exportedLogs);
  }, []);

  const clearLogs = useCallback(() => {
    apiInterceptorService.clearLogs();
    setLogs({
      requests: [],
      responses: [],
      errors: [],
    });
  }, []);

  const enableDebug = useCallback((enabled: boolean) => {
    apiInterceptorService.enableDebugMode(enabled);
  }, []);

  useEffect(() => {
    refreshLogs();
    
    // Refresh logs every 5 seconds in development
    if (process.env.NODE_ENV === 'development') {
      const interval = setInterval(refreshLogs, 5000);
      return () => clearInterval(interval);
    }
  }, [refreshLogs]);

  return {
    logs,
    refreshLogs,
    clearLogs,
    enableDebug,
  };
}

// Hook for real-time connection status
export function useConnectionStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// Example: Hook for pagination
export function usePaginatedApi<T>(
  apiCall: (page: number, limit: number) => Promise<AxiosResponse<{
    data: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }>>,
  initialLimit = 10
) {
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: initialLimit,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiCall(page, pagination.limit);
      setData(response.data.data);
      setPagination(response.data.pagination);
    } catch (err) {
      const errorMessage = err instanceof AxiosError 
        ? err.response?.data?.message || err.message 
        : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [apiCall, pagination.limit]);

  const nextPage = useCallback(() => {
    if (pagination.page < pagination.totalPages) {
      fetchPage(pagination.page + 1);
    }
  }, [fetchPage, pagination.page, pagination.totalPages]);

  const prevPage = useCallback(() => {
    if (pagination.page > 1) {
      fetchPage(pagination.page - 1);
    }
  }, [fetchPage, pagination.page]);

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      fetchPage(page);
    }
  }, [fetchPage, pagination.totalPages]);

  const changeLimit = useCallback((newLimit: number) => {
    setPagination(prev => ({ ...prev, limit: newLimit, page: 1 }));
    fetchPage(1);
  }, [fetchPage]);

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  return {
    data,
    pagination,
    loading,
    error,
    nextPage,
    prevPage,
    goToPage,
    changeLimit,
    refetch: () => fetchPage(pagination.page),
  };
} 