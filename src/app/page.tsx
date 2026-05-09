import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
import Showcase from '@/components/Showcase';
import Features from '@/components/Features';
import CtaBanner from '@/components/CtaBanner';
import Gallery from '@/components/Gallery';
import Services from '@/components/Services';
import WeddingPackages from '@/components/WeddingPackages';
import Destination from '@/components/Destination';
import QuoteForm from '@/components/QuoteForm';
import Reviews from '@/components/Reviews';
import Footer from '@/components/Footer';
import FloatingCta from '@/components/FloatingCta';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Story />
      <Showcase />
      <Features />
      <CtaBanner />
      <Gallery />
      <Services />
      <WeddingPackages />
      <Destination />
      <QuoteForm />
      <Reviews />
      <Footer />
      <FloatingCta />
    </>
  );
}
