interface EmployeeFiltersProps {
  search: string;
  department: string;
  status: string;
  departments: string[];
  onSearchChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

export default function EmployeeFilters({
  search,
  department,
  status,
  departments,
  onSearchChange,
  onDepartmentChange,
  onStatusChange,
  onReset,
}: EmployeeFiltersProps) {
  return (
    <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 md:grid-cols-4">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search name or ID..."
        className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
      />

      <select
        value={department}
        onChange={(e) => onDepartmentChange(e.target.value)}
        className="rounded-lg border border-slate-300 px-3 py-2 outline-none"
      >
        <option value="">All Departments</option>

        {departments.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="rounded-lg border border-slate-300 px-3 py-2 outline-none"
      >
        <option value="">All Status</option>

        <option value="Active">Active</option>

        <option value="Inactive">Inactive</option>
      </select>

      <button
        onClick={onReset}
        className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-800"
      >
        Reset Filters
      </button>
    </div>
  );
}
