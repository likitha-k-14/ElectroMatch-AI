import React from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";

export function ProductCard({ product, selected, wished, onCompare, onWishlist }) {
  return (
    <motion.article
      layout
      whileHover={{ y: -8 }}
      className="glass overflow-hidden rounded-[1.6rem]"
    >
      <div className="relative h-56">
        <img className="h-full w-full object-cover" src={product.image} alt={product.name} />
        <div className="absolute left-4 top-4 rounded-full bg-slate-950/75 px-3 py-1 text-sm font-bold text-teal-200 backdrop-blur">
          {product.match ?? product.scores.performance}% match
        </div>
        <button onClick={() => onWishlist(product.id)} className={`absolute right-4 top-4 rounded-full p-3 backdrop-blur ${wished ? "bg-rose-400 text-slate-950" : "bg-slate-950/70 text-white"}`}>
          <Heart size={18} fill={wished ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-slate-400">{product.brand} / {product.category}</p>
            <h3 className="mt-1 text-xl font-black text-white">{product.name}</h3>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-sm text-amber-200">
            <Star size={14} fill="currentColor" /> {product.rating}
          </div>
        </div>
        <p className="mt-3 text-2xl font-black text-teal-200">Rs {product.price.toLocaleString("en-IN")}</p>
        <p className="mt-3 min-h-12 text-sm leading-6 text-slate-300">{product.reasons || "Balanced recommendation across performance, value, and reliability."}</p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-300">
          <Spec label="RAM" value={product.specs.ram} />
          <Spec label="Storage" value={product.specs.storage} />
          <Spec label="Battery" value={product.specs.battery} />
          <Spec label="CPU" value={product.specs.processor} />
        </div>
        <div className="mt-5 grid gap-3 text-sm md:grid-cols-2">
          <List title="Pros" items={product.pros} tone="text-emerald-200" />
          <List title="Cons" items={product.cons} tone="text-rose-200" />
        </div>
        <div className="mt-5 flex gap-3">
          <button onClick={() => onCompare(product.id)} className={`flex-1 rounded-2xl px-4 py-3 font-bold transition ${selected ? "bg-teal-300 text-slate-950" : "bg-white/10 text-white hover:bg-white/15"}`}>
            {selected ? "Selected" : "Compare"}
          </button>
          <button className="rounded-2xl bg-white p-3 text-slate-950 transition hover:bg-teal-200" title="Buy">
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function Spec({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[.06] p-3">
      <p className="text-xs uppercase text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-slate-100">{value}</p>
    </div>
  );
}

function List({ title, items, tone }) {
  return (
    <div>
      <p className={`font-bold ${tone}`}>{title}</p>
      <ul className="mt-2 space-y-1 text-slate-400">
        {items.slice(0, 2).map((item) => <li key={item}>- {item}</li>)}
      </ul>
    </div>
  );
}
