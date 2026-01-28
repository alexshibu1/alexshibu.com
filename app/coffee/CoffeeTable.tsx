"use client";

import { useState, useMemo } from "react";
import type { CoffeeShop } from "./coffee-data";

type SortField = "date" | "rating" | "shopName" | null;
type SortDirection = "asc" | "desc";

interface CoffeeTableProps {
  shops: CoffeeShop[];
  selectedShopId?: string | null;
  onShopClick?: (shopId: string) => void;
}

// Principle: keep “derivation rules” pure and reusable.
// Why: multiple features (stats + filtering) should compute “city” the same way.
function getCityLabel(shop: CoffeeShop): string {
  // Heuristic: if the shop name includes "(City, Country)" or "(City, State)",
  // treat that parenthetical as the city label. Otherwise, assume Toronto.
  //
  // Why: your dataset encodes travel cafes in the name (e.g. "Ritual Coffee (San Francisco)"),
  // but most Toronto entries have no explicit city field.
  const match = shop.shopName.match(/\(([^)]+)\)\s*$/);
  return match?.[1]?.trim() || "Toronto";
}

function isExplicitNonTorontoCity(shop: CoffeeShop): boolean {
  // Principle: don’t “invent” cities for Toronto-only entries.
  // Why: “Unique cities” is meant to highlight travel cities encoded in parentheses.
  return /\(([^)]+)\)\s*$/.test(shop.shopName);
}

