import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import pulsarImg from "@/assets/pulsar.jpg";
import telescopeImg from "@/assets/telescope.jpg";
import exoplanetImg from "@/assets/exoplanet.jpg";
import { Starfield } from "@/components/Starfield";
import { PulsarConsole } from "@/components/PulsarConsole";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. A. Astronomer — Radio Astronomy, Pulsars & Exoplanets" },
      {
        name: "description",
        content:
          "Personal site of a radio astronomer studying millisecond pulsars, pulsar planets, and exoplanetary systems.",
      },
      { property: "og:title", content: "Dr. A. Astronomer — Radio Astronomy, Pulsars & Exoplanets" },
      {
        property: "og:description",
        content:
          "Research, CV, and selected publications from a radio astronomer working on pulsars and exoplanets.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const NAV = [
  { id: "research", label: "Research" },
  { id: "cv", label: "CV" },
  { id: "publications", label: "Publications" },
  { id: "lab", label: "Pulsar Lab" },
  { id: "contact", label: "Contact" },
];

const RESEARCH = [
  {
    tag: "PSR B1257+12",
    title: "Pulsar Planetary Systems",
    body:
      "Investigating the formation and survival of terrestrial-mass planets around millisecond pulsars using high-precision timing residuals.",
    img: pulsarImg,
    alt: "Artist visualization of a pulsar with twin radio beams",
  },
  {
    tag: "OBS · MeerKAT",
    title: "Nanohertz Gravitational Waves",
    body:
      "Using millisecond pulsars as a galaxy-scale detector to constrain the stochastic gravitational-wave background.",
    img: telescopeImg,
    alt: "Radio telescope array silhouetted against the Milky Way",
  },
  {
    tag: "Future Work",
    title: "Toward Exoplanet Atmospheres",
    body:
      "Extending pulsar-timing techniques and radio follow-up to support the characterization of exoplanetary systems around main-sequence stars.",
    img: exoplanetImg,
    alt: "Artist concept of an exoplanet illuminated by a distant pulsar",
  },
];

const CV = [
  { when: "Present", role: "Research Fellow", where: "Your Institute · City" },
  { when: "20XX — 20XX", role: "Postdoctoral Researcher", where: "Observatory or University" },
  { when: "20XX — 20XX", role: "PhD in Astrophysics", where: "Graduate Institution" },
  { when: "20XX — 20XX", role: "MSc / BSc in Physics", where: "Undergraduate Institution" },
];

const PUBS = [
  {
    year: "2024",
    venue: "NATURE ASTRONOMY",
    title: "Sub-millisecond Timing Variations in Binary Pulsar Systems",
    authors: "A. Astronomer, et al.",
  },
  {
    year: "2023",
    venue: "ApJ",
    title: "A Search for Planetary Companions Around Nearby Millisecond Pulsars",
    authors: "A. Astronomer, B. Collaborator, C. Mentor",
  },
  {
    year: "2022",
    venue: "MNRAS",
    title: "Radio Transient Surveys Toward M31: Methods and Constraints",
    authors: "A. Astronomer",
  },
];

