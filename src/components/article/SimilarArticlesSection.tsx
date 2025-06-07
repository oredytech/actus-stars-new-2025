
import React, { useEffect, useState } from 'react';
import { WordPressArticle, fetchSimilarArticles, getCategoryIds } from '../../services/wordpressService';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import SimilarArticles from './SimilarArticles';

interface SimilarArticlesSectionProps {
  article: WordPressArticle;
}

const SimilarArticlesSection: React.FC<SimilarArticlesSectionProps> = ({ article }) => {
  const [similarArticles, setSimilarArticles] = useState<WordPressArticle[]>([]);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(true);

  useEffect(() => {
    const loadSimilarArticles = async () => {
      setIsLoadingSimilar(true);
      const categoryIds = getCategoryIds(article);
      const fetchedArticles = await fetchSimilarArticles(categoryIds, article.id);
      setSimilarArticles(fetchedArticles);
      setIsLoadingSimilar(false);
    };

    loadSimilarArticles();
  }, [article.id]);

  return (
    <Card className="bg-mdh-darkCard border-gray-700 mt-8">
      <CardHeader>
        <CardTitle className="text-xl text-white">Articles similaires</CardTitle>
      </CardHeader>
      <CardContent>
        <SimilarArticles articles={similarArticles} isLoading={isLoadingSimilar} />
      </CardContent>
    </Card>
  );
};

export default SimilarArticlesSection;
