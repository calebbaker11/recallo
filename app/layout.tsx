import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recallo — Never lose a patient to voicemail again",
  description:
    "Recallo automatically texts patients back the moment your dental office misses their call — getting them booked before they call a competitor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
