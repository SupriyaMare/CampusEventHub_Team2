// App.jsx (REPLACE) — adds proper admin route for create event + protects routes by role (won’t touch backend)
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import EventList from "./pages/Events/EventList";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import StudentDashboard from "./pages/Dashboard/StudentDashboard";
import AdminFeedback from "./pages/Admin/AdminFeedback";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import EventForm from "./pages/Events/EventForm";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Help from "./pages/Legal/Help";
import Privacy from "./pages/Legal/Privacy";
import Terms from "./pages/Legal/Terms";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected (Navbar Layout wrapper) */}
          <Route element={<Layout />}>
            {/* any logged-in user */}
            <Route
              path="/events"
              element={
                <ProtectedRoute>
                  <EventList />
                </ProtectedRoute>
              }
            />

            {/* student only */}
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute role="student">
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            {/* admin only */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute role="college_admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/feedback"
              element={
                <ProtectedRoute role="college_admin">
                  <AdminFeedback />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/events/create"
              element={
                <ProtectedRoute role="college_admin">
                  <EventForm />
                </ProtectedRoute>
              }
            />

            {/* optional: keep old path working */}
            <Route
              path="/admin/events/new"
              element={<Navigate to="/admin/events/create" replace />}
            />
          </Route>
          {/* <Route path="/events/:id" element={<EventDetails />} /> */}
          <Route path="/help" element={<Help />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />    
          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
