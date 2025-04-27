import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="text-center flex items-center justify-center gap-8">
        <div className="flex justify-center mb-6 border-r-2 border-primary font-nyt font-bold text-7xl p-8">
          404
        </div>
        <div className='text-left'>
          <h3 className="text-2xl font-nyt font-bold">
             Page Not Found
            </h3>
          <p className="text-lg text-zinc-600 mb-6">
            Sorry, the page you are looking for does not exist.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors mb-4">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}; 

export default NotFound;