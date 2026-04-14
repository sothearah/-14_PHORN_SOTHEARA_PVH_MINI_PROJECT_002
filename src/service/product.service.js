import { cookies } from "next/headers";

// fetch all product
export default async function getAllProducts() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("next-auth.session-token")?.value;
    console.log("Token:", token ? "exists" : "Missing");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    console.log("Status:", res.status);

    const result = await res.json();

    if (!res.ok) {
      console.log("Error:", result);
      return [];
    }
    return result.payload || [];
  } catch (error) {
    console.log("Error:", error.message);
    return [];
  }
}

// fetch product by id
export async function getProductById(productId) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("next-auth.session-token")?.value;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            cache: 'no-store'
        });

        const result = await res.json();
        if (!res.ok) return null;
        return result.payload || null;
    } catch (error) {
        console.log("Single product error:", error.message);
        return null;
    }
}
