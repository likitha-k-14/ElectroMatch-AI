import React from "react";

const categories = ["Laptops", "Smartphones", "Tablets", "Smartwatches", "Headphones"];
const purposes = ["gaming", "coding", "editing", "business", "student", "casual"];

export function Questionnaire({ preferences, setPreferences, onSubmit }) {
  const update = (key, value) => setPreferences((current) => ({ ...current, [key]: value }));

  return (
    <section id="questionnaire" className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="glass mx-auto max-w-7xl rounded-[2rem] p-5 sm:p-8">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-teal-300">Smart questionnaire</p>
            <h2 className="mt-2 text-3xl font-black text-white">Tune your recommendation profile</h2>
          </div>
          <button onClick={onSubmit} className="rounded-2xl bg-white px-6 py-3 font-bold text-slate-950 transition hover:bg-teal-200">
            Generate Matches
          </button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <Field label="Category">
            <select value={preferences.category} onChange={(e) => update("category", e.target.value)} className="input">
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </Field>
          <Field label={`Budget: Rs ${Number(preferences.budget).toLocaleString("en-IN")}`}>
            <input type="range" min="20000" max="150000" step="5000" value={preferences.budget} onChange={(e) => update("budget", e.target.value)} className="w-full accent-teal-300" />
          </Field>
          <Field label="Purpose">
            <div className="grid grid-cols-2 gap-2">
              {purposes.map((item) => (
                <button key={item} onClick={() => update("purpose", item)} className={`chip ${preferences.purpose === item ? "chip-active" : ""}`}>{item}</button>
              ))}
            </div>
          </Field>
          <Field label="Brand">
            <select value={preferences.brand} onChange={(e) => update("brand", e.target.value)} className="input">
              {["Any", "Apple", "Samsung", "Google", "Sony", "OnePlus", "Dell", "Lenovo", "Bose", "Aural", "NovaCore"].map((item) => <option key={item}>{item}</option>)}
            </select>
          </Field>
          <Field label="Operating system">
            <select value={preferences.os} onChange={(e) => update("os", e.target.value)} className="input">
              {["Any", "Windows", "macOS", "iOS", "Android", "iPadOS", "watchOS", "Wear OS", "Universal"].map((item) => <option key={item}>{item}</option>)}
            </select>
          </Field>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {["battery", "performance", "camera", "portability"].map((key) => (
            <Field key={key} label={`${key[0].toUpperCase()}${key.slice(1)} preference`}>
              <div className="grid grid-cols-3 gap-2">
                {["low", "medium", "high"].map((value) => (
                  <button key={value} onClick={() => update(key, value)} className={`chip ${preferences[key] === value ? "chip-active" : ""}`}>{value}</button>
                ))}
              </div>
            </Field>
          ))}
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-300">{label}</span>
      {children}
    </label>
  );
}
