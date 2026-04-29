export function Footer() {
  return (
    <footer className="mt-32 pt-12 border-t border-[color:var(--color-border)]">
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-2.5">
            <img src="/rambitious-logo.png" alt="" className="h-7 w-7 drop-shadow-[0_0_8px_rgba(236,72,153,0.4)]" />
            <span className="font-semibold tracking-tight text-zinc-100">
              Rambitious <span className="text-brand-gradient">Vision Board</span>
            </span>
          </div>
          <p className="mt-3 text-sm text-zinc-400 max-w-md">
            Internal source of truth. Updated as the org evolves. Stale text here means we owe an update.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <a href="https://github.com/r4mizbiz-max/vision-board" target="_blank" rel="noreferrer" className="block text-zinc-400 hover:text-zinc-100 transition-colors">
            → Source on GitHub
          </a>
          <a href="https://github.com/r4mizbiz-max/rambitious-agency-os" target="_blank" rel="noreferrer" className="block text-zinc-400 hover:text-zinc-100 transition-colors">
            → Rambitious OS repo
          </a>
          <a href="https://rambitiousmedia.com" target="_blank" rel="noreferrer" className="block text-zinc-400 hover:text-zinc-100 transition-colors">
            → Live dashboard
          </a>
        </div>
      </div>
      <p className="mt-8 text-xs text-zinc-600 font-mono">
        Built for Ramiz · Rambitious Media · 2026
      </p>
    </footer>
  );
}
