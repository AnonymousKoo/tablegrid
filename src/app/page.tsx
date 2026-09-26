import Image from "next/image";
import DemoOperatingView from "@/components/DemoOperatingView";

const outcomes = [
  {
    eyebrow: "Prevent shortages",
    title: "Know what runs out before it does.",
    body: "TableGrid turns upcoming demand into ingredient requirements, compares them with on-hand stock, and surfaces what needs attention before service is affected.",
    result: "Purchasing becomes proactive, not reactive.",
  },
  {
    eyebrow: "Plan production",
    title: "Prepare what you will sell.",
    body: "Orders and demand signals become clear production requirements so teams know what to prep, batch, pack, and finish.",
    result: "Less overproduction. Fewer missed orders.",
  },
  {
    eyebrow: "Protect margin",
    title: "See what the sale actually earned.",
    body: "Recipes, supplier pricing, packaging, production, and fulfillment costs connect back to what you sell.",
    result: "Revenue becomes measurable economics.",
  },
  {
    eyebrow: "Operate ahead",
    title: "Run tomorrow before tomorrow arrives.",
    body: "TableGrid continuously connects demand, inventory, purchasing, and production so the operation can act on what is coming next.",
    result: "Fewer surprises. Better decisions.",
  },
];

const network = [
  ["Demand", "What customers need"],
  ["Orders", "What was purchased"],
  ["Recipes", "What each order requires"],
  ["Inventory", "What you actually have"],
  ["Purchasing", "What must be replenished"],
  ["Production", "What needs to be made"],
  ["Fulfillment", "What gets completed"],
  ["Economics", "What it truly cost"],
  ["Profit", "What you actually kept"],
];

const intelligence = [
  {
    type: "Inventory risk",
    title: "Salmon shortage projected",
    meta: "Tomorrow · 1:40 PM",
    action: "Review purchase",
    detail: "18 lb additional inventory required",
  },
  {
    type: "Margin movement",
    title: "Chicken bowl margin fell",
    meta: "4.8 points this week",
    action: "Investigate",
    detail: "Primary driver: supplier chicken cost +11%",
  },
  {
    type: "Production shift",
    title: "Friday demand increased",
    meta: "+37 portions",
    action: "Update plan",
    detail: "Suggested adjustment: +2 production batches",
  },
];

