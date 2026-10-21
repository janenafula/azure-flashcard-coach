import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Azure Flashcard Coach — AZ-900 Study Cards" },
      { name: "description", content: "Flip through friendly AZ-900 flashcards on cloud models, Azure services, pricing, identity, policy and governance." },
      { property: "og:title", content: "Azure Flashcard Coach" },
      { property: "og:description", content: "Flip through friendly AZ-900 flashcards on cloud models, Azure services, pricing, identity, policy and governance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type Card = { term: string; def: string };

const CARDS: Card[] = [
  {
    term: "Cloud Models",
    def: "A public cloud is owned by a provider and shared by many customers over the internet. A private cloud is used by just one organisation, on-site or hosted. A hybrid cloud connects the two so data and applications can move between them.",
  },
  {
    term: "IaaS",
    def: "Infrastructure as a Service means you rent the building blocks: virtual machines, storage and networks. Azure keeps the hardware running, while you install and manage the operating system and applications yourself. It is the closest thing to owning your own servers, without buying them.",
  },
  {
    term: "PaaS",
    def: "Platform as a Service gives you a ready-made place to build and run your code. Azure handles the servers, operating system and patching, so you only bring your application and data. You spend less time on upkeep and more time on building.",
  },
  {
    term: "SaaS",
    def: "Software as a Service delivers finished applications over the internet, like email or online office tools. You simply sign in and start working — nothing to install or update. The provider looks after everything behind the scenes.",
  },
  {
    term: "Azure Regions & Availability Zones",
    def: "A region is a set of data centres in one geographic area, such as West Europe. In supported regions, availability zones are separate locations inside that region, each with its own power, cooling and network. Spreading your workload across zones keeps it running even if one location fails.",
  },
  {
    term: "Azure Resource Groups",
    def: "A resource group is a container that holds related Azure resources, like a web app, its database and its network. You monitor, update and delete everything inside it as a single unit. Every resource lives in exactly one resource group.",
  },
  {
    term: "Azure Pricing Calculator",
    def: "The Azure Pricing Calculator lets you estimate what a solution will cost before you build it. Choose the services and the usage you expect, and it shows a monthly estimate. Nothing is charged — it is purely a planning tool.",
  },
  {
    term: "Pricing Calculator — What Affects Price",
    def: "Your Azure bill moves with the region you pick, the service tier you choose and how much you use. The pricing calculator lets you change those choices and watch the monthly estimate adjust. You can save an estimate and share it with your team for review.",
  },
  {
    term: "TCO Calculator",
    def: "The Total Cost of Ownership calculator compares running your own data centre against moving to Azure. Enter your current servers, power and staff costs, and it estimates the savings you could make. It helps build the money case for moving to the cloud.",
  },
  {
    term: "TCO Calculator — What It Compares",
    def: "The total cost of ownership calculator looks at hardware, power, cooling and staff time in your own data centre, then compares that with running the same workload on Azure. It also factors in savings such as newer hardware and reserved pricing. The output is an estimate to support your business case, not a binding quote.",
  },
  {
    term: "Microsoft Entra ID",
    def: "Microsoft Entra ID is Azure's identity service — it decides who can sign in and what they are allowed to access. It provides single sign-on and multi-factor authentication for your users and applications. It was formerly known as Azure Active Directory.",
  },
  {
    term: "Microsoft Entra ID — Sign-In Security",
    def: "Conditional Access is a Microsoft Entra ID rule that checks the conditions of a sign-in before access is granted. It can require multi-factor authentication, block unfamiliar locations or insist on a managed device. The security check happens at the moment someone tries to sign in.",
  },
  {
    term: "Azure Policy",
    def: "Azure Policy lets you set rules that your resources must follow, such as requiring tags or blocking certain regions. It checks new and existing resources and reports anything that breaks the rules. This keeps your environment consistent and compliant.",
  },
  {
    term: "Azure Policy — Initiatives",
    def: "An initiative is a bundle of related Azure Policy rules grouped together, such as all the rules needed for an industry standard. Assigning one initiative applies many policies at once instead of one at a time. Azure Policy then reports which resources comply and which need fixing.",
  },
  {
    term: "Shared Responsibility Model",
    def: "Security in the cloud is a shared job. Azure always protects the physical data centres, the physical network and the host hardware. You always own your data, your accounts and who has access — how much else you manage depends on whether you use IaaS, PaaS or SaaS.",
  },
  {
    term: "Shared Responsibility — Your Data",
    def: "Whatever cloud service you use, your data is always your responsibility. That means controlling who can see it, keeping backups and encrypting it where required. Azure keeps the platform healthy, but it does not know which of your files matter most.",
  },
  {
    term: "Azure Well-Architected Framework",
    def: "The Well-Architected Framework is guidance for building dependable workloads on Azure. It is built on five pillars: cost optimisation, operational excellence, performance efficiency, reliability and security. Use it to review a design and spot weak spots before they become problems.",
  },
  {
    term: "Well-Architected — Reliability Pillar",
    def: "The reliability pillar is about a workload recovering from failures and continuing to run. It asks you to build in redundancy, recover automatically and test your assumptions. The aim is a system that keeps working even when parts of it break.",
  },
];

function Index() {
  const [cards, setCards] = useState(CARDS);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards[i] ?? CARDS[0]!;

  const go = (n: number) => { setFlipped(false); setI((n + cards.length) % cards.length); };
  const shuffle = () => {
    const c = [...cards];
    for (let k = c.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); const t = c[k]!; c[k] = c[j]!; c[j] = t; }
    setCards(c); setI(0); setFlipped(false);
  };

  const btn = "inline-flex items-center gap-2 rounded-full px-5 py-3 font-bold transition-transform hover:scale-105 active:scale-95";

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-6 pt-10 text-center">
        <span className="inline-block rounded-full bg-accent px-4 py-1 text-sm font-bold text-accent-foreground">AZ-900 · Core Study Topics</span>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold text-foreground md:text-5xl">Azure Flashcard Coach</h1>
        <p className="mt-2 text-muted-foreground">Tap the card to flip it.</p>
      </header>

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center px-6 py-10">
        <p className="mb-4 font-bold text-primary">Card {i + 1} of {cards.length}</p>
        <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((i + 1) / cards.length) * 100}%` }} />
        </div>

        <button onClick={() => setFlipped((f) => !f)} aria-label="Flip card" className="perspective h-[22rem] w-full md:h-[26rem]">
          <div className={`preserve-3d relative h-full w-full transition-transform duration-500 ${flipped ? "rotate-y-180" : ""}`}>
            <div className="backface-hidden bg-front shadow-card absolute inset-0 flex flex-col items-center justify-center rounded-3xl p-8 text-primary-foreground">
              <span className="text-xs font-bold uppercase tracking-widest opacity-80">Term</span>
              <h2 className="mt-3 text-center font-[family-name:var(--font-display)] text-3xl font-semibold md:text-4xl">{card.term}</h2>
            </div>
            <div className="backface-hidden rotate-y-180 bg-back shadow-card absolute inset-0 flex flex-col items-center justify-center rounded-3xl p-8 text-accent-foreground">
              <span className="text-xs font-bold uppercase tracking-widest opacity-80">{card.term}</span>
              <p className="mt-3 text-center text-lg font-semibold leading-relaxed md:text-xl">{card.def}</p>
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
