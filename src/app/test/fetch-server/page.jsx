import Image from 'next/image';
import React from 'react'

export default async function Page() {

    const res = await fetch("https://dummyjson.com/products");
    if(!res.ok) {
        throw new Error("Failed to fetch product!")
    }
    const result = await res.json(); 
    const products = result.products;

  return (
    <div>
      <div className="flex gap-5 flex-wrap w-full"> 
              {products.map((data) => (
                <div
                  key={data.id}
                  className="px-3 py-2 bg-gray-100 rounded-lg flex flex-col w-[300px]"
                >
                  <Image
                    src={data.images[0]}
                    alt={data.title}
                    width={300}
                    height={100}
                  />
                  <div>{data.title}</div>
                  <div>{data.price}</div>
                </div>
              ))}
            </div>
    </div>
  )
}
