import { useState, useEffect } from "react";
import { API_BASE_URL } from "./config";

export default function Posts({ user, token, onLogout }) {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [editing, setEditing] = useState(null);
  const userInitial = user.username?.charAt(0).toUpperCase() || "?";

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
    <div className="min-h-screen bg-black text-slate-100">
      <div className="mx-auto min-h-screen max-w-2xl border-x border-slate-800 bg-black">
        <header className="sticky top-0 z-10 border-b border-slate-800 bg-black/85 px-5 py-3 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-black tracking-tight">Home</h1>
              <p className="text-xs font-medium text-slate-500">
                Latest posts from your network
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden text-sm font-semibold text-slate-400 sm:inline">
                @{user.username}
              </span>
              <button
                onClick={onLogout}
                className="rounded-full border border-slate-700 px-4 py-2 text-sm font-bold text-slate-200 transition-colors hover:bg-slate-900"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main>
          <form
            onSubmit={handlePost}
            className="flex gap-3 border-b border-slate-800 px-5 py-4"
          >
            <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-500 text-base font-black text-white">
              {userInitial}
            </div>
            <div className="min-w-0 flex-1">
              <textarea
                className="min-h-[96px] w-full resize-none border-0 bg-transparent px-0 py-2 text-lg leading-relaxed text-slate-100 outline-none placeholder:text-slate-500"
                placeholder="What is happening?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex items-center justify-end gap-2 border-t border-slate-900 pt-3">
                {editing && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(null);
                      setContent("");
                    }}
                    className="rounded-full px-4 py-2 text-sm font-bold text-slate-300 transition-colors hover:bg-slate-900"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={!content.trim()}
                  className="rounded-full bg-sky-500 px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {editing ? "Update" : "Post"}
                </button>
              </div>
            </div>
          </form>

          {posts.length === 0 && (
            <div className="border-b border-slate-800 px-5 py-12 text-center">
              <p className="text-lg font-bold text-slate-100">No posts yet</p>
              <p className="mt-1 text-sm text-slate-500">
                Be the first to start the timeline.
              </p>
            </div>
          )}

          {posts.map((post) => (
            <article
              key={post.id}
              className="border-b border-slate-800 px-5 py-4 transition-colors hover:bg-slate-950"
            >
              <div className="flex gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-700 text-base font-black text-white">
                  {post.username?.charAt(0).toUpperCase() || "?"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-baseline gap-x-2">
                    <span className="font-bold text-slate-100">
                      {post.username}
                    </span>
                    <span className="text-sm text-slate-500">
                      @{post.username}
                    </span>
                  </div>
                  <p className="whitespace-pre-line text-[15px] leading-relaxed text-slate-200">
                    {post.content}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="rounded-full px-3 py-1.5 text-sm font-bold text-sky-400 transition-colors hover:bg-sky-500/10"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="rounded-full px-3 py-1.5 text-sm font-bold text-rose-400 transition-colors hover:bg-rose-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </main>
      </div>
    </div>
  );
}
