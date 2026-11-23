import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Compass, Search, ArrowRight, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { publishedDestinations } = useApp();
  const [query, setQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/packages?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#005f49] flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8 animate-[spin_10s_linear_infinite]" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-black text-[#005f49]">404</span>
          <h1 className="text-2xl font-bold text-slate-900">Destination Not Found</h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            The page or expedition you are looking for has been moved, unpublished, or does not exist.
          </p>
        </div>

        {/* Quick Search as required by FR-09 / S-09 */}
        <form onSubmit={handleSearch} className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tours (e.g. Sajek, Sundarbans)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:border-[#005f49]"
          />
        </form>

        <div className="pt-2 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Popular Places
          </span>
          <div className="flex flex-wrap justify-center gap-1.5">
            {publishedDestinations.slice(0, 3).map(d => (
              <Link
                key={d.id}
                to={`/destinations/${d.slug}`}
                className="px-3 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-[#005f49] text-xs font-semibold rounded-lg transition-colors"
              >
                {d.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-[#005f49] hover:bg-[#0a4b3b] text-white px-6 py-3 rounded-full text-xs font-bold transition-all shadow-md"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
