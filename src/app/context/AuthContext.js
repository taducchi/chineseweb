'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

const API_URL = 'https://hospitable-alignment-production.up.railway.app/';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [loadingCount, setLoadingCount] = useState(1)
    useEffect(() => {
        const initAuth = () => {
            try {
                const accessToken = Cookies.get('access');

                if (!accessToken) {
                    setLoadingCount(loadingCount => loadingCount - 1)
                    return;
                }

                const storedUser = localStorage.getItem('user');

                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                    
                }
            } catch (err) {
                console.error(err);
                Cookies.remove('access');
                Cookies.remove('refresh');
                localStorage.removeItem('user');
            } finally {
                setLoadingCount(loadingCount => loadingCount - 1)
            }
        };

        initAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/auth/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    message: data.message || 'Đăng nhập thất bại',
                };
            }

            Cookies.set('access', data.access, { expires: 7 });
            Cookies.set('refresh', data.refresh, { expires: 7 });

            localStorage.setItem('user', JSON.stringify(data.user));

            setUser(data.user);

            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    };

    const logout = () => {
        Cookies.remove('access');
        Cookies.remove('refresh');

        localStorage.removeItem('user');

        setUser(null);

        router.replace('/');
        setLoadingCount(-1);
    };

    return (
        <AuthContext.Provider
            value={{
                API_URL,
                user,
                setUser,
                loading,
                setLoading,
                login,
                logout,
                loadingCount, 
                setLoadingCount, 
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);