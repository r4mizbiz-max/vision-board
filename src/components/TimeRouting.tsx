export function TimeRouting() {
  // 24 hours, EST
  // 6-13 morning, 14-19 evening, 20-5 off
  const hours = Array.from({ length: 24 }, (_, i) => i);

  function shiftFor(h: number): 'morning' | 'evening' | 'off' {
    if (h >= 6 && h < 14) return 'morning';
    if (h >= 14 && h < 20) return 'evening';
    return 'off';
  }
  function color(h: number): string {
    const s = shiftFor(h);
    if (s === 'morning') return 'bg-amber-500/40';
    if (s === 'evening') return 'bg-indigo-500/40';
    return 'bg-zinc-700/40';
  }

  return (
    <div>
      <Eyebrow>Time-of-day routing</Eyebrow>
      <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50">
        Every hour goes to <span className="text-brand-gradient">someone</span>
      </h2>
      <p className="mt-3 text-zinc-400 max-w-2xl">
        EST clock. The rules below are encoded in GHL workflow conditions, so routing is automatic — no human triage.
      </p>

      <div className="mt-10 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6">
        {/* 24-hour bar */}
        <div className="grid grid-cols-24 gap-0.5" style={{ gridTemplateColumns: 'repeat(24, 1fr)' }}>
          {hours.map(h => (
            <div key={h} className="flex flex-col items-center gap-1">
              <div className={`h-12 w-full rounded-sm ${color(h)}`} />
              <div className="text-[10px] text-zinc-500 font-mono">{h}</div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 grid sm:grid-cols-3 gap-3">
          <Legend tone="amber" label="Morning shift" range="6:00am – 1:59pm EST" assignedTo="Morning CSM" />
          <Legend tone="indigo" label="Evening shift" range="2:00pm – 7:59pm EST" assignedTo="Evening CSM" />
          <Legend tone="zinc" label="Off-hours" range="8:00pm – 5:59am EST" assignedTo="Queued for morning at 6am" />
        </div>

        {/* Today */}
        <div className="mt-6 rounded-xl border border-[color:var(--color-brand-pink)]/30 bg-brand-gradient-soft p-4">
          <p className="text-xs uppercase tracking-wider text-pink-200 font-semibold mb-1">Pre-hire reality (this week)</p>
          <p className="text-sm text-zinc-200">
            With just Ahed: <span className="text-zinc-50 font-semibold">all leads → Ahed</span>, regardless of shift.
            She works whatever 6h window suits her. Once CSM #2 lands, the shift split kicks in via GHL automation.
          </p>
        </div>
      </div>
    </div>
  );
}

function Legend({ tone, label, range, assignedTo }: { tone: 'amber' | 'indigo' | 'zinc'; label: string; range: string; assignedTo: string }) {
  const dot = tone === 'amber' ? 'bg-amber-500' : tone === 'indigo' ? 'bg-indigo-500' : 'bg-zinc-500';
  return (
    <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] p-3">
      <div className="flex items-center gap-2 mb-1">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        <span className="text-sm font-semibold text-zinc-100">{label}</span>
      </div>
      <div className="text-xs text-zinc-400 font-mono">{range}</div>
      <div className="text-xs text-zinc-300 mt-1">→ {assignedTo}</div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">{children}</p>;
}
