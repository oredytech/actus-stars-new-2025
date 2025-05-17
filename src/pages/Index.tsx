
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import RecentNews from '../components/RecentNews';
import ArticlesSection from '../components/ArticlesSection';
import Footer from '../components/Footer';
import AdBanner from '../components/AdBanner';

const Index: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Actu Stars - Actualités";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-mdh-dark">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <RecentNews />
        <div className="container mx-auto px-4">
          <AdBanner className="my-8" variant="large" />
        </div>
        <ArticlesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
