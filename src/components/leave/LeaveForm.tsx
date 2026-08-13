import { useState } from "react";

import { seedEmployees } from "../../data/employees";

import type { LeaveFormData, LeaveType } from "../../types/leave";

interface LeaveFormProps {
  onSubmit: (
    data: LeaveFormData & {
      totalDays: number;
    },
  ) => void;
}

const leaveTypes: LeaveType[] = [
  "Casual Leave",
  "Sick Leave",
  "Earned Leave",
  "Maternity Leave",
];

const getTotalDays = (fromDate: string, toDate: string) => {
  if (!fromDate || !toDate) {
    return 0;
  }

  const from = new Date(`${fromDate}T00:00:00`);

  const to = new Date(`${toDate}T00:00:00`);

  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime()) || to < from) {
    return 0;
  }

  const difference = to.getTime() - from.getTime();

  return Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;
};

const LeaveForm = ({ onSubmit }: LeaveFormProps) => {
  const [formData, setFormData] = useState<LeaveFormData>({
    employeeId: "",
    employeeName: "",
    department: "",
    leaveType: "Casual Leave",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const totalDays = getTotalDays(formData.fromDate, formData.toDate);

  const handleEmployeeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const employeeId = event.target.value;

    const employee = seedEmployees.find((item) => item.id === employeeId);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.employeeId) {
      setError("Please select an employee.");
      return;
    }

    if (!formData.employeeName) {
      setError("Employee name is required.");
      return;
    }

    if (!formData.department) {
      setError("Department is required.");
      return;
    }

    if (!formData.leaveType) {
      setError("Please select a leave type.");
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

    if (formData.toDate < formData.fromDate) {
      setError("To date cannot be earlier than from date.");
      return;
    }

    if (!formData.reason.trim()) {
      setError("Please enter the reason for leave.");
      return;
    }

    if (totalDays <= 0) {
      setError("Please select valid leave dates.");
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
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-6 py-6">
        <div className="flex flex-col justify-between gap-2 md:flex-row">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Apply for Leave
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Submit your employee leave request.
            </p>
          </div>

          <p className="text-sm text-slate-500">All fields are required</p>
        </div>
      </div>

      <div className="p-6">
        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Employee ID */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Employee ID
              </label>

              <select
                value={formData.employeeId}
                onChange={handleEmployeeChange}
                className={inputClass}
              >
                <option value="">Select Employee</option>

                {seedEmployees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.id}
                  </option>
                ))}
              </select>
            </div>

            {/* Employee Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Employee Name
              </label>

              <input
                value={formData.employeeName}
                readOnly
                placeholder="Employee Name"
                className={`${inputClass} bg-slate-50`}
              />
            </div>

            {/* Department */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Department
              </label>

              <input
                value={formData.department}
                readOnly
                placeholder="Department"
                className={`${inputClass} bg-slate-50`}
              />
            </div>

            {/* Leave Type */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Leave Type
              </label>

              <select
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                className={inputClass}
              >
                {leaveTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* From Date */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                From Date
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
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                To Date
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
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Total Leave Days
              </label>

              <div className="flex h-[46px] items-center rounded-lg border border-blue-100 bg-blue-50 px-4">
                <span className="font-bold text-blue-600">
                  {totalDays > 0
                    ? `${totalDays} ${totalDays === 1 ? "Day" : "Days"}`
                    : "0 Days"}
                </span>
              </div>
            </div>

            {/* Reason */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Reason
              </label>

              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows={5}
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
              className="
                rounded-lg border border-slate-300
                bg-white px-6 py-3
                text-sm font-semibold text-slate-700
                transition hover:bg-slate-50
              "
            >
              Reset
            </button>

            <button
              type="submit"
              className="
                rounded-lg bg-blue-600
                px-6 py-3
                text-sm font-semibold text-white
                shadow-sm
                transition hover:bg-blue-700
              "
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
