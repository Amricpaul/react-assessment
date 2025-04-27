import { render, screen } from '@testing-library/react';
import { ArticleList } from '../ArticleList';
import { ArticleContext, ArticleContextType } from '@/context/ArticleContext';
import { MemoryRouter } from 'react-router';
import { Article } from '@/types/Article';
// Mock data
const mockArticles: Article[] = [
  {
    id: 1,
    url: 'https://example.com/1',
    title: 'Test Article 1',
    abstract: 'Test abstract 1',
    published_date: '2024-03-20',
    byline: 'Test Author 1',
    section: 'Technology',
    media: [
      {
        'media-metadata': [
          {
            format: 'Standard Thumbnail',
            url: 'https://example.com/image1.jpg'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    url: 'https://example.com/2',
    title: 'Test Article 2',
    abstract: 'Test abstract 2',
    published_date: '2024-03-21',
    byline: 'Test Author 2',
    section: 'Science',
    media: [
      {
        'media-metadata': [
          {
            format: 'Standard Thumbnail',
            url: 'https://example.com/image2.jpg'
          }
        ]
      }
    ]
  }
];

describe('ArticleList', () => {
  const mockFetchArticles = jest.fn();

  const renderWithContext = (contextValue: ArticleContextType) => {
    return render(
      <MemoryRouter>
        <ArticleContext.Provider value={contextValue}>
          <ArticleList />
        </ArticleContext.Provider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading skeleton when context is not available', () => {
    renderWithContext(undefined);
    // Check for skeleton elements (9 of them as defined in ArticleListSkeleton)
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons).toHaveLength(9);
  });

  it('should show loading skeleton when loading is true', () => {
    renderWithContext({
      articles: [],
      loading: true,
      error: null,
      fetchArticles: mockFetchArticles
    });
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons).toHaveLength(9);
  });

  it('should throw error when error is present', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      renderWithContext({
        articles: [],
        loading: false,
        error: 'Test error',
        fetchArticles: mockFetchArticles
      });
    }).toThrow('Test error');
    consoleError.mockRestore();
  });

  it('should render articles when data is available', () => {
    renderWithContext({
      articles: mockArticles,
      loading: false,
      error: null,
      fetchArticles: mockFetchArticles
    });

    // Check if articles are rendered
    expect(screen.getByText('Test Article 1')).toBeInTheDocument();
    expect(screen.getByText('Test Article 2')).toBeInTheDocument();
    expect(screen.getByText('Test abstract 1')).toBeInTheDocument();
    expect(screen.getByText('Test abstract 2')).toBeInTheDocument();
  });

  it('should call fetchArticles on mount', () => {
    renderWithContext({
      articles: [],
      loading: false,
      error: null,
      fetchArticles: mockFetchArticles
    });

    expect(mockFetchArticles).toHaveBeenCalledTimes(1);
  });

});
