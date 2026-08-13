import { useMemo, useState } from "react";

import type { Employee, EmployeeFormData } from "../../types";

import useEmployees from "../../hooks/useEmployees";

import EmployeeFilters from "../../components/employee/EmployeeFilters";
import EmployeeTable from "../../components/employee/EmployeeTable";
import EmployeeCard from "../../components/employee/EmployeeCard";
import EmployeeForm from "../../components/employee/EmployeeForm";

import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";

import { DEPARTMENTS } from "../../constants/departments";

export default function Employees() {
  const { employees, loading, addEmployee, editEmployee, removeEmployee } =
    useEmployees();

  const [search, setSearch] = useState("");

  const [department, setDepartment] = useState("");

  const [status, setStatus] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.id.toLowerCase().includes(search.toLowerCase());

      const matchesDepartment =
        !department || employee.department === department;

      const matchesStatus = !status || employee.status === status;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [employees, search, department, status]);

  function openAdd() {
    setEditingEmployee(null);
    setModalOpen(true);
  }

  function openEdit(employee: Employee) {
    setEditingEmployee(employee);
    setModalOpen(true);
  }

  async function handleSubmit(data: EmployeeFormData) {
    if (editingEmployee) {
      await editEmployee(editingEmployee.id, data);
    } else {
      await addEmployee(data);
    }

    setModalOpen(false);
    setEditingEmployee(null);
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmed) return;

    await removeEmployee(id);
  }

  function resetFilters() {
    setSearch("");
    setDepartment("");
    setStatus("");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Employee Directory
          </h1>

          <p className="mt-1 text-slate-500">
            Manage all employees in OneCloud.
          </p>
        </div>

        <Button onClick={openAdd}>+ Add Employee</Button>
      </div>

      <EmployeeFilters
        search={search}
        department={department}
        status={status}
        departments={[...DEPARTMENTS]}
        onSearchChange={setSearch}
        onDepartmentChange={setDepartment}
        onStatusChange={setStatus}
        onReset={resetFilters}
      />

      {loading ? (
        <div className="rounded-2xl bg-white p-10 text-center">
          Loading employees...
        </div>
      ) : (
        <>
          <div className="hidden lg:block">
            <EmployeeTable
              employees={filteredEmployees}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:hidden">
            {filteredEmployees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>
        </>
      )}

      <Modal
        open={modalOpen}
        title={editingEmployee ? "Edit Employee" : "Add Employee"}
        onClose={() => setModalOpen(false)}
      >
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
