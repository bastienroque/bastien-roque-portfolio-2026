import Link from "next/link";
import Button from "../ui/Button";
import { footer_content } from "@/data/footer";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="mt-[25vh] p-4 relative flex flex-col items-center justify-center"
    >
      <div className="absolute flex flex-col gap-2 md:gap-4 w-full overflow-hidden bg-brand-white">
        <div className="w-full px-2 h-[25vh] border-t border-brand-black flex flex-row items-end justify-center">
          {" "}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <Link href="/">
              <Button variant="green" className="h-fit">
                Contact Links
              </Button>
            </Link>

            <div className="flex flex-row gap-2 md:gap-4">
              {footer_content.map((link) => {
                return (
                  <a key={link.id} href={link.href} target="_blank">
                    <Button variant={link.isGreen ? "green" : "white"}>
                      {link.label}
                    </Button>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="bg-brand-green p-4 w-full h-[25vh] border-t border-brand-black">
          <div className="aspect-square w-full bg-brand-yellow rounded-full border border-brand-black" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
