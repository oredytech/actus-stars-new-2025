
import React, { useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import RecentNews from '../components/RecentNews';
import ArticlesSection from '../components/ArticlesSection';
import Footer from '../components/Footer';
import CategoryArticles from '../components/CategoryArticles';
import { CategoryContext } from '../App';

const Index: React.FC = () => {
  const { selectedCategoryId } = useContext(CategoryContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "MDHTV - Actualités";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-mdh-dark">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <RecentNews />
        {selectedCategoryId !== null ? (
          <div className="container mx-auto px-4 py-6">
            <CategoryArticles categoryId={selectedCategoryId} />
          </div>
        ) : (
          <ArticlesSection />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
