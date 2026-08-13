import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  CalendarDays,
  Briefcase,
  FileText,
} from "lucide-react";

interface LeaveHistory {
  type: string;
  from: string;
  to: string;
  days: number;
  status: "Approved" | "Pending" | "Rejected";
}

const employee = {
  id: "EMP001",
  name: "Pavan Kumar",
  department: "IT",
  designation: "Java Developer",
  email: "pavan@gmail.com",
  phone: "+91 9876543210",
  joiningDate: "10 January 2025",
  attendance: 92,
  leaveBalance: 15,
};

const leaveHistory: LeaveHistory[] = [
  {
    type: "Casual Leave",
    from: "10 Jun 2026",
    to: "11 Jun 2026",
    days: 2,
    status: "Approved",
  },
  {
    type: "Sick Leave",
    from: "20 May 2026",
    to: "20 May 2026",
    days: 1,
    status: "Approved",
  },
  {
    type: "Earned Leave",
    from: "15 Aug 2026",
    to: "17 Aug 2026",
    days: 3,
    status: "Pending",
  },
];

export default function EmployeeLeaveProfile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Employee Leave Profile
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Employee details, attendance and leave information
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

      {/* PROFILE */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <User size={38} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {employee.name}
            </h2>

            <p className="mt-1 text-slate-500">{employee.designation}</p>

            <span className="mt-2 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              Active
            </span>
          </div>
        </div>

        {/* EMPLOYEE DETAILS */}
        <div className="mt-7 grid gap-5 border-t border-slate-100 pt-7 md:grid-cols-2 lg:grid-cols-3">
          <Detail
            icon={<User size={18} />}
            label="Employee ID"
            value={employee.id}
          />

          <Detail
            icon={<Briefcase size={18} />}
            label="Department"
            value={employee.department}
          />

          <Detail
            icon={<Briefcase size={18} />}
            label="Designation"
            value={employee.designation}
          />

          <Detail
            icon={<Mail size={18} />}
            label="Email"
            value={employee.email}
          />

          <Detail
            icon={<Phone size={18} />}
            label="Phone Number"
            value={employee.phone}
          />

          <Detail
            icon={<CalendarDays size={18} />}
            label="Joining Date"
            value={employee.joiningDate}
          />
        </div>
      </div>

      {/* REPORT CARDS */}
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Attendance Percentage</p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {employee.attendance}%
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Leave Balance</p>

          <p className="mt-2 text-3xl font-bold text-blue-600">
            {employee.leaveBalance}
          </p>

          <p className="mt-1 text-xs text-slate-500">Days remaining</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Leave Requests</p>

          <p className="mt-2 text-3xl font-bold text-purple-600">
            {leaveHistory.length}
          </p>
        </div>
      </div>

      {/* LEAVE HISTORY */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-200 p-5">
          <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
            <FileText size={22} />
          </div>

          <div>
            <h2 className="font-bold text-slate-800">Leave History</h2>

            <p className="text-sm text-slate-500">
              Previous and current leave requests
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                  Leave Type
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                  From
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                  To
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                  Days
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {leaveHistory.map((leave, index) => (
                <tr key={index} className="border-t border-slate-100">
                  <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                    {leave.type}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {leave.from}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {leave.to}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {leave.days}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={leave.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-blue-600">{icon}</div>

      <div>
        <p className="text-xs font-medium text-slate-500">{label}</p>

        <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: LeaveHistory["status"] }) {
  const styles = {
    Approved: "bg-green-50 text-green-700 border-green-200",
    Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    Rejected: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}
