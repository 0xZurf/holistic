import Hero from '../components/home/Hero';
import FeaturedServices from '../components/home/FeaturedServices';
import RetreatSpotlight from '../components/home/RetreatSpotlight';
import ProductHighlights from '../components/home/ProductHighlights';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';
import GoldDripDivider from '../components/ui/GoldDripDivider';

export default function Home() {
  return (
    <>
      <Hero />
      <GoldDripDivider />
      <FeaturedServices />
      <GoldDripDivider />
      <RetreatSpotlight />
      <GoldDripDivider />
      <ProductHighlights />
      <GoldDripDivider />
      <Testimonials />
      <Newsletter />
    </>
  );
}
