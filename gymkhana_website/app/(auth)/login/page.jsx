"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  FaArrowLeft,
  FaExclamationCircle,
  FaSpinner,
  FaUserTie,
} from "react-icons/fa";

const LoginContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);

  // Detect error from NextAuth redirect (e.g., AccessDenied)
  const authError = searchParams.get("error");
  const errorMessage =
    authError === "AccessDenied"
      ? "Access denied. Only pre-registered @iiti.ac.in accounts are allowed."
      : authError
        ? "Authentication failed. Please try again."
        : "";

  // Default Theme (Gymkhana Gold)
  const theme = {
    color: "from-yellow-400 to-yellow-600",
    activeText: "text-yellow-400",
    activeBorder: "border-yellow-500",
    activeShadow: "shadow-[0_0_10px_rgba(234,179,8,0.4)]",
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      // signIn("google") redirects to Google's OAuth page
      // After Google auth, NextAuth signIn callback runs (checks DB + role)
      // On success: redirected to /dashboard (then middleware handles role-based routing)
      // On failure: redirected to /login?error=AccessDenied
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0a0a] font-sans text-white h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* --- BACK BUTTON --- */}
      <button
        onClick={() => !isLoading && router.back()}
        disabled={isLoading}
        className={`absolute top-4 left-4 md:top-6 md:left-6 z-50 flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 text-white/70 backdrop-blur-md group transition-all duration-300
        ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:text-white hover:bg-white/10 hover:border-white/30"}`}
      >
        <FaArrowLeft
          className={`transition-transform duration-300 ${!isLoading && "group-hover:-translate-x-1"}`}
        />
        <span className="text-sm font-medium hidden md:block">Back</span>
      </button>

      {/* --- Background Effects --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r ${theme.color} rounded-full blur-[150px] opacity-10 transition-all duration-1000 ease-in-out`}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* --- Login Card --- */}
      <div className="relative z-10 w-[90%] sm:w-[450px] bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden p-8 md:p-10">
        {/* HEADER */}
        <div className="text-center mb-8">
          <div
            className={`mx-auto w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 ${theme.activeShadow}`}
          >
            <FaUserTie className={`text-2xl ${theme.activeText}`} />
          </div>
          <span className="text-xl font-bold tracking-tighter block mb-1">
            Students&apos;{" "}
            <span className="text-yellow-500">Gymkhana</span>
          </span>
          <h2 className="text-2xl font-bold text-white">Portal Login</h2>
          <p className="text-gray-400 text-sm mt-2">
            Sign in with your institute Google account to access the dashboard.
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {errorMessage && (
          <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 p-3 rounded-lg border border-red-400/20 mb-6">
            <FaExclamationCircle className="shrink-0" />
            {errorMessage}
          </div>
        )}

        {/* GOOGLE SIGN-IN BUTTON */}
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className={`
            w-full py-3 px-4 rounded-xl font-medium text-gray-700
            bg-white border border-transparent hover:bg-gray-100
            shadow-md flex items-center justify-center gap-3
            transition-all duration-300 relative overflow-hidden group
            ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg active:scale-[0.98]"}
          `}
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin text-gray-500" /> Redirecting to Google...
            </>
          ) : (
            <>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-6 h-6">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
              <span className="tracking-wide text-[15px]">Sign in with Google</span>
            </>
          )}
        </button>

        {/* DOMAIN INFO */}
        <p className="text-gray-500 text-xs text-center mt-4">
          Only <span className="text-gray-400 font-medium">@iiti.ac.in</span>{" "}
          accounts are allowed.
        </p>
      </div>
    </div>
  );
};

const Login = () => {
  return (
    <React.Suspense fallback={<div className="flex h-screen items-center justify-center bg-[#0a0a0a] text-white">Loading...</div>}>
      <LoginContent />
    </React.Suspense>
  );
};

export default Login;