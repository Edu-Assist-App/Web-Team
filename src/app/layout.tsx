import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduAssist - Your AI Learning Companion",
  description: "AI-powered learning assistant for students and professionals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css?family=Ubuntu:500,400,700|Poppins:500,400|Outfit:600" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}