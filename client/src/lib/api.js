const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export const api = {
  products: () => request("/products"),
  recommend: (preferences) => request("/recommendations", { method: "POST", body: JSON.stringify(preferences) }),
  compare: (ids) => request("/comparisons", { method: "POST", body: JSON.stringify({ ids }) }),
  chat: (message) => request("/chat", { method: "POST", body: JSON.stringify({ message }) }),
  toggleWishlist: (id) => request(`/wishlist/${id}`, { method: "POST" }),
  wishlist: () => request("/wishlist")
};
