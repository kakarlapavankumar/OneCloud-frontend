import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();

  const { loginUser } = useAuth();

  const [username, setUsername] = useState("admin");

  const [password, setPassword] = useState("admin123");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await loginUser({
        username,
        password,
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <Link to="/" className="text-3xl font-black text-blue-600">
            OneCloud
          </Link>

          <h1 className="mt-6 text-2xl font-bold">Welcome back</h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to your dashboard
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Username</label>

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-blue-600">
            Register
          </Link>
        </p>

        <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
          Demo login:
          <br />
          Username: <strong>admin</strong>
          <br />
          Password: <strong>admin123</strong>
        </div>
      </div>
    </div>
  );
}
