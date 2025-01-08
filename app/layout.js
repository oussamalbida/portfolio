import { Inter } from "next/font/google";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeControls from "./components/ThemeControls";
import FontAwesome from "./components/FontAwesome";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Professional Portfolio",
  description: "A professional portfolio showcasing UI/UX design work",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <ThemeControls />
          {children}
        </ThemeProvider>
        <FontAwesome />
      </body>
    </html>
  )
}
