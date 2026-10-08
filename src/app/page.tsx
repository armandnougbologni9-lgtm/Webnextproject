import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import CocktailsSection from '@/components/CocktailsSection/CocktailsSection';
import AboutSection from '@/components/AboutSection/AboutSection';
import ContactForm from '@/components/ContactForm/ContactForm';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CocktailsSection />
        <AboutSection />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
