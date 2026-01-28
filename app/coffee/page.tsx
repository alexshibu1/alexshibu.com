"use client";

import { useState } from "react";
import CoffeeMap from "./CoffeeMap";
import CoffeeTable from "./CoffeeTable";
import { coffeeShops } from "./coffee-data";

export default function CoffeePage() {
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);

  return (
    <main className="page-content">
      <h1 className="hero-heading">coffee</h1>
      <p className="hero-subline">reviews of downtown Toronto cafes</p>

      <div className="coffee-content">
        <CoffeeMap />

        <CoffeeTable
          shops={coffeeShops}
          selectedShopId={selectedShopId}
          onShopClick={setSelectedShopId}
        />
      </div>
    </main>
  );
}
