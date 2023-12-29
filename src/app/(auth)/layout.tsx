import { NextAuthProvider } from "@/utils/provider/provider";
import Navbar from "@/components/Navar/navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      {/*  <Navbar /> */}
      {children}
    </NextAuthProvider>
  );
}
