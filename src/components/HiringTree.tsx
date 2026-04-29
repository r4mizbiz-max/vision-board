export function HiringTree() {
  return (
    <div>
      <Eyebrow>Hiring trigger</Eyebrow>
      <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50">
        When to hire — <span className="text-brand-gradient">decision tree</span>
      </h2>
      <p className="mt-3 text-zinc-400 max-w-2xl">
        Resist the urge to hire ahead. New CSMs need 2-3 weeks to ramp; bad timing kills retention.
      </p>

      <div className="mt-10 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 sm:p-10">
        <Diamond
          tone="amber"
          condition="Pod is at 5/6 clients?"
          yes={
            <Diamond
              tone="amber"
              condition="All SLAs green for 2 weeks straight?"
              yes={<TerminalNode color="emerald" label="KEEP SELLING" detail="Don't hire yet. Pod can absorb 1 more." />}
              no={<TerminalNode color="rose" label="DON'T HIRE" detail="Diagnose first. Probably training or sub-account hygiene issue." />}
            />
          }
          no={
            <Diamond
              tone="amber"
              condition="Pod is at 6/6 AND 2 more deals signed?"
              yes={<TerminalNode color="pink" label="OPEN POD #2 NOW" detail="Hire 2 new CSMs. Migrate 2 of 6 to Pod #2 if useful." />}
              no={<TerminalNode color="zinc" label="STAY THE COURSE" detail="Sell more. Pod is healthy at current size." />}
            />
          }
        />
      </div>

      <div className="mt-6 rounded-xl border border-rose-500/30 bg-rose-500/5 p-4">
        <p className="text-xs uppercase tracking-wider text-rose-300 font-bold mb-1">⚠️ Red flag</p>
        <p className="text-sm text-zinc-200">
          If <span className="font-semibold">happiness &lt; 7</span> OR <span className="font-semibold">show rate &lt; 65%</span> OR <span className="font-semibold">speed-to-lead p90 &gt; 3min</span> for 2 weeks straight → 1:1 with the CSM. Don't onboard new clients into a struggling pod.
        </p>
      </div>
    </div>
  );
}

function Diamond({ condition, yes, no, tone }: { condition: string; yes: React.ReactNode; no: React.ReactNode; tone: 'amber' }) {
  return (
    <div className="space-y-3">
      <div className={`mx-auto inline-block px-5 py-3 rounded-xl border-2 border-${tone}-500/40 bg-${tone}-500/10 text-${tone}-200 font-semibold text-sm rotate-0 max-w-md text-center`}>
        ❓ {condition}
      </div>
      <div className="grid sm:grid-cols-2 gap-3 ml-4 sm:ml-0">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold mb-1">Yes ↓</div>
          {yes}
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-rose-300 font-bold mb-1">No ↓</div>
          {no}
        </div>
      </div>
    </div>
  );
}

function TerminalNode({ color, label, detail }: { color: 'emerald' | 'pink' | 'rose' | 'zinc'; label: string; detail: string }) {
  const cls = {
    emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200',
    pink:    'border-[color:var(--color-brand-pink)]/40 bg-brand-gradient-soft text-pink-200',
    rose:    'border-rose-500/40 bg-rose-500/10 text-rose-200',
    zinc:    'border-zinc-700 bg-zinc-800/30 text-zinc-300',
  }[color];
  return (
    <div className={`rounded-xl border p-4 ${cls}`}>
      <div className="font-bold text-sm mb-1">{label}</div>
      <div className="text-xs opacity-90">{detail}</div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">{children}</p>;
}
