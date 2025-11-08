
import React, { useState, useRef } from 'react';
import { SearchIcon, WandIcon, ImageIcon } from './icons';

interface SearchBarProps {
  onSearch: (query: string, isSmart: boolean) => void;
  onImageSearch: (imageBase64: string) => void;
  isLoading: boolean;
}

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onImageSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [isSmartSearch, setIsSmartSearch] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(imagePreview) return;
    onSearch(query, isSmartSearch);
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setImagePreview(base64);
      setQuery('');
      onImageSearch(base64);
    }
  };

  const clearImageSearch = () => {
      setImagePreview(null);
      if(fileInputRef.current) {
          fileInputRef.current.value = "";
      }
      onSearch('', false); // Clear results
  }

  const isImageSearchActive = imagePreview !== null;

  return (
    <div className="w-full max-w-2xl mx-auto mb-12 animate-fade-in">
      <form onSubmit={handleTextSearch}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {isSmartSearch ? <WandIcon className="h-6 w-6 text-cyan-glow/50" /> : <SearchIcon className="h-6 w-6 text-cyan-glow/50" />}
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isSmartSearch ? "Describe the item (e.g., 'found black wallet...')" : "Search by name or keyword..."}
            className={`w-full pl-12 pr-24 py-4 font-tech text-lg bg-dark-bg/70 border-2 border-cyan-glow/50 rounded-lg text-cyan-glow focus:ring-2 focus:ring-cyan-glow focus:border-cyan-glow outline-none transition-all duration-300 ${isImageSearchActive ? 'bg-gray-800/50' : ''}`}
            disabled={isLoading || isImageSearchActive}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
                type="button"
                onClick={handleImageButtonClick}
                className="p-2 rounded-full hover:bg-cyan-glow/20 transition-colors disabled:opacity-50"
                disabled={isLoading || isImageSearchActive}
                aria-label="Search by image"
            >
                <ImageIcon className="h-6 w-6 text-cyan-glow" />
            </button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
          </div>
        </div>
      </form>
       {imagePreview && (
          <div className="mt-4 p-2 bg-dark-bg/80 border border-cyan-glow/30 rounded-lg flex items-center justify-between animate-fade-in">
            <div className="flex items-center space-x-3">
                <img src={imagePreview} alt="Search preview" className="h-12 w-12 rounded object-cover" />
                <span className="font-tech text-cyan-glow/80">Searching for this item...</span>
            </div>
            <button onClick={clearImageSearch} className="font-bold text-lg text-cyan-glow/70 hover:text-cyan-glow">&times;</button>
          </div>
        )}
      <div className="flex justify-center items-center mt-4 space-x-4">
        <span className={`font-tech transition-colors ${!isSmartSearch ? 'text-cyan-glow' : 'text-cyan-glow/50'}`}>Regular Search</span>
        <button
          onClick={() => setIsSmartSearch(!isSmartSearch)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isSmartSearch ? 'bg-cyan-glow' : 'bg-gray-600'} disabled:opacity-50`}
          disabled={isLoading || isImageSearchActive}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isSmartSearch ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
        <span className={`font-tech transition-colors ${isSmartSearch ? 'text-cyan-glow animate-pulse-glow' : 'text-cyan-glow/50'}`}>
          Smart Search (AI)
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
