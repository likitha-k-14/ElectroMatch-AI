import React from "react";
import { motion } from "framer-motion";
import { Cpu, Sparkles, Zap } from "lucide-react";

export function Hero({ onStart }) {
  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 py-10 lg:grid-cols-[1.05fr_.95fr] lg:py-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-teal-100 backdrop-blur">
            <Sparkles size={16} />
            AI-ranked electronics for serious buyers
          </div>
          <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
            ElectroMatch AI
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Tell the system how you work, play, travel, and spend. It scores laptops, phones, tablets,
            wearables, and headphones with transparent match logic.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={onStart} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-400 px-6 py-4 font-bold text-slate-950 shadow-glow transition hover:bg-teal-300">
              <Zap size={19} />
              Find My Device
            </button>
            <a href="#compare" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 font-semibold text-white transition hover:bg-white/15">
              Compare Products
            </a>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {["8 seeded devices", "9 API routes", "Live scoring"].map((item) => (
              <div key={item} className="glass rounded-2xl px-4 py-3 text-center text-sm text-slate-200">{item}</div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="glass relative rounded-[2rem] p-3">
          <img
            className="h-[34rem] w-full rounded-[1.5rem] object-cover"
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80"
            alt="Premium electronic devices on a desk"
          />
          <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/15 bg-slate-950/70 p-5 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-teal-400 p-3 text-slate-950"><Cpu /></div>
              <div>
                <p className="text-sm text-slate-400">Top signal</p>
                <p className="font-bold text-white">Performance, portability, price, sentiment</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
