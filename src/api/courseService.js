import { apiFetch } from "./api";

export const getFeaturedCourses = async () => {
  return await apiFetch("/courses/featured");
};

export const getInProgressCourses = async () => {
  return await apiFetch("/courses/in-progress");
};

export const getCourses = async (queryParams = "") => {
  return await apiFetch(`/courses${queryParams}`);
};

export const getCourseById = async (id) => {
  return await apiFetch(`/courses/${id}`);
};

export const getCategories = async () => {
  return await apiFetch("/categories");
}; 

export const getTopics = async () => {
  return await apiFetch("/topics");
};

export const getInstructors = async () => {
  return await apiFetch("/instructors");
};
