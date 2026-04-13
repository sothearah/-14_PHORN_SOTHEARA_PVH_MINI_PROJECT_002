"use client";

import React from "react";
import { Button } from "@heroui/react";
import RangeSlider from "./RangeSlider";
import RadioBox from "./RadioBox";

export default function FillterSlider({ products = [], categories = [], onPriceChange, onCategoryChange, onReset }) {
  return (
    <div className="group max-w-[400px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md px-8 py-3 -mt-[90px]">
      <div className="flex items-center justify-between">
        <p className="font-semibold">Filter</p>
        <Button
          aria-label="Reset filters"
          className="rounded-2xl bg-white border border-gray-300 px-4 py-1 text-gray-800 hover:bg-gray-200 transition"
          onPress={onReset}
        >
          Reset filters
        </Button>
      </div>
      <div className="py-4">
        <div className="flex flex-col py-3">
          <p>PRICE RANGE</p>
        </div>
        <RangeSlider onChange={onPriceChange} />
        <div className="flex items-center justify-between text-gray-400">
          <span>0$</span>
          <span>300$</span>
        </div>
      </div>
      <div className="mb-4">
        <p className="py-2 text-sm text-gray-700">QUICK SELECT</p>
        <div className="grid grid-cols-2 gap-3">
          <Button onPress={() => onPriceChange(50)} className="rounded-2xl bg-white border border-gray-300 px-4 py-1 text-gray-800 hover:bg-gray-200 transition">Under $50</Button>
          <Button onPress={() => onPriceChange(100)} className="rounded-2xl bg-white border border-gray-300 px-4 py-1 text-gray-800 hover:bg-gray-200 transition">Under $100</Button>
          <Button onPress={() => onPriceChange(150)} className="rounded-2xl bg-white border border-gray-300 px-4 py-1 text-gray-800 hover:bg-gray-200 transition">Under $150</Button>
          <Button onPress={() => onPriceChange(10000)} className="rounded-2xl bg-white border border-gray-300 px-4 py-1 text-gray-800 hover:bg-gray-200 transition">All prices</Button>
        </div>
      </div>
      <div>
        <p className="py-2 text-sm text-gray-700">CATEGORIES</p>
        <RadioBox categories={categories} onSelect={onCategoryChange} />
      </div>
    </div>
  );
}