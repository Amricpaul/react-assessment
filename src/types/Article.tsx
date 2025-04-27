export interface Article {
    id: number;
    title: string;
    abstract: string;
    byline: string;
    published_date: string;
    url: string;
    section?: string;
    media?: Array<{
        'media-metadata': Array<{
        format: string;
        url: string;
        }>;
    }>;
}