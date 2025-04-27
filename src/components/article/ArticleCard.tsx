import { Component } from 'react';
import { Link } from 'react-router';
import { Article as ArticleType } from '@/types/Article';
import moment from 'moment';
import {
  Clock,
} from 'lucide-react';

interface ArticleCardProps extends ArticleType {}

export class ArticleCard extends Component<ArticleCardProps> {
  private getImageUrl(): string | undefined {
    return this.props.media?.[0]?.['media-metadata']?.find(
      (item: any) => item.format === 'mediumThreeByTwo440'
    )?.url || '/placeholder.svg';
  }

  private renderImage(){
    const imageUrl = this.getImageUrl();
    if (!imageUrl) return null;

    return (
      <div className="relative h-48 w-full group">
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10"></div>
        <img
          src={imageUrl}
          alt={this.props.title}
          className="object-cover rounded-sm w-full h-full trans-grayscale group-hover:filter-none"
        />
      </div>
    );
  }

  private renderMetaInfo() {
    return (
      <div className="flex justify-between items-start gap-8">
        <div className="text-zinc-500 text-xs mb-2">
          <span>{this.props.byline || ''}</span>
        </div>
        <div className="text-zinc-500 text-xs text-nowrap flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-zinc-500" />
          <span>{moment(this.props.published_date).fromNow() || ''}</span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <article className="rounded-sm overflow-hidden transition-shadow duration-500 group hover:scale-[1.02]">
        <Link to={`/article/${this.props.id}`} className="block">
          {this.renderImage()}
          <div className="p-2">
            {this.renderMetaInfo()}
            <h2 className="text-xl font-nyt font-semibold text-primary mb-2 line-clamp-2">
              {this.props.title}
            </h2>
            <p className=" text-sm mb-4 line-clamp-3">
              {this.props.abstract || ''}
            </p>
          </div>
        </Link>
      </article>
    );
  }
}

export class ArticleCardSkeleton extends Component {
  render() {
    return (
      <article className="rounded-sm overflow-hidden transition-shadow duration-500">
        <div className="animate-pulse">
          <div className="relative h-48 w-full">
            <div className="h-48 w-full bg-zinc-200 rounded-sm"></div>
          </div>
          <div className="p-2">
            <div className="flex justify-between items-start gap-8">
              <div className="h-3 w-32 bg-zinc-200 rounded"></div>
              <div className="h-3 w-24 bg-zinc-200 rounded"></div>
            </div>
            <div className="mt-2 h-6 w-full bg-zinc-200 rounded"></div>
            <div className="mt-2 space-y-1">
              <div className="h-3 w-full bg-zinc-200 rounded"></div>
              <div className="h-3 w-5/6 bg-zinc-200 rounded"></div>
              <div className="h-3 w-4/6 bg-zinc-200 rounded"></div>
            </div>
          </div>
        </div>
      </article>
    );
  }
}