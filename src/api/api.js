const BASE_URL = "https://api.redclass.redberryinternship.ge/api";

export const getToken = () => localStorage.getItem("token");

export const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
