import "./globals.css";
import NavBar from "@/Components/NavBar";
import { Montserrat } from "next/font/google";
import Footer from "@/Components/Footer";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const montserrat = Montserrat({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});
import ProtectedRoute from "@/Components/ProtectedRoute";
import { LoginProvider } from "@/context/LoggedInContext";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <LoginProvider>
          <NavBar />
          {children}
        </LoginProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000} // Auto-close in 3 seconds
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </body>
    </html>
  );
}
