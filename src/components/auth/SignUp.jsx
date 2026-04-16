import React, { useState } from "react";
import { registerUser } from "../../api/authService";
import { ChevronLeft, Eye, EyeOff, Upload, X } from "lucide-react";

const SignUp = ({ setSignup, setLogin }) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    username: "",
    avatar: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar") {
      setFormData((prev) => ({
        ...prev,
        avatar: files[0],
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    setError("");

    if (step === 1) {
      if (!formData.email.trim()) {
        setError("Email is required");
        return;
      }
    }

    if (step === 2) {
      if (!formData.password || !formData.password_confirmation) {
        setError("Both password fields are required");
        return;
      }

      if (formData.password !== formData.password_confirmation) {
        setError("Passwords do not match");
        return;
      }
    }

    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setError("");
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.username.trim()) {
      setError("Username is required");
      return;
    }

    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("email", formData.email);
      payload.append("password", formData.password);
      payload.append("password_confirmation", formData.password_confirmation);
      payload.append("username", formData.username);

      if (formData.avatar) {
        payload.append("avatar", formData.avatar);
      }

      const data = await registerUser(payload);
      console.log("REGISTER RESPONSE:", data);

      setSignup(false);
      setLogin(true);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl p-10 w-full max-w-md relative">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={step > 1 ? prevStep : undefined}
            className={`cursor-pointer ${
              step === 1 ? "opacity-0 pointer-events-none" : ""
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-[#8A8A8A]" />
          </button>

          <button
            type="button"
            onClick={() => setSignup(false)}
            className="cursor-pointer"
          >
            <X className="w-5 h-5 text-[#8A8A8A]" />
          </button>
        </div>

        <div className="mt-2">
          <h1 className="text-center text-[32px] font-semibold text-[#141414]">
            Create Account
          </h1>
          <p className="mt-1.5 text-center font-medium text-[14px] text-[#666666]">
            Join and start learning today
          </p>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <div
            className={`h-1 w-full rounded-full ${
              step == 1 ? "bg-[#B7B3F4]" : "bg-[#4F46E5]"
            }`}
          />
          <div 
            className={`h-1 w-full rounded-full ${
              step == 2 ? "bg-[#B7B3F4]" : step > 2 ? "bg-[#4F46E5]" : "bg-[#EEEDFC]"
            }`}
          />
          <div
            className={`h-1 w-full rounded-full ${
              step >= 3 ? "bg-[#B7B3F4]" : "bg-[#EEEDFC]"
            }`}
          />
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          {step === 1 && (
            <div>
              <label className="mb-2 block text-[14px] font-medium text-[#000000]">
                Email*
              </label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border-[1.5px] border-[#D1D1D1] px-3.5 py-3 text-[14px] text-[#808080] outline-none font-medium placeholder:text-[#808080] focus:border-[#5B4CF0]"
              />

              {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

              <button
                type="button"
                onClick={nextStep}
                className="mt-4 h-11.75 w-full rounded-lg bg-[#4F46E5] text-[16px] font-medium text-[#F5F5F5] transition hover:bg-[#4338CA] cursor-pointer"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <div>
                <label className="mb-2 block text-[14px] font-medium text-[#000000]">
                  Password*
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="h-12 w-full rounded-lg border-[1.5px] border-[#D1D1D1] px-3.5 py-3 text-[14px] text-[#808080] outline-none font-medium placeholder:text-[#808080] focus:border-[#5B4CF0]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#9B9B9B]"
                  >
                    {showPassword ? (
                      <Eye className="cursor-pointer w-5.5 h-5.5" />
                    ) : (
                      <EyeOff className="cursor-pointer w-5.5 h-5.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-[14px] font-medium text-[#000000]">
                  Confirm Password*
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="password_confirmation"
                    placeholder="••••••••"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    className="h-12 w-full rounded-lg border-[1.5px] border-[#D1D1D1] px-3.5 py-3 text-[14px] text-[#808080] outline-none font-medium placeholder:text-[#808080] focus:border-[#5B4CF0]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#9B9B9B]"
                  >
                    {showConfirmPassword ? (
                      <Eye className="cursor-pointer w-5.5 h-5.5" />
                    ) : (
                      <EyeOff className="cursor-pointer w-5.5 h-5.5" />
                    )}
                  </button>
                </div>
              </div>

              {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

              <button
                type="button"
                onClick={nextStep}
                className="mt-4 h-11.75 w-full rounded-lg bg-[#4F46E5] text-[16px] font-medium text-[#F5F5F5] transition hover:bg-[#4338CA] cursor-pointer"
              >
                Next
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <div>
                <label className="mb-2 block text-[14px] font-medium text-[#000000]">
                  Username*
                </label>

                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="h-12 w-full rounded-lg border-[1.5px] border-[#D1D1D1] px-3.5 py-3 text-[14px] text-[#808080] outline-none font-medium placeholder:text-[#808080] focus:border-[#5B4CF0]"
                />
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-[14px] font-medium text-[#000000]">
                  Upload Avatar
                </label>

                <label className="flex h-36.25 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-[1.5px] border-[#D1D1D1] bg-white text-center">
                  <Upload className="w-7 h-7 text-[#A3A3A3]" />
                  <p className="mt-3 text-[14px] text-[#666666]">
                    Drag and drop or{" "}
                    <span className="text-[#4F46E5] underline">
                      Upload file
                    </span>
                  </p>
                  <p className="mt-1 text-[12px] text-[#B0B0B0]">
                    JPG, PNG or WebP
                  </p>

                  <input
                    type="file"
                    name="avatar"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>

                {formData.avatar && (
                  <p className="mt-2 text-[12px] text-[#666666]">
                    {formData.avatar.name}
                  </p>
                )}
              </div>

              {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="mt-4 h-11.75 w-full rounded-lg bg-[#4F46E5] text-[16px] font-medium text-[#F5F5F5] transition hover:bg-[#4338CA] disabled:opacity-70 cursor-pointer"
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </div>
          )}
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
            Already have an account?
          </p>
          <button
            type="button"
            onClick={() => {
              setSignup(false);
              setLogin(true);
            }}
            className="font-medium text-[#141414] underline underline-offset-4 text-[14px] cursor-pointer"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
