# ElectroMatch AI

ElectroMatch AI is a full-stack electronic device recommendation app built with React, Tailwind CSS, Framer Motion, Recharts, Express, and MongoDB-ready Mongoose schemas. It recommends laptops, smartphones, tablets, smartwatches, and headphones based on budget, purpose, battery, performance, camera, portability, brand, and OS preferences.

## Features

- Futuristic responsive landing page with dark glassmorphism UI
- Smart questionnaire for device preferences
- Compatibility scoring engine with Best Match percentage
- Product recommendation cards with images, specs, ratings, pros, cons, wishlist, and buy actions
- Side-by-side comparison for RAM, storage, processor, battery, display, weight, camera, GPU, and performance score
- Smart filters for gaming, student use, battery, lightweight, camera, performance, and budget range
- Recharts analytics for price/performance, battery, and score visualization
- AI-style chat assistant for natural-language buying questions
- Express APIs for products, recommendations, comparisons, filters, preferences, wishlist, history, chat, and auth
- MongoDB schemas for products, users, preferences, and saved recommendation history
- In-memory fallback data so the app can demo even when MongoDB is not running

## Folder Structure

```text
electromatch-ai/
  client/
    src/
      components/
      lib/
      App.jsx
      main.jsx
      styles.css
  server/
    src/
      data/
      models/
      routes/
      services/
      db.js
      index.js
      seed.js
```

## Setup

```bash
npm run install:all
cp server/.env.example server/.env
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:8080/api`

## MongoDB

The API works without MongoDB by using the seeded in-memory product catalog. To persist product data:

1. Start MongoDB locally.
2. Set `MONGODB_URI` in `server/.env`.
3. Run:

```bash
npm run seed
```

## Recommendation Algorithm

The recommendation engine lives in `server/src/services/recommendationEngine.js`. It:

- Starts with purpose-based weights, such as gaming prioritizing GPU and performance.
- Boosts weights for explicit high preferences like battery, camera, performance, and portability.
- Computes a weighted product score from normalized product signals.
- Blends the weighted score with budget fit.
- Adds small boosts for brand and OS matches.
- Returns sorted products with a match percentage and human-readable explanation.

## API Overview

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/recommendations`
- `POST /api/comparisons`
- `GET /api/filters`
- `POST /api/preferences`
- `GET /api/wishlist`
- `POST /api/wishlist/:id`
- `GET /api/history`
- `POST /api/chat`
- `POST /api/auth/register`
- `POST /api/auth/login`

## Production Notes

For a production deployment, replace the mock chat intent parser with a real LLM call, move in-memory wishlist/auth fallback to MongoDB-backed persistence, add request validation, and serve the built React app behind the API or a CDN.
