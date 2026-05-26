import React from "react";
import { Bot, Send } from "lucide-react";
import { useState } from "react";
import { api } from "../lib/api";

export function ChatAssistant() {
  const [message, setMessage] = useState("Best laptop for coding under 70000");
  const [thread, setThread] = useState([
    { role: "assistant", text: "Ask me for a device recommendation by budget, use case, or category." }
  ]);
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!message.trim()) return;
    const userMessage = message;
    setThread((current) => [...current, { role: "user", text: userMessage }]);
    setMessage("");
    setLoading(true);
    try {
      const data = await api.chat(userMessage);
      setThread((current) => [...current, { role: "assistant", text: data.answer }]);
    } catch {
      setThread((current) => [...current, { role: "assistant", text: "The assistant API is offline. Start the backend and try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="glass mx-auto grid max-w-7xl gap-6 rounded-[2rem] p-5 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <div className="inline-flex rounded-2xl bg-teal-300 p-3 text-slate-950"><Bot /></div>
          <h2 className="mt-4 text-3xl font-black text-white">AI chat assistant</h2>
          <p className="mt-3 text-slate-300">Try: best gaming phone, best battery laptop, or best laptop for coding under 70000.</p>
        </div>
        <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/60 p-4">
          <div className="h-72 space-y-3 overflow-y-auto pr-2">
            {thread.map((item, index) => (
              <div key={`${item.role}-${index}`} className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${item.role === "user" ? "ml-auto bg-teal-300 text-slate-950" : "bg-white/10 text-slate-200"}`}>
                {item.text}
              </div>
            ))}
            {loading && <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-slate-300">Thinking...</div>}
          </div>
          <div className="mt-4 flex gap-3">
            <input value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} className="input" placeholder="Ask ElectroMatch AI..." />
            <button onClick={send} className="rounded-2xl bg-white p-3 text-slate-950 hover:bg-teal-200">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
