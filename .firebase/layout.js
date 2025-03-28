"use client";
import ProtectedRoute from "@/Components/ProtectedRoute";

export default function AppointmentLayout({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
