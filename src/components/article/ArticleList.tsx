import { Component } from 'react';
import { ArticleCard, ArticleCardSkeleton } from './ArticleCard';
import { ArticleContext } from '@/context/ArticleContext';
import { Article as ArticleType } from '@/types/Article';
import type { ArticleContextType } from '@/context/ArticleContext';

export class ArticleList extends Component {
  static contextType = ArticleContext;
  declare context: ArticleContextType;

  componentDidMount() {
    if (this.context) {
      this.context.fetchArticles();
    }
  }

  render() {
    if (!this.context) {
      return <ArticleListSkeleton />;
    }

    const { articles, loading, error } = this.context;

    if (loading) {
      return <ArticleListSkeleton />;
    }

    if (error) {
      throw new Error(error);
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article: ArticleType, index: number) => (
          <ArticleCard key={`${article.url}-${index}`} {...article} />
        ))}
      </div>
    );
  }
}

export const ArticleListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, index) => (
        <ArticleCardSkeleton key={index} />
      ))}
    </div>
  );
};
