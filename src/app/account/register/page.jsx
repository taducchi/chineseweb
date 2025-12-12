// app/register/page.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [registerError, setRegisterError] = useState('');
  const router = useRouter();

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
    if (registerError) setRegisterError('');
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Họ và tên là bắt buộc';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Họ và tên phải có ít nhất 2 ký tự';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Mật khẩu phải chứa ít nhất 1 chữ cái và 1 số';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp';
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
    setRegisterError('');
    
    try {
      // Giả lập API call - Thay thế bằng API thực tế
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Kiểm tra email đã tồn tại giả định
      if (formData.email === 'existing@example.com') {
        setRegisterError('Email này đã được sử dụng');
        return;
      }
      
      // Đăng ký thành công
      console.log('Đăng ký thành công:', formData.email);
      // Lưu thông tin user/token ở đây
      
      // Chuyển hướng đến trang xác nhận email hoặc dashboard
      router.push('/verification-sent');
      
    } catch (error) {
      console.error('Registration error:', error);
      setRegisterError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    console.log(`Đăng ký với ${provider}`);
    // Xử lý đăng ký bằng mạng xã hội
    // router.push(`/api/auth/${provider}`);
  };

  return (
    

      <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display flex flex-col">
       

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-4 lg:p-10">
          <div className="w-full max-w-[1000px] bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-[#e7edf3] dark:border-gray-800">
            <div className="flex flex-col lg:flex-row">
              {/* Left Column: Hero/Image */}
              <div className="hidden lg:flex flex-1 relative bg-primary/10 dark:bg-gray-800 flex-col justify-center items-center p-12 text-center">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#137fec 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <div className="relative z-10 max-w-[320px]">
                  <h2 className="text-3xl font-black text-text-main dark:text-white mb-4 leading-tight">
                    Học tiếng Trung dễ dàng hơn bao giờ hết
                  </h2>
                  <p className="text-text-sub dark:text-gray-300 mb-8">
                    Tham gia cùng cộng đồng hơn 10,000 học viên và chinh phục HSK ngay hôm nay.
                  </p>
                  <div className="w-full aspect-square bg-center bg-contain bg-no-repeat" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAtt-lEU37uYsSnyjPUNs1ClS2Ip6aHlFRn3UgtCzoSHMZnIdjra6-KfToaUCUMh1cxWv9Gh7yfrMO9upqvfdhm4q9SzRcFerQZdarCIJ2qEFN6oTYrh3qHAtcGqYZVfJHjwvZA_rLTjjiUTSxtNf3sDeRPTjyfUtXAdksGOcKCJtMr8DWayBB7V3SGR4FtP7YSuPn0qwvYf5kXab_SXqr2qDXAU65XlzfAhWh1vu4yZPqpSuycNEJUXnczR6J1jsWZL078Vi-uqzt_")' }}></div>
                </div>
              </div>

              {/* Right Column: Registration Form */}
              <div className="flex-1 p-8 lg:p-12">
                <div className="flex flex-col gap-6">
                  <div className="text-left">
                    <h1 className="text-3xl font-bold text-text-main dark:text-white mb-2">
                      Đăng ký tài khoản
                    </h1>
                    <p className="text-text-sub dark:text-gray-400 text-sm">
                      Điền thông tin bên dưới để bắt đầu hành trình của bạn.
                    </p>
                  </div>

                  {/* Social Register Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleSocialRegister('Google')}
                      disabled={loading}
                      className="flex items-center justify-center gap-2 h-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"></path>
                        <path d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z" fill="#FF3D00"></path>
                        <path d="M12 22C14.6605 22 17.0365 20.9325 18.8045 19.2195L15.547 16.7475C14.502 17.5505 13.2505 18 12 18C9.3795 18 7.1565 16.321 6.3415 13.9805L3.1095 16.5125C4.7865 19.754 8.1135 22 12 22Z" fill="#4CAF50"></path>
                        <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.257 15.108 16.5465 16.076 15.547 16.7475L18.8045 19.2195C20.7295 17.4365 22 14.9085 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"></path>
                      </svg>
                      <span className="text-sm font-medium text-text-main dark:text-white">Google</span>
                    </button>
                    <button
                      onClick={() => handleSocialRegister('Facebook')}
                      disabled={loading}
                      className="flex items-center justify-center gap-2 h-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                    >
                      <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                      </svg>
                      <span className="text-sm font-medium text-text-main dark:text-white">Facebook</span>
                    </button>
                  </div>

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-[#e7edf3] dark:border-gray-700"></div>
                    <span className="flex-shrink-0 mx-4 text-text-sub dark:text-gray-400 text-xs uppercase">
                      Hoặc đăng ký bằng email
                    </span>
                    <div className="flex-grow border-t border-[#e7edf3] dark:border-gray-700"></div>
                  </div>

                  {/* Registration Error Message */}
                  {registerError && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-red-600 dark:text-red-400 text-sm">{registerError}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Full Name Field */}
                    <div className="flex flex-col min-w-40 flex-1">
                      <label className="text-text-main dark:text-gray-300 text-sm font-medium pb-2">
                        Họ và tên *
                      </label>
                      <input
                        name="fullName"
                        className={`w-full rounded-lg border ${
                          errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } bg-background-light dark:bg-gray-800 text-text-main dark:text-white h-12 placeholder:text-text-sub dark:placeholder:text-gray-500 p-4 text-base transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary`}
                        placeholder="Nhập họ và tên của bạn"
                        value={formData.fullName}
                        onChange={handleChange}
                        disabled={loading}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col min-w-40 flex-1">
                      <label className="text-text-main dark:text-gray-300 text-sm font-medium pb-2">
                        Địa chỉ Email *
                      </label>
                      <input
                        name="email"
                        className={`w-full rounded-lg border ${
                          errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } bg-background-light dark:bg-gray-800 text-text-main dark:text-white h-12 placeholder:text-text-sub dark:placeholder:text-gray-500 p-4 text-base transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary`}
                        placeholder="name@example.com"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col min-w-40 flex-1">
                      <label className="text-text-main dark:text-gray-300 text-sm font-medium pb-2">
                        Mật khẩu *
                      </label>
                      <div className="relative">
                        <input
                          name="password"
                          className={`w-full rounded-lg border ${
                            errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-background-light dark:bg-gray-800 text-text-main dark:text-white h-12 placeholder:text-text-sub dark:placeholder:text-gray-500 p-4 pr-12 text-base transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary`}
                          placeholder="Tạo mật khẩu"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          disabled={loading}
                        />
                        <button
                          type="button"
                          className="absolute right-0 top-0 bottom-0 flex items-center justify-center pr-4 cursor-pointer text-text-sub dark:text-gray-400 hover:text-primary transition-colors"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={loading}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {showPassword ? "visibility_off" : "visibility"}
                          </span>
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                      )}
                      <p className="text-xs text-text-sub dark:text-gray-400 mt-1">
                        Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ cái và số
                      </p>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="flex flex-col min-w-40 flex-1">
                      <label className="text-text-main dark:text-gray-300 text-sm font-medium pb-2">
                        Xác nhận mật khẩu *
                      </label>
                      <div className="relative">
                        <input
                          name="confirmPassword"
                          className={`w-full rounded-lg border ${
                            errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-background-light dark:bg-gray-800 text-text-main dark:text-white h-12 placeholder:text-text-sub dark:placeholder:text-gray-500 p-4 pr-12 text-base transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary`}
                          placeholder="Nhập lại mật khẩu"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          disabled={loading}
                        />
                        <button
                          type="button"
                          className="absolute right-0 top-0 bottom-0 flex items-center justify-center pr-4 cursor-pointer text-text-sub dark:text-gray-400 hover:text-primary transition-colors"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          disabled={loading}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {showConfirmPassword ? "visibility_off" : "visibility"}
                          </span>
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                      )}
                    </div>

                    {/* Register Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center rounded-lg h-12 px-5 bg-primary hover:bg-primary-dark text-white text-base font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed relative"
                      >
                        {loading ? (
                          <>
                            <span className="opacity-0">Đăng ký tài khoản</span>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          </>
                        ) : (
                          'Đăng ký tài khoản'
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Login Link */}
                  <div className="text-center pt-2">
                    <p className="text-text-main dark:text-gray-300 text-sm">
                      Đã có tài khoản?{' '}
                      <Link href="/account/login" className="text-primary font-bold hover:underline transition-all">
                        Đăng nhập ngay
                      </Link>
                    </p>
                  </div>

                  <p className="text-xs text-center text-text-sub dark:text-gray-500 mt-4">
                    Bằng cách đăng ký, bạn đồng ý với{' '}
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
  
  );
}