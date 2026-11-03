import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FeatureSection from "@/components/sections/projects/FeatureSection";
import LiveLinkBanner from "@/components/sections/projects/components/LiveLinkBanner";
import Shape from "@/components/ui/Shape";
import { projects_content } from "@/data/projects-pages";
import { DescriptionSection, LinkSection, ParamsProps } from "@/types";

const getProject = (slug: string) =>
  projects_content.find((p) => p.slug === slug);

export function generateStaticParams() {
  return projects_content.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const intro = project.sections.find(
    (s): s is DescriptionSection => s.type === "description",
  );
  const description = intro?.content.replace(/\s+/g, " ").slice(0, 160);

  return { title: project.label, description };
}

const ProjectPage = async ({ params }: ParamsProps) => {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }
  const linkSection = project.sections.find(
    (s): s is LinkSection => s.type === "link",
  );
  const sections = project.sections.filter((s) => s.type !== "link");

  return (
    <article className="container mx-auto flex flex-col gap-16 p-2 pb-32 md:gap-36 md:p-4">
      <header className="flex flex-col gap-6">
        <Link
          href="/#projects"
          className="w-fit font-bold underline-offset-4 hover:bg-brand-yellow transition-colors rounded-full border border-black bg-brand-white px-4 py-2"
        >
          ← All projects
        </Link>

        <h1 className="flex justify-center">
          <Shape variant="green" className="text-2xl! md:text-4xl!">
            {project.label}
          </Shape>
        </h1>

        {linkSection && <LiveLinkBanner {...linkSection} />}
      </header>

      {sections.map((section) => (
        <FeatureSection key={section.id} section={section} />
      ))}
    </article>
  );
};

export default ProjectPage;
