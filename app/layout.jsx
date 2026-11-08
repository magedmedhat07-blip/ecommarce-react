import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "FreshCart", description: "Shop fashion, electronics and beauty" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <AppProvider>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
