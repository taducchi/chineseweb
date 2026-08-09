// app/login/page.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import Cookies from 'js-cookie';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleSignInButton from "./GoogleSignInButton";
import axios from 'axios';


const GOOGLE_AUTH_CLIENT_ID = ""

export default function LoginPage() {
        const API_URL = useAuth().API_URL; // Access API_URL from AuthContext
        const [formData, setFormData] = useState({
                email: '',
                password: ''
        });
        const [showPassword, setShowPassword] = useState(false);
        const [loadingLogin, setLoadingLogin] = useState(false);
        const [errors, setErrors] = useState({});
        const [loginError, setLoginError] = useState('');
        const router = useRouter();

        const { user, setUser, login, loadingCount, setLoadingCount} = useAuth();
        function getCSRFToken() {
                if (typeof document === 'undefined') return null;

                const cookies = document.cookie.split(';');
                for (let cookie of cookies) {
                        const [name, value] = cookie.trim().split('=');
                        if (name === 'csrftoken' || name === 'csrf_token') {
                                return decodeURIComponent(value);
                        }
                }
                return null;
        }

        // Fetch với CSRF token
        const csrfToken = getCSRFToken();
        const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData(prev => ({
                        ...prev,
                        [name]: value
                }));
                // Clear error when user starts typing
                if (errors[name]) {
                        setErrors(prev => ({
                                ...prev,
                                [name]: ''
                        }));
                }
                if (loginError) setLoginError('');
        };

        const validateForm = () => {
                const newErrors = {};

                if (!formData.email) {
                        newErrors.email = 'Email là bắt buộc';
                } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                        newErrors.email = 'Email không hợp lệ';
                }

                if (!formData.password) {
                        newErrors.password = 'Mật khẩu là bắt buộc';
                } else if (formData.password.length < 6) {
                        newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
                }

                setErrors(newErrors);
                return Object.keys(newErrors).length === 0;
        };

        const handleSubmit = async (e) => {
                e.preventDefault();

                if (!validateForm()) {
                        return;
                }

                setLoadingLogin(true);
                setLoginError('');
                setLoadingCount(loadingCount => loadingCount + 1) // Set loading state to true when starting the login process
                try {

                        fetch(`${API_URL}api/auth/login/`, {
                                method: 'POST',
                                headers: {
                                        'Content-Type': 'application/json',
                                        'X-CSRFToken': csrfToken,
                                },
                                body: JSON.stringify({
                                        email: formData.email,
                                        password: formData.password
                                }),
                        }).then(res => res.json()).then(response => {

                        if (response.access) {
                                // Lưu token vào cookie (7 ngày)
                                Cookies.set('access', response.access, { expires: 7 });
                                Cookies.set('refresh', response.refresh, { expires: 7 });
                                localStorage.setItem('user', JSON.stringify(response.user));
                                setUser(response.user);
                                router.push('/dashboard');
                        }
                })

                } catch (error) {
                        console.error('Login error:', error);
                        setLoginError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
                } finally {
                        setLoadingLogin(false);
                }
        };


        const handleGoogleSignIn = async (response) => {
                 
                try {
                        setLoadingCount(loadingCount => loadingCount + 1);
                        fetch(`${API_URL}auth/google-login/`, {
                                method: 'POST',
                                headers: {
                                        'Content-Type': 'application/json',
                                        'X-CSRFToken': csrfToken,
                                },
                                body: JSON.stringify({
                                        token: response.access_token
                                }),
                                credentials: 'include',
                        }).then(data => data.json()).then(data => {
                                
                                if (data.status === 'success') {
                                        // ✅ Cách 1: Đọc user từ payload.user
                                        const user = data.payload.user;
                                        const accessToken = data.token.access;
                                        const refreshToken = data.token.refresh;
                                        Cookies.set('access', data.token.access, { expires: 7 });
                                        Cookies.set('refresh', data.token.refresh, { expires: 7 });
                                        localStorage.setItem('user', JSON.stringify(user));
                                        setUser(user);
                                        router.push('/dashboard');
                                       
                                } else {
                                        console.error('Login failed:', data.message);
                                }
                        })



                        // Handle JWT token storage and logic here
                }
                catch (e) {
                        // Handle error
                }
        }
        return (
                <GoogleOAuthProvider clientId={GOOGLE_AUTH_CLIENT_ID}>
                        <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display flex flex-col">
                                {/* Main Content */}
                                <main className="flex-grow flex items-center justify-center p-4 py-8 lg:py-12">
                                        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white dark:bg-surface-dark rounded-2xl shadow-xl overflow-hidden min-h-[600px]">
                                                {/* Left Side: Hero Image */}
                                                <div className="relative hidden lg:flex flex-col justify-end p-12 bg-cover bg-center group" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAnFeV8EvVBg7rUn49fuGS8EyCwIIOJNjlaOKoHJA4kgpCtYO9zAQ1P0NxeaZ_NSYImg_tAG9fBN_gfC3yGyfI0oeWDLYczGqDIXbqNIKn4MM4fATzY8tkppDMxAHzg9T3B821l8wmDfs61HXjEoN7SG3Ej7yy-zV7B7qZ5Zd5CvUmHP4RaDL1iihyIMkELCxxJDvUaaYn2n4wLY9ih8JntvZOAEHCO-PMiM4S0iioZgrKwvRiydcGV4R7lXhwdihkt1P3ztfpMLarL")' }}>
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                                        <div className="relative z-10 text-white space-y-4">
                                                                <div className="w-12 h-12 bg-primary/90 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                                                                        <span className="material-symbols-outlined text-white text-2xl">translate</span>
                                                                </div>
                                                                <h1 className="text-4xl font-bold leading-tight">Học tiếng Trung mỗi ngày</h1>
                                                                <p className="text-slate-200 text-lg max-w-md">Khám phá văn hóa, thành thạo ngôn ngữ và kết nối với hàng triệu người dùng trên toàn thế giới.</p>
                                                        </div>
                                                </div>

                                                {/* Right Side: Login Form */}
                                                <div className="flex flex-col justify-center px-6 py-10 md:px-12 lg:px-16 w-full">
                                                        <div className="w-full max-w-md mx-auto">
                                                                <div className="mb-8 text-center lg:text-left">
                                                                        <h1 className="text-3xl font-black text-text-main dark:text-white mb-2">
                                                                                Chào mừng trở lại!
                                                                        </h1>
                                                                        <p className="text-text-sub dark:text-slate-400 text-base">
                                                                                Tiếp tục hành trình chinh phục tiếng Trung của bạn.
                                                                        </p>
                                                                </div>

                                                                <form onSubmit={handleSubmit} autoComplete='true' className="flex flex-col gap-5" method="POST">
                                                                        {/* Email Field */}
                                                                        <div className="flex flex-col gap-2">
                                                                                <label className="text-text-main dark:text-slate-200 text-sm font-medium">
                                                                                        Email hoặc Tên đăng nhập *
                                                                                </label>
                                                                                <div className="relative flex items-center">
                                                                                        <span className="absolute left-4 text-text-sub dark:text-slate-500 material-symbols-outlined text-[20px]">
                                                                                                person
                                                                                        </span>
                                                                                        <input
                                                                                                autoComplete="email"
                                                                                                name="email"
                                                                                                className={`w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'
                                                                                                        } bg-slate-50 dark:bg-slate-800 text-text-main dark:text-white h-12 pl-11 pr-4 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-base`}
                                                                                                placeholder="user@example.com"
                                                                                                type="text"
                                                                                                value={formData.email}
                                                                                                onChange={handleChange}
                                                                                                disabled={loadingLogin}
                                                                                        />
                                                                                </div>
                                                                                {errors.email && (
                                                                                        <p className="text-red-500 text-sm">{errors.email}</p>
                                                                                )}
                                                                        </div>

                                                                        {/* Password Field */}
                                                                        <div className="flex flex-col gap-2">
                                                                                <div className="flex justify-between items-center">
                                                                                        <label className="text-text-main dark:text-slate-200 text-sm font-medium">
                                                                                                Mật khẩu *
                                                                                        </label>
                                                                                        <Link className="text-primary hover:text-primary-dark text-sm font-medium transition-colors" href="/account/pwreset">
                                                                                                Quên mật khẩu?
                                                                                        </Link>
                                                                                </div>
                                                                                <div className="relative flex items-center">
                                                                                        <span className="absolute left-4 text-text-sub dark:text-slate-500 material-symbols-outlined text-[20px]">
                                                                                                lock
                                                                                        </span>
                                                                                        <input
                                                                                                autoComplete='password'
                                                                                                name="password"
                                                                                                className={`w-full rounded-lg border ${errors.password ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'
                                                                                                        } bg-slate-50 dark:bg-slate-800 text-text-main dark:text-white h-12 pl-11 pr-11 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-base`}
                                                                                                placeholder="••••••••"
                                                                                                type={showPassword ? "text" : "password"}
                                                                                                value={formData.password}
                                                                                                onChange={handleChange}
                                                                                                disabled={loadingLogin}
                                                                                        />
                                                                                        <button
                                                                                                type="button"
                                                                                                className="absolute right-0 h-full px-3 flex items-center justify-center text-text-sub dark:text-slate-400 hover:text-text-main dark:hover:text-slate-300 transition-colors"
                                                                                                onClick={() => setShowPassword(!showPassword)}
                                                                                                disabled={loadingLogin}
                                                                                        >
                                                                                                <span className="material-symbols-outlined text-[20px]">
                                                                                                        {showPassword ? "visibility_off" : "visibility"}
                                                                                                </span>
                                                                                        </button>
                                                                                </div>
                                                                                {errors.password && (
                                                                                        <p className="text-red-500 text-sm">{errors.password}</p>
                                                                                )}
                                                                        </div>

                                                                        {/* Login Error Message */}
                                                                        {loginError && (
                                                                                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                                                                        <p className="text-red-600 dark:text-red-400 text-sm">{loginError}</p>
                                                                                </div>
                                                                        )}

                                                                        {/* Submit Button */}
                                                                        <button
                                                                                type="submit"
                                                                                disabled={loadingLogin}
                                                                                className="mt-2 w-full flex items-center justify-center rounded-lg h-12 px-6 bg-primary hover:bg-primary-dark text-white text-base font-bold transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed relative"
                                                                        >
                                                                                {(loadingCount > 0) ? (
                                                                                        <>
                                                                                                <span className="opacity-0">Đăng nhập</span>
                                                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                                                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                                                                </div>
                                                                                        </>
                                                                                ) : (
                                                                                        'Đăng nhập'
                                                                                )}
                                                                        </button>
                                                                </form>

                                                                {/* Divider */}
                                                                <div className="relative my-8">
                                                                        <div className="absolute inset-0 flex items-center">
                                                                                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                                                                        </div>
                                                                        <div className="relative flex justify-center text-sm">
                                                                                <span className="px-4 bg-white dark:bg-surface-dark text-text-sub dark:text-slate-400">
                                                                                        Hoặc tiếp tục với
                                                                                </span>
                                                                        </div>
                                                                </div>

                                                                {/* Social Login */}
                                                                <div className="flex width-full bg-green-500">
                                                                        <GoogleSignInButton
                                                                                handleGoogleSignIn={handleGoogleSignIn}
                                                                                
                                                                        />

                                                                </div>

                                                                {/* Register Link */}
                                                                <div className="mt-8 text-center">
                                                                        <p className="text-text-sub dark:text-slate-400 text-sm">
                                                                                Bạn chưa có tài khoản?{' '}
                                                                                <Link className="text-primary hover:text-primary-dark font-semibold transition-colors" href="/account/register">
                                                                                        Đăng ký ngay
                                                                                </Link>
                                                                        </p>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </main>


                        </div>
                </GoogleOAuthProvider>

        );
}