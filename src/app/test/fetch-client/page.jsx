"use client";

import { Button } from '@heroui/react';
import Image from "next/image";
import React, { useEffect, useState, use } from "react";

export default function Page({ params }) {
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = use(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const result = await res.json();
        setProducts(result.products);
      } catch (err) {
        setError(err.message);
        console.log(setError)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Button className='bg-cyan-200 hover:bg-cyan-400' variant="shadow" size="md" radius="lg">Click Me</Button>
      <div>This is dynamic route. Calling for id: {id}</div>
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
  );
}
