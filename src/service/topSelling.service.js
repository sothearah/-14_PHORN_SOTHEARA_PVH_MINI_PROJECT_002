import { cookies } from "next/headers";

export default async function getTopSellingProducts(limit = 4) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("next-auth.session-token")?.value;

        // limit product to render
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/top-selling?limit=${limit}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            cache: 'no-store'
        });

        const result = await res.json();
        if (!res.ok) return [];

        return result.payload || [];
    } catch (error) {
        console.log("Top selling error:", error.message);
        return [];
    }
}