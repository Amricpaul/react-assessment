import { ArticleList } from "@/components/article/ArticleList";
import { Component } from "react";

class Index extends Component {
    render() {
        return (
            <>
                <div className="mb-8">
                    <h1 className="text-2xl md:text-4xl font-nyt text-primary font-bold mb-2">Popular Articles</h1>
                    <p className="text-xs md:text-sm font-sans">Discover the most read stories from The New York Times</p>
                </div>
                <ArticleList />
            </>
        );
    }
}

export default Index;