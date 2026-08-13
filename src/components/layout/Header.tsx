import { Menu, LogOut, UserCircle } from "lucide-react";

import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

interface Props {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: Props) {
  const { user, logoutUser } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
      >
        <Menu size={22} />
      </button>

      <div className="hidden lg:block">
        <h2 className="font-semibold text-slate-800">
          Employee Management System
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/profile" className="flex items-center gap-2">
          <UserCircle size={30} className="text-blue-600" />

          <div className="hidden sm:block">
            <p className="text-sm font-semibold">{user?.name}</p>

            <p className="text-xs text-slate-500">{user?.role}</p>
          </div>
        </Link>

        <button
          onClick={logoutUser}
          className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
          title="Logout"
        >
          <LogOut size={19} />
        </button>
      </div>
    </header>
  );
}
