"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import {
  ESSENTIALS_TABS,
  filterProductsByEssentialsTab,
  product,
} from "../../data/mockData";
import ProductCardComponent from "../ProductCardComponent";

const PAGE_SIZE = 6;

export default function LandingEssentialsGrid({ getProduct }) {
  
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [tab, setTab] = useState("All");
  const [showAll, setShowAll] = useState(false);

  // add to cart
  const handleAddToCart = (item) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.productId === item.productId);
      if (exists) {
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(
  //         "https://homework-api.noevchanmakara.site/api/v1/products",
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
  //             "Content-Type": "application/json",
  //           },
  //         },
  //       );

  //       console.log("Response Status:", res.status);

  //       const result = await res.json();
  //       console.log("API Response:", result);

  //       setProducts(result.payload || []);
  //     } catch (err) {
  //       setError(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // if (loading) return <div>is loading..</div>;

  const filtered = filterProductsByEssentialsTab(getProduct, tab);
  console.log("Filtered Products for this Tab:", filtered.length);
  const visible = showAll ? filtered : filtered.slice(0, PAGE_SIZE) || []; //fallback to make sure it always array
  const canLoadMore = !showAll && filtered.length > PAGE_SIZE;

  return (
    <section
      id="shop"
      className="mx-auto w-full max-w-7xl py-16 lg:py-20 px-[120px]"
    >
      <div className="flex flex-col items-center text-center px-[120px]">
        <p>show me here</p>
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          Our skincare essentials
        </h2>
        <p className="mt-2 max-w-lg text-gray-500">
          Filter by routine step — same mock catalog, organized for quick
          discovery.
        </p>
      </div>

      <div
        className="mt-10 flex flex-wrap justify-center gap-2"
        role="tablist"
        aria-label="Product categories"
      >
        {/* product header */}
        {ESSENTIALS_TABS.map((label) => {
          const on = tab === label;
          return (
            <Button
              key={label}
              role="tab"
              aria-selected={on}
              onPress={() => {
                setTab(label);
                setShowAll(false);
              }}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                on
                  ? "bg-lime-400 text-gray-900 shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {label}
            </Button>
          );
        })}
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {visible.map((product, index) => (
          // <ProductCardComponent
          //   add={handleAddToCart}
          //   product={product}
          //   key={product.productId}
          //   // key={index}
          // />
          <ProductCardComponent
            add={handleAddToCart}
            key={item.productId}
            product={item}
          />
        ))}
      </div>
      
      

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-gray-500">
          No products in this tab — try “All”.
        </p>
      )}

      {canLoadMore && (
        <div className="mt-12 flex justify-center">
          <Button
            variant="secondary"
            onPress={() => setShowAll(true)}
            className="rounded-full border border-gray-200 bg-white px-10 py-3 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-gray-300 hover:bg-gray-50"
          >
            Load more
          </Button>
        </div>
      )}
    </section>
  );
}
