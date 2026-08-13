import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();

  const { registerUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    await registerUser(form);

    navigate("/dashboard");
  }

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <Link to="/" className="text-3xl font-black text-blue-600">
            OneCloud
          </Link>

          <h1 className="mt-5 text-2xl font-bold">Create Account</h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {(
            [
              ["name", "Full Name"],
              ["email", "Email"],
              ["username", "Username"],
              ["password", "Password"],
            ] as const
          ).map(([field, label]) => (
            <div key={field}>
              <label className="mb-1.5 block text-sm font-medium">
                {label}
              </label>

              <input
                type={
                  field === "password"
                    ? "password"
                    : field === "email"
                      ? "email"
                      : "text"
                }
                value={form[field]}
                onChange={(e) => update(field, e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
                required
              />
            </div>
          ))}

          <button className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
