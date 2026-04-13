import { useState } from "react";
import { API_BASE_URL } from "./config";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegister
      ? `${API_BASE_URL}/api/register`
      : `${API_BASE_URL}/api/login`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (isRegister) {
      if (data.success) {
        alert("Registered! You can now log in.");
        setIsRegister(false);
      } else {
        alert(data.error || "Registration failed");
      }
      return;
    }

    if (data.success && data.token) {
      onLogin(data.user, data.token);
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 w-full max-w-sm flex flex-col gap-5 shadow-xl border border-white/40"
      >
        <div className="flex flex-col items-center gap-1 mb-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
          X
          </div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-sm text-gray-500">
            {isRegister ? "Sign up to get started" : "Log in to continue"}
          </p>
        </div>
        <input
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 bg-gray-50/60 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 bg-gray-50/60 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          {isRegister ? "Register" : "Log In"}
        </button>
        <p className="text-center text-sm text-gray-500">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-indigo-500 font-medium hover:underline"
          >
            {isRegister ? "Log In" : "Register"}
          </button>
        </p>
      </form>
    </div>
  );
}
