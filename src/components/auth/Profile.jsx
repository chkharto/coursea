import React, { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, Pencil, Upload, X } from "lucide-react";
import { getMe } from "../../api/authService";
import { updateProfile } from "../../api/profileService";

const Profile = ({ setProfile }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    age: "",
    avatar: null,
  });

  const [initialData, setInitialData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    age: "",
    avatarUrl: "",
  });

  const [previewUrl, setPreviewUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateField = (name, value) => {
    const safeValue = String(value ?? "");

    switch (name) {
      case "fullName":
        if (!safeValue.trim()) return "Name is required";
        if (safeValue.trim().length < 3) {
          return "Name must be at least 3 characters";
        }
        if (safeValue.trim().length > 50) {
          return "Name must not exceed 50 characters";
        }
        return "";

      case "email":
        if (!safeValue.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeValue)) {
          return "Please enter a valid email";
        }
        return "";

      case "mobileNumber": {
        const cleaned = safeValue.replace(/\s/g, "");
        if (!cleaned) return "Mobile number is required";
        if (!/^5\d{8}$/.test(cleaned)) {
          return "Please enter a valid Georgian mobile number";
        }
        return "";
      }

      case "age":
        if (safeValue === "") return "Age is required";
        if (isNaN(Number(safeValue))) return "Age must be a number";
        if (Number(safeValue) < 16) {
          return "You must be at least 16 years old to enroll";
        }
        if (Number(safeValue) > 120) {
          return "Please enter a valid age";
        }
        return "";

      default:
        return "";
    }
  };

  const validateAll = () => {
    const newErrors = {
      fullName: validateField("fullName", formData.fullName),
      email: validateField("email", formData.email),
      mobileNumber: validateField("mobileNumber", formData.mobileNumber),
      age: validateField("age", formData.age),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  useEffect(() => {
    const fetchMe = async () => {
      try {
        setLoadingProfile(true);
        setError("");

        const data = await getMe();
        console.log("GET ME RESPONSE:", data);

        const user = data?.data || data?.user || data;

        const mappedData = {
          fullName:
            user?.fullName ||
            user?.full_name ||
            user?.name ||
            user?.username ||
            "",
          email: user?.email || "",
          mobileNumber:
            user?.mobileNumber || user?.mobile_number || user?.mobile || "",
          age: user?.age ? String(user.age) : "",
          avatar: null,
        };

        const avatarUrl =
          user?.avatarUrl ||
          user?.avatar_url ||
          user?.avatar ||
          user?.profile_image ||
          "";

        setFormData(mappedData);
        setInitialData({
          fullName: mappedData.fullName,
          email: mappedData.email,
          mobileNumber: mappedData.mobileNumber,
          age: mappedData.age,
          avatarUrl,
        });
        setPreviewUrl(avatarUrl);
      } catch (err) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchMe();
  }, []);

  useEffect(() => {
    if (!formData.avatar) return;

    const objectUrl = URL.createObjectURL(formData.avatar);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [formData.avatar]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setSuccess("");

    if (name === "avatar") {
      const file = files?.[0] || null;
      setFormData((prev) => ({
        ...prev,
        avatar: file,
      }));
      return;
    }

    let finalValue = value;

    if (name === "mobileNumber") {
      finalValue = value.replace(/[^\d\s]/g, "");
    }

    if (name === "age") {
      finalValue = value.replace(/[^\d]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, finalValue),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const isComplete = useMemo(() => {
    return (
      formData.fullName.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      /^5\d{8}$/.test((formData.mobileNumber || "").replace(/\s/g, "")) &&
      Number(formData.age) >= 16 &&
      Number(formData.age) <= 120
    );
  }, [formData]);

  const isDirty = useMemo(() => {
    return (
      formData.fullName !== initialData.fullName ||
      formData.email !== initialData.email ||
      formData.mobileNumber !== initialData.mobileNumber ||
      formData.age !== initialData.age ||
      !!formData.avatar
    );
  }, [formData, initialData]);

  const handleClose = () => {
    if (isDirty) {
      const shouldClose = window.confirm(
        "Your profile has unsaved changes. Close anyway?",
      );

      if (!shouldClose) return;
    }

    setProfile(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const valid = validateAll();
    if (!valid) return;

    try {
      setLoadingSave(true);

      const payload = new FormData();
      payload.append("full_name", formData.fullName.trim());
      payload.append(
        "mobile_number",
        (formData.mobileNumber || "").replace(/\s/g, ""),
      );
      payload.append("age", String(formData.age));

      if (formData.avatar) {
        payload.append("avatar", formData.avatar);
      }

      const data = await updateProfile(payload);
      console.log("UPDATE PROFILE RESPONSE:", data);

      setSuccess("Profile updated successfully");

      setInitialData({
        fullName: formData.fullName,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        age: formData.age,
        avatarUrl: previewUrl,
      });

      setFormData((prev) => ({
        ...prev,
        avatar: null,
      }));

      setTimeout(() => {
        setProfile(false);
      }, 900);
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoadingSave(false);
    }
  };

  const getInputBorder = (fieldName) => {
    if (errors[fieldName] && touched[fieldName]) return "border-red-500";
    if (!errors[fieldName] && touched[fieldName]) return "border-green-500";
    return "border-[#D1D1D1]";
  };

  const getStatusIcon = (fieldName) => {
    if (errors[fieldName] && touched[fieldName]) {
      return <X className="w-4 h-4 text-red-500" />;
    }

    if (!errors[fieldName] && touched[fieldName]) {
      return <Check className="w-4 h-4 text-green-500" />;
    }

    return null;
  };

  if (loadingProfile) {
    return (
      <div className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl p-8 w-full max-w-[390px]">
          <p className="text-center text-[#666666]">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl p-8 w-full max-w-[390px] relative max-h-[95vh] overflow-y-auto">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#8A8A8A] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h1 className="text-center text-[32px] font-semibold text-[#141414]">
          Profile
        </h1>

        <div className="mt-6 flex items-center gap-3">
          <div className="relative">
            <img
              src={
                previewUrl ||
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"
              }
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                isComplete ? "bg-[#34C759]" : "bg-[#F4B400]"
              }`}
            />
          </div>

          <div>
            <h2 className="text-[16px] font-semibold text-[#141414]">
              {formData.fullName || "Username"}
            </h2>
            <p
              className={`text-[12px] font-medium ${
                isComplete ? "text-[#34C759]" : "text-[#F4B400]"
              }`}
            >
              {isComplete ? "Profile is Complete" : "Profile is Incomplete"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5">
          <div>
            <label className="mb-2 block text-[14px] font-medium text-[#000000]">
              Full Name
            </label>

            <div className="relative">
              <input
                type="text"
                name="fullName"
                placeholder="Username"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`h-12 w-full rounded-lg border-[1.5px] px-3.5 py-3 pr-10 text-[14px] text-[#808080] outline-none font-medium placeholder:text-[#B0B0B0] focus:border-[#5B4CF0] ${getInputBorder(
                  "fullName",
                )}`}
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {getStatusIcon("fullName") || (
                  <Pencil className="w-4 h-4 text-[#B0B0B0]" />
                )}
              </div>
            </div>

            {errors.fullName && touched.fullName && (
              <p className="mt-1 text-[12px] text-red-500">{errors.fullName}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-[14px] font-medium text-[#000000]">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email@gmail.com"
                value={formData.email}
                onBlur={handleBlur}
                disabled
                className={`h-12 w-full rounded-lg border-[1.5px] px-3.5 py-3 pr-10 text-[14px] text-[#808080] outline-none font-medium placeholder:text-[#B0B0B0] bg-[#FCFCFC] ${getInputBorder(
                  "email",
                )}`}
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {getStatusIcon("email")}
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <div className="flex-1">
              <label className="mb-2 block text-[14px] font-medium text-[#000000]">
                Mobile Number
              </label>

              <div className="relative">
                <input
                  type="text"
                  name="mobileNumber"
                  placeholder="+995 5XX XX XX XX"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`h-12 w-full rounded-lg border-[1.5px] px-3.5 py-3 pr-10 text-[14px] text-[#808080] outline-none font-medium placeholder:text-[#B0B0B0] focus:border-[#5B4CF0] ${getInputBorder(
                    "mobileNumber",
                  )}`}
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {getStatusIcon("mobileNumber")}
                </div>
              </div>

              {errors.mobileNumber && touched.mobileNumber && (
                <p className="mt-1 text-[12px] text-red-500">
                  {errors.mobileNumber}
                </p>
              )}
            </div>

            <div className="w-[72px]">
              <label className="mb-2 block text-[14px] font-medium text-[#000000]">
                Age
              </label>

              <div className="relative">
                <input
                  type="text"
                  name="age"
                  placeholder="29"
                  value={formData.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`h-12 w-full rounded-lg border-[1.5px] px-3 py-3 pr-8 text-[14px] text-[#808080] outline-none font-medium placeholder:text-[#B0B0B0] focus:border-[#5B4CF0] ${getInputBorder(
                    "age",
                  )}`}
                />

                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B0B0B0]" />
              </div>

              {errors.age && touched.age && (
                <p className="mt-1 text-[12px] text-red-500">{errors.age}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-[14px] font-medium text-[#000000]">
              Upload Avatar
            </label>

            <label className="flex h-[114px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-[1.5px] border-[#D1D1D1] bg-white text-center">
              <Upload className="w-6 h-6 text-[#B0B0B0]" />
              <p className="mt-2 text-[14px] text-[#666666]">
                Drag and drop or{" "}
                <span className="text-[#4F46E5] underline">Upload file</span>
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

          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
          {success && <p className="mt-3 text-sm text-green-600">{success}</p>}

          <button
            type="submit"
            disabled={loadingSave}
            className="mt-4 h-11.75 w-full rounded-lg bg-[#4F46E5] text-[16px] font-medium text-[#F5F5F5] transition hover:bg-[#4338CA] disabled:opacity-70 cursor-pointer"
          >
            {loadingSave ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
