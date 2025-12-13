import IconBoxes from "@/components/icon-boxes";
import ProductCarousel from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
import ViewAllProductButton from "@/components/view-all-products-button";
import {
  getLatestProducts,
  getFeaturedProducts,
} from "@/lib/actions/product.actions";

export const metadata = {
  title: "Home",
  description: "Welcome to Prostore, your one-stop shop for everything!",
};

const HomePage = async () => {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();
  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
      <ViewAllProductButton />
      <IconBoxes />
    </>
  );
};

export default HomePage;
