import { apiFetch } from "./api";

export const registerUser = async (formData) => {
  return await apiFetch("/register", {
    method: "POST",
    body: formData,
  });
};

export const loginUser = async (formData) => {
  return await apiFetch("/login", {
    method: "POST",
    body: JSON.stringify(formData),
  });
};

export const logoutUser = async () => {
  return await apiFetch("/logout", {
    method: "POST",
  });
};

export const getMe = async () => {
  return await apiFetch("/me");
};
 