import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getBlogs, deleteBlog } from "../api/blogs";

const BlogsAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBlogs()
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Manage Blogs</h2>

        <button
          onClick={() => navigate("/create-blog")}
          className="bg-green-500 text-white px-4 py-2 rounded mb-6"
        >
          + Add Blog
        </button>

        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-b">
                <td className="p-3">{blog.title}</td>
                <td className="p-3">{blog.author}</td>
                <td className="p-3">
                  {new Date(blog.publishDate).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => navigate(`/edit-blog/${blog._id}`)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogsAdmin;
