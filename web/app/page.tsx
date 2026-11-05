import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Shield,
  ShieldCheck,
} from "lucide-react";

const appShowcase = {
  mobile: [
    {
      title: "Go French",
      desc: "Interactive language acquisition suite focused on real-world conversational patterns, grammar drills, and spaced recall.",
      path: "/apps/gofrench",
      tag: "iOS & Mobile",
      metrics: "Grammar • Active Recall",
      icon: "🇫🇷",
    },
    {
      title: "Frontend Pro",
      desc: "Targeted technical interview practice engine and interactive quizzes for modern web developers.",
      path: "/apps/frontendpro",
      tag: "iOS & Mobile",
      metrics: "React • TypeScript • Web Architecture",
      icon: "💻",
    },
    {
      title: "Smart Words Dictionary",
      desc: "Offline-first vocabulary engine featuring 30,000+ words, spaced-repetition memory tracking, and exam practice modules.",
      path: "/apps/smartwords",
      tag: "iOS & Mobile",
      metrics: "30k+ Words • 200k Questions",
      icon: "📚",
    },
  ],
  desktop: [
    {
      title: "PixelShrink",
      desc: "Visually lossless image compression with metadata purging and high-ratio quantization. Built with Rust and Tauri.",
      path: "/apps/pixelshrink",
      tag: "Desktop App",
      metrics: "Rust • Tauri • 80x Compression",
      icon: "🖼️",
    },
    {
      title: "Mac Cleaner for Devs",
      desc: "Scan and delete developer caches, build artifacts, simulator data, and dependency folders. Privacy first, no uploads.",
      path: "/apps/maccleaner",
      tag: "Desktop App",
      metrics: "Rust • Tauri • React",
      icon: "🧹",
    },
    {
      title: "Markle",
      desc: "Powerful Markdown editor with VSCode-like explorer, LaTeX, Mermaid, and multiple export formats. Built with Electron.",
      path: "/apps/markle",
      tag: "Desktop Editor",
      metrics: "Electron • React • SQLite",
      icon: "📝",
    },
  ],
};

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-12 flex flex-col justify-between gap-3 md:flex-row md:items-end">
      <div>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-500">
          {eyebrow}
        </span>
        <h2 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">
          {title}
        </h2>
      </div>
      <p className="max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}

