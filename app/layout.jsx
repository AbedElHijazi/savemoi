import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap"
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jost",
  display: "swap"
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "SAVÉMOI — Where Science Meets Nature",
    template: "%s · SAVÉMOI"
  },
  description:
    "SAVÉMOI: French innovation, Mediterranean nature. Registered in France. Clinically proven, botanically derived beauty care."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  );
}
