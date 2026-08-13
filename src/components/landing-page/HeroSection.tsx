import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-6xl text-center">
        <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
          Enterprise HRMS Platform
        </span>

        <h1 className="mt-7 text-5xl font-black tracking-tight text-slate-900 md:text-6xl">
          Manage your workforce
          <span className="block text-blue-600">smarter with OneCloud</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          OneCloud brings employees, attendance, leave, payroll, finance and
          reporting into one modern platform.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/register"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}
