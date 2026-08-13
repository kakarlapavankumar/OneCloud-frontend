import { Route, Routes } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoutes";

import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";

import Employees from "../pages/employee/Employees";
import EmployeeDetailsPage from "../pages/employee/EmployeeDetailsPage";

import Attendance from "../pages/attendance/Attendance";

import LeaveManagement from "../pages/leave/LeaveManagement";
import LeaveRequestDashboard from "../pages/leave/LeaveRequestDashboard";
import LeaveApprovalDashboard from "../pages/leave/LeaveApprovalDashboard";
import HRLeaveDashboard from "../pages/leave/HRLeaveDashboard";
import EmployeeLeaveProfile from "../pages/leave/EmployeeLeaveProfile";

import Placeholder from "../pages/Placeholder";

import DashboardLayout from "../components/layout/DashboardLayout";

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* PROTECTED */}
      <Route element={<ProtectedRoutes />}>
        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />

        {/* EMPLOYEES */}
        <Route
          path="/employees"
          element={
            <DashboardLayout>
              <Employees />
            </DashboardLayout>
          }
        />

        <Route
          path="/employees/:id"
          element={
            <DashboardLayout>
              <EmployeeDetailsPage />
            </DashboardLayout>
          }
        />

        {/* ATTENDANCE */}
        <Route
          path="/attendance"
          element={
            <DashboardLayout>
              <Attendance />
            </DashboardLayout>
          }
        />

        {/* ========================= */}
        {/* LEAVE MANAGEMENT */}
        {/* ========================= */}

        <Route
          path="/leave"
          element={
            <DashboardLayout>
              <LeaveManagement />
            </DashboardLayout>
          }
        />

        <Route
          path="/leave/request"
          element={
            <DashboardLayout>
              <LeaveRequestDashboard />
            </DashboardLayout>
          }
        />

        <Route
          path="/leave/approval"
          element={
            <DashboardLayout>
              <LeaveApprovalDashboard />
            </DashboardLayout>
          }
        />

        <Route
          path="/leave/hr-dashboard"
          element={
            <DashboardLayout>
              <HRLeaveDashboard />
            </DashboardLayout>
          }
        />

        <Route
          path="/leave/employee-profile"
          element={
            <DashboardLayout>
              <EmployeeLeaveProfile />
            </DashboardLayout>
          }
        />

        <Route
          path="/leave/employee-profile/:employeeId"
          element={
            <DashboardLayout>
              <EmployeeLeaveProfile />
            </DashboardLayout>
          }
        />

        {/* OTHER MODULES */}

        <Route
          path="/payroll"
          element={
            <DashboardLayout>
              <Placeholder
                title="Payroll"
                description="Payroll management module is ready for backend integration."
              />
            </DashboardLayout>
          }
        />

        <Route
          path="/crm"
          element={
            <DashboardLayout>
              <Placeholder
                title="CRM"
                description="CRM module is ready for backend integration."
              />
            </DashboardLayout>
          }
        />

        <Route
          path="/finance"
          element={
            <DashboardLayout>
              <Placeholder
                title="Finance"
                description="Finance module is ready for backend integration."
              />
            </DashboardLayout>
          }
        />

        <Route
          path="/reports"
          element={
            <DashboardLayout>
              <Placeholder
                title="Reports"
                description="Reports module is ready for backend integration."
              />
            </DashboardLayout>
          }
        />

        <Route
          path="/settings"
          element={
            <DashboardLayout>
              <Placeholder
                title="Settings"
                description="Application settings."
              />
            </DashboardLayout>
          }
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          }
        />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NavigateToDashboard />} />
    </Routes>
  );
}

function NavigateToDashboard() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900">Page Not Found</h1>

        <p className="mt-2 text-slate-500">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}
