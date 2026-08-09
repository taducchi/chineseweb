import { useGoogleLogin } from '@react-oauth/google';

const GoogleSignInButton = ({ handleGoogleSignIn }) => {
  const login = useGoogleLogin({
    onSuccess: tokenResponse => handleGoogleSignIn(tokenResponse),
    onError: (error) => console.error('Login Failed:', error),
  });

  return (
    <button
      onClick={() => login()}
      className="group w-full rounded-2xl bg-gradient-to-r from-red-500 to-red-600 
                 px-6 py-3.5 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40
                 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300
                 flex items-center justify-center gap-3 border-0"
    >
      {/* White Google Icon */}
      <svg className="w-5 h-5 flex-shrink-0 drop-shadow-sm" viewBox="0 0 48 48">
        <path fill="#FFFFFF" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#FFFFFF" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FFFFFF" d="M10.53 28.59A14.5 14.5 0 0 1 9.5 24c0-1.59.28-3.14.76-4.59l-7.98-6.19A23.99 23.99 0 0 0 0 24c0 3.77.87 7.35 2.56 10.56l7.97-5.97z"/>
        <path fill="#FFFFFF" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 5.97C6.51 42.62 14.62 48 24 48z"/>
      </svg>
      
      <span className="text-sm font-semibold text-white tracking-wide">
        Đăng nhập với Google
      </span>
      
      {/* Sparkle icon */}
      <svg className="w-4 h-4 text-white/80 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    </button>
  );
};

export default GoogleSignInButton;