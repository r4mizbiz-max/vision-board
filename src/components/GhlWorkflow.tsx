export function GhlWorkflow() {
  return (
    <div>
      <Eyebrow>GHL workflow build</Eyebrow>
      <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50">
        One workflow per <span className="text-brand-gradient">sub-account</span>
      </h2>
      <p className="mt-3 text-zinc-400 max-w-2xl">
        Set this up once per GHL sub-account (= per pod). Every client in that pod uses this same workflow.
      </p>

      <div className="mt-10 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6">
        <Step number="1" title="Trigger" desc="Form Submitted (any lead form in this sub-account)" />
        <Step number="2" title="Get current EST hour" desc="Action: Get Custom Date/Time · Format: HH · TZ: America/New_York · Save as: current_hour_est" />
        <Step number="3" title="If/Else: which shift?" desc="Branch on current_hour_est">
          <Branch range="≥ 6 AND < 14" goto="Morning Shift branch" />
          <Branch range="≥ 14 AND < 20" goto="Evening Shift branch" />
          <Branch range="else" goto="Off-Hours Queue branch" />
        </Step>
        <Step number="4a" title="Inside Morning branch" desc="">
          <Subtask label="Assign to User" detail="Morning CSM (e.g. Ahed Sheta)" />
          <Subtask label="Send Slack message" detail="To #new-lead and #client-<slug> with @mention of morning CSM" />
          <Subtask label="Wait 60 sec" detail="If no call attempt yet, send DM nudge" />
        </Step>
        <Step number="4b" title="Inside Evening branch" desc="Same as Morning, but assign to Evening CSM and ping their Slack ID" />
        <Step number="4c" title="Inside Off-Hours branch" desc="">
          <Subtask label="Add tag" detail="`overnight-queue` on the contact" />
          <Subtask label="Slack message to #new-lead" detail="⏰ OVERNIGHT LEAD — picked up by morning CSM at 6am" />
          <Subtask label="Wait Until 6:00am EST" detail="Then assign to morning CSM + ping again" />
        </Step>
        <Step number="5" title="After call disposition (separate workflow)" desc="">
          <Subtask label="Booked" detail="GHL appointment workflow → existing OS webhook → billing fires" />
          <Subtask label="No Answer" detail="Auto-retry at +5min, +30min (3-touch sequence)" />
          <Subtask label="Not Interested" detail="Mark lost, no billing" />
          <Subtask label="Callback Requested" detail="Schedule per their preferred time, ping CSM 15min before" />
        </Step>
      </div>
    </div>
  );
}

function Step({ number, title, desc, children }: { number: string; title: string; desc: string; children?: React.ReactNode }) {
  return (
    <div className="flex gap-4 mb-5 last:mb-0">
      <div className="shrink-0 h-8 w-8 rounded-lg bg-brand-gradient text-white font-bold text-sm flex items-center justify-center">
        {number}
      </div>
      <div className="flex-1">
        <div className="font-semibold text-zinc-100">{title}</div>
        {desc && <div className="text-sm text-zinc-400 mt-0.5">{desc}</div>}
        {children && <div className="mt-2 space-y-1.5">{children}</div>}
      </div>
    </div>
  );
}

function Branch({ range, goto }: { range: string; goto: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <code className="font-mono px-1.5 py-0.5 rounded bg-[color:var(--color-surface-2)] text-pink-200">{range}</code>
      <span className="text-zinc-500">→</span>
      <span className="text-zinc-300">{goto}</span>
    </div>
  );
}

function Subtask({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-2 text-xs">
      <span className="font-semibold text-zinc-200">{label}:</span>
      <span className="text-zinc-400">{detail}</span>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">{children}</p>;
}
