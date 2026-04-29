interface Week {
  num: number;
  title: string;
  items: string[];
}

const WEEKS: Week[] = [
  { num: 1, title: 'Foundation',         items: ['Up daily ad spend to $200/d (DONE)', 'Close 2 pipeline clients → 4 PPSA total', 'Post CSM job description on OnlineJobs.ph + X', 'Post Tech Guy job description', 'Stand up Slack workspace + channel naming', 'Begin Rambitious OS upgrade (DONE — multi-user auth shipped)'] },
  { num: 2, title: 'First hires',        items: ['Interview 5+ CSMs, hire first 2 (one per shift)', 'Interview 3+ tech guys, hire 1', 'Onboard tech guy first', 'CSMs shadow current process', 'Continue selling — target 1–2 more closes'] },
  { num: 3, title: 'Operational handoff',items: ['Tech guy fully owns onboarding for next new client', 'CSMs take over lead calling for all existing clients', 'Ram stops calling leads entirely', 'Slack channels live for every client, CSMs introduced', 'Rambitious OS update LIVE — CSMs have logins (IN PROGRESS)', 'Review: am I still doing fulfillment work?'] },
  { num: 4, title: 'Scale & audit',      items: ['Target: 8–10 total PPSA clients', 'First pod near full (4–5 clients in one sub-account)', 'Audit CSM performance (appts/day per CSM)', 'Audit client happiness scores (anyone < 7? why?)', 'Plan: when do I open Pod #2?'] },
];

export function Roadmap() {
  return (
    <div>
      <Eyebrow>06 · 30-day roadmap</Eyebrow>
      <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50">
        Week-by-week to <span className="text-brand-gradient">10 clients</span>
      </h2>
      <p className="mt-3 text-zinc-400 max-w-2xl">
        Concrete, audited weekly. If we're behind on a week, the next week is sales-only until caught up.
      </p>

      <div className="mt-10 grid lg:grid-cols-2 gap-4">
        {WEEKS.map(w => (
          <div key={w.num} className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5 relative overflow-hidden">
            <div className="absolute -top-12 -right-8 h-32 w-32 rounded-full bg-[color:var(--color-brand-pink)] opacity-10 blur-3xl" />
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-gradient flex items-center justify-center text-white font-bold text-sm">
                W{w.num}
              </div>
              <h3 className="font-bold text-zinc-100">{w.title}</h3>
            </div>
            <ul className="space-y-1.5">
              {w.items.map((item, i) => (
                <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                  <span className="text-pink-200 mt-1.5 shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">{children}</p>;
}