function Home() {
  const [active, setActive] = useState<string>("research");

  // Scroll-spy for the sticky nav
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-pulsar/30">
      {/* Animated canvas starfield */}
      <Starfield />
      {/* Soft static star texture overlay for depth */}
      <div
        aria-hidden="true"
        className="fixed inset-0 star-field opacity-20 pointer-events-none animate-[star-flicker_9s_ease-in-out_infinite]"
      />
      {/* Subtle vignette */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.08_0.01_270/0.85)_100%)]"
      />

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-display text-xl italic tracking-tight">
            Dr. A. Astronomer
          </a>
          <div className="hidden md:flex gap-7 text-xs font-mono uppercase tracking-widest">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`transition-colors ${
                  active === n.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main id="top" className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Hero */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-28 items-end">
          <div className="lg:col-span-8">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6">
              Radio Astronomy · Pulsars · Exoplanets
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display italic leading-[0.95] text-balance mb-8">
              Listening for the <span className="text-muted-foreground">invisible</span> pulse of the cosmos.
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground text-pretty leading-relaxed">
              I study millisecond pulsars and the planets that orbit them, with a growing
              interest in extending these techniques toward the characterization of
              exoplanets around ordinary stars.
            </p>
          </div>

          {/* Pulse profile mark */}
          <div className="lg:col-span-4">
            <div
              className="flex items-end justify-between h-32 gap-1 pb-2 border-b border-border"
              style={{ ["--pulse-period" as string]: "2.2s" }}
            >
              {[2, 6, 16, 38, 80, 100, 70, 30, 12, 5, 2].map((h, i) => (
                <div
                  key={i}
                  className="pulse-bar flex-1 rounded-t-sm bg-pulsar/80"
                  style={{ height: `${h}%`, animationDelay: `${i * 0.03}s` }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] font-mono text-muted-foreground tracking-widest">
              <span>OBS · LIVE</span>
              <span>PSR B1919+21</span>
            </div>
          </div>
        </header>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left column */}
          <div className="lg:col-span-8 space-y-28">
            {/* Research */}
            <section id="research" className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-10">
                <span className="text-xs font-mono text-muted-foreground">01</span>
                <h2 className="text-2xl font-display italic">Selected Research</h2>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {RESEARCH.map((r) => (
                  <article key={r.title} className="group space-y-4">
                    <div className="w-full aspect-video overflow-hidden rounded-sm outline outline-1 -outline-offset-1 outline-white/10 bg-white/5">
                      <img
                        src={r.img}
                        alt={r.alt}
                        width={1280}
                        height={720}
                        loading="lazy"
                        className="h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700"
                      />
                    </div>
                    <div className="text-[10px] font-mono opacity-50 tracking-widest">{r.tag}</div>
                    <h3 className="text-xl font-medium">{r.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{r.body}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* Publications */}
            <section id="publications" className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-10">
                <span className="text-xs font-mono text-muted-foreground">02</span>
                <h2 className="text-2xl font-display italic">Recent Publications</h2>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="space-y-0 divide-y divide-border">
                {PUBS.map((p) => (
                  <article
                    key={p.title}
                    className="group grid grid-cols-1 md:grid-cols-4 gap-4 py-6 transition-colors"
                  >
                    <div className="text-xs font-mono text-muted-foreground pt-1">
                      {p.year} / {p.venue}
                    </div>
                    <div className="md:col-span-3">
                      <h4 className="text-lg group-hover:text-pulsar transition-colors">
                        {p.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-2 italic">{p.authors}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-8 text-[11px] font-mono uppercase tracking-widest">
                <a
                  href="https://ui.adsabs.harvard.edu/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-pulsar transition-colors"
                >
                  Full list on NASA ADS →
                </a>
              </div>
            </section>

            {/* Pulsar Console (interactive) */}
            <PulsarConsole />
          </div>

          {/* Right column — CV rail */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-12">
              <section id="cv" className="scroll-mt-24">
                <div className="flex items-center gap-4 mb-10">
                  <span className="text-xs font-mono text-muted-foreground">03</span>
                  <h2 className="text-2xl font-display italic">Chronology</h2>
                </div>

                <div className="relative pl-8 space-y-10 border-l border-border">
                  {CV.map((c, i) => (
                    <div key={c.role} className="relative">
                      <div
                        className={`absolute -left-[37px] top-1 size-4 rounded-full ring-4 ring-background ${
                          i === 0 ? "bg-pulsar shadow-[0_0_12px_var(--pulsar)]" : "border border-border bg-background"
                        }`}
                      />
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                        {c.when}
                      </span>
                      <h4 className="font-medium mt-1">{c.role}</h4>
                      <p className="text-sm text-muted-foreground">{c.where}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Contact */}
              <section
                id="contact"
                className="scroll-mt-24 p-6 rounded-sm border border-white/10 bg-white/[0.03]"
              >
                <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
                  Connect
                </h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a
                      href="mailto:you@example.com"
                      className="hover:text-pulsar transition-colors"
                    >
                      you@example.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://orcid.org/"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-pulsar transition-colors"
                    >
                      ORCID: 0000-0000-0000-0000
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-pulsar transition-colors"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://ui.adsabs.harvard.edu/"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-pulsar transition-colors"
                    >
                      NASA ADS
                    </a>
                  </li>
                </ul>
              </section>
            </div>
          </aside>
        </div>
      </main>

      <footer className="relative mt-24 border-t border-border py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.25em]">
            © {new Date().getFullYear()} · A. Astronomer
          </div>
          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.25em]">
            Built with care, under a dark sky.
          </div>
        </div>
      </footer>
    </div>
  );
}
