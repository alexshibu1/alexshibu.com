"use client";

import { useState } from "react";
import CoffeeTable from "./CoffeeTable";
import { coffeeShops } from "./coffee-data";

export default function CoffeePage() {
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);

  return (
    <main className="page-content coffee-page">
      <h1 className="hero-heading">coffee</h1>
      <p className="hero-subline">reviews of downtown Toronto cafes</p>

      <div className="mt-4 mb-2">
        <a
          href="https://maps.app.goo.gl/AmGVdD33DpvgkxBRA"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200"
        >
          <span aria-hidden="true">📍</span>
          <span>Open all cafes in Google Maps</span>
        </a>
      </div>

      <div className="coffee-content">
        <CoffeeTable
          shops={coffeeShops}
          selectedShopId={selectedShopId}
          onShopClick={setSelectedShopId}
        />
      </div>
    </main>
  );
}
