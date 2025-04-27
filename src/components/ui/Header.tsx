import {Logo} from './Logo';
import moment from 'moment';
import {Link} from 'react-router';

export const Header = () => {
  return (
    <header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-zinc-300">
        <div className="flex justify-center md:justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <div>
            <p className='hidden md:block text-primary'>{moment().format('dddd, MMMM D, YYYY')}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
