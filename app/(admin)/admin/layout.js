import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { cookies } from "next/headers";
import AdminAuthModal from "@/components/AdminOverlay/AdminAuthModel";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dream House Proprties",
  description: "Your Dream Home",
};

export default async function PropertyLayout({ children }) {
  const cookieStore = await cookies();
  const adminAuth = cookieStore.get("adminAuth");

  if (!adminAuth) {
    return <AdminAuthModal />;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200`}
      >
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
