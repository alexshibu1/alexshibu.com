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

export default function CoffeeTable({
  shops,
  selectedShopId,
  onShopClick,
}: CoffeeTableProps) {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [filteredShop, setFilteredShop] = useState<string | null>(null);

  // Calculate stats with actual average order values
  const stats = useMemo(() => {
    const uniqueCafes = new Set(shops.map((s) => s.shopName)).size;

    // Average order values per chain/cafe type (CAD)
    const priceMap: Record<string, number> = {
      "Tim Hortons": 2.1,
      Starbucks: 4.0,
      "Second Cup": 4.5,
      "Pret A Manger": 4.5,
      "Aroma Espresso Bar": 4.5,
      "Costa Coffee": 4.5,
      Walmart: 2.5,
      "Coffee Fellows": 4.0,
    };

    // Calculate total dollars spent based on actual prices
    const estimatedDollars = shops.reduce((total, shop) => {
      const price = priceMap[shop.shopName] || 4.5; // Default $4.50 for regular cafes
      return total + price;
    }, 0);

    return {
      drinks: shops.length,
      uniqueCafes,
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
  }, [shops, sortField, sortDirection, filteredShop]);

  const handleChainClick = (shopName: string, e: React.MouseEvent) => {
    e.stopPropagation();
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
        <div className="stat-item">
          <span className="stat-value">{stats.uniqueCafes}</span>
          <span className="stat-label">unique cafes</span>
        </div>
      </div>

      {/* Filter indicator */}
      {filteredShop && (
        <div className="mb-2 text-sm text-gray-600">
          Showing reviews from <strong>{filteredShop}</strong>{" "}
          <button
            onClick={() => setFilteredShop(null)}
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
