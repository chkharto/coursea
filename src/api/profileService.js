import { apiFetch } from "./api";

export const updateProfile = async (formData) => {
  return await apiFetch("/profile", {
    method: "PUT",
    body: formData,
  });
};