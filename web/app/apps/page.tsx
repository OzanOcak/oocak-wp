import type { Metadata } from "next";
import ProjectCard from "@/components/projects/project-card";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Apps & Projects",
  description:
    "A collection of applications and software projects built by O. Ocak.",
};

function FeaturedWork() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden rounded-xl bg-zinc-100 px-6 py-20 dark:bg-black sm:px-12">
      {/* Temporary CSS-based neural-style background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 top-10 size-96 rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="absolute -right-32 bottom-0 size-96 rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.04)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-4xl">
        <p className="text-lg font-semibold text-zinc-500 dark:text-zinc-300">
          Featured Work
        </p>

        <div className="mt-10 bg-white/50 p-5 dark:bg-black/40 sm:p-8">
          <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block text-zinc-900 dark:text-white">
              Apps I&apos;ve Built,
            </span>
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Shipped &amp; Open-Sourced
            </span>
          </h1>

          <div className="mb-8 flex flex-col gap-2 text-sm text-zinc-500 sm:flex-row sm:gap-6 dark:text-zinc-400">
            <address className="not-italic">By: O. Ocak</address>
            <time dateTime="2025-02-27">Feb 27, 2025</time>
          </div>

          <p className="max-w-3xl text-base leading-8 text-zinc-700 dark:text-zinc-300 sm:text-lg">
            I&apos;m a front-end engineer who actually ships. Over the last 8
            years, I&apos;ve built production apps across iOS, desktop, and web
            — with a focus on offline-first architecture, React, React Native,
            Rust performance, and clean UI. This page is a living catalog of
            everything I&apos;ve built, learned, and open-sourced.
          </p>
        </div>
      </div>
    </section>
  );
}

function ProjectNavigation() {
  return (
    <aside className="hidden w-60 shrink-0 lg:block">
      <nav aria-label="Project navigation" className="sticky top-24">
        <p className="px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
          Projects
        </p>

        <ul className="space-y-1">
          {projects.map((project) => (
            <li key={project.id}>
              <a
                href={`#${project.id}`}
                className="block rounded-lg border-l-2 border-transparent px-3 py-2 text-sm text-zinc-600 transition hover:border-blue-500 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                {project.title === "WordPress Plugin - FullScreen Slider"
                  ? "WP Plugin - FS Slider"
                  : project.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default function AppsPage() {
  return (
    <div className="mt-[-1rem] lg:pr-8">
      <FeaturedWork />

      <section className="flex flex-col gap-8 py-12 md:flex-row md:items-start md:px-2">
        <div className="w-full space-y-8 md:max-w-4xl">
          {projects.map((project) => (
            <div
              key={project.id}
              id={project.id}
              className="scroll-mt-24 border-t border-zinc-200 py-8 first:border-t-0 dark:border-zinc-800"
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

        <ProjectNavigation />
      </section>
    </div>
  );
}
