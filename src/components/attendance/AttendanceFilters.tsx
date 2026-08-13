interface Props {
  search: string;
  department: string;
  status: string;
  departments: string[];
  date: string;
  onSearch: (value: string) => void;
  onDepartment: (value: string) => void;
  onStatus: (value: string) => void;
  onDate: (value: string) => void;
  onReset: () => void;
}

export default function AttendanceFilters({
  search,
  department,
  status,
  departments,
  date,
  onSearch,
  onDepartment,
  onStatus,
  onDate,
  onReset,
}: Props) {
  return (
    <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 md:grid-cols-5">
      <input
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search employee..."
        className="rounded-lg border border-slate-300 px-3 py-2"
      />

      <select
        value={department}
        onChange={(e) => onDepartment(e.target.value)}
        className="rounded-lg border border-slate-300 px-3 py-2"
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
        onChange={(e) => onStatus(e.target.value)}
        className="rounded-lg border border-slate-300 px-3 py-2"
      >
        <option value="">All Status</option>

        <option value="Present">Present</option>

        <option value="Absent">Absent</option>

        <option value="Half Day">Half Day</option>

        <option value="WFH">WFH</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => onDate(e.target.value)}
        className="rounded-lg border border-slate-300 px-3 py-2"
      />

      <button
        onClick={onReset}
        className="rounded-lg bg-slate-900 px-4 py-2 text-white"
      >
        Reset
      </button>
    </div>
  );
}
