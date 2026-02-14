import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent Arena — Three Minds. One Task.",
  description:
    "Pick a task. Watch 3 AI agents debate. Vote the winner. A fun, interactive AI experiment.",
  openGraph: {
    title: "Agent Arena ⚔️",
    description: "Three AI agents debated my task. See who won!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
