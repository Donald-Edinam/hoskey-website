import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hoskey Production — Where Stories Come Alive",
  description: "Broadcast and media production company based in Ghana. Production services, Demes shr Studios, and technical stage engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
