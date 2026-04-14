import { cookies } from "next/headers"; 

export async function rateProduct(productId, star) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("next-auth.session-token")?.value;

        console.log("Rating productId:", productId);
        console.log("Rating star:", star);
        console.log("Token exists:", !!token);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/rating`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ star }),
        });

        console.log("Rating response status:", res.status);
        const result = await res.json();
        console.log("Rating response body:", JSON.stringify(result, null, 2));

        if (!res.ok) return { success: false };
        return { success: true, data: result.payload };
    } catch (error) {
        console.log("Rating error:", error.message);
        return { success: false };
    }
}