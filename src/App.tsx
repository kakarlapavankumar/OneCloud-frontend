import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import AppProvider from "./context/AppContext";
import { LeaveProvider } from "./context/LeaveContext";

import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <LeaveProvider>
            <AppRoutes />
          </LeaveProvider>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
