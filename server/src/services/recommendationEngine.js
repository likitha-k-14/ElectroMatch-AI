const purposeWeights = {
  gaming: { gaming: 2.2, performance: 1.8, battery: 0.4, portability: 0.3, camera: 0.2 },
  coding: { performance: 1.8, battery: 1.2, portability: 1.1, value: 1.0 },
  editing: { performance: 2.0, camera: 0.9, battery: 0.7, portability: 0.5 },
  business: { battery: 1.5, portability: 1.4, performance: 1.0, camera: 0.6 },
  student: { value: 1.8, battery: 1.4, portability: 1.3, performance: 0.9 },
  casual: { value: 1.4, battery: 1.1, portability: 1.0, camera: 0.8 }
};

export function recommendProducts(products, preferences = {}) {
  const {
    category,
    budget = 150000,
    purpose = "casual",
    battery = "medium",
    performance = "medium",
    camera = "medium",
    portability = "medium",
    brand = "Any",
    os = "Any"
  } = preferences;

  const weights = { ...(purposeWeights[purpose] || purposeWeights.casual) };
  if (battery === "high") weights.battery = (weights.battery || 1) + 1.1;
  if (performance === "high") weights.performance = (weights.performance || 1) + 1.2;
  if (camera === "high") weights.camera = (weights.camera || 1) + 1.1;
  if (portability === "high") weights.portability = (weights.portability || 1) + 1.1;

  return products
    .filter((product) => !category || product.category === category)
    .map((product) => {
      const maxBudget = Number(budget) || 150000;
      const priceFit = product.price <= maxBudget ? 100 : Math.max(0, 100 - ((product.price - maxBudget) / maxBudget) * 120);
      const weightedKeys = Object.keys(weights);
      const weightedTotal = weightedKeys.reduce((sum, key) => sum + (product.scores[key] || 0) * weights[key], 0);
      const divisor = weightedKeys.reduce((sum, key) => sum + weights[key], 0);
      let match = weightedTotal / divisor;

      match = match * 0.78 + priceFit * 0.22;
      if (brand !== "Any") {
        match += product.brand.toLowerCase() === String(brand).toLowerCase() ? 12 : -22;
      }
      if (os !== "Any") {
        match += product.os.toLowerCase() === String(os).toLowerCase() ? 8 : -14;
      }

      return {
        ...product,
        match: Math.min(99, Math.round(match)),
        reasons: buildReasons(product, preferences)
      };
    })
    .sort((a, b) => b.match - a.match);
}

export function answerAssistantQuestion(question, products) {
  const text = question.toLowerCase();
  const prefs = {
    budget: Number(text.match(/(?:under|below)\s*(\d+)/)?.[1] || 150000),
    category: text.includes("phone") ? "Smartphones" : text.includes("laptop") ? "Laptops" : "",
    purpose: text.includes("gaming") ? "gaming" : text.includes("coding") ? "coding" : text.includes("student") ? "student" : "casual",
    battery: text.includes("battery") ? "high" : "medium",
    performance: text.includes("performance") || text.includes("gaming") ? "high" : "medium",
    camera: text.includes("camera") ? "high" : "medium",
    portability: text.includes("light") || text.includes("portable") ? "high" : "medium"
  };
  const [top] = recommendProducts(products, prefs);
  if (!top) return "I could not find a matching device yet. Try changing category or budget.";
  return `${top.name} is my top pick at Rs ${top.price.toLocaleString("en-IN")} with a ${top.match}% match. ${top.reasons}`;
}

function buildReasons(product, preferences) {
  const reasons = [];
  if (product.price <= Number(preferences.budget || Infinity)) reasons.push("fits your budget");
  if (preferences.purpose && product.tags.includes(preferences.purpose)) reasons.push(`is strong for ${preferences.purpose}`);
  if (preferences.battery === "high" && product.scores.battery >= 85) reasons.push("prioritizes long battery life");
  if (preferences.performance === "high" && product.scores.performance >= 88) reasons.push("offers high performance headroom");
  if (preferences.camera === "high" && product.scores.camera >= 85) reasons.push("has a standout camera system");
  if (preferences.portability === "high" && product.scores.portability >= 85) reasons.push("is easy to carry every day");
  if (!reasons.length) reasons.push("balances price, features, and reliability");
  return `Recommended because it ${reasons.slice(0, 3).join(", ")}.`;
}
