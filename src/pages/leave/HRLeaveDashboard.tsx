import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  UserCheck,
  CalendarDays,
  Clock,
  Building2,
  Activity,
} from "lucide-react";

export default function HRLeaveDashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Total Employees",
      value: 15,
      icon: Users,
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Present Today",
      value: 8,
      icon: UserCheck,
      bg: "bg-green-50",
      text: "text-green-600",
    },
    {
      title: "Employees on Leave",
      value: 2,
      icon: CalendarDays,
      bg: "bg-purple-50",
      text: "text-purple-600",
    },
    {
      title: "Pending Requests",
      value: 3,
      icon: Clock,
      bg: "bg-yellow-50",
      text: "text-yellow-600",
    },
    {
      title: "Departments",
      value: 4,
      icon: Building2,
      bg: "bg-orange-50",
      text: "text-orange-600",
    },
    {
      title: "Active Employees",
      value: 14,
      icon: Activity,
      bg: "bg-cyan-50",
      text: "text-cyan-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            HR Leave Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Overview of employees and leave activities
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/leave")}
          className="flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>
      </div>

      {/* CARDS */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{card.title}</p>

                  <p className="mt-2 text-3xl font-bold text-slate-800">
                    {card.value}
                  </p>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.bg} ${card.text}`}
                >
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* RECENT ACTIVITIES */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <h2 className="font-bold text-slate-800">Recent Activities</h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest HR and leave activities
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                  Activity
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                  Employee
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                  Department
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t border-slate-100">
                <td className="px-5 py-4 text-sm text-slate-700">
                  Leave Request
                </td>

                <td className="px-5 py-4 text-sm font-semibold">Pavan Kumar</td>

                <td className="px-5 py-4 text-sm">IT</td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">
                    Pending
                  </span>
                </td>
              </tr>

              <tr className="border-t border-slate-100">
                <td className="px-5 py-4 text-sm text-slate-700">
                  Attendance Update
                </td>

                <td className="px-5 py-4 text-sm font-semibold">
                  Rajesh Kumar
                </td>

                <td className="px-5 py-4 text-sm">HR</td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    Present
                  </span>
                </td>
              </tr>

              <tr className="border-t border-slate-100">
                <td className="px-5 py-4 text-sm text-slate-700">
                  Employee Added
                </td>

                <td className="px-5 py-4 text-sm font-semibold">Anil Sharma</td>

                <td className="px-5 py-4 text-sm">Finance</td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    Active
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
