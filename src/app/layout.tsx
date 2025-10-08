import RootLayoutClient from "@/components/ThemeProvider";
import "./globals.css";
import { Suspense } from "react";

export const metadata = {
  title: "Watch with Senpai",
  description: "Watch Anime Online",
  name: "google-adsense-account",
  content: "ca-pub-2495203542622620",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <RootLayoutClient>{children}</RootLayoutClient>
    </Suspense>
  );
}
