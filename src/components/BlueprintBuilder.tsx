"use client";

import { useMemo, useState } from "react";
import {
  buildOperatingBlueprint,
  type OperatingBlueprintInput,
} from "@/application/build-operating-blueprint";

const orderChannelOptions = [
  "Website",
  "POS",
  "Subscriptions",
  "DoorDash / Uber Eats",
  "Phone / manual",
  "Catering / events",
];

const fulfillmentOptions = [
  "Pickup",
  "Local delivery",
  "Third-party delivery",
  "Shipping",
  "Catering / event service",
];

type FormState = OperatingBlueprintInput & {
  businessType: string;
};

const initialState: FormState = {
  organizationName: "",
  businessType: "Meal prep",
  locations: 1,
  orderChannels: [],
  products: 12,
  recipesComplete: 8,
  recipesTotal: 12,
  suppliers: 2,
  inventoryLocations: 1,
  productionCadence: "3 production days / week",
  fulfillmentModes: ["Pickup"],
};

function Toggle({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition ${
        active
          ? "border-[#6F944E]/45 bg-[#6F944E]/10 text-[#3E5C2D]"
          : "border-[#3B241A]/10 bg-white/60 text-[#3B241A]/48 hover:border-[#3B241A]/20 hover:text-[#3B241A]/75"
      }`}
    >
      {label}
    </button>
  );
}

function NumberField({
  label,
  value,
  min = 0,
  onChange,
}: {
  label: string;
  value: number;
  min?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-[#3B241A]/48">{label}</span>
      <input
        type="number"
        min={min}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full rounded-2xl border border-[#3B241A]/10 bg-white/70 px-4 py-3.5 text-[#3B241A] outline-none transition focus:border-[#6F944E]/40"
      />
    </label>
  );
}

export default function BlueprintBuilder() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);

  const blueprint = useMemo(
    () =>
      buildOperatingBlueprint({
        organizationName: form.organizationName || "Your food business",
        locations: form.locations,
        orderChannels: form.orderChannels,
        products: form.products,
        recipesComplete: form.recipesComplete,
        recipesTotal: form.recipesTotal,
        suppliers: form.suppliers,
        inventoryLocations: form.inventoryLocations,
        productionCadence: form.productionCadence || undefined,
        fulfillmentModes: form.fulfillmentModes,
      }),
    [form],
  );

  const readiness = Math.round(blueprint.readiness.recipes * 100);

  const toggleListValue = (
    key: "orderChannels" | "fulfillmentModes",
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((item) => item !== value)
        : [...current[key], value],
    }));
  };

  const next = () => setStep((value) => Math.min(value + 1, 4));
  const back = () => setStep((value) => Math.max(value - 1, 0));

  return (
    <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
      <aside className="rounded-[28px] border border-[#3B241A]/8 bg-white/55 p-6 lg:sticky lg:top-28 lg:self-start">
        <div className="text-[11px] uppercase tracking-[.2em] text-[#6F944E]">
          Sample operating blueprint
        </div>
        <h2 className="mt-4 text-2xl font-semibold tracking-[-.03em]">
          Let TableGrid map the shape of your operation.
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#3B241A]/46">
          This preview uses TableGrid application logic in your browser. Nothing is saved, connected, or automated.
        </p>

        <div className="mt-7 space-y-3">
          {["Business", "Demand", "Food model", "Operations", "Blueprint"].map(
            (label, index) => (
              <button
                type="button"
                key={label}
                onClick={() => setStep(index)}
                className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  step === index
                    ? "border-[#6F944E]/28 bg-[#6F944E]/7 text-[#3B241A]"
                    : "border-transparent text-[#3B241A]/38 hover:bg-white/60 hover:text-[#3B241A]/65"
                }`}
              >
                <span
                  className={`flex size-7 items-center justify-center rounded-full border text-xs ${
                    step >= index
                      ? "border-[#6F944E]/35 text-[#6F944E]"
                      : "border-[#3B241A]/10 text-[#3B241A]/28"
                  }`}
                >
                  {index + 1}
                </span>
                {label}
              </button>
            ),
          )}
        </div>
      </aside>

      <section className="rounded-[30px] border border-[#3B241A]/8 bg-[#FFFDFC] p-6 sm:p-8">
        <div className="mb-8 flex items-center justify-between gap-4 border-b border-[#3B241A]/7 pb-5">
          <div>
            <div className="text-xs text-[#3B241A]/32">Step {step + 1} of 5</div>
            <div className="mt-1 text-lg font-semibold">
              {["Business", "Demand", "Food model", "Operations", "Your blueprint"][step]}
            </div>
          </div>
          <div className="text-xs text-[#3B241A]/30">Private preview</div>
        </div>

        {step === 0 && (
          <div className="space-y-6">
            <label className="block">
              <span className="mb-2 block text-sm text-[#3B241A]/48">Business name</span>
              <input
                value={form.organizationName}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    organizationName: event.target.value,
                  }))
                }
                placeholder="Example: FreshFuel Meal Prep"
                className="w-full rounded-2xl border border-[#3B241A]/10 bg-white/70 px-4 py-3.5 text-[#3B241A] outline-none placeholder:text-[#3B241A]/18 focus:border-[#6F944E]/40"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-[#3B241A]/48">Business type</span>
              <select
                value={form.businessType}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    businessType: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-[#3B241A]/10 bg-[#FFF9F1] px-4 py-3.5 text-[#3B241A] outline-none focus:border-[#6F944E]/40"
              >
                {["Meal prep", "Catering", "Delivery-first kitchen", "Food brand", "Growing kitchen"].map(
                  (option) => (
                    <option key={option}>{option}</option>
                  ),
                )}
              </select>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <NumberField
                label="Operating locations"
                value={form.locations}
                min={1}
                onChange={(locations) =>
                  setForm((current) => ({ ...current, locations }))
                }
              />
              <NumberField
                label="Products / menu items"
                value={form.products}
                onChange={(products) =>
                  setForm((current) => ({ ...current, products }))
                }
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <div className="text-xl font-semibold">Where does demand come from?</div>
            <p className="mt-2 text-sm leading-6 text-[#3B241A]/44">
              Select every channel that creates orders or commitments your kitchen has to fulfill.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {orderChannelOptions.map((option) => (
                <Toggle
                  key={option}
                  label={option}
                  active={form.orderChannels.includes(option)}
                  onClick={() => toggleListValue("orderChannels", option)}
                />
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <div className="text-xl font-semibold">How complete is the food model?</div>
              <p className="mt-2 text-sm leading-6 text-[#3B241A]/44">
                TableGrid needs to understand what each product requires before it can reason about inventory, production, and economics.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <NumberField
                label="Total recipes"
                value={form.recipesTotal}
                onChange={(recipesTotal) =>
                  setForm((current) => ({
                    ...current,
                    recipesTotal,
                    recipesComplete: Math.min(current.recipesComplete, recipesTotal),
                  }))
                }
              />
              <NumberField
                label="Complete recipes"
                value={form.recipesComplete}
                onChange={(recipesComplete) =>
                  setForm((current) => ({
                    ...current,
                    recipesComplete: Math.min(recipesComplete, current.recipesTotal),
                  }))
                }
              />
              <NumberField
                label="Suppliers"
                value={form.suppliers}
                onChange={(suppliers) =>
                  setForm((current) => ({ ...current, suppliers }))
                }
              />
              <NumberField
                label="Inventory locations"
                value={form.inventoryLocations}
                onChange={(inventoryLocations) =>
                  setForm((current) => ({ ...current, inventoryLocations }))
                }
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-7">
            <label className="block">
              <span className="mb-2 block text-sm text-[#3B241A]/48">Production cadence</span>
              <input
                value={form.productionCadence}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    productionCadence: event.target.value,
                  }))
                }
                placeholder="Example: Monday / Wednesday / Friday"
                className="w-full rounded-2xl border border-[#3B241A]/10 bg-white/70 px-4 py-3.5 text-[#3B241A] outline-none placeholder:text-[#3B241A]/18 focus:border-[#6F944E]/40"
              />
            </label>

            <div>
              <div className="text-sm text-[#3B241A]/48">Fulfillment modes</div>
              <div className="mt-3 flex flex-wrap gap-3">
                {fulfillmentOptions.map((option) => (
                  <Toggle
                    key={option}
                    label={option}
                    active={form.fulfillmentModes.includes(option)}
                    onClick={() => toggleListValue("fulfillmentModes", option)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#3B241A]/8 bg-white/60 p-5">
                <div className="text-xs text-[#3B241A]/35">Recipe readiness</div>
                <div className="mt-2 text-3xl font-semibold text-[#6F944E]">{readiness}%</div>
              </div>
              <div className="rounded-2xl border border-[#3B241A]/8 bg-white/60 p-5">
                <div className="text-xs text-[#3B241A]/35">Products</div>
                <div className="mt-2 text-3xl font-semibold">{blueprint.network.products}</div>
              </div>
              <div className="rounded-2xl border border-[#3B241A]/8 bg-white/60 p-5">
                <div className="text-xs text-[#3B241A]/35">Locations</div>
                <div className="mt-2 text-3xl font-semibold">{blueprint.network.locations}</div>
              </div>
            </div>

            <div className="mt-5 rounded-[24px] border border-[#6F944E]/18 bg-[#6F944E]/[.035] p-6">
              <div className="text-[11px] uppercase tracking-[.18em] text-[#6F944E]">
                {blueprint.organizationName}
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  ["Order channels", blueprint.network.orderChannels.join(", ") || "Not defined"],
                  ["Suppliers", String(blueprint.network.suppliers)],
                  ["Inventory locations", String(blueprint.network.inventoryLocations)],
                  ["Production", blueprint.network.productionCadence || "Not defined"],
                  ["Fulfillment", blueprint.network.fulfillmentModes.join(", ") || "Not defined"],
                  ["Business type", form.businessType],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-[#3B241A]/7 bg-[#3B241A]/[.035] p-4">
                    <div className="text-xs text-[#3B241A]/30">{label}</div>
                    <div className="mt-2 text-sm font-medium text-[#3B241A]/75">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="text-sm font-medium">What TableGrid still needs</div>
              {blueprint.gaps.length ? (
                <div className="mt-3 space-y-2">
                  {blueprint.gaps.map((gap) => (
                    <div
                      key={gap}
                      className="flex items-start gap-3 rounded-2xl border border-[#D89B2B]/14 bg-[#D89B2B]/[.035] px-4 py-3 text-sm text-[#3B241A]/58"
                    >
                      <span className="mt-1 size-2 shrink-0 rounded-full bg-[#D89B2B]" />
                      {gap}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-3 rounded-2xl border border-[#6F944E]/20 bg-[#6F944E]/[.045] p-4 text-sm text-[#3B241A]/64">
                  This operating profile has the minimum blueprint inputs represented in the current model.
                </div>
              )}
            </div>

            <div className="mt-6 rounded-2xl border border-[#3B241A]/8 bg-white/55 p-4 text-xs leading-5 text-[#3B241A]/34">
              This is a sample blueprint only. TableGrid is still in private development and this page does not save your information or connect to external systems.
            </div>
          </div>
        )}

        <div className="mt-10 flex items-center justify-between border-t border-[#3B241A]/7 pt-5">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="rounded-full border border-[#3B241A]/10 px-5 py-2.5 text-sm text-[#3B241A]/56 transition hover:bg-[#3B241A]/[.05] disabled:cursor-not-allowed disabled:opacity-25"
          >
            Back
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={next}
              className="rounded-full bg-[#C94B32] px-5 py-2.5 text-sm font-semibold text-[#FFF8EF] transition hover:bg-[#AD3F2A]"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setForm(initialState);
                setStep(0);
              }}
              className="rounded-full border border-[#6F944E]/35 bg-[#6F944E]/8 px-5 py-2.5 text-sm font-medium text-[#3E5C2D]"
            >
              Start over
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
