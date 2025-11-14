"use client";

import { PorscheDesignSystemProvider } from "@porsche-design-system/components-react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>SCENT - Smart Comparison Engine for Notes & Traits</title>
        <meta name="description" content="Find affordable perfume dupes and discover fragrances by their notes" />
      </head>
      <body>
        <PorscheDesignSystemProvider>
          {children}
        </PorscheDesignSystemProvider>
      </body>
    </html>
  );
}
