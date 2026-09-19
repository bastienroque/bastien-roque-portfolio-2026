import Button from "@/components/ui/Button";
import Shape from "@/components/ui/Shape";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full min-h-[80vh] flex items-center justify-center p-4">
      <div className="-z-10 fixed bottom-0 bg-brand-green w-full h-[50vh] border-t border-brand-black" />
      <div className="container mx-auto max-w-2xl p-2 md:p-8 relative flex flex-col items-center gap-8 bg-brand-white border border-brand-black rounded-xl">
        <Shape variant="green">Error 404</Shape>

        <h1 className="text-3xl md:text-5xl font-black">Page not found</h1>
        <p className="text-base md:text-xl font-medium">
          This page doesn't exist.
        </p>
        <Link href="/">
          <Button>Go back to the homepage</Button>
        </Link>
      </div>
    </main>
  );
}
