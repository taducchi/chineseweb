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


const GOOGLE_AUTH_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;


/**
 * Trích xuất thông báo lỗi từ response của backend.
 * Hỗ trợ nhiều format: DRF, FastAPI, Express, v.v.
 */
function extractErrorMessage(data, status) {
        if (!data) {
                if (status === 401) return 'Email hoặc mật khẩu không đúng.';
                if (status === 400) return 'Thông tin đăng nhập không hợp lệ.';
                if (status === 429) return 'Bạn đã thử quá nhiều lần. Vui lòng đợi vài phút.';
                if (status >= 500) return 'Máy chủ đang gặp sự cố. Vui lòng thử lại sau.';
                return `Đã có lỗi xảy ra (mã ${status}). Vui lòng thử lại.`;
        }

        // Dạng 1: { detail: "..." }  (DRF, FastAPI)
        if (typeof data.detail === 'string') return data.detail;

        // Dạng 2: { message: "..." }
        if (typeof data.message === 'string') return data.message;

        // Dạng 3: { error: "..." }
        if (typeof data.error === 'string') return data.error;

        // Dạng 4: { non_field_errors: ["..."] }
        if (Array.isArray(data.non_field_errors) && data.non_field_errors.length) {
                return data.non_field_errors[0];
        }

        // Dạng 5: { email: ["..."], password: ["..."] } — lỗi field
        const fieldErrors = [];
        for (const key of ['email', 'password', 'username']) {
                if (Array.isArray(data[key]) && data[key].length) {
                        fieldErrors.push(data[key][0]);
                } else if (typeof data[key] === 'string') {
                        fieldErrors.push(data[key]);
                }
        }
        if (fieldErrors.length) return fieldErrors.join(' ');

        // Fallback theo status code
        if (status === 400) return 'Thông tin đăng nhập không hợp lệ.';
        if (status === 401) return 'Email hoặc mật khẩu không đúng.';
        if (status === 403) return 'Tài khoản của bạn chưa được kích hoạt hoặc bị khóa.';
        if (status === 429) return 'Bạn đã thử quá nhiều lần. Vui lòng đợi vài phút.';
        if (status >= 500) return 'Máy chủ đang gặp sự cố. Vui lòng thử lại sau.';

        return 'Đăng nhập thất bại. Vui lòng thử lại.';
}


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

        const { user, setUser, login, loadingCount, setLoadingCount } = useAuth();

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
                setLoadingCount(2); // Set loading state when starting the login process

                try {
                        const res = await fetch(`${API_URL}api/auth/login/`, {
                                method: 'POST',
                                headers: {
                                        'Content-Type': 'application/json',
                                        'X-CSRFToken': csrfToken,
                                },
                                body: JSON.stringify({
                                        email: formData.email,
                                        password: formData.password
                                }),
                        });

                        // Cố gắng parse JSON, kể cả khi response lỗi
                        let data = null;
                        try {
                                data = await res.json();
                        } catch {
                                data = null;
                        }

                        console.log("Login response:", data);

                        // ✅ THÀNH CÔNG
                        if (res.ok && data?.access) {
                                // Lưu token vào cookie (7 ngày)
                                Cookies.set('access', data.access, { expires: 7 });
                                Cookies.set('refresh', data.refresh, { expires: 7 });
                                localStorage.setItem('user', JSON.stringify(data.user));
                                setUser(data.user);
                                router.push('/dashboard');
                                return;
                        }

                        // ❌ THẤT BẠI – trích xuất message từ nhiều dạng response
                        const backendMessage = extractErrorMessage(data, res.status);
                        setLoginError(backendMessage);

                } catch (error) {
                        console.error('Login error:', error);
                        setLoginError('Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng và thử lại.');
                } finally {
                        setLoadingLogin(false);
                        setLoadingCount(0);
                }
        };


        const handleGoogleSignIn = async (response) => {
                try {
                        setLoadingLogin(true);
                        setLoadingCount(1);
                        setLoginError('');

                        const res = await fetch(`${API_URL}auth/google-login/`, {
                                method: 'POST',
                                headers: {
                                        'Content-Type': 'application/json',
                                        'X-CSRFToken': csrfToken,
                                },
                                body: JSON.stringify({
                                        token: response.access_token
                                }),
                                credentials: 'include',
                        });

                        let data = null;
                        try {
                                data = await res.json();
                        } catch {
                                data = null;
                        }

                        if (res.ok && data?.status === 'success') {
                                // ✅ Đọc user từ payload.user
                                const user = data.payload.user;
                                Cookies.set('access', data.token.access, { expires: 7 });
                                Cookies.set('refresh', data.token.refresh, { expires: 7 });
                                localStorage.setItem('user', JSON.stringify(user));
                                setUser(user);
                                router.push('/dashboard');
                        } else {
                                const backendMessage = extractErrorMessage(data, res.status);
                                setLoginError(
                                        data?.message ||
                                        backendMessage ||
                                        'Đăng nhập bằng Google thất bại. Vui lòng thử lại.'
                                );
                                console.error('Google login failed:', data);
                        }
                }
                catch (e) {
                        console.error('Google login error:', e);
                        setLoginError('Không thể kết nối đến máy chủ. Vui lòng thử lại.');
                }
                finally {
                        setLoadingLogin(false);
                        setLoadingCount(0);
                }
        };

        return (
                <GoogleOAuthProvider clientId={GOOGLE_AUTH_CLIENT_ID}>
                        <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display flex flex-col">
                                {/* Main Content */}
                                <main className="flex-grow flex items-center justify-center px-4 py-4 sm:py-6 lg:py-12">
                                        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white dark:bg-surface-dark rounded-2xl shadow-xl overflow-hidden lg:min-h-[600px]">
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
                                                <div className="flex flex-col justify-center items-center px-5 py-6 sm:px-6 sm:py-8 md:px-12 lg:px-16 w-full min-h-0 lg:min-h-screen bg-slate-50 dark:bg-slate-950">
                                                        <div className="w-full max-w-md">

                                                                {/* ─── HEADER ─── */}
                                                                <div className="mb-5 sm:mb-6 lg:mb-8 text-center lg:text-left">
                                                                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                                                                                Chào mừng trở lại!
                                                                        </h1>
                                                                        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
                                                                                Tiếp tục hành trình chinh phục tiếng Trung của bạn.
                                                                        </p>
                                                                </div>

                                                                {/* ─── FORM ─── */}
                                                                <form
                                                                        onSubmit={handleSubmit}
                                                                        autoComplete="on"
                                                                        method="POST"
                                                                        className="flex flex-col gap-4 sm:gap-5"
                                                                >
                                                                        {/* Email */}
                                                                        <div className="flex flex-col gap-2">
                                                                                <label
                                                                                        htmlFor="email"
                                                                                        className="text-slate-700 dark:text-slate-200 text-sm font-medium"
                                                                                >
                                                                                        Email hoặc Tên đăng nhập
                                                                                </label>
                                                                                <div className="relative">
                                                                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 material-symbols-outlined text-[20px] pointer-events-none">
                                                                                                person
                                                                                        </span>
                                                                                        <input
                                                                                                id="email"
                                                                                                autoComplete="email"
                                                                                                name="email"
                                                                                                type="text"
                                                                                                placeholder="user@example.com"
                                                                                                value={formData.email}
                                                                                                onChange={handleChange}
                                                                                                disabled={loadingLogin}
                                                                                                className={`w-full h-11 sm:h-12 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white pl-11 pr-4 text-base placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed ${errors.email
                                                                                                                ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                                                                                                                : 'border-slate-200 dark:border-slate-700'
                                                                                                        }`}
                                                                                        />
                                                                                </div>
                                                                                {errors.email && (
                                                                                        <p className="text-red-500 text-xs font-medium">{errors.email}</p>
                                                                                )}
                                                                        </div>

                                                                        {/* Password */}
                                                                        <div className="flex flex-col gap-2">
                                                                                <div className="flex justify-between items-center">
                                                                                        <label
                                                                                                htmlFor="password"
                                                                                                className="text-slate-700 dark:text-slate-200 text-sm font-medium"
                                                                                        >
                                                                                                Mật khẩu
                                                                                        </label>
                                                                                        <Link
                                                                                                href="/account/pwreset"
                                                                                                className="text-primary hover:text-primary-dark text-xs sm:text-sm font-medium transition-colors"
                                                                                        >
                                                                                                Quên mật khẩu?
                                                                                        </Link>
                                                                                </div>
                                                                                <div className="relative">
                                                                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 material-symbols-outlined text-[20px] pointer-events-none">
                                                                                                lock
                                                                                        </span>
                                                                                        <input
                                                                                                id="password"
                                                                                                autoComplete="current-password"
                                                                                                name="password"
                                                                                                type={showPassword ? 'text' : 'password'}
                                                                                                placeholder="••••••••"
                                                                                                value={formData.password}
                                                                                                onChange={handleChange}
                                                                                                disabled={loadingLogin}
                                                                                                className={`w-full h-11 sm:h-12 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white pl-11 pr-11 text-base placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed ${errors.password
                                                                                                                ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                                                                                                                : 'border-slate-200 dark:border-slate-700'
                                                                                                        }`}
                                                                                        />
                                                                                        <button
                                                                                                type="button"
                                                                                                onClick={() => setShowPassword((v) => !v)}
                                                                                                disabled={loadingLogin}
                                                                                                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                                                                                                className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-60"
                                                                                        >
                                                                                                <span className="material-symbols-outlined text-[20px]">
                                                                                                        {showPassword ? 'visibility_off' : 'visibility'}
                                                                                                </span>
                                                                                        </button>
                                                                                </div>
                                                                                {errors.password && (
                                                                                        <p className="text-red-500 text-xs font-medium">{errors.password}</p>
                                                                                )}
                                                                        </div>

                                                                        {/* Login Error */}
                                                                        {loginError && (
                                                                                <div className="flex items-start gap-2.5 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                                                                        <span className="material-symbols-outlined text-red-500 text-[20px] flex-shrink-0">
                                                                                                error
                                                                                        </span>
                                                                                        <p className="text-red-600 dark:text-red-400 text-sm">{loginError}</p>
                                                                                </div>
                                                                        )}

                                                                        {/* Submit */}
                                                                        <button
                                                                                type="submit"
                                                                                disabled={loadingLogin}
                                                                                className="mt-1 sm:mt-2 w-full h-11 sm:h-12 inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark text-white text-base font-bold transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                                                                        >
                                                                                {loadingCount > 0 ? (
                                                                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                                                ) : (
                                                                                        'Đăng nhập'
                                                                                )}
                                                                        </button>
                                                                </form>

                                                                {/* ─── DIVIDER ─── */}
                                                                <div className="relative my-5 sm:my-6 lg:my-8">
                                                                        <div className="absolute inset-0 flex items-center">
                                                                                <div className="w-full border-t border-slate-200 dark:border-slate-700" />
                                                                        </div>
                                                                        <div className="relative flex justify-center">
                                                                                <span className="px-4 bg-slate-50 dark:bg-slate-950 text-slate-400 text-xs uppercase tracking-wider font-medium">
                                                                                        Hoặc tiếp tục với
                                                                                </span>
                                                                        </div>
                                                                </div>

                                                                {/* ─── SOCIAL LOGIN ─── */}
                                                                <div className="w-full flex justify-center">
                                                                        <GoogleSignInButton handleGoogleSignIn={handleGoogleSignIn} />
                                                                </div>

                                                                {/* ─── REGISTER LINK ─── */}
                                                                <div className="mt-5 sm:mt-6 lg:mt-8 text-center">
                                                                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                                                                                Bạn chưa có tài khoản?{' '}
                                                                                <Link
                                                                                        href="/account/register"
                                                                                        className="text-primary hover:text-primary-dark font-semibold transition-colors"
                                                                                >
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