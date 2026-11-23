import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ShareModal } from '../../components/ShareModal';
import { 
  ArrowLeft, Clock, Calendar, User, Share2, 
  Tag, MessageSquare, ChevronRight, BookOpen 
} from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { publishedBlogs, publishedPackages, getWhatsAppLink } = useApp();
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const post = publishedBlogs.find(b => b.slug === slug);

  // If draft or doesn't exist, return 404 (FR-08)
  if (!post) {
    return <Navigate to="/404" replace />;
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const relatedPackages = publishedPackages.slice(0, 2);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005f49] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Gazette & Guides</span>
        </Link>

        <button
          onClick={() => setShareModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
        >
          <Share2 className="w-3.5 h-3.5 text-[#005f49]" />
          <span>Share Article</span>
        </button>
      </div>

      {/* Post Metadata & Title */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {post.tags.map(t => (
            <span key={t} className="bg-emerald-50 text-[#005f49] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              {t}
            </span>
          ))}
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <img
              src={post.author_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
              alt={post.author}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <span className="font-bold text-slate-900 block">{post.author}</span>
              <span className="text-[10px] text-slate-400">{post.author_role || 'Contributor'}</span>
            </div>
          </div>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {post.published_at}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.read_time}
          </span>
        </div>
      </div>

      {/* Cover Image */}
      <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-slate-100 shadow-xl">
        <img
          src={post.cover_image_url}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs prose max-w-none text-slate-700 leading-relaxed space-y-4">
        <p className="text-lg font-medium text-slate-800 italic leading-relaxed border-l-4 border-[#005f49] pl-4 py-1">
          {post.excerpt}
        </p>

        <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed space-y-4 pt-4 text-slate-700">
          {post.content}
        </div>
      </div>

      {/* Author Card */}
      <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={post.author_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
            alt={post.author}
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
          />
          <div>
            <h4 className="text-sm font-bold text-slate-900">{post.author}</h4>
            <p className="text-xs text-slate-500">{post.author_role || 'Field Writer, Traverse BD'}</p>
          </div>
        </div>

        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-[#005f49] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#0a4b3b] transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-white" />
          <span>Inquire Tour</span>
        </a>
      </div>

      {/* Share Modal */}
      <ShareModal
        title={post.title}
        url={currentUrl}
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
    </article>
  );
};
