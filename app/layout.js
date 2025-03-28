import "./globals.css";
import NavBar from "@/Components/NavBar";
import { Montserrat } from 'next/font/google';
import Footer from "@/Components/Footer";
export const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display:'swap',
  fallback: ['Arial', 'sans-serif'],
});
import ProtectedRoute from "@/Components/ProtectedRoute";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
