'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [loadingCount, setLoadingCount] = useState(1)
    useEffect(() => {
        const initAuth = async () => {
            try {
                const refreshToken = Cookies.get('refresh');

                // Không có refresh token => coi như chưa đăng nhập
                if (!refreshToken) {
                    resetUser();
                    return;
                }

                // Gọi API để kiểm tra refresh token còn hạn không
                const response = await fetch(`${API_URL}api/auth/token/refresh/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ refresh: refreshToken }),
                });

                if (!response.ok) {
                    // Refresh token hết hạn hoặc không hợp lệ
                    resetUser();
                    return;
                }

                const data = await response.json();
                const newAccessToken = data.access;

                if (!newAccessToken) {
                    resetUser();
                    return;
                }

                // Lưu access token mới vào Cookies
                Cookies.set('access', newAccessToken);

                // Khôi phục user từ localStorage
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (err) {
                console.error(err);
                resetUser();
            } finally {
                setLoadingCount(loadingCount => loadingCount - 1);
            }
        };

        const resetUser = () => {
            Cookies.remove('access');
            Cookies.remove('refresh');
            localStorage.removeItem('user');
            setUser(null);
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
            Cookies.set('refresh', data.refresh, { expires: 30 });

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