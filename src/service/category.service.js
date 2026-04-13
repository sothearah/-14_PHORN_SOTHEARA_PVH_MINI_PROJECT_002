import { cookies } from "next/headers";

export default async function getAllCategories() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("next-auth.session-token")?.value;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
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
        console.log("Category error:", error.message);
        return [];
    }
}