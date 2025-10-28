import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kohabit",
  description: "Find your perfect roommate match — powered by AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
