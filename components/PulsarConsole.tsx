import { useMemo, useState } from "react";

type Pulsar = {
  id: string;
  name: string;
  period: number; // seconds
  note: string;
};

const PULSARS: Pulsar[] = [
  { id: "B1919+21", name: "PSR B1919+21", period: 1.337, note: "The original — Hewish & Bell, 1967." },
  { id: "B1257+12", name: "PSR B1257+12", period: 0.006219, note: "First confirmed exoplanet system (1992)." },
  { id: "J0437-4715", name: "PSR J0437–4715", period: 0.00576, note: "Closest known millisecond pulsar." },
  { id: "Crab", name: "Crab Pulsar (B0531+21)", period: 0.0334, note: "Young, energetic remnant of SN 1054." },
];

/**
 * Interactive pulsar console — select a real pulsar to see its
 * pulse-profile graphic beat at its actual rotation period.
 */
export function PulsarConsole() {
  const [active, setActive] = useState<Pulsar>(PULSARS[0]);

  // Clamp the visual animation period so very fast millisecond pulsars
  // remain perceivable. Real period is displayed in the readout.
  const visualPeriod = useMemo(() => {
    const p = active.period;
    if (p < 0.05) return 0.35; // ms pulsars: fast but visible
    if (p < 0.5) return Math.max(0.5, p * 4);
    return Math.min(2.5, p);
  }, [active]);

  return (
    <section
      id="lab"
      aria-labelledby="lab-heading"
      className="rounded-sm border border-border bg-card/40 p-8 md:p-10 backdrop-blur-sm"
    >
      <div className="flex items-center gap-4 mb-8">
        <span className="text-xs font-mono text-muted-foreground">04</span>
        <h2 id="lab-heading" className="text-2xl font-display italic">
          Pulsar Console
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <p className="text-sm text-muted-foreground max-w-2xl mb-8 leading-relaxed">
        Select a pulsar. The pulse-profile graphic below beats at a scaled
        version of its true rotational period — millisecond pulsars are sped
        down so the human eye can resolve them.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Selector */}
        <div className="md:col-span-5 space-y-2">
          {PULSARS.map((p) => {
            const selected = p.id === active.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActive(p)}
                aria-pressed={selected}
                className={`group w-full text-left px-4 py-3 rounded-sm border transition-colors ${
                  selected
                    ? "border-pulsar/60 bg-pulsar/5"
                    : "border-border hover:border-foreground/30 hover:bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium tracking-tight">{p.name}</span>
                  <span
                    className={`size-2 rounded-full ${
                      selected ? "bg-pulsar shadow-[0_0_10px_var(--pulsar)]" : "bg-muted-foreground/40"
                    }`}
                  />
                </div>
                <div className="text-[11px] font-mono text-muted-foreground mt-1">
                  P = {p.period < 0.1 ? `${(p.period * 1000).toFixed(3)} ms` : `${p.period.toFixed(3)} s`}
                </div>
              </button>
            );
          })}
        </div>

        {/* Pulse profile readout */}
        <div className="md:col-span-7">
          <div
            className="relative h-48 flex items-end gap-1 px-2 border-l border-b border-border"
            style={{ ["--pulse-period" as string]: `${visualPeriod}s` }}
          >
            {[2, 4, 8, 14, 28, 60, 100, 60, 28, 14, 8, 4, 2].map((pct, i) => (
              <div
                key={i}
                className="pulse-bar flex-1 rounded-t-sm bg-pulsar/80"
                style={{
                  height: `${pct}%`,
                  animationDelay: `${i * 0.015}s`,
                  opacity: 0.4 + pct / 200,
                }}
              />
            ))}
            <div className="absolute top-2 right-2 text-[10px] font-mono text-muted-foreground tracking-widest">
              PULSE PROFILE · ARBITRARY UNITS
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-6 text-sm">
            <div>
              <dt className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Source
              </dt>
              <dd className="mt-1 font-medium">{active.name}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Period
              </dt>
              <dd className="mt-1 font-mono">
                {active.period < 0.1
                  ? `${(active.period * 1000).toFixed(3)} ms`
                  : `${active.period.toFixed(3)} s`}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Frequency
              </dt>
              <dd className="mt-1 font-mono">{(1 / active.period).toFixed(2)} Hz</dd>
            </div>
          </dl>

          <p className="mt-4 text-sm text-muted-foreground italic">{active.note}</p>
        </div>
      </div>
    </section>
  );
}
