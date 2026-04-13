"use client";

import { useState } from "react";
import FillterSlider from "@/components/FillterSlider";
import ShopCardComponent from "./ShopCardComponent";

export default function ProductsClientWrapper({ products, categories }) {
  const [maxPrice, setMaxPrice] = useState(300);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [search, setSearch] = useState("");

  const handleReset = () => {
    setMaxPrice(300);
    setSelectedCategories([]);
    setSearch("");
  };

  const filtered = products.filter((p) => {
    const withPrice = p.price <= maxPrice;
    const withCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(p.categoryId);
    const withSearch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase());
    return withPrice && withCategory && withSearch;
  });

  return (
    <div>
      {/* header */}
      <div className="flex items-center justify-between px-[200px] py-[100px]">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Luxury beauty products
          </h1>
          <p className="text-sm text-gray-400">
            Use the filters to narrow by price and brand.
          </p>
        </div>

        {/* search bar */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by product name..."
          className="w-72 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-lime-400/20 focus:border-lime-400 focus:ring-2"
        />

      </div>

      {/* showing count */}
      <div className="px-[200px] mb-4">
        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold">{filtered.length}</span> products
        </p>
      </div>

      {/* filter + card */}
      <div className="flex items-center justify-center gap-4 flex-col">
        <div className="flex items-start justify-center gap-4">
          <FillterSlider
            products={products}
            categories={categories}
            onPriceChange={setMaxPrice}
            onCategoryChange={setSelectedCategories}
            onReset={handleReset}
          />
          <ShopCardComponent products={filtered} />
        </div>
      </div>
    </div>
  );
}