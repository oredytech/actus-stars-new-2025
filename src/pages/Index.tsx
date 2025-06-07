
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import RecentNews from '../components/RecentNews';
import ArticlesSection from '../components/ArticlesSection';
import Footer from '../components/Footer';

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
        <ArticlesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
