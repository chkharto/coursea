import React, { useState } from "react";
import { loginUser } from "../../api/authService";
import { Eye, EyeOff, X } from "lucide-react";

const Login = ({ setLogin, setSignup }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const data = await loginUser(formData);
      console.log("LOGIN RESPONSE:", data);

      const token =
        data?.token ||
        data?.access_token ||
        data?.data?.token || 
        data?.data?.access_token;

      if (!token) {
        throw new Error("Token not found in response");
      }

      localStorage.setItem("token", token);
      window.location.reload();
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl p-12.5 w-full max-w-md">
        <div className="flex justify-end cursor-pointer">
          <X className="w-3.25 h-3.25" onClick={() => setLogin(false)} />
        </div>
        <div className="">
          <h1 className="text-center text-[32px] font-semibold text-[#141414]">
            Welcome Back
          </h1>
          <p className="mt-1.5 text-center font-medium text-[14px] text-[#666666]">
            Log in to continue your learning
          </p>
          <form onSubmit={handleSubmit} className="mt-6">
            <div>
              <label className="mb-2 block text-[14px] font-medium text-[#000000]">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border-[1.5px] border-[#D1D1D1] px-3.5 py-3 text-[14px] text-[#808080] outline-none font-medium placeholder:text-[#808080] focus:border-[#5B4CF0]"
              />
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-[14px] font-medium text-[#000000]">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-12 w-full rounded-lg border-[1.5px] border-[#D1D1D1] px-3.5 py-3 text-[14px] text-[#808080] outline-none font-medium placeholder:text-[#808080] focus:border-[#5B4CF0]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[22px] text-[#9B9B9B]"
                >
                  {showPassword ? (
                    <Eye className="cursor-pointer w-5.5 h-5.5" />
                  ) : (
                    <EyeOff className="cursor-pointer w-5.5 h-5.5" />
                  )}
                </button>
              </div>
            </div>

            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 h-11.75 w-full rounded-lg bg-[#4F46E5] text-[16px] font-medium text-[#F5F5F5] transition hover:bg-[#4338CA] disabled:opacity-70 cursor-pointer"
            >
              {loading ? "Loading..." : "Log In"}
            </button>
          </form>
          <div className="mt-4 flex items-center flex-col">
            <div className="flex items-center w-full gap-4">
              <div className="h-px flex-1 bg-[#D9D9D9]" />
              <span className="text-[16px] text-[#7B7B7B]">o</span>
              <div className="h-px flex-1 bg-[#D9D9D9]" />
            </div>
            <span className="text-[16px] text-[#7B7B7B]">r</span>
          </div>

          <div className="flex items-center justify-center mt-0.5 gap-2">
            <p className="text-[12px] text-[#666666] font-normal">
              {" "}
              Don’t have an account?{" "}
            </p>
            <button
              type="button"
              onClick={() => {
                setLogin(false);
                setSignup(true);
              }}
              className="font-medium text-[#141414] underline underline-offset-4 text-[14px] cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
