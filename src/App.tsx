import { useState } from 'react';
import { Hero } from './components/Hero';
import { CurrentState } from './components/CurrentState';
import { PodModel } from './components/PodModel';
import { LeadFlow } from './components/LeadFlow';
import { TimeRouting } from './components/TimeRouting';
import { GhlWorkflow } from './components/GhlWorkflow';
import { SlackChannels } from './components/SlackChannels';
import { SlaTargets } from './components/SlaTargets';
import { DailyRhythm } from './components/DailyRhythm';
import { CompPlan } from './components/CompPlan';
import { Roadmap } from './components/Roadmap';
import { HiringTree } from './components/HiringTree';
import { Footer } from './components/Footer';

const NAV_LINKS = [
  { id: 'now',       label: 'Now' },
  { id: 'pods',      label: 'Pod Model' },
  { id: 'flow',      label: 'Lead Flow' },
  { id: 'shift',     label: 'Shifts' },
  { id: 'ghl',       label: 'GHL' },
  { id: 'slack',     label: 'Slack' },
  { id: 'sla',       label: 'SLAs' },
  { id: 'rhythm',    label: 'Daily' },
  { id: 'comp',      label: 'Comp' },
  { id: 'roadmap',   label: 'Roadmap' },
  { id: 'hiring',    label: 'Hiring' },
];

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen page-bg">
      <Nav open={open} setOpen={setOpen} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-32">
        <section id="hero"><Hero /></section>
        <section id="now"     className="mt-24"><CurrentState /></section>
        <section id="pods"    className="mt-32"><PodModel /></section>
        <section id="flow"    className="mt-32"><LeadFlow /></section>
        <section id="shift"   className="mt-32"><TimeRouting /></section>
        <section id="ghl"     className="mt-32"><GhlWorkflow /></section>
        <section id="slack"   className="mt-32"><SlackChannels /></section>
        <section id="sla"     className="mt-32"><SlaTargets /></section>
        <section id="rhythm"  className="mt-32"><DailyRhythm /></section>
        <section id="comp"    className="mt-32"><CompPlan /></section>
        <section id="roadmap" className="mt-32"><Roadmap /></section>
        <section id="hiring"  className="mt-32"><HiringTree /></section>
        <Footer />
      </main>
    </div>
  );
}

function Nav({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[color:var(--color-bg)]/75 border-b border-[color:var(--color-border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2.5">
          <img src="/rambitious-logo.png" alt="" className="h-7 w-7 drop-shadow-[0_0_8px_rgba(236,72,153,0.4)]" />
          <span className="font-semibold tracking-tight text-zinc-100">
            Vision <span className="text-brand-gradient">Board</span>
          </span>
        </a>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(l => (
            <a key={l.id} href={`#${l.id}`} className="text-xs font-medium px-3 py-1.5 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <button onClick={() => setOpen(!open)} className="lg:hidden text-zinc-400">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-[color:var(--color-border)] px-4 py-2 grid grid-cols-3 gap-1">
          {NAV_LINKS.map(l => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} className="text-xs font-medium px-3 py-2 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-white/5 text-center">
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
