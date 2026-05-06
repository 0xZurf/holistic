import Hero from '../components/home/Hero';
import FeaturedServices from '../components/home/FeaturedServices';
import RetreatSpotlight from '../components/home/RetreatSpotlight';
import ProductHighlights from '../components/home/ProductHighlights';
import Testimonials from '../components/home/Testimonials';
import SectionDivider from '../components/ui/SectionDivider';

export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider color="cream" />
      <FeaturedServices />
      <SectionDivider color="sand" />
      <RetreatSpotlight />
      <SectionDivider color="cream" />
      <ProductHighlights />
      <SectionDivider color="sand" />
      <Testimonials />
    </>
  );
}
