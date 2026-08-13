import { useMemo, useState } from "react";

import useAttendance from "../../hooks/useAttendance";
import useEmployees from "../../hooks/useEmployees";

import AttendanceFilters from "../../components/attendance/AttendanceFilters";
import AttendanceSummary from "../../components/attendance/AttendanceSummary";
import AttendanceTable from "../../components/attendance/AttendanceTable";

import type { AttendanceStatus } from "../../types";

import { DEPARTMENTS } from "../../constants/departments";

export default function Attendance() {
  const { employees } = useEmployees();

  const { records, update } = useAttendance();

  const today = new Date().toISOString().split("T")[0];

  const [search, setSearch] = useState("");

  const [department, setDepartment] = useState("");

  const [status, setStatus] = useState("");

  const [date, setDate] = useState(today);

  const rows = useMemo(() => {
    return employees
      .filter((employee) => {
        const searchMatch =
          employee.name.toLowerCase().includes(search.toLowerCase()) ||
          employee.id.toLowerCase().includes(search.toLowerCase());

        const departmentMatch =
          !department || employee.department === department;

        const record = records.find(
          (item) => item.employeeId === employee.id && item.date === date,
        );

        const currentStatus = record?.status || "Absent";

        const statusMatch = !status || currentStatus === status;

        return searchMatch && departmentMatch && statusMatch;
      })
      .map((employee) => {
        const record = records.find(
          (item) => item.employeeId === employee.id && item.date === date,
        );

        return {
          employee,
          status: record?.status || ("Absent" as AttendanceStatus),
        };
      });
  }, [employees, records, search, department, status, date]);

  const summary = useMemo(() => {
    const current = employees.map((employee) => {
      const record = records.find(
        (item) => item.employeeId === employee.id && item.date === date,
      );

      return record?.status || "Absent";
    });

    return {
      present: current.filter((x) => x === "Present").length,
      absent: current.filter((x) => x === "Absent").length,
      halfDay: current.filter((x) => x === "Half Day").length,
      wfh: current.filter((x) => x === "WFH").length,
    };
  }, [employees, records, date]);

  async function handleStatusChange(
    employeeId: string,
    nextStatus: AttendanceStatus,
  ) {
    await update({
      employeeId,
      date,
      status: nextStatus,
    });
  }

  function reset() {
    setSearch("");
    setDepartment("");
    setStatus("");
    setDate(today);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Attendance</h1>

        <p className="mt-1 text-slate-500">Track daily employee attendance.</p>
      </div>

      <AttendanceSummary
        present={summary.present}
        absent={summary.absent}
        halfDay={summary.halfDay}
        wfh={summary.wfh}
      />

      <AttendanceFilters
        search={search}
        department={department}
        status={status}
        departments={[...DEPARTMENTS]}
        date={date}
        onSearch={setSearch}
        onDepartment={setDepartment}
        onStatus={setStatus}
        onDate={setDate}
        onReset={reset}
      />

      <AttendanceTable rows={rows} onChange={handleStatusChange} />
    </div>
  );
}
