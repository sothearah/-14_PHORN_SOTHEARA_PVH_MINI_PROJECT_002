import { getProductById } from "../../../../service/product.service";
import ProductDetailClient from "../../../../components/shop/ProductDetailClient";

export default async function ProductDetailPage({ params }) {
    const { productId } = await params;
    const product = await getProductById(productId);

    if (!product) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500">Product not found.</p>
            </div>
        );
    }

    return <ProductDetailClient product={product} />;
}