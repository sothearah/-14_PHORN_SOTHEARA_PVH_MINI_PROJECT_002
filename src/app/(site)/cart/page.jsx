"use client";
import { useCartStore } from "@/store/cartStore";
import { Button, Divider, Image } from "@heroui/react";
import Link from "next/link";

export default function CartPage() {
  // shorthand 
  const { items, removeProduct, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-black font-semibold text-xl">Your cart is empty.</p>
        <p className="text-gray-500 text-md">Open a product, set quantity, then tap Add to cart.</p>
        <Button
          as={Link}
          href="/products"
          className="bg-gray-900 text-white font-semibold rounded-full px-6"
        >
          Shop Products
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* header */}
      <h1 className="text-3xl font-bold text-gray-900">Your cart</h1>
      <p className="text-sm text-gray-400 mt-1 mb-2">
        Cart is stored in memory for this visit — refreshing the page clears it.
      </p>

      <p className="text-sm text-gray-500 mb-4">
        <span className="font-semibold text-gray-900">{items.length}</span>{" "}
        product{items.length > 1 ? "s" : ""} in cart
      </p>

      {/* items */}
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-4 bg-white rounded-2xl border border-gray-200 p-4"
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">
                  
                </div>
              )}
            </div>

            {/* info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate text-base">
                {item.name}
              </p>
              <p className="text-sm text-gray-400 mt-0.5">.</p>
              <p className="text-sm text-gray-700 mt-1 tabular-nums">
                ${item.price.toFixed(2)} each
              </p>
            </div>

            {/* right side controller quantity, price, remove */}
            <div className="flex flex-col items-end gap-2">
              {/* quantity */}
              <div className="flex items-center gap-3 border border-gray-200 rounded-full px-3 py-1">
                <button
                  className="text-gray-500 hover:text-gray-900 text-lg leading-none"
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                >
                  −
                </button>
                <span className="w-5 text-center tabular-nums font-medium text-gray-900">
                  {item.quantity}
                </span>
                <button
                  className="text-gray-500 hover:text-gray-900 text-lg leading-none"
                  onClick={() => {
                    alert(`${item.name} quantity increased to ${item.quantity + 1}`);
                    updateQuantity(item.productId, item.quantity + 1);
                  }}
                >
                  +
                </button>
              </div>

              {/* total */}
              <p className="font-semibold tabular-nums text-gray-900 text-base">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              {/* remove */}
              <button
                className="text-sm text-red-400 hover:text-red-600 transition"
                onClick={() => removeProduct(item.productId)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* second card */}
      <div className="mt-4 bg-white rounded-2xl border border-gray-200 p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-semibold text-gray-700">Subtotal</p>
            <p className="text-sm text-gray-400 mt-0.5">
              Tax and shipping calculated at checkout (demo).
            </p>
          </div>
          <p className="text-xl font-bold text-gray-900 tabular-nums">
            ${getTotalPrice().toFixed(2)}
          </p>
        </div>

        <Button
          className="w-full bg-gray-900 text-white font-semibold rounded-full h-12 text-base"
          onPress={() => {}}
        >
          Checkout
        </Button>

        <Button
          variant="flat"
          className="w-full bg-gray-100 text-gray-700 font-semibold rounded-full h-12 text-base"
          onPress={clearCart}
        >
          Clear cart
        </Button>
      </div>
    </div>
  );
}