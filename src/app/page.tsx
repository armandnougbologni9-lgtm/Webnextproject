import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import CocktailsSection from '@/components/CocktailsSection/CocktailsSection';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CocktailsSection />
      </main>
    </>
  );
}
