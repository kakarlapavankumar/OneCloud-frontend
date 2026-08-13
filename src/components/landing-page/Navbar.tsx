import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 lg:px-12">
      <Link to="/" className="text-2xl font-black text-blue-600">
        OneCloud
      </Link>

      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
