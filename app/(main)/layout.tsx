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
      <main>
        {children}
        <div className="-z-10 fixed bottom-0 bg-brand-green w-full h-[50vh] border-t border-brand-black" />
      </main>
      <Footer />
    </>
  );
}
