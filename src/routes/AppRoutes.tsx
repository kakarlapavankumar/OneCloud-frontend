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

import Placeholder from "../pages/Placeholder";

import DashboardLayout from "../components/layout/DashboardLayout";

import HRLeaveDashboard from "../pages/leave/HRLeaveDashboard";

import LeaveRequestDashboard from "../pages/leave/LeaveRequestDashboard";

import LeaveApprovalDashboard from "../pages/leave/LeaveApprovalDashboard";

import EmployeeLeaveProfile from "../pages/leave/EmployeeLeaveProfile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoutes />}>
        <Route
          element={
            <DashboardLayout>
              <></>
            </DashboardLayout>
          }
        />

        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />

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

        <Route
          path="/attendance"
          element={
            <DashboardLayout>
              <Attendance />
            </DashboardLayout>
          }
        />

        <Route
          path="/leave"
          element={
            <DashboardLayout>
              <Placeholder
                title="Leave Management"
                description="Leave management module."
              />
            </DashboardLayout>
          }
        />

        <Route path="/leave/request" element={<LeaveRequestDashboard />} />

        <Route path="/leave/approval" element={<LeaveApprovalDashboard />} />

        <Route path="/leave/hr-dashboard" element={<HRLeaveDashboard />} />

        <Route
          path="/leave/employee-profile"
          element={<EmployeeLeaveProfile />}
        />

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

        <Route
          path="/profile"
          element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          }
        />
      </Route>

      <Route path="*" element={<NavigateToDashboard />} />
    </Routes>
  );
}

function NavigateToDashboard() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Page not found.</p>
    </div>
  );
}
