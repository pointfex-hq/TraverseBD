import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Search, BookOpen, Clock, ArrowRight, User } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { publishedBlogs } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  const allTags = ['all', 'Sajek Valley', 'Sundarbans', 'Tanguar Haor', 'Sreemangal', 'Coxs Bazar'];

  const filteredPosts = publishedBlogs.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'all' || post.tags.some(t => t.toLowerCase().includes(selectedTag.toLowerCase()));
    return matchesSearch && matchesTag;
  });

  const featuredPost = publishedBlogs[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold text-[#005f49] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
          Gazette & Travel Guides
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Field Notes, Guides & Stories
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Insider guides written by our expedition leads: route logistics, local customs, and seasonal recommendations.
        </p>
      </div>

      {/* Featured Post Hero */}
      {featuredPost && (
        <div className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/60 shadow-lg hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-2">
          <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
            <img
              src={featuredPost.cover_image_url}
              alt={featuredPost.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
          </div>

          <div className="p-8 sm:p-12 flex flex-col justify-between space-y-6 bg-white">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                <span className="bg-emerald-50 text-[#005f49] px-3 py-1 rounded-full font-bold">
                  Featured Guide
                </span>
                <span>{featuredPost.published_at}</span>
                <span>•</span>
                <span>{featuredPost.read_time}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-[#005f49] transition-colors leading-snug">
                <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2.5">
                <img
                  src={featuredPost.author_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                  alt={featuredPost.author}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{featuredPost.author}</h4>
                  <p className="text-[10px] text-slate-500">{featuredPost.author_role}</p>
                </div>
              </div>

              <Link
                to={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-1.5 bg-[#005f49] hover:bg-[#0a4b3b] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all hover:gap-2"
              >
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search & Tags */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search guides and tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:border-[#005f49]"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {allTags.map(t => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                selectedTag === t
                  ? 'bg-[#005f49] text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map(post => (
          <article
            key={post.id}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {post.tags[0] || 'Guide'}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                  <span>{post.published_at}</span>
                  <span>•</span>
                  <span>{post.read_time}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#005f49] transition-colors line-clamp-2">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
              <span className="text-xs font-semibold text-slate-500">{post.author}</span>
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#005f49] group-hover:gap-2 transition-all"
              >
                <span>Read Full</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
