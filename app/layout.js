import { Inter } from "next/font/google";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeControls from "./components/ThemeControls";
import FontAwesome from "./components/FontAwesome";
import LoadingScreen from "./components/LoadingScreen";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Oussama Lbida - Portfolio",
  description: "Professional portfolio showcasing my work and skills",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <LoadingScreen />
          <ThemeControls />
          {children}
        </ThemeProvider>
        <FontAwesome />
      </body>
    </html>
  )
}
