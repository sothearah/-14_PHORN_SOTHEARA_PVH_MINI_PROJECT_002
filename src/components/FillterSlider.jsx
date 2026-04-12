"use client";

import React from "react";
import { Button } from "@heroui/react";
import RangeSilde from "./RangeSlider";
import RadioBox from "./RadioBox";

export default function FillterSlider({ onPriceChange, onCategoryChange, onReset }) {
  return (
    <div className="group max-w-[400px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md px-8 py-3 -mt-[90px]">
      {/* 1 line */}
      <div className="flex items-center justify-between">
        <p className="font-semibold">Filter</p>
        <Button
          className="rounded-2xl bg-white border border-gray-300 px-4 py-1 text-gray-800 hover:bg-gray-200 transition"
          onPress={onReset}
        >
          Reset filters
        </Button>
      </div>
      {/* 2 line */}
      <div className="py-4">
        <div className="flex flex-col py-3">
          <p>PRICE RANGE</p>
          <p> 0$ - $300 <span className="text-gray-400">(no limit)</span> </p>
        </div>
        <RangeSilde onChange={onPriceChange} />
        <div className="flex items-center justify-between text-gray-400">
          <span>0$</span>
          <span>300$</span>
        </div>
      </div>
      {/* 4 line */}
      <div className="mb-4">
        <p className="py-2 text-sm text-gray-700">QUICK SELECT</p>
        {/* 4 buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button onPress={() => onPriceChange(50)} className="rounded-2xl bg-white border border-gray-300 px-4 py-1  text-gray-800 hover:bg-gray-200 transition">
            Under $50
          </Button>

          <Button onPress={() => onPriceChange(100)} className="rounded-2xl bg-white border border-gray-300 px-4 py-1  text-gray-800 hover:bg-gray-200 transition">
            Under $100
          </Button>

          <Button onPress={() => onPriceChange(150)} className="rounded-2xl bg-white border border-gray-300 px-4 py-1  text-gray-800 hover:bg-gray-200 transition">
            Under $150
          </Button>

          <Button onPress={() => onPriceChange(1000)} className="rounded-2xl bg-white border border-gray-300 px-4 py-1  text-gray-800 hover:bg-gray-200 transition">
            All prices
          </Button>
        </div>
      </div>

      {/* category */}
      <div>
        <p className="py-2 text-sm text-gray-700">CATEGORIES</p>
        <RadioBox onSelect={onCategoryChange} />
      </div>
    </div>
  );
}
