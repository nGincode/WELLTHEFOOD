import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MenuGrid from './components/MenuGrid';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import PageLoader from './components/PageLoader';
import CursorFollower from './components/CursorFollower';

function App() {
  useEffect(() => {
    // Prevent scroll during loader
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      document.body.style.overflow = '';
    }, 2200);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <PageLoader />
      <CursorFollower />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <MenuGrid />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}

export default App;
