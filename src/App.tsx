
import Navbar from './components/layout/Navbar';
import Hero from './sections/Hero';
import ServicesOverview from './sections/ServicesOverview';
import HowWeWork from './sections/HowWeWork';
import AboutSection from './sections/AboutSection';
import FinalCTA from './sections/FinalCTA';
import ContactSection from './sections/ContactSection';
import Footer from './components/layout/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="page-content">
        <Hero />
        <ServicesOverview />
        <HowWeWork />
        <AboutSection />
        <FinalCTA />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
