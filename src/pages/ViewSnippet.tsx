import { useParams, useNavigate, Link } from "react-router";
import { mockSnippets, MOCK_USER_ID } from "../data/mockData";
import { FaCopy, FaEdit, FaTrash, FaArrowLeft, FaCheck, FaGlobeAmericas, FaLock } from "react-icons/fa";
import { useState } from "react";

export default function ViewSnippet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const snippet = mockSnippets.find(s => s.id === id);

  if (!snippet) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-[var(--color-text-muted)] space-y-4">
        <div className="text-6xl text-[var(--color-border)] mb-4">404</div>
        <p className="text-xl">Snippet not found</p>
        <button 
          onClick={() => navigate("/dashboard")}
          className="text-[var(--color-primary)] hover:underline mt-4 flex items-center gap-2"
        >
          <FaArrowLeft /> Back to Dashboard
        </button>
      </div>
    );
  }

  const isOwner = snippet.ownerId === MOCK_USER_ID;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this snippet?")) {
      // mock delete
      navigate("/dashboard");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in slide-in-from-bottom-2 duration-500 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="space-y-4 flex-1">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-white transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-white break-words tracking-tight">{snippet.title}</h1>
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className={`px-2.5 py-1 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-gray-300 font-mono tracking-wide shadow-sm`}>
                {snippet.language}
              </span>
              <span className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                {snippet.isPublic ? (
                  <><FaGlobeAmericas /> Public</>
                ) : (
                  <><FaLock /> Private</>
                )}
              </span>
              <span className="text-[var(--color-text-muted)] flex items-center gap-1.5 before:content-['•'] before:mr-2">
                Created {new Date(snippet.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {snippet.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 hover:bg-[var(--color-primary)]/20 transition-colors cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 self-start">
          <button 
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all shadow-md ${
              copied 
                ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                : "bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-gray-200"
            }`}
          >
            {copied ? <FaCheck /> : <FaCopy />}
            {copied ? "Copied!" : "Copy"}
          </button>
          
          {isOwner && (
            <>
              <Link 
                to={`/dashboard/edit/${snippet.id}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all shadow-md bg-[var(--color-surface)] hover:bg-[var(--color-primary)]/20 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30 border border-[var(--color-border)] text-gray-200"
              >
                <FaEdit />
                Edit
              </Link>
              <button 
                onClick={handleDelete}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all shadow-md bg-[var(--color-surface)] hover:bg-red-500/20 hover:text-red-400 border border-[var(--color-border)] hover:border-red-500/30 text-gray-200"
              >
                <FaTrash />
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Code Area */}
      <div className="mt-8 rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-2xl bg-[#0f111a] group/editor relative">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[var(--color-primary)] via-purple-500 to-pink-500 opacity-80"></div>
        <div className="bg-[#161823] px-6 py-3 border-b border-[var(--color-border)] flex justify-between items-center text-xs text-[var(--color-text-muted)] font-mono">
           <div className="flex gap-2">
             <div className="w-3 h-3 rounded-full bg-red-500/50 border border-red-500/50"></div>
             <div className="w-3 h-3 rounded-full bg-yellow-500/50 border border-yellow-500/50"></div>
             <div className="w-3 h-3 rounded-full bg-green-500/50 border border-green-500/50"></div>
           </div>
           <span>{snippet.language.toLowerCase()}</span>
        </div>
        
        <div className="relative">
          {/* A simple mock line numbers implementation */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#161823] border-r border-[#2a2e42]/50 hidden sm:block pointer-events-none opacity-40"></div>
          
          <pre className="p-6 sm:pl-16 text-sm md:text-base font-mono text-gray-300 overflow-x-auto whitespace-pre leading-relaxed selection:bg-[var(--color-primary)]/40 relative z-10 w-full mb-0">
            <code>
              {snippet.code}
            </code>
          </pre>
        </div>
      </div>

    </div>
  );
}
