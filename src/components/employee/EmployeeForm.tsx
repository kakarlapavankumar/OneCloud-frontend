import { useState } from "react";

import type { Employee, EmployeeFormData } from "../../types";

import { DEPARTMENTS } from "../../constants/departments";

import Button from "../common/Button";
import Input from "../common/Input";

interface Props {
  employee?: Employee | null;
  onSubmit: (data: EmployeeFormData) => Promise<void>;
  onCancel: () => void;
}

const initialData: EmployeeFormData = {
  id: "",
  name: "",
  email: "",
  department: "",
  designation: "",
  phone: "",
  joiningDate: "",
  status: "Active",
};

function getEmployeeFormData(employee?: Employee | null): EmployeeFormData {
  if (!employee) {
    return {
      ...initialData,
    };
  }

  return {
    id: employee.id,
    name: employee.name,
    email: employee.email,
    department: employee.department,
    designation: employee.designation,
    phone: employee.phone,
    joiningDate: employee.joiningDate,
    status: employee.status,
  };
}

export default function EmployeeForm({ employee, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<EmployeeFormData>(() =>
    getEmployeeFormData(employee),
  );

  function update(field: keyof EmployeeFormData, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    await onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Employee ID"
          value={form.id}
          disabled={Boolean(employee)}
          onChange={(e) => update("id", e.target.value)}
          required
        />

        <Input
          label="Full Name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          required
        />

        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          required
        />

        <Input
          label="Phone"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          required
        />

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Department
          </label>

          <select
            value={form.department}
            onChange={(e) => update("department", e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
            required
          >
            <option value="">Select department</option>

            {DEPARTMENTS.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Designation"
          value={form.designation}
          onChange={(e) => update("designation", e.target.value)}
          required
        />

        <Input
          label="Joining Date"
          type="date"
          value={form.joiningDate}
          onChange={(e) => update("joiningDate", e.target.value)}
          required
        />

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Status
          </label>

          <select
            value={form.status}
            onChange={(e) => update("status", e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
          >
            <option value="Active">Active</option>

            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit">
          {employee ? "Update Employee" : "Add Employee"}
        </Button>
      </div>
    </form>
  );
}
