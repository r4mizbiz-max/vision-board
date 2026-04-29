export function CurrentState() {
  return (
    <div>
      <Eyebrow>Where we are · where we're going</Eyebrow>
      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <Card label="Today" accent="violet">
          <Stat label="PPSA clients signed" value="2" hint="2 more in pipeline" />
          <Stat label="Daily ad spend (B2B)" value="$200/d" hint="just upped from $100" />
          <Stat label="Team size" value="1" hint="Just Ram + Ahed (CSM, soon)" />
          <Stat label="Slack channels" value="13" hint="Ops pipeline live" />
        </Card>
        <Card label="30 days out" accent="pink">
          <Stat label="PPSA clients" value="8–10" hint="full pod #1 + start pod #2" />
          <Stat label="CSMs onboarded" value="2" hint="6a–2p + 2p–8p coverage" />
          <Stat label="Tech hire" value="1" hint="full onboarding handoff" />
          <Stat label="Pod margin (full)" value="$25k/mo" hint="6 clients × ~30 appts × $150" />
        </Card>
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">{children}</p>;
}
function Card({ label, accent, children }: { label: string; accent: 'violet' | 'pink'; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 relative overflow-hidden">
      <div className={`absolute -top-20 -right-12 h-44 w-44 rounded-full opacity-20 blur-3xl ${accent === 'violet' ? 'bg-[color:var(--color-brand-violet)]' : 'bg-[color:var(--color-brand-pink)]'}`} />
      <h3 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">{label}</h3>
      <div className="mt-4 grid grid-cols-2 gap-4 relative">{children}</div>
    </div>
  );
}
function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div>
      <div className="text-2xl font-bold text-zinc-50 tabular-nums">{value}</div>
      <div className="text-xs text-zinc-400 mt-0.5">{label}</div>
      {hint && <div className="text-[11px] text-zinc-600 mt-0.5">{hint}</div>}
    </div>
  );
}
