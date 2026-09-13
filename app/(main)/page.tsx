import ProjectsSection from "@/components/sections/ProjectsSection";
import { projects_card_content } from "@/data/projects-cards";

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col gap-16 md:gap-32 pb-32 scroll-m-36">
      {projects_card_content.map((card, id) => (
        <ProjectsSection key={id} {...card} />
      ))}
    </main>
  );
}
