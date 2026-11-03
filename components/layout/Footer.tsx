import Button from "../ui/Button";
import SocialLabel from "../ui/SocialLabel";
import { footer_content } from "@/data/footer";

// Add your email to data/footer.ts so "Get in touch" has a real target:
//   { id: "email", label: "Email me", href: "mailto:you@example.com" }

const Footer = () => {
  return (
    <footer id="contact" className="mt-[25vh] scroll-mt-20">
      {/* white band: now has real content, and grows with it */}
      <div className="flex min-h-[25vh] flex-col justify-center items-center gap-4 border-t border-brand-black bg-brand-white p-4 md:p-8">
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
          {footer_content.map((link) => {
            const isExternal = link.href.startsWith("http");
            return (
              <a
                key={link.id}
                href={link.href}
                {...(isExternal && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                <Button variant="green">
                  <SocialLabel label={link.label} />
                </Button>
              </a>
            );
          })}
        </div>
      </div>

      {/* green band with the sun, same as before but in normal flow */}
      <div
        aria-hidden="true"
        className="h-[25vh] overflow-hidden border-t border-brand-black bg-brand-green p-4"
      >
        <div className="aspect-square w-full rounded-full border border-brand-black bg-brand-yellow" />
      </div>
    </footer>
  );
};

export default Footer;
