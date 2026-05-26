import React from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function Analytics({ products }) {
  const chartData = products.map((product) => ({
    name: product.name.split(" ").slice(0, 2).join(" "),
    price: Math.round(product.price / 1000),
    performance: product.specs.performanceScore,
    battery: product.scores.battery,
    match: product.match || product.scores.value
  }));

  const radar = ["battery", "performance", "camera", "portability", "gaming", "value"].map((key) => ({
    metric: key,
    score: Math.round(products.reduce((sum, product) => sum + (product.scores[key] || 0), 0) / Math.max(products.length, 1))
  }));

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-black text-white">Recommendation analytics</h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <Chart title="Price vs Performance">
            <LineChart data={chartData}>
              <CartesianGrid stroke="rgba(255,255,255,.08)" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line dataKey="price" stroke="#38bdf8" strokeWidth={3} />
              <Line dataKey="performance" stroke="#2dd4bf" strokeWidth={3} />
            </LineChart>
          </Chart>
          <Chart title="Battery Comparison">
            <BarChart data={chartData}>
              <CartesianGrid stroke="rgba(255,255,255,.08)" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="battery" fill="#5eead4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </Chart>
          <Chart title="Score Visualization">
            <RadarChart data={radar}>
              <PolarGrid stroke="rgba(255,255,255,.16)" />
              <PolarAngleAxis dataKey="metric" stroke="#cbd5e1" />
              <Radar dataKey="score" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.35} />
              <Tooltip />
            </RadarChart>
          </Chart>
        </div>
      </div>
    </section>
  );
}

function Chart({ title, children }) {
  return (
    <div className="glass rounded-[1.6rem] p-5">
      <h3 className="mb-4 font-bold text-white">{title}</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
