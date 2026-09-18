import FeatureSection from "@/components/sections/projects/FeatureSection";
import Shape from "@/components/ui/Shape";
import { projects_content } from "@/data/projects-pages";
import { ParamsProps } from "@/types";
import { notFound } from "next/navigation";

const ProjectPage = async ({ params }: ParamsProps) => {
  const { slug } = await params;
  const project = projects_content.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto p-2 md:p-4 pb-32 flex flex-col gap-16 md:gap-48">
      <h1
        id={project.id}
        className="scroll-mt-48 text-2xl flex flex-col items-center gap-2"
      >
        <Shape>Current project</Shape>{" "}
        <Shape variant="green" className="text-2xl!">
          {project.label}
        </Shape>
      </h1>
      {project.sections.map((section) => (
        <FeatureSection key={section.id} section={section} />
      ))}
    </div>
  );
};

export default ProjectPage;
