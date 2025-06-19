import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    token: "null",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setToken: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem('token');
    });
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const verifyToken = async () => {
            if (token) {
                try {
                    await axios.post('/verify', { token });
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Token verification failed:', error);
                    setIsAuthenticated(false);
                    setToken(null);
                    localStorage.removeItem('token');
                }
            } else {
                setIsAuthenticated(false);
            }
        };
        verifyToken();
        setIsAuthenticated(true);
    }, [token]);

    const handleSetToken = (newToken: string | null) => {
        setToken(newToken);
        if (newToken) {
            localStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token');
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, setToken: handleSetToken }}>
            {children}
        </AuthContext.Provider>
    );
};