import { useState, useEffect } from "react";
import { API_BASE_URL } from "./config";

export default function Posts({ user, token, onLogout }) {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [editing, setEditing] = useState(null);

  const handleEdit = (post) => {
    setEditing(post);
    setContent(post.content);
  };

  useEffect(() => {
    const loadPosts = async () => {
      const res = await fetch(`${API_BASE_URL}/api/posts`);
      const data = await res.json();
      setPosts(data);
    };

    loadPosts();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!content || !token) return;

    if (editing) {
      await fetch(`${API_BASE_URL}/api/posts/${editing.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      setPosts((currentPosts) =>
        currentPosts.map((p) => (p.id === editing.id ? { ...p, content } : p)),
      );
      setEditing(null);
      setContent("");
      return;
    }

    const res = await fetch(`${API_BASE_URL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });
    const post = await res.json();

    setPosts((currentPosts) => [post, ...currentPosts]);
    setContent("");
  };

  const handleDelete = async (id) => {
    if (!token) return;

    await fetch(`${API_BASE_URL}/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setPosts((currentPosts) => currentPosts.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 flex justify-between items-center">
          <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Posts
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-sm">
              Hi,{" "}
              <span className="font-medium text-gray-700">{user.username}</span>
            </span>
            <button
              onClick={onLogout}
              className="bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-500 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto mt-6 px-4">
        {/* Create Post */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 mb-6 shadow-sm border border-white/40">
          <form onSubmit={handlePost} className="flex flex-col gap-3">
            <textarea
              className="border border-gray-200 rounded-xl px-4 py-3 text-gray-800 bg-gray-50/60 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition min-h-[80px]"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-5 py-2 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                {editing ? "Update" : "Post"}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setContent("");
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-5 py-2 rounded-xl transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Posts List */}
        <div className="flex flex-col gap-4 pb-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white/40 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                    {post.username?.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-gray-800">
                    {post.username}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {post.content}
              </p>
              <div className="flex gap-3 mt-4 pt-3 border-t border-gray-100">
                <button
                  onClick={() => handleEdit(post)}
                  className="text-indigo-500 hover:text-indigo-700 text-sm font-medium transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-400 hover:text-red-600 text-sm font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
