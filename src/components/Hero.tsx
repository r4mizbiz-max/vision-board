export function Hero() {
  return (
    <div className="pt-20 sm:pt-32 pb-12 relative">
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <img src="/rambitious-logo.png" alt="" className="h-96 w-96 opacity-[0.07] blur-[2px]" />
      </div>

      <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
        Rambitious Media — Internal
      </p>
      <h1 className="mt-3 text-5xl sm:text-7xl font-bold tracking-tight text-zinc-50 leading-[1.05]">
        The PPSA <br className="sm:hidden" />
        <span className="text-brand-gradient">scaling playbook</span>
      </h1>
      <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl leading-relaxed">
        Where Rambitious goes from <span className="text-zinc-200 font-semibold">2 clients + me</span> to a
        demon agency built on <span className="text-zinc-200 font-semibold">tight pods</span>, predictable economics,
        and zero guessing for anyone on the team.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <a href="#flow" className="inline-flex items-center gap-2 bg-brand-gradient text-white font-semibold px-5 py-2.5 rounded-xl text-sm">
          See the lead flow →
        </a>
        <a href="#pods" className="inline-flex items-center gap-2 bg-[color:var(--color-surface)] border border-[color:var(--color-border)] text-zinc-200 font-semibold px-5 py-2.5 rounded-xl text-sm hover:border-[color:var(--color-brand-pink)]/40 transition-colors">
          Pod model
        </a>
        <a href="https://github.com/r4mizbiz-max/vision-board" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-200 px-3 py-2.5 rounded-xl text-sm">
          Source on GitHub →
        </a>
      </div>
    </div>
  );
}
