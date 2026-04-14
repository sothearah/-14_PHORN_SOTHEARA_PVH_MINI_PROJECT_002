"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { addToast } from "@heroui/toast";
import { rateProductAction } from "@/action/rating.action";

// interactive star rating component
function StarRating({ initialRating = 0, productId, onRate }) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(initialRating);

  const handleRate = async (star) => {
    setSelected(star);
    const result = await rateProductAction(productId, star);
    if (result.success) {
      addToast({ title: "Rating saved!", color: "success" });
      onRate(star);
    } else {
      addToast({ title: "Failed to save rating", color: "danger" });
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          aria-label={`Rate ${star} stars`}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => handleRate(star)}
          className="text-2xl transition"
        >
          <span
            className={
              (hovered || selected) >= star ? "text-amber-400" : "text-gray-300"
            }
          >
            ★
          </span>
        </button>
      ))}
    </div>
  );
}

export default function ProductDetailClient({ product }) {
  const { productId, name, description, colors, sizes, star, imageUrl, price } =
    product;

  // state for selected color, size, quantity, and current rating
  const [selectedColor, setSelectedColor] = useState(colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [currentRating, setCurrentRating] = useState(star || 0);

  // get addProduct from cart store
  const addProduct = useCartStore((s) => s.addProduct);

  const handleAddToCart = () => {
    // add product with selected options and quantity
    for (let i = 0; i < quantity; i++) {
      addProduct({
        productId,
        name,
        price,
        imageUrl,
        selectedColor,
        selectedSize,
      });
    }
    addToast({
      title: "Added to cart!",
      description: `${name} (${selectedColor}, ${selectedSize}) x${quantity}`,
      color: "success",
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-[120px]">
      {/* breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-gray-900">
          Products
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* left: image */}
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-gray-300 text-6xl">
              ◇
            </div>
          )}
        </div>

        {/* right: details */}
        <div className="flex flex-col gap-6">
          {/* name and rating */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
            <div className="mt-2 flex items-center gap-3">
              {/* interactive star rating — click to rate and save to API */}
              <StarRating
                initialRating={currentRating}
                productId={productId}
                onRate={setCurrentRating}
              />
              <span className="text-sm text-gray-500">
                {currentRating > 0 ? `${currentRating} / 5` : "No rating yet"}
              </span>
            </div>
          </div>

          <p className="text-3xl font-semibold text-lime-700">${price}</p>

          {/* description */}
          <p className="text-gray-600 leading-relaxed">{description}</p>

          {/* color selector — from API */}
          {colors?.length > 0 && (
            <div>
              <p className="font-semibold text-gray-900 mb-3">Choose a color</p>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    aria-label={`Select color ${color}`}
                    onClick={() => setSelectedColor(color)}
                    style={
                      selectedColor === color
                        ? {
                            backgroundColor: color,
                            borderColor: color,
                            color: "white",
                          }
                        : {}
                    }
                    className={`rounded-full px-5 py-2 text-sm font-medium border-2 transition capitalize ${
                      selectedColor === color
                        ? "text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Selected: {selectedColor}
              </p>
            </div>
          )}

          {/* size selector — from API */}
          {sizes?.length > 0 && (
            <div>
              <p className="font-semibold text-gray-900 mb-3">Choose a size</p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    aria-label={`Select size ${size}`}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-full px-5 py-2 text-sm font-medium border-2 transition ${
                      selectedSize === size
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Selected: {selectedSize}
              </p>
            </div>
          )}

          {/* qty selector */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Decrease quantity"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-10 rounded-full border border-gray-200 text-xl font-light hover:bg-gray-100 transition"
            >
              −
            </button>
            <span className="w-6 text-center font-semibold text-gray-900">
              {quantity}
            </span>
            <button
              aria-label="Increase quantity"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-10 rounded-full border border-gray-200 text-xl font-light hover:bg-gray-100 transition"
            >
              +
            </button>
          </div>

          {/* add to cart button — uses cartStore.addProduct */}
          <button
            onClick={handleAddToCart}
            className="w-full rounded-xl bg-gray-900 py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            🛒 Add to cart
          </button>

          {/* static return policy */}
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 flex items-start gap-3">
            <span className="text-lg">↩️</span>
            <div>
              <p className="font-semibold text-gray-900">Free 30-day returns</p>
              <p className="text-sm text-gray-500">
                See return policy details in cart.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
