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
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const sortedShops = useMemo(() => {
    if (!sortField) return shops;

    return [...shops].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case "date":
          // Parse dates - simple comparison (May 15 > May 8 > May 6th > May 4th > April 30)
          // For simplicity, we'll do string comparison after normalizing
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
  }, [shops, sortField, sortDirection]);

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
      <table className="coffee-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("date")} className="sortable">
              Date {getSortIcon("date")}
            </th>
            <th onClick={() => handleSort("shopName")} className="sortable">
              Shop {getSortIcon("shopName")}
            </th>
            <th>Drink</th>
            <th onClick={() => handleSort("rating")} className="sortable">
              Rating {getSortIcon("rating")}
            </th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {sortedShops.map((shop) => (
            <tr
              key={shop.id}
              className={selectedShopId === shop.id ? "selected-row" : ""}
              onClick={() => onShopClick?.(shop.id)}
            >
              <td className="date-cell">{shop.date}</td>
              <td className="shop-cell">
                {shop.isChain ? (
                  <span className="chain-badge">{shop.shopName}</span>
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
// Converts "April 30", "May 4th", etc. to sortable format
function normalizeDate(dateStr: string): string {
  // Remove "th", "st", "nd", "rd" suffixes
  const cleaned = dateStr.replace(/(\d+)(th|st|nd|rd)/, "$1");

  // Map month names to numbers
  const monthMap: Record<string, string> = {
    january: "01",
    february: "02",
    march: "03",
    april: "04",
    may: "05",
    june: "06",
    july: "07",
    august: "08",
    september: "09",
    october: "10",
    november: "11",
    december: "12",
  };

  const parts = cleaned.toLowerCase().split(" ");
  if (parts.length === 2) {
    const month = monthMap[parts[0]] || "00";
    const day = parts[1].padStart(2, "0");
    return `2024-${month}-${day}`; // Assuming 2024, adjust if needed
  }

  return cleaned;
}
