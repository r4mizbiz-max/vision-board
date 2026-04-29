interface RhythmStep {
  time: string;
  title: string;
  desc: string;
}

const STEPS: RhythmStep[] = [
  { time: 'T+0',     title: 'Online ☀️',           desc: 'Open dashboard. Read top of #csms for handoff. Reply with: "Online — focusing on [Client A], [B] today. [Open thread] still pending."' },
  { time: 'T+10',    title: 'Watch the pings',     desc: 'Notifications ON for #new-lead and assigned #client-* channels. Every @mention = a lead is yours.' },
  { time: 'During',  title: '60-second SLA',       desc: 'Lead pings → call. Use GHL mobile app for outbound (your number is masked). Set disposition after every call.' },
  { time: 'Mid',     title: 'Lunch break',         desc: '30 min anywhere in the 6h shift. Post: "🥪 BRB 30min — @other-csm please cover urgent leads."' },
  { time: 'T-30',    title: 'Wrap up',             desc: 'Update happiness score (1-10) for each assigned client. Drop a note for any < 7.' },
  { time: 'EOD',     title: 'Sign off',            desc: 'Post EOD summary in #csms: leads received / called / booked / open threads / what handoff needs.' },
];

export function DailyRhythm() {
  return (
    <div>
      <Eyebrow>The 6-hour shift</Eyebrow>
      <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50">
        Daily rhythm — <span className="text-brand-gradient">5 minutes of writing</span>, all phones
      </h2>
      <p className="mt-3 text-zinc-400 max-w-2xl">
        Print this, hand it to every new CSM on day one. They never have to wonder "what now?"
      </p>

      <div className="mt-10 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 sm:p-8">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-[color:var(--color-brand-pink)]/30" />

          <div className="space-y-5">
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-4 relative">
                <div className="relative shrink-0 z-10">
                  <div className="h-8 w-8 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold text-[10px] shadow-[0_0_12px_rgba(236,72,153,0.4)]">
                    {i + 1}
                  </div>
                </div>
                <div className="flex-1 pb-1">
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="text-xs font-mono text-pink-200 font-semibold">{s.time}</span>
                    <span className="font-semibold text-zinc-100">{s.title}</span>
                  </div>
                  <p className="text-sm text-zinc-400">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-[color:var(--color-brand-pink)]/30 bg-brand-gradient-soft p-5">
        <p className="text-xs uppercase tracking-wider text-pink-200 font-bold mb-2">TL;DR for the CSM (print this)</p>
        <ol className="space-y-1.5 text-sm text-zinc-200 list-decimal list-inside">
          <li><span className="font-semibold">Watch your @mentions in Slack.</span> They ping when a lead is yours.</li>
          <li><span className="font-semibold">Call within 60 seconds.</span> Speed &gt; everything.</li>
          <li><span className="font-semibold">Set the disposition in GHL after every call.</span> No exceptions.</li>
          <li><span className="font-semibold">EOD: update happiness + note for any client &lt; 7.</span></li>
          <li><span className="font-semibold">Read #csms first thing.</span> Last shift's handoff is your starting point.</li>
        </ol>
        <p className="text-xs text-zinc-300 mt-3">
          If you don't know who owns something — it's whoever is on-shift right now. The dashboard's "On Shift Now" panel tells you. <span className="text-pink-200 font-semibold">You never have to guess.</span>
        </p>
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">{children}</p>;
}