export default function CoffeeTable({
  shops,
  selectedShopId,
}: CoffeeTableProps) {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [filteredShop, setFilteredShop] = useState<string | null>(null);
  const [citySamplerMode, setCitySamplerMode] = useState(false);

  // Calculate stats with actual average order values
  const stats = useMemo(() => {
    const uniqueCafes = new Set(shops.map((s) => s.shopName)).size;
    const uniqueCities = new Set(
      shops.filter(isExplicitNonTorontoCity).map((s) => getCityLabel(s)),
    ).size;

    // Principle: estimate per DRINK, not per SHOP.
    // Why: your dataset includes what you ordered (iced/frappe/hot chocolate/etc),
    // and those items have meaningfully different price bands even at the same cafe.
    function normalizeShopNameForPricing(shopName: string): string {
      // Strip trailing location qualifiers like "Ritual Coffee (San Francisco)"
      // so pricing rules match the underlying brand.
      return shopName.replace(/\s*\([^)]*\)\s*$/, "").trim();
    }

    function estimateDrinkPriceCAD(shop: CoffeeShop): number {
      const shopKey = normalizeShopNameForPricing(shop.shopName);
      const drink = shop.drink.toLowerCase();

      // Baseline “typical drink” price by shop/chain (CAD-ish).
      // (These are intentionally rough; the drink modifiers below do most of the work.)
      const baseByShop: Record<string, number> = {
        "Tim Hortons": 2.5,
        Starbucks: 4.8,
        "Second Cup": 4.8,
        "Pret A Manger": 4.8,
        "Aroma Espresso Bar": 5.0,
        "Costa Coffee": 5.0,
        Walmart: 2.5,
        "Coffee Fellows": 5.0,
      };

      // Start from a shop baseline; default assumes an indie cafe drink.
      let price = baseByShop[shopKey] ?? 5.25;

      // Drink-based adjustments (keywords → add/subtract).
      // Why: “frappe/iced cap” usually costs more than “latte”; hot chocolate is often cheaper.
      if (drink.includes("frappe") || drink.includes("iced cap")) price += 1.25;
      if (drink.includes("iced")) price += 0.5;
      if (drink.includes("hot chocolate")) price -= 0.75;
      if (drink.includes("london fog")) price += 0.25;

      // Espresso drinks (light bump for “crafted” drinks)
      if (
        drink.includes("latte") ||
        drink.includes("cappuccino") ||
        drink.includes("macchiato") ||
        drink.includes("mocha")
      ) {
        price += 0.35;
      }

      // Keep the estimator sane.
      price = Math.max(1.5, Math.min(price, 9.5));
      return price;
    }

    // Calculate total dollars spent based on estimated per-drink prices
    const estimatedDollars = shops.reduce((total, shop) => {
      return total + estimateDrinkPriceCAD(shop);
    }, 0);

    return {
      drinks: shops.length,
      uniqueCafes,
      uniqueCities,
      estimatedDollars: Math.round(estimatedDollars * 10) / 10, // Round to 1 decimal
    };
  }, [shops]);

  // Filter and sort shops
  const sortedShops = useMemo(() => {
    let filtered = shops;

    // If a chain shop is clicked, filter to show only that shop
    if (filteredShop) {
      filtered = shops.filter((s) => s.shopName === filteredShop);
    }

    // City sampler mode: show one representative cafe per city (highest-rated entry).
    // Why: “different cafes from different cities” is a summary view, not every drink you had there.
    if (citySamplerMode) {
      // Only include explicit (non-Toronto) city-labeled entries, e.g. "(San Francisco)".
      filtered = filtered.filter(isExplicitNonTorontoCity);

      const bestByCity = new Map<string, CoffeeShop>();

      for (const shop of filtered) {
        const city = getCityLabel(shop);
        const currentBest = bestByCity.get(city);
        if (!currentBest) {
          bestByCity.set(city, shop);
          continue;
        }

        // Pick higher rating; if tied, pick the newer date.
        const better =
          shop.rating > currentBest.rating ||
          (shop.rating === currentBest.rating &&
            normalizeDate(shop.date) > normalizeDate(currentBest.date));

        if (better) bestByCity.set(city, shop);
      }

      filtered = Array.from(bestByCity.values());
    }

    if (!sortField) return filtered;

    return [...filtered].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case "date":
          aValue = normalizeDate(a.date);
          bValue = normalizeDate(b.date);
          break;
        case "rating":
          aValue = a.rating;
          bValue = b.rating;
          break;
        case "shopName":
          aValue = a.shopName.toLowerCase();
          bValue = b.shopName.toLowerCase();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [shops, sortField, sortDirection, filteredShop, citySamplerMode]);

  const handleChainClick = (shopName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCitySamplerMode(false); // Don’t combine chain filter with city sampler mode
    if (filteredShop === shopName) {
      setFilteredShop(null); // Clear filter if clicking same shop
    } else {
      setFilteredShop(shopName); // Filter to this shop
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return "↕";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <div className="coffee-table-container">
      {/* Stats row */}
      <div className="coffee-stats mb-4">
        <div className="stat-item">
          <span className="stat-value">{stats.drinks}</span>
          <span className="stat-label">drinks</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">${stats.estimatedDollars}</span>
          <span className="stat-label">spent</span>
        </div>
        <button
          type="button"
          className={`stat-item stat-button ${citySamplerMode ? "active" : ""}`}
          onClick={() => {
            setFilteredShop(null);
            setCitySamplerMode((v) => !v);
          }}
        >
          <span className="stat-value">{stats.uniqueCities}</span>
          <span className="stat-label">unique cities</span>
        </button>
        <div className="stat-item">
          <span className="stat-value">{stats.uniqueCafes}</span>
          <span className="stat-label">unique cafes</span>
        </div>
      </div>

      {/* Filter indicator */}
      {(filteredShop || citySamplerMode) && (
        <div className="mb-2 text-sm text-gray-600">
          {filteredShop ? (
            <>
              Showing reviews from <strong>{filteredShop}</strong>{" "}
            </>
          ) : (
            <>
              Showing <strong>one cafe per city</strong>{" "}
            </>
          )}
          <button
            onClick={() => {
              setFilteredShop(null);
              setCitySamplerMode(false);
            }}
            className="text-gray-400 hover:text-gray-600 underline"
          >
            (clear)
          </button>
        </div>
      )}

      <table className="coffee-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("date")} className="sortable">
              Date {getSortIcon("date")}
            </th>
            <th onClick={() => handleSort("shopName")} className="sortable">
              Cafe {getSortIcon("shopName")}
            </th>
            <th>Drink</th>
            <th onClick={() => handleSort("rating")} className="sortable">
              Rating {getSortIcon("rating")}
            </th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {sortedShops.map((shop) => (
            <tr
              key={shop.id}
              className={selectedShopId === shop.id ? "selected-row" : ""}
            >
              <td className="date-cell">{shop.date}</td>
              <td className="shop-cell">
                {shop.isChain ? (
                  <button
                    onClick={(e) => handleChainClick(shop.shopName, e)}
                    className={`chain-link ${filteredShop === shop.shopName ? "active" : ""}`}
                  >
                    {shop.shopName}
                  </button>
                ) : (
                  shop.shopName
                )}
              </td>
              <td className="drink-cell">{shop.drink}</td>
              <td className="rating-cell">{shop.rating}/10</td>
              <td className="review-cell">{shop.review}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Helper function to normalize dates for sorting
// Converts "March 1st, 2024", "April 15th, 2025", etc. to sortable format
function normalizeDate(dateStr: string): string {
  // Remove commas and "th", "st", "nd", "rd" suffixes
  const cleaned = dateStr
    .replace(/,/g, "")
    .replace(/(\d+)(th|st|nd|rd)/i, "$1");

  // Map month names to numbers
  const monthMap: Record<string, string> = {
    january: "01",
    jan: "01",
    february: "02",
    feb: "02",
    march: "03",
    april: "04",
    may: "05",
    june: "06",
    july: "07",
    august: "08",
    september: "09",
    october: "10",
    oct: "10",
    november: "11",
    nov: "11",
    december: "12",
    dec: "12",
  };

  const parts = cleaned.toLowerCase().trim().split(/\s+/);

  // Handle formats like "March 1st, 2024" or "March 1, 2024"
  if (parts.length >= 3) {
    const month = monthMap[parts[0]] || "00";
    const day = parts[1].padStart(2, "0");
    const year = parts[2] || "2024";
    return `${year}-${month}-${day}`;
  }

  // Handle formats like "March 1st" (no year)
  if (parts.length === 2) {
    const month = monthMap[parts[0]] || "00";
    const day = parts[1].padStart(2, "0");
    // Default to 2024 if no year specified
    return `2024-${month}-${day}`;
  }

  return cleaned;
}
