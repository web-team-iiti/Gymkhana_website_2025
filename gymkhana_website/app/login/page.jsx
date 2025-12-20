"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { 
  FaUserGraduate, 
  FaUserTie, 
  FaUniversity, 
  FaBriefcase, 
  FaBuilding, 
  FaEye, 
  FaEyeSlash,
  FaArrowLeft,
  FaExclamationCircle,
  FaSpinner 
} from "react-icons/fa";

const Login = () => {
  const router = useRouter(); 
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "club_head", 
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(null);
  const [error, setError] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { 
      id: "club_head", 
      label: "Club Head", 
      icon: <FaUserGraduate />, 
      color: "from-blue-400 to-blue-600",
      activeBorder: "border-blue-500",
      activeText: "text-blue-400",
      activeShadow: "shadow-[0_0_10px_rgba(59,130,246,0.4)]"
    },
    { 
      id: "gs", 
      label: "Gen. Sec", 
      icon: <FaUserTie />, 
      color: "from-yellow-400 to-yellow-600",
      activeBorder: "border-yellow-500",
      activeText: "text-yellow-400",
      activeShadow: "shadow-[0_0_10px_rgba(234,179,8,0.4)]"
    },
    { 
      id: "office", 
      label: "Office", 
      icon: <FaBuilding />, 
      color: "from-green-400 to-green-600",
      activeBorder: "border-green-500",
      activeText: "text-green-300",
      activeShadow: "shadow-[0_0_10px_rgba(156,163,175,0.4)]"
    },
    { 
      id: "adosa", 
      label: "ADoSA", 
      icon: <FaUniversity />, 
      color: "from-purple-400 to-purple-600",
      activeBorder: "border-purple-500",
      activeText: "text-purple-400",
      activeShadow: "shadow-[0_0_10px_rgba(168,85,247,0.4)]"
    },
    { 
      id: "dosa", 
      label: "DoSA", 
      icon: <FaBriefcase />, 
      color: "from-red-400 to-red-600",
      activeBorder: "border-red-500",
      activeText: "text-red-400",
      activeShadow: "shadow-[0_0_10px_rgba(239,68,68,0.4)]"
    },
  ];

  const activeRoleObj = roles.find((r) => r.id === formData.role) || roles[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setIsLoading(true); 

    // --- 1. Email Validation ---
    if (!formData.email.endsWith("@iiti.ac.in")) {
      setError("Please use your official institute email (@iiti.ac.in)");
      setIsLoading(false);
      return;
    }

    // --- 2. Password Length Validation ---
    if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long");
        setIsLoading(false);
        return;
    }

    // --- 3. Simulate API Call ---
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log("Logging in with:", formData);
        // Navigate or handle success here
    } catch (err) {
        setError("Login failed. Please try again.");
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
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r ${activeRoleObj.color} rounded-full blur-[150px] opacity-20 transition-all duration-1000 ease-in-out`} 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* --- Login Card --- */}
      <div className="relative z-10 w-full h-full md:h-auto md:max-w-5xl md:max-h-[90vh] bg-black/40 backdrop-blur-2xl border-none md:border md:border-white/10 md:rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        
        {/* SECTION 1: ROLE SELECTION */}
        <div className="w-full md:w-2/5 p-4 md:p-8 flex flex-col justify-end md:justify-center border-b md:border-b-0 md:border-r border-white/10 bg-white/5 shrink-0">
          
          <div className="mt-16 md:mt-0 mb-4 md:mb-6 text-center md:text-left">
            <span className="text-xl font-bold tracking-tighter block mb-1">Gymkhana<span className="text-yellow-500">.</span></span>
            <h2 className="text-lg md:text-3xl font-bold text-white">Welcome Back</h2>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block mt-2">Select your role to access the portal.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:grid md:grid-cols-2">
            {roles.map((role) => (
              <button
                key={role.id}
                disabled={isLoading} 
                onClick={() => {
                  setFormData({ ...formData, role: role.id });
                  setError(""); 
                }}
                className={`
                  w-[30%] md:w-auto h-20 md:h-auto
                  relative group flex flex-col items-center justify-center p-2 md:p-3 rounded-xl border transition-all duration-300
                  ${isLoading ? 'cursor-not-allowed opacity-60' : ''}
                  ${formData.role === role.id 
                    ? `bg-white/10 ${role.activeBorder} ${role.activeShadow}`
                    : "bg-transparent border-white/5 hover:bg-white/5 hover:border-white/20"}
                `}
              >
                <div className={`text-xl md:text-2xl mb-1 md:mb-2 transition-colors duration-300 
                  ${formData.role === role.id ? role.activeText : "text-gray-500 group-hover:text-gray-300"}`}>
                  {role.icon}
                </div>
                <span className={`text-[10px] md:text-xs font-medium whitespace-nowrap
                  ${formData.role === role.id ? "text-white" : "text-gray-500 group-hover:text-gray-300"}`}>
                  {role.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 2: FORM */}
        <div className="w-full md:w-3/5 p-6 md:p-12 flex flex-col justify-center flex-1 relative">
          <div className="mb-4 md:mb-8 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">Sign In</h3>
            <p className="text-gray-400 text-xs md:text-sm">Access as <span className={activeRoleObj.activeText}>{activeRoleObj.label}</span></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="relative group">
              <label className={`absolute left-0 transition-all duration-300 ${isFocused === 'email' || formData.email ? '-top-5 text-[10px] md:-top-6 md:text-xs text-yellow-500' : 'top-2 text-sm text-gray-500'}`}>
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
              <label className={`absolute left-0 transition-all duration-300 ${isFocused === 'password' || formData.password ? '-top-5 text-[10px] md:-top-6 md:text-xs text-yellow-500' : 'top-2 text-sm text-gray-500'}`}>
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
              <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 p-2 rounded border border-red-400/20 animate-pulse">
                <FaExclamationCircle />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-3 md:py-3.5 mt-2 rounded-xl font-bold text-white tracking-wide
                bg-gradient-to-r ${activeRoleObj.color}
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
                  <FaSpinner className="animate-spin" /> Verifying...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;