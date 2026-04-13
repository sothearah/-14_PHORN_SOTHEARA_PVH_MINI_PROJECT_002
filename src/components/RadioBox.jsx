"use client";

import { useState } from "react";

export default function RadioBox({ categories = [], onSelect }) {
  const [selected, setSelected] = useState([]);

  const toggle = (id) => {
    const updated = selected.includes(id)
      ? selected.filter((c) => c !== id)
      : [...selected, id];
    setSelected(updated);
    onSelect(updated);
  };

  return (
    <div className="flex flex-col gap-2">
      {categories.map((cat) => (
        <label key={cat.categoryId} className="flex items-center justify-between gap-2 cursor-pointer">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.includes(cat.categoryId)}
              onChange={() => toggle(cat.categoryId)}
              className="rounded"
            />
            <span className="text-sm text-gray-700">{cat.name}</span> {/* ✅ real name */}
          </div>
        </label>
      ))}
      {categories.length === 0 && (
        <p className="text-xs text-gray-400">No categories found.</p>
      )}
      <p className="text-xs text-gray-400 mt-1">Select none to include all categories.</p>
    </div>
  );
}