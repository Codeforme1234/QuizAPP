import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Upraised",
  description: "Quiz App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` bg-white antialiased`}>{children}</body>
    </html>
  );
}
