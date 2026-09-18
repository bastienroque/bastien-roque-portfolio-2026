import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import { Heading } from "@/components/ui/Heading";
import { projects_card_content } from "@/data/projects-cards";

export default function Home() {
  return (
    <div className="container mx-auto flex flex-col gap-16 md:gap-32 pb-32 scroll-m-36">
      <HeroSection />
      <div id="projects" className="scroll-mt-30">
        <Heading level={2} size="lg" className="pl-2 md:pl-4">
          Latest Projects
        </Heading>
        {projects_card_content.map((card, id) => (
          <ProjectsSection key={id} {...card} />
        ))}
      </div>
    </div>
  );
}
