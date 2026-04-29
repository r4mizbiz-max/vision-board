export function CompPlan() {
  return (
    <div>
      <Eyebrow>03 · Compensation</Eyebrow>
      <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50">
        Pay structure
      </h2>
      <p className="mt-3 text-zinc-400 max-w-2xl">
        Base + commission. Margin engine = per-appt billing, so commission is on appointments, not retainer.
      </p>

      <div className="mt-10 grid lg:grid-cols-3 gap-4">
        <PayCard
          role="CSM"
          base="$750 / mo"
          commission="5% of every appointment they book"
          expectations="6 hours / day · 5 days / week"
          tone="pink"
        />
        <PayCard
          role="Tech Guy"
          base="$1,000 / mo"
          commission="$75 per client onboarded"
          expectations="Build ads in CapCut, launch on Meta, install pixel, configure GHL"
          tone="violet"
        />
        <PayCard
          role="Ramiz"
          base="Everything left"
          commission="after payroll, ad spend, software, fulfillment"
          expectations="Acquisition (B2B ads, sales calls, closing) + team mgmt"
          tone="orange"
        />
      </div>

      <div className="mt-10 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 sm:p-8">
        <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-4">Pod economics at 6/6 (full)</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Number label="Retainer revenue" value="$1,782/mo" detail="6 × $297" tone="emerald" />
          <Number label="CSM base cost" value="$1,500/mo" detail="2 × $750" tone="rose" />
          <Number label="Per-appt billing" value="~$27,000/mo" detail="6 clients × ~30 appts × $150" tone="emerald" />
          <Number label="Pod margin (after labor + comm)" value="~$25,000/mo" detail="The actual answer" tone="pink" />
        </div>
      </div>
    </div>
  );
}

function PayCard({ role, base, commission, expectations, tone }: { role: string; base: string; commission: string; expectations: string; tone: 'pink' | 'violet' | 'orange' }) {
  const grad = {
    pink:   'from-[color:var(--color-brand-pink)]/15 to-transparent border-[color:var(--color-brand-pink)]/30',
    violet: 'from-[color:var(--color-brand-violet)]/15 to-transparent border-[color:var(--color-brand-violet)]/30',
    orange: 'from-[color:var(--color-brand-orange)]/15 to-transparent border-[color:var(--color-brand-orange)]/30',
  }[tone];
  return (
    <div className={`rounded-2xl border bg-gradient-to-b p-5 ${grad}`}>
      <h3 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">{role}</h3>
      <div className="mt-3">
        <div className="text-xs text-zinc-500">Base</div>
        <div className="text-xl font-bold text-zinc-50">{base}</div>
      </div>
      <div className="mt-3">
        <div className="text-xs text-zinc-500">Commission</div>
        <div className="text-sm text-zinc-200">{commission}</div>
      </div>
      <div className="mt-3 pt-3 border-t border-[color:var(--color-border)]">
        <div className="text-xs text-zinc-400">{expectations}</div>
      </div>
    </div>
  );
}

function Number({ label, value, detail, tone }: { label: string; value: string; detail: string; tone: 'pink' | 'emerald' | 'rose' }) {
  const t = { pink: 'text-pink-200', emerald: 'text-emerald-300', rose: 'text-rose-300' }[tone];
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-zinc-500">{label}</div>
      <div className={`text-2xl font-bold mt-1 tabular-nums ${t}`}>{value}</div>
      <div className="text-[11px] text-zinc-500 mt-0.5">{detail}</div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">{children}</p>;
}
