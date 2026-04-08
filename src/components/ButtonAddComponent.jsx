"use client";

import { Button } from "@heroui/react";
import React from "react";
import { addToast } from "@heroui/toast"; 
import { useCartStore } from "@/store/cartStore";

export default function ButtonAddComponent({ product }) {

  const addProduct = useCartStore((s) => s.addProduct);

  const handleAdd = () => {
    addProduct(product);
    addToast({
      title: "Added To Cart",
      description: `${product.name} is in your cart.`,
      color: "success",
    });
  };

  return (
    <Button
      onPress={handleAdd}
      isIconOnly
      aria-label="Add to cart"
      className={`size-11 rounded-full bg-lime-400 text-xl font-light text-gray-900 shadow-sm transition hover:bg-lime-300 active:scale-95}`}
    >
      +
    </Button>
  );
}
