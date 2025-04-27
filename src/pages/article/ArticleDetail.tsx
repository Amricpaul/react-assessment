import { Component } from 'react';
import { useParams } from 'react-router';
import { Article as ArticleType } from '@/types/Article';
import { ArticleContext } from '@/context/ArticleContext';
import { Clock, MoveLeft, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router';
import moment from 'moment';

interface ArticleDetailsProps {
    id?: string;
}

interface ArticleDetailsState {
    article: ArticleType | null;
}

class ArticleDetailsClass extends Component<ArticleDetailsProps, ArticleDetailsState> {
    static contextType = ArticleContext;
    declare context: React.ContextType<typeof ArticleContext>;

    constructor(props: ArticleDetailsProps) {
        super(props);
        this.state = {
            article: null
        };
    }

    componentDidMount() {
        if (this.context) {
            if (this.context.articles.length === 0) {
                this.context.fetchArticles();
            } else if (this.props.id) {
                const article = this.context.articles.find((a: ArticleType) => a.id.toString() === this.props.id);
                if (article) {
                    this.setState({ article });
                }
            }
        }
    }

    componentDidUpdate() {
        if (this.context?.articles && this.context.articles.length > 0 && !this.state.article && this.props.id) {
            const article = this.context.articles.find((a: ArticleType) => a.id.toString() === this.props.id);
            if (article) {
                this.setState({ article });
            }
        }
    }

    static Skeleton = () => {
        return (
            <div className="article-details animate-pulse">
                <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
                <div className="article-meta space-y-2 mb-4">
                    <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                    <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                    <div className="h-4 w-1/5 bg-gray-200 rounded"></div>
                </div>
                <div className="article-image mb-4">
                    <div className="h-64 w-full bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                    <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    };

    private getImageUrl(media: any): string | undefined {
        return media?.[0]?.['media-metadata']?.find(
          (item: any) => item.format === 'mediumThreeByTwo440'
        )?.url || '/placeholder.svg';
      }

    render() {
        if (!this.context) {
            return <ArticleDetailsClass.Skeleton />;
        }

        const { article } = this.state;
        const { loading } = this.context;

        if (loading || !article) {
            return <ArticleDetailsClass.Skeleton />;
        }
        return (
            <div className="max-w-2xl mx-auto px-4 py-8 space-y-4">
                <div className='flex justify-between items-center gap-2'>
                    <Link to="/" className='flex items-center gap-2'>
                        <MoveLeft className='w-10 h-10' />
                    </Link>

                    <Link to={article.url} className='flex items-center text-sm gap-2 bg-primary text-white px-4 py-2 rounded-md'>
                        <span>View Full Article</span>
                        <LinkIcon className='w-4 h-4' />
                    </Link>
                </div>
                <h1 className="font-nyt text-4xl font-bold text-primary">{article.title}</h1>
                <div className="flex flex-wrap justify-between items-center text-sm text-zinc-600">
                    <span className="font-medium">{article.byline}</span>
                    <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {moment(article.published_date).format('MMMM D, YYYY')}
                    </span>
                </div>
                 {/* image */}
                 <img src={this.getImageUrl(article.media)} alt={article.title} className='w-full h-auto' />
                <p className="text-lg leading-relaxed text-zinc-800">
                    {article.abstract}
                </p>
            </div>
        );
    }
}

// Wrapper component to get URL parameters
const ArticleDetails = () => {
    const { id } = useParams();
    return <ArticleDetailsClass id={id} />;
};

export default ArticleDetails; 