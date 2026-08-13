import { useState } from "react";
import type { LeaveFormData } from "../../types/leave";

interface Employee {
  id: string;
  name: string;
  department: string;
}

interface LeaveFormProps {
  employees?: Employee[];

  onSubmit: (
    data: LeaveFormData & {
      totalDays: number;
    },
  ) => void;
}

const getTotalDays = (fromDate: string, toDate: string) => {
  if (!fromDate || !toDate) {
    return 0;
  }

  const from = new Date(fromDate);
  const to = new Date(toDate);

  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime()) || to < from) {
    return 0;
  }

  const difference = to.getTime() - from.getTime();

  return Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;
};

const defaultEmployees: Employee[] = [
  {
    id: "EMP001",
    name: "Pavan Kumar",
    department: "IT",
  },
  {
    id: "EMP002",
    name: "Rajesh Kumar",
    department: "HR",
  },
  {
    id: "EMP003",
    name: "Anil Sharma",
    department: "Finance",
  },
  {
    id: "EMP004",
    name: "Priya Reddy",
    department: "IT",
  },
  {
    id: "EMP005",
    name: "Suresh Kumar",
    department: "Finance",
  },
];

const LeaveForm = ({
  employees = defaultEmployees,
  onSubmit,
}: LeaveFormProps) => {
  const [formData, setFormData] = useState<LeaveFormData>({
    employeeId: "",
    employeeName: "",
    department: "",
    leaveType: "Casual Leave",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const totalDays = getTotalDays(formData.fromDate, formData.toDate);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleEmployeeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const employeeId = event.target.value;

    const employee = employees.find((item) => item.id === employeeId);

    if (!employee) {
      setFormData((previous) => ({
        ...previous,
        employeeId: "",
        employeeName: "",
        department: "",
      }));

      return;
    }

    setFormData((previous) => ({
      ...previous,
      employeeId: employee.id,
      employeeName: employee.name,
      department: employee.department,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.employeeId) {
      setError("Please select an employee.");
      return;
    }

    if (!formData.fromDate) {
      setError("Please select the from date.");
      return;
    }

    if (!formData.toDate) {
      setError("Please select the to date.");
      return;
    }

    if (new Date(formData.toDate) < new Date(formData.fromDate)) {
      setError("To date cannot be earlier than from date.");
      return;
    }

    if (!formData.reason.trim()) {
      setError("Please enter the reason for leave.");
      return;
    }

    onSubmit({
      ...formData,
      totalDays,
    });

    setSuccess("Leave request submitted successfully.");

    setFormData({
      employeeId: "",
      employeeName: "",
      department: "",
      leaveType: "Casual Leave",
      fromDate: "",
      toDate: "",
      reason: "",
    });
  };

  const handleReset = () => {
    setFormData({
      employeeId: "",
      employeeName: "",
      department: "",
      leaveType: "Casual Leave",
      fromDate: "",
      toDate: "",
      reason: "",
    });

    setError("");
    setSuccess("");
  };

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="mb-6 rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Apply for Leave
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Submit a new leave request for an employee.
        </p>
      </div>

      <div className="p-6">
        {error && (
          <div className="mb-5 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-5 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            <span>✓</span>
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {/* Employee */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Employee
                <span className="ml-1 text-red-500">*</span>
              </label>

              <select
                name="employeeId"
                value={formData.employeeId}
                onChange={handleEmployeeChange}
                className={inputClass}
              >
                <option value="">Select Employee</option>

                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.id} - {employee.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Department
              </label>

              <input
                type="text"
                value={formData.department}
                readOnly
                placeholder="Department"
                className={`${inputClass} bg-slate-50`}
              />
            </div>

            {/* Leave Type */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Leave Type
                <span className="ml-1 text-red-500">*</span>
              </label>

              <select
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Casual Leave">Casual Leave</option>

                <option value="Sick Leave">Sick Leave</option>

                <option value="Earned Leave">Earned Leave</option>

                <option value="Maternity Leave">Maternity Leave</option>
              </select>
            </div>

            {/* From Date */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                From Date
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* To Date */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                To Date
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                type="date"
                name="toDate"
                value={formData.toDate}
                min={formData.fromDate}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Total Days */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Total Leave Days
              </label>

              <div className="flex h-[43px] items-center rounded-lg border border-slate-200 bg-slate-50 px-3">
                {totalDays > 0 ? (
                  <span className="font-semibold text-blue-600">
                    {totalDays} {totalDays === 1 ? "Day" : "Days"}
                  </span>
                ) : (
                  <span className="text-sm text-slate-400">
                    Calculated automatically
                  </span>
                )}
              </div>
            </div>

            {/* Reason */}

            <div className="md:col-span-2 xl:col-span-3">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Reason
                <span className="ml-1 text-red-500">*</span>
              </label>

              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows={4}
                placeholder="Enter reason for leave..."
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          {/* Buttons */}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Reset
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              Apply Leave
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveForm;
