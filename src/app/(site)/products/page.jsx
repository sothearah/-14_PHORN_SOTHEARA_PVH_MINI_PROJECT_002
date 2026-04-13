// "use client";

// import FillterSlider from "@/components/FillterSlider";
// import ShopCardComponent from "../../../components/shop/ShopCardComponent";
// import React from "react";
// import { useState } from "react";

import getAllProducts from "../../../service/product.service";
import ProductsClientWrapper from "../../../components/shop/ProductsClientWrapper";
import getAllCategories from "../../../service/category.service";

export default async function Page() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div>
      <div className="flex items-center justify-between px-[200px] py-[100px]">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Luxury beauty products
          </h1>
          <p className="text-sm text-gray-400">
            Use the filters to narrow by price and brand.
          </p>
        </div>
        <p>Search bar</p>
      </div>
      <ProductsClientWrapper categories={categories} products={products} />
    </div>
  );
}


// export default function Page() {
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [category, setCategory] = useState("all");

// //  className="flex items-center align-center flex-col">

//   const handleReset = () => {
//     setMaxPrice(1000);
//     setCategory("all");
//   };

//   return (
//     <div >
//       <div className="flex items-center justify-between px-[200px] py-[100px]">
//         <div className="">
//           <h1 className="text-3xl font-bold text-gray-900 ">
//             Luxury beauty products
//           </h1>
//           <p className="text-sm text-gray-400">
//             Use the filters to narrow by price and brand.
//           </p>
//         </div>
//         <p>Search bar</p>
//       </div>
//       <div className="flex items-center justify-center gap-4 flex-col">
//         <div className="flex items-start justify-center gap-4">
//           <FillterSlider
//             onPriceChange={setMaxPrice}
//             onCategoryChange={setCategory}
//             onReset={handleReset}
//           />
//           <ShopCardComponent filterPrice={maxPrice} filterCategory={category} />
//         </div>
//       </div>
//     </div>
//   );
// }
