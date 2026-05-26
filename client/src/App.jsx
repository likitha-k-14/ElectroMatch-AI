import React from "react";
import { Moon, Sun } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Analytics } from "./components/Analytics";
import { ChatAssistant } from "./components/ChatAssistant";
import { Comparison } from "./components/Comparison";
import { Filters } from "./components/Filters";
import { Hero } from "./components/Hero";
import { ProductCard } from "./components/ProductCard";
import { Questionnaire } from "./components/Questionnaire";
import { api } from "./lib/api";

const initialPreferences = {
  category: "Laptops",
  budget: 70000,
  purpose: "coding",
  battery: "high",
  performance: "high",
  camera: "medium",
  portability: "high",
  brand: "Any",
  os: "Any"
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [preferences, setPreferences] = useState(initialPreferences);
  const [activeFilter, setActiveFilter] = useState("");
  const [budgetCap, setBudgetCap] = useState(150000);
  const [compareIds, setCompareIds] = useState([]);
  const [comparison, setComparison] = useState({ products: [], rows: [] });
  const [wishlist, setWishlist] = useState([]);
  const [light, setLight] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);

  useEffect(() => {
    async function load() {
      try {
        const [productData, wishlistData] = await Promise.all([api.products(), api.wishlist()]);
        setProducts(productData.products);
        setRecommendations(productData.products);
        setWishlist(wishlistData.ids || []);
      } catch {
        setRecommendations([]);
        setProducts([]);
      }
    }
    load();
  }, []);

  useEffect(() => {
    async function loadComparison() {
      if (!compareIds.length) {
        setComparison({ products: [], rows: [] });
        return;
      }
      const data = await api.compare(compareIds);
      setComparison(data);
    }
    loadComparison();
  }, [compareIds]);

  const visibleProducts = useMemo(() => {
    return recommendations.filter((product) => {
      if (activeFilter && !product.tags.includes(activeFilter)) return false;
      return product.price <= Number(budgetCap);
    });
  }, [activeFilter, budgetCap, recommendations]);

  async function generateRecommendations() {
    const data = await api.recommend(preferences);
    setRecommendations(data.recommendations);
    document.getElementById("recommendations")?.scrollIntoView({ behavior: "smooth" });
  }

  function toggleCompare(id) {
    setCompareIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current.slice(-2), id]);
  }

  async function toggleWishlist(id) {
    const data = await api.toggleWishlist(id);
    setWishlist(data.ids);
  }

  return (
    <main className="app-shell">
      <nav className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/55 px-4 py-4 backdrop-blur-2xl sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <p className="text-lg font-black text-white">ElectroMatch AI</p>
            <p className="text-xs text-slate-400">Recommendations that explain themselves</p>
          </div>
          <div className="hidden items-center gap-6 text-sm font-semibold text-slate-300 md:flex">
            <a href="#questionnaire">Questionnaire</a>
            <a href="#recommendations">Products</a>
            <a href="#compare">Compare</a>
          </div>
          <button onClick={() => setLight((current) => !current)} className="rounded-2xl border border-white/10 bg-white/10 p-3 text-white">
            {light ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </nav>

      <Hero onStart={() => document.getElementById("questionnaire")?.scrollIntoView({ behavior: "smooth" })} />
      <Questionnaire preferences={preferences} setPreferences={setPreferences} onSubmit={generateRecommendations} />
      <Filters activeFilter={activeFilter} setActiveFilter={setActiveFilter} budgetCap={budgetCap} setBudgetCap={setBudgetCap} />

      <section id="recommendations" className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-teal-300">Top matches</p>
              <h2 className="mt-2 text-3xl font-black text-white">Product recommendations</h2>
            </div>
            <p className="text-sm text-slate-400">{compareIds.length}/3 selected for comparison</p>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selected={compareIds.includes(product.id)}
                wished={wishlist.includes(product.id)}
                onCompare={toggleCompare}
                onWishlist={toggleWishlist}
              />
            ))}
          </div>
          {!visibleProducts.length && (
            <div className="glass mt-6 rounded-[1.6rem] p-6 text-slate-300">
              No products loaded yet. Make sure the backend is running at http://localhost:8080/api/health, then refresh this page.
            </div>
          )}
        </div>
      </section>

      <Comparison products={comparison.products} rows={comparison.rows} />
      <Analytics products={visibleProducts.length ? visibleProducts : products} />
      <ChatAssistant />

      <footer className="px-4 py-10 text-center text-sm text-slate-500">
        Built with React, Tailwind CSS, Framer Motion, Recharts, Express, and MongoDB-ready schemas.
      </footer>
    </main>
  );
}
