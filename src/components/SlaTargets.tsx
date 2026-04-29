export function SlaTargets() {
  return (
    <div>
      <Eyebrow>SLAs · non-negotiable</Eyebrow>
      <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50">
        The numbers that define <span className="text-brand-gradient">"working"</span>
      </h2>
      <p className="mt-3 text-zinc-400 max-w-2xl">
        Below the floor for 2 weeks straight = mandatory 1:1. Auto-tracked by the OS dashboard.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Sla label="Speed-to-lead" value="< 60s" sub="lead → first call attempt" tone="pink" />
        <Sla label="Speed-to-lead p90" value="< 3min" sub="90th percentile" tone="pink" />
        <Sla label="Connect rate" value="> 50%" sub="leads who pick up" tone="violet" />
        <Sla label="Show rate" value="> 65%" sub="booked → showed" tone="emerald" />
        <Sla label="Close rate" value="> 35%" sub="showed → closed" tone="emerald" />
        <Sla label="Happiness / client" value="≥ 7/10" sub="logged daily by CSM" tone="amber" />
      </div>
    </div>
  );
}

function Sla({ label, value, sub, tone }: { label: string; value: string; sub: string; tone: 'pink' | 'violet' | 'emerald' | 'amber' }) {
  const accent = {
    pink: 'text-pink-200',
    violet: 'text-[color:var(--color-brand-violet)]',
    emerald: 'text-emerald-300',
    amber: 'text-amber-200',
  }[tone];
  return (
    <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
      <div className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">{label}</div>
      <div className={`text-3xl font-bold mt-1 tabular-nums ${accent}`}>{value}</div>
      <div className="text-xs text-zinc-500 mt-1">{sub}</div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">{children}</p>;
}
