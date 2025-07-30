import "./globals.css";
import { Inter, Sora, Poppins } from "next/font/google"
import ReactQueryProvider from "@/components/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" })
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["400", "700"] })

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="id" className={`${inter.variable} ${sora.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-sans">
        <ReactQueryProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

function ConditionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
