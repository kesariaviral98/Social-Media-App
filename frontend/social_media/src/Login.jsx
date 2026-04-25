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
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10 text-slate-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-slate-800 bg-[#16181c] p-8 shadow-[0_24px_70px_rgba(0,0,0,0.55)] flex flex-col gap-5"
      >
        <div className="flex flex-col items-center gap-2 mb-1">
          <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center text-white text-xl font-black shadow-sm">
            X
          </div>
          <h2 className="text-2xl font-bold text-slate-50 tracking-tight">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-sm text-slate-400">
            {isRegister ? "Join the conversation" : "Log in to see what is new"}
          </p>
        </div>
        <input
          className="border border-slate-700 rounded-xl px-4 py-3 text-slate-50 bg-black focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition placeholder:text-slate-500"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          className="border border-slate-700 rounded-xl px-4 py-3 text-slate-50 bg-black focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition placeholder:text-slate-500"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-full shadow-sm transition-colors"
        >
          {isRegister ? "Register" : "Log In"}
        </button>
        <p className="text-center text-sm text-slate-400">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-sky-500 font-semibold hover:underline"
          >
            {isRegister ? "Log In" : "Register"}
          </button>
        </p>
      </form>
    </div>
  );
}
