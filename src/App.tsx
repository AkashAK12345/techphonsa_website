
import Navbar from './components/layout/Navbar';
import Hero from './sections/Hero';
import Footer from './components/layout/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="page-content">
        <Hero />
      </main>
      <Footer />
    </>
  );
}

export default App;
