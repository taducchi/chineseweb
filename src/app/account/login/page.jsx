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
 */
function extractErrorMessage(data, status) {
        if (!data) {
                if (status === 401) return 'Email hoặc mật khẩu không đúng.';
                if (status === 400) return 'Thông tin đăng nhập không hợp lệ.';
                if (status === 429) return 'Bạn đã thử quá nhiều lần. Vui lòng đợi vài phút.';
                if (status >= 500) return 'Máy chủ đang gặp sự cố. Vui lòng thử lại sau.';
                return `Đã có lỗi xảy ra (mã ${status}). Vui lòng thử lại.`;
        }

        if (typeof data.detail === 'string') return data.detail;
        if (typeof data.message === 'string') return data.message;
        if (typeof data.error === 'string') return data.error;

        if (Array.isArray(data.non_field_errors) && data.non_field_errors.length) {
                return data.non_field_errors[0];
        }

        const fieldErrors = [];
        for (const key of ['email', 'password', 'username']) {
                if (Array.isArray(data[key]) && data[key].length) {
                        fieldErrors.push(data[key][0]);
                } else if (typeof data[key] === 'string') {
                        fieldErrors.push(data[key]);
                }
        }
        if (fieldErrors.length) return fieldErrors.join(' ');

        if (status === 400) return 'Thông tin đăng nhập không hợp lệ.';
        if (status === 401) return 'Email hoặc mật khẩu không đúng.';
        if (status === 403) return 'Tài khoản của bạn chưa được kích hoạt hoặc bị khóa.';
        if (status === 429) return 'Bạn đã thử quá nhiều lần. Vui lòng đợi vài phút.';
        if (status >= 500) return 'Máy chủ đang gặp sự cố. Vui lòng thử lại sau.';

        return 'Đăng nhập thất bại. Vui lòng thử lại.';
}


