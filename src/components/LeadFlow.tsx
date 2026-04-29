export function LeadFlow() {
  return (
    <div>
      <Eyebrow>09 · The Bulletproof Lead Flow</Eyebrow>
      <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50">
        Form submitted → CSM calls in <span className="text-brand-gradient">60 seconds</span>
      </h2>
      <p className="mt-3 text-zinc-400 max-w-2xl">
        Every lead follows the exact same path. Time-of-day determines who picks up. CSMs never have to guess what's theirs — Slack literally pings them.
      </p>

      <div className="mt-10 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 sm:p-10 overflow-x-auto">
        <div className="min-w-[920px]">
          {/* Row 1: Form → GHL → Time check */}
          <div className="grid grid-cols-3 gap-4">
            <Node icon="📝" title="Lead submits form" sub="Meta Ad → GHL form" tone="violet" />
            <Node icon="🛬" title="GHL receives in sub-account" sub="Workflow trigger fires" tone="violet" />
            <Node icon="⏰" title="Get current EST hour" sub="GHL `Get Date/Time` block" tone="pink" />
          </div>
          <Connector />

          {/* Row 2: 3-way branch */}
          <div className="grid grid-cols-3 gap-4">
            <Node icon="🌅" title="6a–2p EST" sub="→ Morning CSM" tone="amber" />
            <Node icon="🌆" title="2p–8p EST" sub="→ Evening CSM" tone="indigo" />
            <Node icon="🌙" title="8p–6a EST" sub="→ Wait until 6am, route to morning" tone="zinc" />
          </div>
          <Connector />

          {/* Row 3: Notification + call */}
          <div className="grid grid-cols-3 gap-4">
            <Node icon="🔔" title="Slack ping" sub="#new-lead + #client-X with @mention" tone="pink" />
            <Node icon="📞" title="CSM calls within 60s" sub="If no answer: retry +5min, +30min" tone="pink" />
            <Node icon="📋" title="Disposition set in GHL" sub="Booked / No-show / Lost / etc." tone="pink" />
          </div>
          <Connector />

          {/* Row 4: Outcomes */}
          <div className="grid grid-cols-3 gap-4">
            <Node icon="✅" title="If Booked" sub="GHL fires appointment webhook" tone="emerald" />
            <Node icon="🗄️" title="OS records appt" sub="setter_id, client_id, billed_amount" tone="emerald" />
            <Node icon="💸" title="Per-appt billing fires" sub="Whop charges client" tone="emerald" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Node({ icon, title, sub, tone }: { icon: string; title: string; sub: string; tone: 'violet' | 'pink' | 'amber' | 'indigo' | 'zinc' | 'emerald' }) {
  const toneClass = {
    violet:  'border-[color:var(--color-brand-violet)]/40 bg-[color:var(--color-brand-violet)]/10',
    pink:    'border-[color:var(--color-brand-pink)]/40 bg-[color:var(--color-brand-pink)]/10',
    amber:   'border-amber-500/40 bg-amber-500/10',
    indigo:  'border-indigo-500/40 bg-indigo-500/10',
    zinc:    'border-zinc-700 bg-zinc-800/30',
    emerald: 'border-emerald-500/40 bg-emerald-500/10',
  }[tone];
  return (
    <div className={`rounded-xl border p-4 ${toneClass}`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="font-semibold text-zinc-100 text-sm">{title}</div>
      <div className="text-xs text-zinc-400 mt-0.5">{sub}</div>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex justify-center my-3">
      <svg width="40" height="32" viewBox="0 0 40 32" fill="none">
        <line x1="20" y1="0" x2="20" y2="22" className="flow-arrow" />
        <polygon points="14,22 26,22 20,32" className="flow-arrow-head" />
      </svg>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">{children}</p>;
}
