import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  FileText,
  Send,
  RotateCcw,
} from "lucide-react";

interface LeaveFormData {
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  reason: string;
}

export default function LeaveRequestDashboard() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LeaveFormData>({
    employeeId: "",
    employeeName: "",
    department: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const [totalDays, setTotalDays] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  const calculateDays = (fromDate: string, toDate: string) => {
    if (!fromDate || !toDate) {
      setTotalDays(0);
      return;
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);

    if (to < from) {
      setTotalDays(0);
      return;
    }

    const difference = to.getTime() - from.getTime();

    const days = Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;

    setTotalDays(days);
  };

  const handleChange = (field: keyof LeaveFormData, value: string) => {
    const updatedForm = {
      ...formData,
      [field]: value,
    };

    setFormData(updatedForm);

    if (field === "fromDate" || field === "toDate") {
      calculateDays(updatedForm.fromDate, updatedForm.toDate);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      formData.fromDate &&
      formData.toDate &&
      formData.toDate < formData.fromDate
    ) {
      return;
    }

    const existingRequests = JSON.parse(
      localStorage.getItem("leaveRequests") || "[]",
    );

    const newRequest = {
      id: Date.now(),
      ...formData,
      totalDays,
      status: "Pending",
    };

    localStorage.setItem(
      "leaveRequests",
      JSON.stringify([...existingRequests, newRequest]),
    );

    setSuccessMessage("Leave request submitted successfully.");

    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);

    handleReset();
  };

  const handleReset = () => {
    setFormData({
      employeeId: "",
      employeeName: "",
      department: "",
      leaveType: "",
      fromDate: "",
      toDate: "",
      reason: "",
    });

    setTotalDays(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Leave Request Portal
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Submit a new employee leave request
          </p>
        </div>

        {/* BACK TO LEAVE MANAGEMENT */}
        <button
          type="button"
          onClick={() => navigate("/leave")}
          className="flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>
      </div>

      {/* SUCCESS */}
      {successMessage && (
        <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-semibold text-green-700">
          {successMessage}
        </div>
      )}

      {/* FORM */}
      <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-7 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FileText size={24} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Apply for Leave
            </h2>

            <p className="text-sm text-slate-500">
              Fill in all required information
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {/* EMPLOYEE ID */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Employee ID
            </label>

            <input
              type="text"
              value={formData.employeeId}
              onChange={(e) => handleChange("employeeId", e.target.value)}
              placeholder="EMP001"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* EMPLOYEE NAME */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Employee Name
            </label>

            <input
              type="text"
              value={formData.employeeName}
              onChange={(e) => handleChange("employeeName", e.target.value)}
              placeholder="Employee Name"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* DEPARTMENT */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Department
            </label>

            <select
              value={formData.department}
              onChange={(e) => handleChange("department", e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Select Department</option>

              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
            </select>
          </div>

          {/* LEAVE TYPE */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Leave Type
            </label>

            <select
              value={formData.leaveType}
              onChange={(e) => handleChange("leaveType", e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Select Leave Type</option>

              <option value="Casual Leave">Casual Leave</option>

              <option value="Sick Leave">Sick Leave</option>

              <option value="Earned Leave">Earned Leave</option>

              <option value="Maternity Leave">Maternity Leave</option>
            </select>
          </div>

          {/* FROM DATE */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <CalendarDays size={16} />
              From Date
            </label>

            <input
              type="date"
              value={formData.fromDate}
              onChange={(e) => handleChange("fromDate", e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* TO DATE */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <CalendarDays size={16} />
              To Date
            </label>

            <input
              type="date"
              min={formData.fromDate || undefined}
              value={formData.toDate}
              onChange={(e) => handleChange("toDate", e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* TOTAL DAYS */}
          <div className="rounded-xl bg-blue-50 p-4 md:col-span-2">
            <p className="text-sm font-medium text-blue-600">
              Total Leave Days
            </p>

            <p className="mt-1 text-2xl font-bold text-blue-700">
              {totalDays} {totalDays === 1 ? "Day" : "Days"}
            </p>
          </div>

          {/* REASON */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Reason
            </label>

            <textarea
              rows={5}
              value={formData.reason}
              onChange={(e) => handleChange("reason", e.target.value)}
              placeholder="Enter reason for leave..."
              required
              className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 md:col-span-2">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Send size={17} />
              Apply Leave
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              <RotateCcw size={17} />
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
