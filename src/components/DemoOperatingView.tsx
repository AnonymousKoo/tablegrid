"use client";

import { useState } from "react";

type Period = "today" | "tomorrow";

const periodData = {
  today: {
    label: "Today",
    title: "Today at a glance",
    metrics: [
      ["Orders", "327", "+8%"],
      ["Revenue", "$18,420", "+12%"],
      ["Food cost", "26.8%", "-3.1%"],
      ["Margin", "43.2%", "+5.4%"],
    ],
    operationTitle: "Tomorrow's operation",
    operation: [
      ["Forecast demand", "427 portions", "green"],
      ["Production remaining", "398 portions", "gold"],
      ["Inventory risk", "3 ingredients", "red"],
    ],
    action: "Purchase 18 lb salmon",
    detail: "Current demand projects a stockout tomorrow at approximately 1:40 PM.",
  },
  tomorrow: {
    label: "Tomorrow",
    title: "Tomorrow at a glance",
    metrics: [
      ["Forecast orders", "358", "+9%"],
      ["Forecast revenue", "$20,160", "+9.4%"],
      ["Expected food cost", "27.1%", "+0.3%"],
      ["Expected margin", "42.9%", "-0.3%"],
    ],
    operationTitle: "Production plan",
    operation: [
      ["Required portions", "427 portions", "green"],
      ["Ready to produce", "391 portions", "gold"],
      ["Open exceptions", "1 action", "red"],
    ],
    action: "Add 36 portions to prep",
    detail: "Demand has moved above the current production plan for the midday window.",
  },
} as const;

const dotTone: Record<string, string> = {
  green: "bg-[#6F944E] shadow-[0_0_18px_rgba(111,148,78,.35)]",
  gold: "bg-[#D89B2B] shadow-[0_0_18px_rgba(216,155,43,.30)]",
  red: "bg-[#C94B32] shadow-[0_0_18px_rgba(201,75,50,.28)]",
};

export default function DemoOperatingView() {
  const [period, setPeriod] = useState<Period>("today");
  const [resolved, setResolved] = useState(false);
  const data = periodData[period];

  const changePeriod = (next: Period) => {
    setPeriod(next);
    setResolved(false);
  };

  return (
    <div className="dashboard-shell relative rounded-[30px] border border-[#3B241A]/10 bg-[#FFFDFC]/95 p-3 shadow-2xl shadow-[#6B4D3A]/20">
      <div className="rounded-[24px] border border-[#3B241A]/8 bg-[#FFFDFC] p-5 sm:p-6">
        <div className="flex flex-col gap-4 border-b border-[#3B241A]/7 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[.2em] text-[#6F944E]">Interactive operating view</div>
            <div className="mt-1 text-lg font-semibold">{data.title}</div>
          </div>

          <div className="inline-flex self-start rounded-full border border-[#3B241A]/10 bg-white/60 p-1">
            {(["today", "tomorrow"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => changePeriod(item)}
                className={`rounded-full px-3 py-1.5 text-xs transition ${
                  period === item
                    ? "bg-[#3B241A]/[.07] text-[#3B241A]"
                    : "text-[#3B241A]/40 hover:text-[#3B241A]/70"
                }`}
              >
                {periodData[item].label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 py-5 sm:grid-cols-2 xl:grid-cols-4">
          {data.metrics.map(([label, value, delta]) => (
            <div key={label} className="min-w-0 rounded-2xl border border-[#3B241A]/7 bg-white/65 p-4">
              <div className="text-xs text-[#3B241A]/42">{label}</div>
              <div className="mt-2 break-words text-xl font-semibold tracking-tight sm:text-2xl">{value}</div>
              <div className={`mt-2 text-xs ${delta.startsWith("-") ? "text-[#C98524]" : "text-[#6F944E]"}`}>
                {delta}
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-3 xl:grid-cols-[1.08fr_.92fr]">
          <div className="rounded-2xl border border-[#3B241A]/7 bg-white/60 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="font-medium">{data.operationTitle}</div>
              <span className="shrink-0 text-xs text-[#6F944E]">{resolved ? "Adjusted" : "Live plan"}</span>
            </div>

            <div className="mt-5 space-y-4">
              {data.operation.map(([label, value, tone]) => (
                <div key={label} className="flex items-center justify-between gap-4 border-b border-[#3B241A]/6 pb-3 text-sm last:border-0 last:pb-0">
                  <div className="flex min-w-0 items-center gap-2 text-[#3B241A]/55">
                    <span className={`inline-block size-2 shrink-0 rounded-full ${dotTone[tone]}`} />
                    <span>{label}</span>
                  </div>
                  <div className="shrink-0 font-medium">{resolved && tone === "red" ? "Resolved" : value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-2xl border p-5 transition ${
            resolved
              ? "border-[#6F944E]/30 bg-[#6F944E]/[.075]"
              : "border-[#D89B2B]/24 bg-[#D89B2B]/[.045]"
          }`}>
            <div className="text-[11px] uppercase tracking-[.18em] text-[#6F944E]">
              {resolved ? "Plan updated" : "Recommended action"}
            </div>
            <div className="mt-3 text-xl font-semibold">
              {resolved ? "Exception resolved" : data.action}
            </div>
            <p className="mt-2 min-h-12 text-sm leading-6 text-[#3B241A]/55">
              {resolved
                ? "This demo action has been applied to the operating plan. Switch periods or reset to continue exploring."
                : data.detail}
            </p>

            <button
              type="button"
              onClick={() => setResolved((value) => !value)}
              className={`mt-5 w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${
                resolved
                  ? "border border-[#3B241A]/10 bg-[#3B241A]/[.055] text-[#3B241A]/70 hover:bg-[#3B241A]/[.075]"
                  : "bg-[#C94B32] text-[#FFF8EF] hover:bg-[#AD3F2A]"
              }`}
            >
              {resolved ? "Reset demo action" : "Apply recommendation"}
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 border-t border-[#3B241A]/6 pt-4 text-[11px] text-[#3B241A]/28">
          <span>Illustrative front-end demo</span>
          <span className="hidden sm:inline">No live business data is changed</span>
        </div>
      </div>
    </div>
  );
}
