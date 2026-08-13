import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X, Clock, FileCheck } from "lucide-react";

type LeaveStatus = "Pending" | "Approved" | "Rejected";

interface LeaveRequest {
  id: number;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: string;
  fromDate?: string;
  toDate?: string;
  reason?: string;
  totalDays: number;
  status: LeaveStatus;
}

const defaultRequests: LeaveRequest[] = [
  {
    id: 1,
    employeeId: "EMP001",
    employeeName: "Pavan Kumar",
    department: "IT",
    leaveType: "Casual Leave",
    totalDays: 2,
    status: "Pending",
  },
  {
    id: 2,
    employeeId: "EMP002",
    employeeName: "Rajesh Kumar",
    department: "HR",
    leaveType: "Sick Leave",
    totalDays: 1,
    status: "Approved",
  },
  {
    id: 3,
    employeeId: "EMP003",
    employeeName: "Anil Sharma",
    department: "Finance",
    leaveType: "Earned Leave",
    totalDays: 3,
    status: "Pending",
  },
];

export default function LeaveApprovalDashboard() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("leaveRequests");

    if (saved) {
      try {
        setRequests(JSON.parse(saved));
      } catch {
        setRequests(defaultRequests);
      }
    } else {
      setRequests(defaultRequests);
    }
  }, []);

  const updateStatus = (id: number, status: LeaveStatus) => {
    const updated = requests.map((request) =>
      request.id === id ? { ...request, status } : request,
    );

    setRequests(updated);

    localStorage.setItem("leaveRequests", JSON.stringify(updated));
  };

  const pending = requests.filter(
    (request) => request.status === "Pending",
  ).length;

  const approved = requests.filter(
    (request) => request.status === "Approved",
  ).length;

  const rejected = requests.filter(
    (request) => request.status === "Rejected",
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Leave Approval</h1>

          <p className="mt-1 text-sm text-slate-500">
            Review and manage employee leave requests
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

      {/* SUMMARY */}
      <div className="mb-6 grid gap-5 md:grid-cols-3">
        <SummaryCard
          title="Pending Requests"
          value={pending}
          icon={<Clock size={23} />}
          bg="bg-yellow-50"
          text="text-yellow-600"
        />

        <SummaryCard
          title="Approved Leaves"
          value={approved}
          icon={<Check size={23} />}
          bg="bg-green-50"
          text="text-green-600"
        />

        <SummaryCard
          title="Rejected Leaves"
          value={rejected}
          icon={<X size={23} />}
          bg="bg-red-50"
          text="text-red-600"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-200 p-5">
          <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
            <FileCheck size={22} />
          </div>

          <div>
            <h2 className="font-bold text-slate-800">Leave Requests</h2>

            <p className="text-sm text-slate-500">
              Review employee applications
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                  Employee ID
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                  Employee Name
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                  Department
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                  Leave Type
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                  Total Days
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                  Status
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr
                  key={request.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-5 py-4 text-sm font-medium text-slate-700">
                    {request.employeeId}
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                    {request.employeeName}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {request.department}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {request.leaveType}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {request.totalDays}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={request.status} />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => updateStatus(request.id, "Approved")}
                        className="rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:bg-green-700"
                      >
                        Approve
                      </button>

                      <button
                        type="button"
                        onClick={() => updateStatus(request.id, "Rejected")}
                        className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700"
                      >
                        Reject
                      </button>

                      <button
                        type="button"
                        onClick={() => updateStatus(request.id, "Pending")}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {requests.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >
                    No leave requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  icon,
  bg,
  text,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  bg: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <p className="mt-2 text-3xl font-bold text-slate-800">{value}</p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${bg} ${text}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: LeaveStatus }) {
  const styles = {
    Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    Approved: "bg-green-50 text-green-700 border-green-200",
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
