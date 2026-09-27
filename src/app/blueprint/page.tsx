import Image from "next/image";
import Link from "next/link";
import BlueprintBuilder from "@/components/BlueprintBuilder";

export const metadata = {
  title: "Build a Sample Operating Blueprint | TableGrid",
  description:
    "Preview how TableGrid models a food operation across demand, recipes, inventory, production, fulfillment, and economics.",
};

export default function BlueprintPage() {
  return (
    <main className="min-h-screen bg-[#050705] text-[#F7F4EC]">
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#050705]/92 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1320px] items-center justify-between px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-3" aria-label="TableGrid home">
            <div className="relative size-11 overflow-hidden rounded-xl border border-white/10 bg-black">
              <Image
                src="/tablegrid-logo.webp"
                alt=""
                fill
                priority
                className="scale-[1.65] object-contain object-[50%_28%]"
              />
            </div>
            <div className="leading-none">
              <div className="text-[17px] font-semibold tracking-[.18em]">
                TABLE<span className="text-[#9BE15D]">GRID</span>
              </div>
              <div className="mt-1 text-[8px] uppercase tracking-[.28em] text-white/45">
                Operating network
              </div>
            </div>
          </Link>

          <Link
            href="/"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/56 transition hover:bg-white/[.04] hover:text-white"
          >
            Back to overview
          </Link>
        </div>
      </header>

      <section className="grid-bg relative overflow-hidden border-b border-white/8">
        <div className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-[1220px] px-6 py-16 sm:py-20 lg:px-10">
          <div className="eyebrow">Private product preview</div>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl">
            Build the operating map behind your food business.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/52">
            Give TableGrid a few structural inputs and see how it turns disconnected operating details into one food-business blueprint.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1220px] px-6 py-10 sm:py-14 lg:px-10">
        <BlueprintBuilder />
      </section>

      <footer className="border-t border-white/8 py-8">
        <div className="mx-auto flex max-w-[1220px] flex-col gap-3 px-6 text-xs text-white/32 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <div>© 2026 TableGrid. The operating network for food businesses.</div>
          <div>Private development preview · No data is persisted.</div>
        </div>
      </footer>
    </main>
  );
}
