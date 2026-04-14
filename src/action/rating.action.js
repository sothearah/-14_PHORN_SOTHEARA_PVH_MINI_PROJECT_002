"use server";

import { rateProduct } from "../service/rating.service";

export async function rateProductAction(productId, star) {
    try {
        const result = await rateProduct(productId, star);
        // console.log("rating :", result);
        if(result.success) {
            // revalidate by path
            revalidatePath(`/products/${productId}`);
        }
        return result;
    } catch (error) {
        return { success: false, message: error.message };
    }
}