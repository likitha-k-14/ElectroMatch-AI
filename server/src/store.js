import Product from "./models/Product.js";
import { products as seedProducts } from "./data/products.js";

let dbEnabled = false;
let wishlist = [];
let savedRecommendations = [];
let preferences = [];

export function setDbEnabled(value) {
  dbEnabled = value;
}

export async function getProducts(query = {}) {
  if (dbEnabled) {
    const filter = {};
    if (query.category) filter.category = query.category;
    if (query.maxPrice) filter.price = { $lte: Number(query.maxPrice) };
    if (query.tag) filter.tags = query.tag;
    return Product.find(filter).lean();
  }

  return seedProducts.filter((product) => {
    if (query.category && product.category !== query.category) return false;
    if (query.maxPrice && product.price > Number(query.maxPrice)) return false;
    if (query.tag && !product.tags.includes(query.tag)) return false;
    return true;
  });
}

export async function getProductById(id) {
  if (dbEnabled) return Product.findOne({ id }).lean();
  return seedProducts.find((product) => product.id === id);
}

export async function savePreference(preference) {
  preferences.unshift({ ...preference, createdAt: new Date().toISOString() });
  return preferences[0];
}

export async function saveRecommendation(payload) {
  savedRecommendations.unshift({ ...payload, createdAt: new Date().toISOString() });
  return savedRecommendations[0];
}

export function getHistory() {
  return savedRecommendations;
}

export function toggleWishlist(productId) {
  wishlist = wishlist.includes(productId) ? wishlist.filter((id) => id !== productId) : [...wishlist, productId];
  return wishlist;
}

export function getWishlistIds() {
  return wishlist;
}
