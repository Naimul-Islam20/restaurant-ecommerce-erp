import { CollectionsSection } from "@/components/home/collections-section";
import { HeroSlider } from "@/components/home/hero-slider";
import { ProductsGridSection } from "@/components/home/products-grid-section";
import { ProductsSliderSection } from "@/components/home/products-slider-section";
import { ServiceStrip } from "@/components/home/service-strip";
import { getNewArrivals, getProducts } from "@/lib/products";

export default function HomePage() {
  const newArrivals = getNewArrivals(4);
  const products = getProducts();

  return (
    <div>
      <section>
        <HeroSlider />
      </section>

      <ServiceStrip />

      <CollectionsSection />

      <ProductsGridSection products={products} />

      <ProductsSliderSection
        products={newArrivals}
        title="New arrivals"
        ctaLabel="Shop new"
        ctaHref="/shop"
        reduceBottomSpacing
        useDesktopCarouselOnMobile
        mobileTwoUpNoLoop
      />
    </div>
  );
}
