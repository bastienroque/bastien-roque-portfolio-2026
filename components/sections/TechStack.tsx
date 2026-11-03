import { TechStackProps } from "@/types";
import { Heading } from "../ui/Heading";

const TechStack = ({ categories }: TechStackProps) => {
  return (
    <section
      id="stack"
      aria-label="Tech stack"
      className="scroll-mt-20 p-2 md:p-4"
    >
      <div className="flex flex-col gap-6 rounded-2xl border border-black bg-brand-white p-4 md:p-12">
        <Heading level={2} className="text-3xl font-black md:text-4xl">
          Tech stack
        </Heading>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col gap-3 rounded-xl border border-black bg-brand-yellow p-4"
            >
              <div>
                <h3 className="text-lg font-black">{cat.label}</h3>
                <p className="text-sm font-medium">{cat.scope}</p>
              </div>

              <ul className="flex flex-wrap gap-2">
                {cat.items.map((tech) => (
                  <li
                    key={tech.name}
                    className="rounded-full border border-black bg-brand-white px-3 py-1 text-sm font-semibold"
                  >
                    {tech.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