const useCases = [
  ["Meal prep", "Recurring demand, portions, subscriptions, and production planning."],
  ["Catering", "Event demand, recipe requirements, purchasing, and production coordination."],
  ["Delivery-first kitchens", "Multichannel orders, packaging, fulfillment, and margin visibility."],
  ["Food brands", "Recipes, ingredients, inventory, production, and costing in one operating picture."],
  ["Growing kitchens", "Standardized operations across people, suppliers, and locations."],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function StatusDot({ tone = "green" }: { tone?: "green" | "gold" | "red" }) {
  const tones = {
    green: "bg-[#9BE15D] shadow-[0_0_18px_rgba(155,225,93,.5)]",
    gold: "bg-[#D8B875] shadow-[0_0_18px_rgba(216,184,117,.35)]",
    red: "bg-[#FF725C] shadow-[0_0_18px_rgba(255,114,92,.35)]",
  };

  return <span className={`inline-block size-2 rounded-full ${tones[tone]}`} />;
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050705] text-[#F7F4EC]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#050705]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-10">
          <a href="#" className="group flex items-center gap-3" aria-label="TableGrid home">
            <div className="relative size-11 overflow-hidden rounded-xl border border-white/10 bg-black">
              <Image
                src="/tablegrid-logo.webp"
                alt=""
                fill
                priority
                className="scale-[1.65] object-contain object-[50%_28%] transition-transform duration-500 group-hover:scale-[1.72]"
              />
            </div>
            <div className="leading-none">
              <div className="text-[17px] font-semibold tracking-[.18em]">
                TABLE<span className="text-[#9BE15D]">GRID</span>
              </div>
              <div className="mt-1 text-[8px] uppercase tracking-[.28em] text-white/45">Operating network</div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-white/64 lg:flex">
            <a href="#outcomes" className="transition hover:text-white">Outcomes</a>
            <a href="#network" className="transition hover:text-white">How it works</a>
            <a href="#intelligence" className="transition hover:text-white">Intelligence</a>
            <a href="#use-cases" className="transition hover:text-white">Who it is for</a>
          </nav>

          <a href="#contact" className="rounded-full border border-[#9BE15D]/45 bg-[#9BE15D]/10 px-5 py-2.5 text-sm font-medium text-[#DFFFC4] transition hover:bg-[#9BE15D]/16">
            See TableGrid in action
          </a>
        </div>
      </header>

      <section className="grid-bg relative pt-32">
        <div className="hero-glow pointer-events-none absolute inset-0" />
        <div className="mx-auto grid min-h-[820px] max-w-[1440px] items-center gap-14 px-6 py-14 lg:grid-cols-[.86fr_1.14fr] lg:px-10 lg:py-20">
          <div className="relative z-10">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.035] px-4 py-2 text-xs uppercase tracking-[.2em] text-white/55">
              <StatusDot /> The operating network for food businesses
            </div>

            <h1 className="max-w-[760px] text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-[78px]">
              Know what to make, buy, prep, and <span className="text-[#9BE15D]">profit.</span>
            </h1>

            <p className="mt-7 max-w-[650px] text-lg leading-8 text-white/58 sm:text-xl">
              TableGrid connects orders, recipes, inventory, purchasing, production, fulfillment, and economics so the entire operation works from the same reality.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#9BE15D] px-6 py-3.5 font-semibold text-[#071004] transition hover:bg-[#B3EF83]">
                See TableGrid in action <Arrow />
              </a>
              <a href="#network" className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[.03] px-6 py-3.5 font-medium text-white/78 transition hover:bg-white/[.06]">
                Explore the operating network
              </a>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/8 pt-7 text-sm text-white/58 sm:grid-cols-4">
              {["Fewer stockouts", "Less food waste", "Protected margins", "Predictable production"].map((item) => (
                <div key={item} className="flex items-center gap-2"><StatusDot tone="gold" /> {item}</div>
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <div className="mb-5 flex justify-center lg:justify-start lg:pl-3">
              <Image
                src="/tablegrid-logo.webp"
                alt="TableGrid logo"
                width={700}
                height={700}
                priority
                className="h-auto w-36 sm:w-40 lg:w-44"
              />
            </div>

            <DemoOperatingView />
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-[#070907] py-24 sm:py-32">
        <div className="mx-auto max-w-[1220px] px-6 lg:px-10">
          <div className="max-w-4xl">
            <div className="eyebrow">The disconnect</div>
            <h2 className="section-title mt-5">Your operation is not missing data. <span>It is missing connection.</span></h2>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Orders", "Storefront / POS"],
              ["Inventory", "Spreadsheet"],
              ["Recipes", "Binder / memory"],
              ["Purchasing", "Texts + vendor portals"],
              ["Production", "Whiteboard"],
              ["Accounting", "Separate system"],
            ].map(([name, source]) => (
              <div key={name} className="rounded-2xl border border-white/8 bg-white/[.02] p-6">
                <div className="text-sm text-white/40">{name}</div>
                <div className="mt-2 text-lg font-medium">{source}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-3xl text-xl leading-8 text-white/55">
            Every tool knows one piece of the business. TableGrid connects the operation so demand can drive what happens next.
          </div>
        </div>
      </section>

      <section id="outcomes" className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1220px] px-6 lg:px-10">
          <div className="max-w-4xl">
            <div className="eyebrow">What changes</div>
            <h2 className="section-title mt-5">The outcome is not more software. <span>It is a better-run operation.</span></h2>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-2">
            {outcomes.map((item, index) => (
              <article key={item.title} className="group rounded-[28px] border border-white/8 bg-[#090B09] p-7 transition hover:border-[#9BE15D]/25 sm:p-9">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] uppercase tracking-[.2em] text-[#9BE15D]">{item.eyebrow}</div>
                  <div className="text-sm text-white/22">0{index + 1}</div>
                </div>
                <h3 className="mt-8 text-3xl font-semibold tracking-[-.035em]">{item.title}</h3>
                <p className="mt-4 max-w-xl leading-7 text-white/52">{item.body}</p>
                <div className="mt-8 border-t border-white/8 pt-5 text-sm font-medium text-[#DCC28B]">{item.result}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="network" className="grid-bg border-y border-white/8 bg-[#070907] py-24 sm:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="eyebrow justify-center">The operating network</div>
            <h2 className="section-title mt-5">One order affects everything. <span>TableGrid connects everything.</span></h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/52">
              From demand to verified profit, every part of the operation works from the same connected model.
            </p>
          </div>

          <div className="mt-16 grid gap-3 sm:grid-cols-3 lg:grid-cols-9">
            {network.map(([name, description], index) => (
              <div key={name} className="relative rounded-2xl border border-white/8 bg-[#0A0C0A] p-4 text-center lg:min-h-40">
                <div className="mx-auto flex size-8 items-center justify-center rounded-full border border-[#9BE15D]/30 bg-[#9BE15D]/8 text-xs text-[#9BE15D]">{index + 1}</div>
                <div className="mt-4 text-sm font-semibold">{name}</div>
                <div className="mt-2 text-[11px] leading-5 text-white/38">{description}</div>
                {index < network.length - 1 && <span className="absolute -right-2 top-1/2 z-10 hidden text-[#9BE15D]/55 lg:block">→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1220px] gap-12 px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-10">
          <div>
            <div className="eyebrow">One operating picture</div>
            <h2 className="section-title mt-5">Open the day knowing what needs to happen.</h2>
            <p className="mt-6 text-lg leading-8 text-white/52">
              Instead of jumping between systems, the operation moves through one connected sequence.
            </p>
          </div>

          <div className="space-y-3">
            {[
              ["7:00 AM", "Demand", "286 orders expected today. 114 expected tomorrow."],
              ["7:01 AM", "Inventory", "Three ingredients are projected below required stock."],
              ["7:02 AM", "Purchasing", "Recommended replenishment is ready for review."],
              ["7:03 AM", "Production", "417 portions required across six products."],
              ["7:04 AM", "Economics", "Projected contribution margin is visible before the day unfolds."],
            ].map(([time, label, detail]) => (
              <div key={time} className="grid gap-3 rounded-2xl border border-white/8 bg-white/[.02] p-5 sm:grid-cols-[90px_130px_1fr] sm:items-center">
                <div className="font-mono text-xs text-white/34">{time}</div>
                <div className="font-semibold text-[#DCC28B]">{label}</div>
                <div className="text-sm leading-6 text-white/52">{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-[#080A08] py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1220px] gap-14 px-6 lg:grid-cols-2 lg:px-10">
          <div className="self-center">
            <div className="eyebrow">True economics</div>
            <h2 className="section-title mt-5">Revenue tells you what came in. <span>TableGrid tells you what you kept.</span></h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/52">
              Products connect to recipes, supplier costs, packaging, labor, and fulfillment so operators can understand contribution instead of stopping at sales.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/9 bg-[#0B0D0B] p-7 sm:p-9">
            <div className="flex items-end justify-between border-b border-white/8 pb-6">
              <div>
                <div className="text-xs uppercase tracking-[.18em] text-white/35">Example item economics</div>
                <div className="mt-2 text-2xl font-semibold">Chicken Bowl</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-white/35">Selling price</div>
                <div className="mt-1 text-2xl font-semibold">$16.00</div>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm">
              {[
                ["Ingredients", "$5.54"],
                ["Packaging", "$0.83"],
                ["Payment", "$0.46"],
                ["Production labor", "$1.65"],
                ["Fulfillment", "$0.70"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-white/54"><span>{label}</span><span>{value}</span></div>
              ))}
            </div>

            <div className="mt-6 flex items-end justify-between border-t border-[#9BE15D]/20 pt-6">
              <div>
                <div className="text-xs uppercase tracking-[.16em] text-[#9BE15D]">Actual contribution</div>
                <div className="mt-2 text-4xl font-semibold">$6.82</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-white/35">Contribution margin</div>
                <div className="mt-1 text-xl font-semibold">42.6%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="intelligence" className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1220px] px-6 lg:px-10">
          <div className="max-w-4xl">
            <div className="eyebrow">Ahead, not behind</div>
            <h2 className="section-title mt-5">TableGrid sees what is coming next.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/52">
              The goal is not more alerts. It is fewer surprises and clearer next actions.
            </p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {intelligence.map((item, index) => (
              <article key={item.title} className="rounded-[26px] border border-white/8 bg-[#090B09] p-7">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[.18em] text-[#9BE15D]">
                  <span>{item.type}</span><span>0{index + 1}</span>
                </div>
                <h3 className="mt-7 text-2xl font-semibold tracking-tight">{item.title}</h3>
                <div className="mt-2 text-sm text-[#DCC28B]">{item.meta}</div>
                <div className="mt-6 rounded-2xl border border-white/7 bg-white/[.025] p-4 text-sm leading-6 text-white/50">{item.detail}</div>
                <button className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/78">{item.action} <Arrow /></button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-[#070907] py-24">
        <div className="mx-auto max-w-[1220px] px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <div className="eyebrow">The numbers that matter</div>
              <h2 className="section-title mt-5">Built to improve operating outcomes.</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                ["Food waste", "↓"],
                ["Stockouts", "↓"],
                ["Food-cost variance", "↓"],
                ["Planning time", "↓"],
                ["Production accuracy", "↑"],
                ["Contribution margin", "↑"],
              ].map(([label, direction]) => (
                <div key={label} className="rounded-2xl border border-white/8 bg-white/[.02] p-5">
                  <div className="text-3xl text-[#9BE15D]">{direction}</div>
                  <div className="mt-3 text-sm text-white/58">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="use-cases" className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1220px] px-6 lg:px-10">
          <div className="max-w-4xl">
            <div className="eyebrow">Built for food operations</div>
            <h2 className="section-title mt-5">One network. Different operating models.</h2>
          </div>

          <div className="mt-14 divide-y divide-white/8 border-y border-white/8">
            {useCases.map(([name, detail], index) => (
              <div key={name} className="group grid gap-4 py-7 sm:grid-cols-[70px_220px_1fr_auto] sm:items-center">
                <div className="text-xs text-white/25">0{index + 1}</div>
                <div className="text-xl font-semibold">{name}</div>
                <div className="max-w-2xl text-sm leading-6 text-white/48">{detail}</div>
                <div className="text-[#9BE15D] opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100"><Arrow /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid-bg border-y border-white/8 bg-[#070907] py-24 sm:py-32">
        <div className="mx-auto max-w-[1220px] px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <div className="eyebrow">Thin layer, deep connection</div>
              <h2 className="section-title mt-5">Connect what you already use.</h2>
              <p className="mt-6 max-w-lg text-lg leading-8 text-white/52">
                TableGrid does not need to replace every system. It becomes the operating layer that connects the systems to the food-business model underneath.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {["Ordering", "Payments", "Suppliers", "Accounting", "Delivery", "Payroll"].map((item) => (
                <div key={item} className="flex min-h-28 items-center justify-center rounded-2xl border border-white/8 bg-[#0A0C0A] text-sm font-medium text-white/60">{item}</div>
              ))}
              <div className="col-span-2 flex min-h-32 items-center justify-center rounded-2xl border border-[#9BE15D]/25 bg-[#9BE15D]/[.05] text-center sm:col-span-3">
                <div>
                  <div className="text-xl font-semibold">TABLE<span className="text-[#9BE15D]">GRID</span></div>
                  <div className="mt-1 text-xs uppercase tracking-[.18em] text-white/35">Operating network</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative py-28 sm:py-36">
        <div className="hero-glow pointer-events-none absolute inset-0 rotate-180 opacity-60" />
        <div className="relative mx-auto max-w-[1000px] px-6 text-center lg:px-10">
          <Image src="/tablegrid-logo.webp" alt="TableGrid logo" width={700} height={700} className="mx-auto mb-8 h-auto w-48 sm:w-56" />
          <div className="eyebrow justify-center">The operating network for food businesses</div>
          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-.05em] sm:text-6xl">
            Stop running the business from disconnected pieces.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/52">
            Connect demand, inventory, production, fulfillment, and profit with TableGrid.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#" className="rounded-full bg-[#9BE15D] px-7 py-3.5 font-semibold text-[#071004] transition hover:bg-[#B3EF83]">See TableGrid in action</a>
            <a href="#network" className="rounded-full border border-white/12 bg-white/[.03] px-7 py-3.5 font-medium text-white/75 transition hover:bg-white/[.06]">See how it works</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/8 py-8">
        <div className="mx-auto flex max-w-[1220px] flex-col gap-4 px-6 text-xs text-white/34 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <div>© 2026 TableGrid. The operating network for food businesses.</div>
          <div>Built as a thin operating layer for the food platform.</div>
        </div>
      </footer>
    </main>
  );
}
