import API from "./axios";

export const getBlogs = async () => {
  try {
    const response = await API.get("/blogs");
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Failed to fetch blogs";
  }
};

export const createBlog = async (blogData) => {
  try {
    const response = await API.post("/blogs", blogData);
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Failed to create blog";
  }
};

export const updateBlog = async (id, blogData) => {
  try {
    const response = await API.put(`/blogs/${id}`, blogData);
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Failed to update blog";
  }
};

export const deleteBlog = async (id) => {
  try {
    const response = await API.delete(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Failed to delete blog";
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await API.get(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Failed to fetch blog";
  }
};
