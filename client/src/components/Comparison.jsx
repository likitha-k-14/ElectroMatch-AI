import React from "react";

export function Comparison({ products, rows }) {
  if (!products.length) return null;

  return (
    <section id="compare" className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-black text-white">Side-by-side comparison</h2>
        <div className="mt-5 overflow-x-auto rounded-[1.6rem] border border-white/10">
          <table className="w-full min-w-[760px] border-collapse bg-slate-950/50">
            <thead>
              <tr>
                <th className="p-4 text-left text-slate-400">Specification</th>
                {products.map((product) => <th key={product.id} className="p-4 text-left text-white">{product.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-white/10">
                  <td className="p-4 font-semibold text-teal-200">{row.label}</td>
                  {row.values.map((value, index) => <td key={`${row.label}-${index}`} className="p-4 text-slate-300">{value}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
