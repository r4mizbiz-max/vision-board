interface ChannelDef {
  name: string;
  visibility: 'public' | 'private';
  members: string;
  posts: string;
  watches: string;
  tone?: 'pink' | 'violet' | 'amber' | 'emerald' | 'zinc';
}

const CHANNELS: ChannelDef[] = [
  { name: 'all-rambitious-ops', visibility: 'public', members: 'Everyone', posts: 'Announcements, weekly metrics', watches: 'Everyone', tone: 'violet' },
  { name: 'csms', visibility: 'private', members: 'CSMs + Ram', posts: 'Shift handoffs, escalations, kudos', watches: 'All CSMs', tone: 'pink' },
  { name: 'new-lead', visibility: 'private', members: 'CSMs + Ram + GHL', posts: 'EVERY new lead with @mention', watches: 'All CSMs (filter @mentions)', tone: 'pink' },
  { name: 'booked-calls', visibility: 'private', members: 'CSMs + Ram', posts: 'Auto-feed when call booked', watches: 'All CSMs', tone: 'emerald' },
  { name: 'no-show', visibility: 'private', members: 'CSMs + Ram', posts: 'Auto-feed on no-shows', watches: 'All CSMs', tone: 'amber' },
  { name: 'cancellations', visibility: 'private', members: 'CSMs + Ram', posts: 'Auto-feed on cancellations', watches: 'All CSMs', tone: 'amber' },
  { name: 'closed-deals', visibility: 'private', members: 'CSMs + Ram', posts: 'Auto-feed on close 🎉', watches: 'All CSMs', tone: 'emerald' },
  { name: 'eod-form', visibility: 'private', members: 'CSMs + Ram', posts: 'End-of-day reports', watches: 'Ram', tone: 'zinc' },
  { name: 'client-<name>', visibility: 'private', members: 'Ram + 2 CSMs + (client)', posts: 'All client-specific chatter', watches: 'Assigned CSMs', tone: 'pink' },
  { name: 'pod-<N>', visibility: 'private', members: '2 CSMs in pod', posts: 'Pod-internal coordination', watches: 'Both CSMs', tone: 'violet' },
  { name: 'social', visibility: 'public', members: 'Everyone', posts: 'Memes, off-topic', watches: 'Everyone', tone: 'zinc' },
];

const TONE_CLS: Record<string, string> = {
  pink:    'border-[color:var(--color-brand-pink)]/30',
  violet:  'border-[color:var(--color-brand-violet)]/30',
  amber:   'border-amber-500/30',
  emerald: 'border-emerald-500/30',
  zinc:    'border-zinc-700/50',
};

export function SlackChannels() {
  return (
    <div>
      <Eyebrow>Slack channels</Eyebrow>
      <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50">
        Every message has <span className="text-brand-gradient">one home</span>
      </h2>
      <p className="mt-3 text-zinc-400 max-w-2xl">
        No "where do I post this?" guesswork. Each channel has an explicit purpose. CSMs filter their @mentions; nothing important gets buried.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CHANNELS.map(c => (
          <div key={c.name} className={`rounded-xl border ${TONE_CLS[c.tone || 'zinc']} bg-[color:var(--color-surface)] p-4`}>
            <div className="flex items-center justify-between mb-2">
              <code className="text-pink-200 font-mono font-semibold">#{c.name}</code>
              <span className="text-[10px] uppercase tracking-wider text-zinc-500">
                {c.visibility === 'private' ? '🔒 private' : '🌐 public'}
              </span>
            </div>
            <Row label="Members" value={c.members} />
            <Row label="Posts here" value={c.posts} />
            <Row label="Who watches" value={c.watches} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-xs mt-1.5">
      <span className="text-zinc-500">{label}: </span>
      <span className="text-zinc-200">{value}</span>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">{children}</p>;
}
