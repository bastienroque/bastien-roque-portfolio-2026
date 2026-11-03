import { Rocket } from "@phosphor-icons/react/dist/ssr";
import HeroSection from "@/components/sections/HeroSection";
import TechStack from "@/components/sections/TechStack";
import { Heading } from "@/components/ui/Heading";
import { projects_card_content } from "@/data/projects-cards";
import { tech_stack } from "@/data/tech-stack";
import ProjectCard from "@/components/sections/ProjectsSection";

export default function Home() {
  return (
    <div className="container mx-auto flex flex-col gap-16 pb-32 md:gap-32">
      <HeroSection />

      <section id="projects" className="scroll-mt-30">
        <Heading level={2} size="lg" className="px-2 md:px-4">
          <span className="rounded-xl border border-brand-black bg-brand-white px-4 md:px-6 py-4 inline-flex items-center gap-3">
            <Rocket weight="bold" aria-hidden="true" />
            Latest Projects
          </span>
        </Heading>
        {projects_card_content.map((card) => (
          <ProjectCard key={card.id} {...card} />
        ))}
      </section>

      <TechStack categories={tech_stack} />
    </div>
  );
}
