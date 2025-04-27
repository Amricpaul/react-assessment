import { render, screen } from '@testing-library/react';
import { ArticleCard } from '../ArticleCard';
import { MemoryRouter } from 'react-router';
import { Article as ArticleType } from '@/types/Article';
const mockArticle: ArticleType = {
  id: 123,
  title: 'Test Article',
  abstract: 'This is a test abstract.',
  byline: 'By John Doe',
  published_date: '2024-04-25',
  url: 'https://example.com/test-article',
  media: [
    {
      'media-metadata': [
        { format: 'mediumThreeByTwo440', url: 'https://example.com/test-image.jpg' },
      ],
    },
  ],
};

describe('ArticleCard', () => {
  it('renders article title, abstract, and byline', () => {
    render(
      <MemoryRouter>
        <ArticleCard {...mockArticle} />
      </MemoryRouter>
    );
  });

  it('renders published date', () => {
    render(
      <MemoryRouter>
        <ArticleCard {...mockArticle} />
      </MemoryRouter>
    );

    expect(screen.getByText(/ago$/)).toBeInTheDocument(); 
    // because `moment().fromNow()` returns like 'a day ago', etc
  });

  it('renders image correctly', () => {
    render(
      <MemoryRouter>
        <ArticleCard {...mockArticle} />
      </MemoryRouter>
    );

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Article');
  });

  it('link navigates to correct URL', () => {
    render(
      <MemoryRouter>
        <ArticleCard {...mockArticle} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/article/123');
  });

  it('uses placeholder if no media is available', () => {
    const noMediaArticle = { ...mockArticle, media: [] };

    render(
      <MemoryRouter>
        <ArticleCard {...noMediaArticle} />
      </MemoryRouter>
    );

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/placeholder.svg');
  });
});
