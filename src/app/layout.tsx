import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { getSessionUser } from "@/lib/auth";
import { getMyCompletions } from "@/app/actions/progress";
import { AuthProvider } from "@/components/AuthProvider";
import { ProgressProvider } from "@/components/ProgressProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: `${site.name} — Learn Python, hands-on`, template: `%s · ${site.name}` },
  description: site.description,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  const completions = await getMyCompletions();

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <AuthProvider
          user={
            user
              ? { name: user.name, email: user.email, role: user.role, status: user.status }
              : null
          }
        >
          <ProgressProvider initialCompleted={completions}>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ProgressProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
