"use client";

import { useState } from "react";
import FillterSlider from "@/components/FillterSlider";
import ShopCardComponent from "./ShopCardComponent";

export default function ProductsClientWrapper({ products, categories }) {
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleReset = () => {
    setMaxPrice(10000);
    setSelectedCategories([]);
  };

  const filtered = products.filter((p) => {
    const withinPrice = p.price <= maxPrice;
    const withinCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(p.categoryId);
    return withinPrice && withinCategory;
  });

  return (
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
  );
}