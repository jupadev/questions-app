import type {Metadata} from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "NiceQuestion",
  description: "Anonym Questionary App - Jupadev",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <main className="m-auto min-h-screen max-w-screen-lg p-4 sm:p-24">{children}</main>
      </body>
    </html>
  );
}
