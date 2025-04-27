export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-10">
      <div className="max-w-7xl border-t border-zinc-300 mx-auto px-4 sm:px-6 lg:px-8 py-8">      
        <div className="space-y-4 md:space-y-0 md:flex justify-between items-center text-sm text-zinc-400">
          <p>© {currentYear} New York Times Website. All rights reserved.</p>
          <p>
            <a href="https://linkedin.com/in/amricpaul" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent">
              Developed with ❤️ by <span className="font-bold">Amric Paul</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

