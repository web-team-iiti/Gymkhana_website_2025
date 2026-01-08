"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import { signIn, getSession } from "next-auth/react"; // <--- Added getSession
import { 
  FaEye, 
  FaEyeSlash,
  FaArrowLeft,
  FaExclamationCircle,
  FaSpinner,
  FaUserTie // Default icon
} from "react-icons/fa";

const Login = () => {
  const router = useRouter(); 
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(null);
  const [error, setError] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);

  // Define where each role redirects after automatic detection
  const roleRoutes = {
    club_head: "/dashboard/club_head",
    gs: "/dashboard/general_secretary",
    office: "/dashboard/office",
    adosa: "/dashboard/adosa",
    dosa: "/dashboard/dosa",
    student: "/dashboard/student",
  };

  // Default Theme (Gymkhana Gold)
  const theme = {
    color: "from-yellow-400 to-yellow-600",
    activeText: "text-yellow-400",
    activeBorder: "border-yellow-500",
    activeShadow: "shadow-[0_0_10px_rgba(234,179,8,0.4)]"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setIsLoading(true);  

    // --- Validation Checks ---
    if (!formData.email.endsWith("@iiti.ac.in")) {
      setError("Please use your official institute email (@iiti.ac.in)");
      setIsLoading(false);
      return;
    } 
    if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long");
        setIsLoading(false);
        return;
    } 

    try {
        // 1. Sign In with Credentials (No role passed)
        const result = await signIn("credentials", {
            redirect: false, 
            email: formData.email,
            password: formData.password,
        }); 

        if (result?.error) {
            throw new Error("Invalid credentials.");
        } 

        if (result?.ok) {
            console.log("Login successful, detecting role..."); 
            
            // 2. Fetch Session to detect Role automatically
            const session = await getSession();
            
            if (session?.user?.role) {
                // 3. Determine destination based on database role
                const detectedRole = session.user.role;
                const destination = roleRoutes[detectedRole] || "/dashboard";
                
                console.log(`Role detected: ${detectedRole}, Redirecting to: ${destination}`);
                
                router.refresh();  
                router.push(destination);
            } else {
                throw new Error("User role not found in session.");
            }
        } 
    } catch (err) {
        console.error("Login Error:", err);
        setError(err.message || "Login failed. Please check your connection.");
    } finally {
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
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:text-white hover:bg-white/10 hover:border-white/30'}`}
      >
        <FaArrowLeft className={`transition-transform duration-300 ${!isLoading && 'group-hover:-translate-x-1'}`} />
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
            <div className={`mx-auto w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 ${theme.activeShadow}`}>
                <FaUserTie className={`text-2xl ${theme.activeText}`} />
            </div>
            <span className="text-xl font-bold tracking-tighter block mb-1">Students'  <span className="text-yellow-500">Gymkhana</span></span>
            <h2 className="text-2xl font-bold text-white">Portal Login</h2>
            <p className="text-gray-400 text-sm mt-2">Enter your credentials to access the dashboard.</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <label className={`absolute left-0 transition-all duration-300 ${isFocused === 'email' || formData.email ? '-top-5 text-xs text-yellow-500' : 'top-2 text-sm text-gray-500'}`}>
                Institute Email ID
              </label>
              <input
                type="email"
                required
                disabled={isLoading}
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (error) setError(""); 
                }}
                onFocus={() => setIsFocused('email')}
                onBlur={() => setIsFocused(null)}
                className={`w-full bg-transparent border-b py-2 text-white focus:outline-none transition-colors 
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                  ${error && !formData.email.endsWith("@iiti.ac.in") ? "border-red-500 focus:border-red-500" : "border-gray-700 focus:border-yellow-500"}`}
              />
            </div>

            <div className="relative group">
              <label className={`absolute left-0 transition-all duration-300 ${isFocused === 'password' || formData.password ? '-top-5 text-xs text-yellow-500' : 'top-2 text-sm text-gray-500'}`}>
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                disabled={isLoading}
                value={formData.password}
                onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (error) setError("");
                }}
                onFocus={() => setIsFocused('password')}
                onBlur={() => setIsFocused(null)}
                className={`w-full bg-transparent border-b border-gray-700 py-2 text-white focus:outline-none focus:border-yellow-500 transition-colors pr-10
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                  ${error && formData.password.length < 8 && formData.password.length > 0 ? "border-red-500 focus:border-red-500" : ""}`}
              />
              <button
                type="button"
                disabled={isLoading}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-2 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 p-3 rounded-lg border border-red-400/20 animate-pulse">
                <FaExclamationCircle className="shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-3.5 mt-2 rounded-xl font-bold text-white tracking-wide
                bg-gradient-to-r ${theme.color}
                shadow-lg 
                flex items-center justify-center gap-2
                transition-all duration-300 relative overflow-hidden group
                ${isLoading 
                  ? 'opacity-70 cursor-not-allowed grayscale-[0.5]' 
                  : 'hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                }
              `}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" /> Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </button>
        </form>
      </div>
    </div>
  );
};

export default Login;