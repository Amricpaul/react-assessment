import { createContext, Component, ReactNode } from 'react';
import { Article } from '@/types/Article';
import { getMostPopularArticles } from '@/services/features/ArticleApis';

export interface ArticleContextType {
  articles: Article[];
  loading: boolean;
  error: string | null;
  fetchArticles: () => Promise<void>;
}

export const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

interface ArticleProviderProps {
  children: ReactNode;
}

export class ArticleProvider extends Component<ArticleProviderProps> {
  state = {
    articles: [],
    loading: false,
    error: null,
  };

  fetchArticles = async () => {
    if (this.state.articles.length > 0) return; // Don't fetch if we already have articles
    
    this.setState({ loading: true });
    try {
      const response = await getMostPopularArticles(7);
      this.setState({ articles: response.results });
    } catch (err) {
      this.setState({ 
        error: err instanceof Error ? err.message : 'Failed to fetch articles' 
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <ArticleContext.Provider 
        value={{
          ...this.state,
          fetchArticles: this.fetchArticles,
        }}
      >
        {this.props.children}
      </ArticleContext.Provider>
    );
  }
}