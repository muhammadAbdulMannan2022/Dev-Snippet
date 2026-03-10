import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { mockSnippets } from "../data/mockData";
import type { Snippet } from "../data/mockData";
import { FaSave, FaArrowLeft, FaCode, FaTags } from "react-icons/fa";

export default function EditSnippet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState<Partial<Snippet>>({
    title: "",
    language: "JavaScript",
    code: "",
    isPublic: true,
    tags: [],
  });
  
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (isEditing) {
      const snippet = mockSnippets.find(s => s.id === id);
      if (snippet) {
        setFormData(snippet);
      }
    }
  }, [id, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // mock save:
    navigate("/dashboard");
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags?.includes(tagInput.trim().toLowerCase())) {
        setFormData(prev => ({ ...prev, tags: [...(prev.tags || []), tagInput.trim().toLowerCase()] }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags?.filter(t => t !== tagToRemove) }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-surface-hover)] hover:text-white transition-all text-gray-400 group shadow-sm hover:shadow"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">{isEditing ? "Edit Snippet" : "Create New Snippet"}</h1>
            <p className="text-[var(--color-text-muted)] text-sm mt-1">{isEditing ? "Update your code syntax and details." : "Save a reusable piece of code."}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl overflow-hidden pt-2 flex flex-col min-h-[70vh]">
        <div className="h-1.5 w-full bg-gradient-to-r from-[var(--color-primary)] via-purple-500 to-pink-500 -mt-2"></div>
        <div className="p-8 space-y-6 flex-1 flex flex-col">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider flex items-center gap-2">
                 Title
              </label>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-[#161823] border border-[var(--color-border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-semibold font-sans placeholder:font-normal placeholder:text-[var(--color-text-muted)] text-white"
                placeholder="e.g. React Debounce Hook"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider flex items-center gap-2">
                 Language
              </label>
              <select 
                value={formData.language}
                onChange={e => setFormData({...formData, language: e.target.value})}
                className="w-full bg-[#161823] border border-[var(--color-border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:12px_12px] font-mono text-[var(--color-text)]"
              >
                <option>JavaScript</option>
                <option>TypeScript</option>
                <option>React</option>
                <option>CSS</option>
                <option>HTML</option>
                <option>Python</option>
                <option>Rust</option>
                <option>Go</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider flex items-center gap-2">
              <FaTags className="text-[10px]" /> Tags
            </label>
            <div className="flex flex-col gap-3">
              <input 
                type="text" 
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="w-full bg-[#161823] border border-[var(--color-border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-mono placeholder:text-[var(--color-text-muted)] text-white"
                placeholder="Type a tag and press Enter"
              />
              {formData.tags && formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 px-3 py-1.5 text-xs rounded-full flex items-center gap-2 font-medium"
                    >
                      #{tag}
                      <button 
                        type="button" 
                        onClick={() => removeTag(tag)}
                        className="hover:text-white transition-colors hover:bg-red-500/80 rounded-full w-4 h-4 flex items-center justify-center -mr-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2 flex-1 flex flex-col">
            <label className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-2"><FaCode className="text-sm" /> Code Content</span>
              {formData.language && <span className="text-[var(--color-primary)] border px-2 border-[var(--color-border)] rounded-md font-mono lowercase">{formData.language}</span>}
            </label>
            <div className="border border-[var(--color-border)] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[var(--color-primary)] transition-all flex-1 flex bg-[#0f111a] shadow-inner relative group isolate">
               {/* Line numbers mock bg */}
               <div className="w-10 bg-[#161823] border-r border-[#2a2e42] h-full absolute left-0 top-0 zs-0 hidden sm:block pointer-events-none opacity-50"></div>
              <textarea 
                required
                value={formData.code}
                onChange={e => setFormData({...formData, code: e.target.value})}
                className="w-full bg-transparent p-6 text-sm focus:outline-none font-mono text-gray-300 resize-none h-64 sm:h-auto z-10 sm:pl-14 selection:bg-[var(--color-primary)]/40 leading-relaxed focus:bg-[#161823]/30"
                placeholder="Paste your brilliant code here..."
                spellCheck="false"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border)]">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={formData.isPublic}
                  onChange={e => setFormData({...formData, isPublic: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[var(--color-surface-hover)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)] ring-2 ring-transparent group-hover:ring-[var(--color-primary)]/30 transition-all"></div>
              </div>
              <span className="text-sm font-medium text-[var(--color-text-muted)] group-hover:text-white transition-colors">{formData.isPublic ? 'Public Snippet' : 'Private Snippet'}</span>
            </label>

            <button 
              type="submit" 
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium px-8 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/40 hover:-translate-y-0.5"
            >
              <FaSave className="text-lg" />
              {isEditing ? 'Save Changes' : 'Create Snippet'}
            </button>
          </div>
          
        </div>
      </form>
    </div>
  );
}
