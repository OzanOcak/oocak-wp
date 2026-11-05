import Image from "next/image";
import Link from "next/link";

type ProjectColor =
  | "blue"
  | "amber"
  | "green"
  | "purple"
  | "emerald"
  | "indigo";

interface ProjectCardProps {
  title: string;
  desc: string;
  tag: string;
  icon: string;
  metrics: string;
  path: string;
  color: ProjectColor;
}

const colorStyles: Record<ProjectColor, string> = {
  blue: "border-blue-500/30 bg-blue-500/5",
  amber: "border-amber-500/30 bg-amber-500/5",
  green: "border-green-500/30 bg-green-500/5",
  purple: "border-purple-500/30 bg-purple-500/5",
  emerald: "border-emerald-500/30 bg-emerald-500/5",
  indigo: "border-indigo-500/30 bg-indigo-500/5",
};

export default function ProjectCard({
  title,
  desc,
  tag,
  icon,
  metrics,
  path,
  color,
}: ProjectCardProps) {
  return (
    <article
      className={`rounded-xl border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg ${colorStyles[color]}`}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
          <Image
            src={icon}
            alt={`${title} icon`}
            fill
            sizes="64px"
            className="object-contain p-1"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-bold tracking-tight">{title}</h2>
            <span className="rounded-full border border-zinc-300 px-3 py-1 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
              {tag}
            </span>
          </div>

          <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            {desc}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {metrics}
            </span>

            <Link
              href={path}
              className="text-sm font-semibold text-blue-600 transition hover:text-blue-500 dark:text-blue-400"
            >
              Explore project →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
