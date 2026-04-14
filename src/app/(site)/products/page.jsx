import getAllProducts from "../../../service/product.service";
import ProductsClientWrapper from "../../../components/shop/ProductsClientWrapper";
import getAllCategories from "../../../service/category.service";


export default async function Page({ params }) {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <>
      <ProductsClientWrapper products={products} categories={categories} />
    </>
  );
}
