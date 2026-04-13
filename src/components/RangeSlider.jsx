"use client";

import { Slider } from "@heroui/react";
import { useState } from "react";

export default function RangeSlider({ onChange }) {
  const [value, setValue] = useState(300);

  const handleChange = (val) => {
    setValue(val);
    onChange(val);
  };

  return (
    <div className="w-full">
      <p className="text-sm text-gray-500 mb-2">
        $0 – ${value === 300 ? "300 (no limit)" : value}
      </p>
      <Slider
        aria-label="Price range"
        minValue={0}
        maxValue={300}
        value={value}
        onChange={handleChange}
        className="w-full max-w-xs"
      />
    </div>
  );
}