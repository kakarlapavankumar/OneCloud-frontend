import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarDays,
  Wallet,
  BriefcaseBusiness,
  Banknote,
  BarChart3,
  Settings,
} from "lucide-react";

interface Props {
  mobile?: boolean;
  onNavigate?: () => void;
}

const links = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Employees",
    path: "/employees",
    icon: Users,
  },
  {
    label: "Attendance",
    path: "/attendance",
    icon: CalendarCheck,
  },
  {
    label: "Leave",
    path: "/leave",
    icon: CalendarDays,
  },
  {
    label: "Payroll",
    path: "/payroll",
    icon: Wallet,
  },
  {
    label: "CRM",
    path: "/crm",
    icon: BriefcaseBusiness,
  },
  {
    label: "Finance",
    path: "/finance",
    icon: Banknote,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: BarChart3,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar({ mobile = false, onNavigate }: Props) {
  return (
    <aside
      className={`${
        mobile ? "w-full" : "hidden w-64 shrink-0 lg:block"
      } border-r border-slate-200 bg-white`}
    >
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <span className="text-2xl font-black text-blue-600">OneCloud</span>
      </div>

      <nav className="space-y-1 p-4">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              }
            >
              <Icon size={19} />

              {link.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
