import "@/app/globals.css";
import { cookies } from "next/headers";
import AdminAuthModal from "@/components/AdminOverlay/AdminAuthModel";
import Header from "@/components/Header";

export default async function PropertyLayout({ children }) {
  const cookieStore = await cookies();
  const adminAuth = cookieStore.get("adminAuth");

  if (!adminAuth) {
    return <AdminAuthModal />;
  }

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