function AppCard({
  app,
  accent = "emerald",
}: {
  app: {
    title: string;
    desc: string;
    path: string;
    tag: string;
    metrics: string;
    icon: string;
  };
  accent?: "emerald" | "purple";
}) {
  const styles =
    accent === "emerald"
      ? {
          border: "hover:border-emerald-500/60",
          icon: "bg-emerald-500/10 border-emerald-500/20",
          title: "group-hover:text-emerald-500",
          arrow: "text-emerald-500",
        }
      : {
          border: "hover:border-purple-500/60",
          icon: "bg-purple-500/10 border-purple-500/20",
          title: "group-hover:text-purple-500",
          arrow: "text-purple-500",
        };

  return (
    <Link
      href={app.path}
      className={`group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 dark:border-slate-800/80 dark:bg-slate-900 ${styles.border}`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div
            className={`flex size-12 items-center justify-center rounded-xl border text-2xl ${styles.icon}`}
          >
            {app.icon}
          </div>
          <span className="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-[11px] text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            {app.tag}
          </span>
        </div>

        <h3
          className={`text-xl font-bold text-slate-900 transition-colors dark:text-white ${styles.title}`}
        >
          {app.title}
        </h3>

        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {app.desc}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-6 dark:border-slate-800/60">
        <span className="font-mono text-xs text-slate-500">{app.metrics}</span>
        <ArrowRight
          className={`size-4 transition-transform group-hover:translate-x-1 ${styles.arrow}`}
        />
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <main className="-mt-4 min-h-screen bg-slate-50/90 font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
      {/* Hero */}
      <section className="relative flex min-h-[calc(85svh-4rem)] items-center justify-center overflow-hidden bg-gradient-to-b from-emerald-500/10 via-slate-50 to-slate-50 px-6 py-24 text-center dark:via-slate-950 dark:to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.09),transparent_65%)]" />

        <div className="relative mx-auto max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-700 dark:text-emerald-400">
            <Cpu className="size-3.5" />
            Local-First & Developer Ecosystem
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white md:text-7xl">
            High-Performance Apps &
            <br />
            <span className="text-emerald-500">Developer Tools</span>
          </h1>

          <p className="mx-auto max-w-2xl bg-white/40 text-lg leading-relaxed text-slate-600 dark:bg-transparent dark:text-slate-400 md:text-xl">
            Exploring software engineering, local-first architecture, offline
            vocabulary engines, and modern frontend platforms.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <Link
              href="#featured-apps"
              className="w-full rounded-xl bg-emerald-500 px-8 py-3.5 font-semibold text-white shadow-lg shadow-emerald-500/20 transition duration-300 hover:bg-emerald-600 sm:w-auto"
            >
              Explore Applications
            </Link>

            <Link
              href="/apps"
              className="w-full rounded-xl border border-slate-300 bg-slate-200 px-8 py-3.5 font-semibold text-slate-800 transition duration-300 hover:border-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 sm:w-auto"
            >
              All Software
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Applications */}
      <section
        id="featured-apps"
        className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20"
      >
        <SectionHeading
          eyebrow="Software Catalog"
          title="Featured Applications"
          description="Dedicated applications designed for speed, privacy, and long-term utility."
        />

        {/* Mobile Apps */}
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-6 w-1 rounded-full bg-emerald-500" />
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Mobile Apps
            </h3>
            <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
              iOS • Offline-First
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {appShowcase.mobile.map((app) => (
              <AppCard key={app.path} app={app} />
            ))}
          </div>
        </div>

        {/* Desktop Apps */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-6 w-1 rounded-full bg-purple-500" />
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Desktop Apps
            </h3>
            <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
              Tauri • Electron • Rust
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {appShowcase.desktop.map((app) => (
              <AppCard key={app.path} app={app} accent="purple" />
            ))}
          </div>
        </div>
      </section>

      {/* Security & Architecture */}
      <section className="border-y border-slate-200 bg-slate-100 py-20 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-4xl space-y-6 px-6 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-500">
            <ShieldCheck className="size-6" />
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Security, Architecture & Infrastructure
          </h2>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">
            From self-hosted authentication systems to scalable infrastructure
            with Raspberry Pi, Cloudflare Tunnels, and Vercel — all applications
            are engineered with privacy-first standards and modern architecture.
          </p>

          <div className="mx-auto mt-8 max-w-2xl">
            <Link
              href="/apps/authflow"
              className="group block rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:border-indigo-500/60 dark:border-slate-800/80 dark:bg-slate-900"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-500">
                  <Shield className="size-7" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-indigo-500 dark:text-white">
                      AuthFlow
                    </h3>
                    <span className="rounded-md bg-indigo-100 px-2 py-0.5 font-mono text-[10px] text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                      Architecture & Security
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    A complete authentication system built from scratch with JWT
                    security, MFA, role-based access, and self-hosted
                    infrastructure.
                  </p>

                  <div className="mt-2 flex flex-wrap gap-4 font-mono text-xs text-slate-500">
                    {["JWT Security", "MFA Support", "Self-Hosted"].map(
                      (feature) => (
                        <span key={feature} className="flex items-center gap-1">
                          <CheckCircle2 className="size-3 text-emerald-500" />
                          {feature}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <ArrowRight className="size-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-indigo-500" />
              </div>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              href="/apps/authflow"
              className="rounded-lg bg-indigo-500 px-6 py-3 font-semibold text-white shadow-md shadow-indigo-500/20 transition duration-300 hover:bg-indigo-600"
            >
              Explore AuthFlow
            </Link>

            <Link
              href="/apps"
              className="rounded-lg border border-slate-300 bg-slate-200 px-6 py-3 font-semibold text-slate-800 transition duration-300 hover:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              Browse All Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
