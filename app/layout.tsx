import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Layout/Navbar";
import { StarknetProvider } from "@/context/StarknetContext";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OnChain Sage",
  description: "AI-driven decentralized trading assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StarknetProvider>
          <div className="min-h-screen">
            {/* <Navbar /> */}
            {children}
            <Toaster />
          </div>
        </StarknetProvider>
      </body>
    </html>
  );
}