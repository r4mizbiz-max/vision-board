export function PodModel() {
  return (
    <div>
      <Eyebrow>02 · Org Structure</Eyebrow>
      <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50">The Pod Model</h2>
      <p className="mt-3 text-zinc-400 max-w-2xl">
        Each pod = 1 GHL sub-account holding up to <span className="text-pink-200 font-semibold">6 clients</span>,
        served by <span className="text-pink-200 font-semibold">2 CSMs</span> on opposing shifts. 14 hours of
        coverage per day, every day.
      </p>

      <div className="mt-8 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 sm:p-10">
        {/* Owner */}
        <div className="flex justify-center">
          <div className="rounded-xl bg-brand-gradient text-white px-6 py-3 font-bold text-sm shadow-[0_0_24px_rgba(236,72,153,0.45)]">
            👑 Ramiz · Owner
          </div>
        </div>

        {/* Vertical line */}
        <div className="flex justify-center my-2">
          <div className="w-0.5 h-8 bg-[color:var(--color-brand-pink)]/40" />
        </div>

        {/* Pods row */}
        <div className="grid sm:grid-cols-2 gap-6">
          <PodCard
            number="1"
            label="Active"
            csms={[{ name: 'Ahed Sheta', shift: 'Morning · 6a–2p' }, { name: '(open)', shift: 'Evening · 2p–8p' }]}
            clients={['Clear Heating & Air', '(client #2)', '(open slot)', '(open slot)', '(open slot)', '(open slot)']}
          />
          <PodCard
            number="2"
            label="Future · trigger at 6/6"
            csms={[{ name: '(open)', shift: 'Morning · 6a–2p' }, { name: '(open)', shift: 'Evening · 2p–8p' }]}
            clients={['(needs 2 signed before hire)', '...', '...', '...', '...', '...']}
            future
          />
        </div>

        {/* Math */}
        <div className="mt-10 grid sm:grid-cols-3 gap-3">
          <Math num="14h" label="Daily lead-call coverage" />
          <Math num="~90" label="Daily leads at 6/6 (~15/client)" />
          <Math num="$25k" label="Margin / pod / mo at full" />
        </div>
      </div>
    </div>
  );
}

function PodCard({ number, label, csms, clients, future = false }: {
  number: string; label: string;
  csms: { name: string; shift: string }[];
  clients: string[];
  future?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-5 ${future ? 'border-dashed border-zinc-700/60 bg-transparent' : 'border-[color:var(--color-brand-pink)]/30 bg-brand-gradient-soft'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`font-bold ${future ? 'text-zinc-500' : 'text-zinc-100'}`}>POD #{number}</h3>
        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${future ? 'bg-zinc-500/15 text-zinc-400 ring-1 ring-zinc-500/30' : 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30'}`}>
          {label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {csms.map((c, i) => (
          <div key={i} className={`rounded-lg p-2.5 text-xs ${future ? 'bg-zinc-900/40 border border-dashed border-zinc-700' : 'bg-[color:var(--color-surface-2)] border border-[color:var(--color-border)]'}`}>
            <div className={`font-semibold ${future ? 'text-zinc-500' : 'text-zinc-100'}`}>{c.name}</div>
            <div className="text-[10px] text-zinc-500 mt-0.5">{c.shift}</div>
          </div>
        ))}
      </div>

      <div className="space-y-1">
        <div className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5">6 client slots</div>
        {clients.map((c, i) => (
          <div key={i} className={`text-xs rounded px-2 py-1.5 truncate ${c.startsWith('(') ? 'text-zinc-600 italic bg-transparent border border-dashed border-zinc-700/40' : 'text-zinc-200 bg-[color:var(--color-surface-2)]'}`}>
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}

function Math({ num, label }: { num: string; label: string }) {
  return (
    <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] p-4">
      <div className="text-2xl font-bold text-brand-gradient">{num}</div>
      <div className="text-xs text-zinc-500 mt-0.5">{label}</div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">{children}</p>;
}
