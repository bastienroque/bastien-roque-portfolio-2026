import Link from "next/link";
import {
  ArrowDown,
  Binoculars,
  CheckCircle,
  EnvelopeSimple,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";
import { hero_content } from "@/data/hero";
import Button from "../ui/Button";
import Shape from "../ui/Shape";
import { Heading } from "../ui/Heading";

const tones = [
  "bg-brand-green text-black",
  "bg-brand-white text-black",
  "bg-brand-black text-brand-white",
];

const HeroSection = () => {
  const { name, roles, country } = hero_content;

  return (
    <section id="about" className="scroll-mt-30 p-2 md:p-4">
      <div className="grid min-h-[60svh] items-center gap-6 rounded-2xl border border-black bg-brand-yellow p-4 md:grid-cols-2 md:gap-8 md:p-12">
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-2 rounded-full border border-black bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
            <CheckCircle
              size={16}
              weight="fill"
              className="text-green-600"
              aria-hidden="true"
            />
            Available for work
          </div>

          <Heading
            level={1}
            size="lg"
            className="text-4xl font-black md:text-6xl"
          >
            {name}
          </Heading>

          <Shape className="w-fit border border-black bg-brand-white font-bold">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={18} weight="bold" aria-hidden="true" />
              {country}
            </span>
          </Shape>

          {/* Mobile: full-width stacked buttons (equal edges, easy to tap).
              From sm up they go back to a row. */}
          <div className="mt-2 flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <Link href="#projects" className="block">
              <Button variant="green" className="w-full justify-center!">
                <span className="inline-flex items-center gap-2">
                  <ArrowDown size={18} weight="bold" aria-hidden="true" />
                  See my work
                </span>
              </Button>
            </Link>
            <Link href="#contact" className="block">
              <Button variant="white" className="w-full justify-center!">
                <span className="inline-flex items-center gap-2">
                  <EnvelopeSimple size={18} weight="bold" aria-hidden="true" />
                  Get in touch
                </span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 border-t border-black pt-6 md:items-center md:border-t-0 md:pt-0">
          <p className="flex w-fit items-center gap-2 rounded-full border border-black bg-brand-white px-4 py-2 text-sm font-black uppercase tracking-wider">
            <Binoculars size={18} weight="bold" aria-hidden="true" />
            Open to roles like
          </p>
          <ul className="flex flex-wrap items-center justify-start gap-2 md:justify-center md:gap-3">
            {roles.map((role, i) => (
              <li
                key={role}
                className={`max-w-full rounded-full border border-black px-3 py-1.5 text-sm font-black leading-none whitespace-nowrap md:px-4 md:py-2 md:text-lg ${
                  tones[i % tones.length]
                }`}
              >
                {role}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
