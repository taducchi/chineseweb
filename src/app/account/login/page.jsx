// app/login/page.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import Cookies from 'js-cookie';

// app/lib/auth.js

const API_URL = 'https://hospitable-alignment-production.up.railway.app/api';

export default function LoginPage() {
        const [formData, setFormData] = useState({
                email: '',
                password: ''
        });
        const [showPassword, setShowPassword] = useState(false);
        const [loading, setLoading] = useState(false);
        const [errors, setErrors] = useState({});
        const [loginError, setLoginError] = useState('');
        const router = useRouter();

        const { user, setUser, login } = useAuth();

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

                setLoading(true);
                setLoginError('');

                try {

                                const response = await fetch(`${API_URL}/auth/login/`, {
                                        method: 'POST',
                                        headers: {
                                                'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                                email: formData.email,
                                                password: formData.password
                                        }),
                                }).then(res => res.json());

                                console.log(response)
                                if (response.access) {
                                        // Lưu token vào cookie (7 ngày)
                                        Cookies.set('access', response.access, { expires: 7 });
                                        Cookies.set('refresh', response.refresh, { expires: 7 });
                                        setUser(response.user);
                                        router.push('/materials');
                                }

                               
                } catch (error) {
                        console.error('Login error:', error);
                        setLoginError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
                } finally {
                        setLoading(false);
                }
        };

        const handleSocialLogin = (provider) => {
                console.log(`Đăng nhập với ${provider}`);
                // Xử lý đăng nhập bằng mạng xã hội
        };

        return (


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
                                                                                        disabled={loading}
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
                                                                                        disabled={loading}
                                                                                />
                                                                                <button
                                                                                        type="button"
                                                                                        className="absolute right-0 h-full px-3 flex items-center justify-center text-text-sub dark:text-slate-400 hover:text-text-main dark:hover:text-slate-300 transition-colors"
                                                                                        onClick={() => setShowPassword(!showPassword)}
                                                                                        disabled={loading}
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
                                                                        disabled={loading}
                                                                        className="mt-2 w-full flex items-center justify-center rounded-lg h-12 px-6 bg-primary hover:bg-primary-dark text-white text-base font-bold transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed relative"
                                                                >
                                                                        {loading ? (
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
                                                        <div className="grid grid-cols-2 gap-3">
                                                                <button
                                                                        onClick={() => handleSocialLogin('Google')}
                                                                        disabled={loading}
                                                                        className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 h-10 px-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                                                                >
                                                                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                                                                                <path d="M12.0003 20.45c4.6667 0 7.875-3.2083 7.875-7.875 0-.4167-.0417-.8333-.125-1.25h-7.75v3.1667h4.4583c-.2083 1.25-1.125 3.0833-4.4583 3.0833-2.6667 0-4.9167-1.8333-5.7083-4.2917-.1667-.5416-.2917-1.125-.2917-1.7083s.125-1.1667.2917-1.7083c.7916-2.4584 3.0416-4.2917 5.7083-4.2917 1.5417 0 2.875.5417 3.875 1.5l2.2917-2.2917C16.6669 3.5 14.5419 2.5 12.0003 2.5c-5.25 0-9.5 4.25-9.5 9.5s4.25 9.5 9.5 9.5z" fill="#4285F4" fillRule="evenodd"></path>
                                                                        </svg>
                                                                        <span className="text-sm font-medium text-text-main dark:text-slate-200">Google</span>
                                                                </button>
                                                                <button
                                                                        onClick={() => handleSocialLogin('Facebook')}
                                                                        disabled={loading}
                                                                        className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 h-10 px-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                                                                >
                                                                        <svg className="h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                                                                                <path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path>
                                                                        </svg>
                                                                        <span className="text-sm font-medium text-text-main dark:text-slate-200">Facebook</span>
                                                                </button>
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

        );
}