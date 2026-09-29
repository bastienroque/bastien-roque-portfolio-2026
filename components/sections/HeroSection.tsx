import { hero_content } from "@/data/hero";
import Shape from "../ui/Shape";
import { Heading } from "../ui/Heading";
import TechStack from "./TechStack";

const HeroSection = () => {
  const { name, role, country, techStack } = hero_content;

  return (
    <div id="about" className="p-2 md:p-4 scroll-mt-30">
      <div className="relative container mx-auto min-h-[70vh] p-2 md:p-12 w-full overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 rounded-2xl border border-black bg-brand-yellow">
        <div className="relative flex flex-col items-start gap-2 md:gap-4 md:w-1/2">
          <div className="flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white border border-black rounded-full">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse motion-reduce:animate-none" />
            Available for work
          </div>

          <Heading level={1} className="text-4xl md:text-6xl font-black">
            {name}
          </Heading>

          <Shape className="w-fit bg-brand-green! text-black font-extrabold! border border-black">
            {role}
          </Shape>
        </div>

        <div className="relative flex flex-col gap-4 md:w-1/2 backdrop-blur-sm p-2 md:p-4 rounded-xl border border-black bg-brand-green">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <span className="text-sm font-black uppercase text-nowrap">
              Based in
            </span>
            <Shape className="bg-brand-white border border-black font-bold">
              {country}
            </Shape>
          </div>

          <TechStack categories={techStack} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
