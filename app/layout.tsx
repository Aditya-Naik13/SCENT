import type { Metadata } from "next";
import { PorscheDesignSystemProvider } from "@porsche-design-system/components-react/ssr";
import "./globals.css";

export const metadata: Metadata = {
  title: "SCENT - Smart Comparison Engine for Notes & Traits",
  description: "Find affordable perfume dupes and discover fragrances by their notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PorscheDesignSystemProvider>
          {children}
        </PorscheDesignSystemProvider>
      </body>
    </html>
  );
}
