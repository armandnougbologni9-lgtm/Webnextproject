import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import CocktailsSection from '@/components/CocktailsSection/CocktailsSection';
import BarmenSection from '@/components/BarmenSection/BarmenSection';
import EventsSection from '@/components/EventsSection/EventsSection';
import AboutSection from '@/components/AboutSection/AboutSection';
import Testimonials from '@/components/Testimonials/Testimonials';
import ContactForm from '@/components/ContactForm/ContactForm';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenu-principal">
        <Hero />
        <CocktailsSection />
        <BarmenSection />
        <EventsSection />
        <AboutSection />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
