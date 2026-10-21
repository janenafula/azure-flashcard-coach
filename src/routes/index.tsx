import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Azure Flashcard Coach — AZ-900 Study Cards" },
      { name: "description", content: "Flip through friendly AZ-900 flashcards on core cloud concepts." },
      { property: "og:title", content: "Azure Flashcard Coach" },
      { property: "og:description", content: "Flip through friendly AZ-900 flashcards on core cloud concepts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type Card = { term: string; def: string };

const CARDS: Card[] = [
  { term: "Cloud Computing", def: "Renting computing power, storage and apps over the internet instead of owning the hardware yourself." },
  { term: "IaaS", def: "Infrastructure as a Service: you rent virtual machines, storage and networks, and manage the OS and apps yourself." },
  { term: "PaaS", def: "Platform as a Service: the provider runs the servers and OS; you just bring your code and data." },
  { term: "SaaS", def: "Software as a Service: ready-to-use apps over the internet, like email. You just log in and use it." },
  { term: "Public Cloud", def: "Cloud services owned by a provider and shared by many customers over the internet." },
  { term: "Private Cloud", def: "Cloud resources used by only one organization, either on-site or hosted by a provider." },
  { term: "Hybrid Cloud", def: "A mix of public and private clouds that work together, letting data and apps move between them." },
  { term: "Shared Responsibility Model", def: "Security duties are split: the provider secures the cloud, and you secure what you put in it." },
  { term: "Scalability", def: "The ability to add or remove resources to handle more or less work." },
  { term: "High Availability", def: "Keeping a service up and running with very little downtime, even when parts fail." },
  { term: "CapEx vs OpEx", def: "CapEx is buying hardware up front; OpEx is paying as you go. Cloud moves you toward OpEx." },
  { term: "Consumption-based Model", def: "You only pay for the cloud resources you actually use, like a utility bill." },
];

function Index() {
  const [cards, setCards] = useState(CARDS);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards[i];

  const go = (n: number) => { setFlipped(false); setI((n + cards.length) % cards.length); };
  const shuffle = () => {
    const c = [...cards];
    for (let k = c.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [c[k], c[j]] = [c[j], c[k]]; }
    setCards(c); setI(0); setFlipped(false);
  };

  const btn = "inline-flex items-center gap-2 rounded-full px-5 py-3 font-bold transition-transform hover:scale-105 active:scale-95";

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-6 pt-10 text-center">
        <span className="inline-block rounded-full bg-accent px-4 py-1 text-sm font-bold text-accent-foreground">AZ-900 · Cloud Concepts</span>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold text-foreground md:text-5xl">Azure Flashcard Coach</h1>
        <p className="mt-2 text-muted-foreground">Tap the card to flip it.</p>
      </header>

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center px-6 py-10">
        <p className="mb-4 font-bold text-primary">Card {i + 1} of {cards.length}</p>
        <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((i + 1) / cards.length) * 100}%` }} />
        </div>

        <button onClick={() => setFlipped((f) => !f)} aria-label="Flip card" className="perspective h-80 w-full">
          <div className={`preserve-3d relative h-full w-full transition-transform duration-500 ${flipped ? "rotate-y-180" : ""}`}>
            <div className="backface-hidden bg-front shadow-card absolute inset-0 flex flex-col items-center justify-center rounded-3xl p-8 text-primary-foreground">
              <span className="text-xs font-bold uppercase tracking-widest opacity-80">Term</span>
              <h2 className="mt-3 text-center font-[family-name:var(--font-display)] text-4xl font-semibold">{card.term}</h2>
            </div>
            <div className="backface-hidden rotate-y-180 bg-back shadow-card absolute inset-0 flex flex-col items-center justify-center rounded-3xl p-8 text-accent-foreground">
              <span className="text-xs font-bold uppercase tracking-widest opacity-80">{card.term}</span>
              <p className="mt-3 text-center text-xl font-semibold leading-relaxed">{card.def}</p>
            </div>
          </div>
        </button>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={() => go(i - 1)} className={`${btn} bg-card text-foreground shadow-sm`}><ChevronLeft className="h-5 w-5" />Previous</button>
          <button onClick={shuffle} className={`${btn} bg-secondary text-secondary-foreground`}><Shuffle className="h-5 w-5" />Shuffle</button>
          <button onClick={() => go(i + 1)} className={`${btn} bg-primary text-primary-foreground`}>Next<ChevronRight className="h-5 w-5" /></button>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        An unofficial study tool, not affiliated with Microsoft.
      </footer>
    </div>
  );
}
