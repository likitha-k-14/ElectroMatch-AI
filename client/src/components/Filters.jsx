import React from "react";

const filters = [
  ["gaming", "Gaming"],
  ["student", "Student use"],
  ["best battery", "Best battery"],
  ["lightweight", "Lightweight"],
  ["best camera", "Best camera"],
  ["best performance", "Best performance"]
];

export function Filters({ activeFilter, setActiveFilter, budgetCap, setBudgetCap }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 rounded-[1.6rem] border border-white/10 bg-white/[.06] p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          <button onClick={() => setActiveFilter("")} className={`chip shrink-0 ${!activeFilter ? "chip-active" : ""}`}>All</button>
          {filters.map(([value, label]) => (
            <button key={value} onClick={() => setActiveFilter(value)} className={`chip shrink-0 ${activeFilter === value ? "chip-active" : ""}`}>{label}</button>
          ))}
        </div>
        <label className="min-w-72 text-sm font-semibold text-slate-300">
          Budget range: Rs {Number(budgetCap).toLocaleString("en-IN")}
          <input className="mt-2 w-full accent-teal-300" type="range" min="25000" max="150000" step="5000" value={budgetCap} onChange={(e) => setBudgetCap(e.target.value)} />
        </label>
      </div>
    </section>
  );
}
