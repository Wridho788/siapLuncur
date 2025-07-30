import AppBar from "@/components/AppBar";
import Footer from "@/components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <AppBar />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
