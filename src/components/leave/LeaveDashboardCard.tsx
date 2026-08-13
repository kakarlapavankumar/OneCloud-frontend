import React from "react";
import { Link } from "react-router-dom";

interface LeaveDashboardCardProps {
  title: string;
  description: string;
  to: string;
  icon?: React.ReactNode;
}

const LeaveDashboardCard: React.FC<LeaveDashboardCardProps> = ({
  title,
  description,
  to,
  icon,
}) => {
  return (
    <Link
      to={to}
      className="
        group block rounded-2xl bg-white p-6
        shadow-sm ring-1 ring-slate-200
        transition-all duration-200
        hover:-translate-y-1
        hover:shadow-lg
        hover:ring-blue-300
      "
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>

      <div className="mt-5 text-sm font-semibold text-blue-600">Open →</div>
    </Link>
  );
};

export default LeaveDashboardCard;