export default function LoginPage() {
        const API_URL = useAuth().API_URL;
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

        const csrfToken = getCSRFToken();

        const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData(prev => ({
                        ...prev,
                        [name]: value
                }));
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
                setLoadingCount(2);

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

                        let data = null;
                        try {
                                data = await res.json();
                        } catch {
                                data = null;
                        }

                        console.log("Login response:", data);

                        if (res.ok && data?.access) {
                                Cookies.set('access', data.access, { expires: 7 });
                                Cookies.set('refresh', data.refresh, { expires: 7 });
                                localStorage.setItem('user', JSON.stringify(data.user));
                                setUser(data.user);
                                router.push('/dashboard');
                                return;
                        }

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
                        <div className=" bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display flex flex-col">

                                {/* ───────── MAIN ───────── */}
                                <main className="flex-1 flex items-center justify-center p-4 lg:p-10">
                                        <div className="w-full max-w-[1000px] bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-[#e7edf3] dark:border-gray-800">
                                                <div className="flex flex-col lg:flex-row">

                                                        {/* ───────── LEFT: HERO ───────── */}
                                                        <div className="hidden lg:flex flex-1 relative bg-primary/10 dark:bg-gray-800 flex-col justify-center items-center p-12 text-center">
                                                                <div
                                                                        className="absolute inset-0 opacity-10"
                                                                        style={{
                                                                                backgroundImage: 'radial-gradient(#137fec 1px, transparent 1px)',
                                                                                backgroundSize: '20px 20px'
                                                                        }}
                                                                ></div>
                                                                <div className="relative z-10 max-w-[320px]">
                                                                        <h2 className="text-3xl font-black text-text-main dark:text-white mb-4 leading-tight">
                                                                                Chào mừng trở lại!
                                                                        </h2>
                                                                        <p className="text-text-sub dark:text-gray-300 mb-8">
                                                                                Đăng nhập để tiếp tục hành trình chinh phục tiếng Trung của bạn.
                                                                        </p>
                                                                        <div
                                                                                className="w-full aspect-square bg-center bg-contain bg-no-repeat"
                                                                                style={{
                                                                                        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAnFeV8EvVBg7rUn49fuGS8EyCwIIOJNjlaOKoHJA4kgpCtYO9zAQ1P0NxeaZ_NSYImg_tAG9fBN_gfC3yGyfI0oeWDLYczGqDIXbqNIKn4MM4fATzY8tkppDMxAHzg9T3B821l8wmDfs61HXjEoN7SG3Ej7yy-zV7B7qZ5Zd5CvUmHP4RaDL1iihyIMkELCxxJDvUaaYn2n4wLY9ih8JntvZOAEHCO-PMiM4S0iioZgrKwvRiydcGV4R7lXhwdihkt1P3ztfpMLarL")'
                                                                                }}
                                                                        ></div>
                                                                </div>
                                                        </div>

                                                        {/* ───────── RIGHT: LOGIN FORM ───────── */}
                                                        <div className="flex-1 p-8 lg:p-12">
                                                                <div className="flex flex-col gap-6">

                                                                        {/* Header */}
                                                                        <div className="text-left">
                                                                                <h1 className="text-3xl font-bold text-text-main dark:text-white mb-2">
                                                                                        Đăng nhập
                                                                                </h1>
                                                                                <p className="text-text-sub dark:text-gray-400 text-sm">
                                                                                        Nhập thông tin để truy cập tài khoản của bạn.
                                                                                </p>
                                                                        </div>

                                                                        {/* Social Login Button */}
                                                                        <div className="flex justify-center">
                                                                                <GoogleSignInButton
                                                                                        className="flex w-full items-center justify-center gap-2 h-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                                                                                        handleGoogleSignIn={handleGoogleSignIn}
                                                                                >
                                                                                </GoogleSignInButton>
                                                                        </div>

                                                                            {/* Divider */}
                                                                        <div className="relative">
                                                                                <div className="absolute inset-0 flex items-center">
                                                                                        <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                                                                                </div>
                                                                                <div className="relative flex justify-center">
                                                                                        <span className="px-4 bg-white dark:bg-gray-900 text-text-sub dark:text-gray-500 text-xs uppercase tracking-wider font-medium">
                                                                                                Hoặc
                                                                                        </span>
                                                                                </div>
                                                                        </div>


                                                                        {/* Login Error Message */}
                                                                        {loginError && (
                                                                                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                                                                        <p className="text-red-600 dark:text-red-400 text-sm">{loginError}</p>
                                                                                </div>
                                                                        )}

                                                                        {/* Form */}
                                                                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                                                                                {/* Email Field */}
                                                                                <div className="flex flex-col min-w-40 flex-1">
                                                                                        <label className="text-text-main dark:text-gray-300 text-sm font-medium pb-2">
                                                                                                Email hoặc Tên đăng nhập *
                                                                                        </label>
                                                                                        <input
                                                                                                name="email"
                                                                                                type="text"
                                                                                                placeholder="name@example.com"
                                                                                                value={formData.email}
                                                                                                onChange={handleChange}
                                                                                                disabled={loadingLogin}
                                                                                                className={`w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                                                                                        } bg-background-light dark:bg-gray-800 text-text-main dark:text-white h-12 placeholder:text-text-sub dark:placeholder:text-gray-500 p-4 text-base transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed`}
                                                                                        />
                                                                                        {errors.email && (
                                                                                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                                                                        )}
                                                                                </div>

                                                                                {/* Password Field */}
                                                                                <div className="flex flex-col min-w-40 flex-1">
                                                                                        <div className="flex justify-between items-center pb-2">
                                                                                                <label className="text-text-main dark:text-gray-300 text-sm font-medium">
                                                                                                        Mật khẩu *
                                                                                                </label>
                                                                                                <Link
                                                                                                        href="/account/pwreset"
                                                                                                        className="text-primary text-xs font-medium hover:underline transition-all"
                                                                                                >
                                                                                                        Quên mật khẩu?
                                                                                                </Link>
                                                                                        </div>
                                                                                        <div className="relative">
                                                                                                <input
                                                                                                        name="password"
                                                                                                        type={showPassword ? 'text' : 'password'}
                                                                                                        placeholder="Nhập mật khẩu"
                                                                                                        value={formData.password}
                                                                                                        onChange={handleChange}
                                                                                                        disabled={loadingLogin}
                                                                                                        className={`w-full rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                                                                                                } bg-background-light dark:bg-gray-800 text-text-main dark:text-white h-12 placeholder:text-text-sub dark:placeholder:text-gray-500 p-4 pr-12 text-base transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed`}
                                                                                                />
                                                                                                <button
                                                                                                        type="button"
                                                                                                        onClick={() => setShowPassword(!showPassword)}
                                                                                                        disabled={loadingLogin}
                                                                                                        aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                                                                                                        className="absolute right-0 top-0 bottom-0 flex items-center justify-center pr-4 cursor-pointer text-text-sub dark:text-gray-400 hover:text-primary transition-colors disabled:opacity-60"
                                                                                                >
                                                                                                        <span className="material-symbols-outlined text-[20px]">
                                                                                                                {showPassword ? 'visibility_off' : 'visibility'}
                                                                                                        </span>
                                                                                                </button>
                                                                                        </div>
                                                                                        {errors.password && (
                                                                                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                                                                        )}
                                                                                </div>

                                                                                {/* Submit Button */}
                                                                                <div className="pt-2">
                                                                                        <button
                                                                                                type="submit"
                                                                                                disabled={loadingLogin}
                                                                                                className="flex w-full items-center justify-center rounded-lg h-12 px-5 bg-primary hover:bg-primary-dark text-white text-base font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed relative"
                                                                                        >
                                                                                                {loadingCount > 0 ? (
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
                                                                                </div>
                                                                        </form>

                                                                    
                                                                        {/* Register Link */}
                                                                        <div className="text-center">
                                                                                <p className="text-text-main dark:text-gray-300 text-sm">
                                                                                        Bạn chưa có tài khoản?{' '}
                                                                                        <Link href="/register" className="text-primary font-bold hover:underline transition-all">
                                                                                                Đăng ký ngay
                                                                                        </Link>
                                                                                </p>
                                                                        </div>

                                                                        {/* Terms */}
                                                                        <p className="text-xs text-center text-text-sub dark:text-gray-500">
                                                                                Bằng cách đăng nhập, bạn đồng ý với{' '}
                                                                                <Link href="/terms" className="underline hover:text-text-main dark:hover:text-gray-300">
                                                                                        Điều khoản dịch vụ
                                                                                </Link>{' '}
                                                                                và{' '}
                                                                                <Link href="/privacy" className="underline hover:text-text-main dark:hover:text-gray-300">
                                                                                        Chính sách bảo mật
                                                                                </Link>{' '}
                                                                                của chúng tôi.
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