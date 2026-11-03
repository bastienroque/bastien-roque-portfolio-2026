import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 -z-10 h-(--horizon) w-full border-t border-brand-black bg-brand-green"
      />
      <main>{children}</main>
      <Footer />
    </>
  );
}
