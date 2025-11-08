import React, { useState, useEffect, useCallback } from 'react';
import { User, Item, Page } from './types';
import { INITIAL_ITEMS } from './constants';
import { smartSearch, smartImageSearch } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import ItemCard from './components/ItemCard';
import SearchBar from './components/SearchBar';
import ItemForm from './components/ItemForm';
import { CircuitryIcon } from './components/icons';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>(Page.Landing);
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<Item[] | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('lostfound_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      const storedItems = localStorage.getItem('lostfound_items');
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      } else {
        setItems(INITIAL_ITEMS);
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
      setItems(INITIAL_ITEMS);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if(!isLoading) {
        try {
            localStorage.setItem('lostfound_items', JSON.stringify(items));
        } catch (error) {
            console.error("Failed to save items to localStorage", error);
        }
    }
  }, [items, isLoading]);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('lostfound_user', JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('lostfound_user');
  };

  const addItem = (item: Item) => {
    const newItems = [item, ...items];
    setItems(newItems);
  };

  const deleteItem = useCallback((itemId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== itemId));
    setSearchResults(currentResults => 
      currentResults ? currentResults.filter(item => item.id !== itemId) : null
    );
  }, []);
  
  const handlePageChange = (newPage: Page) => {
      if (newPage === Page.PostItem && !user) {
          setIsLoginModalOpen(true);
      } else {
          setPage(newPage);
          setSearchResults(null);
          window.scrollTo(0, 0);
      }
  }

  const handleSearch = useCallback(async (query: string, isSmart: boolean) => {
    setIsLoading(true);
    setSearchResults(null); 

    if (!query) {
      setIsLoading(false);
      return;
    }
    
    let results: Item[] = [];
    if (isSmart) {
        const matchingIds = await smartSearch(query, items);
        results = items.filter(item => matchingIds.includes(item.id));
    } else {
        const lowerCaseQuery = query.toLowerCase();
        results = items.filter(item => 
            item.name.toLowerCase().includes(lowerCaseQuery) ||
            item.description.toLowerCase().includes(lowerCaseQuery) ||
            item.location.toLowerCase().includes(lowerCaseQuery)
        );
    }
    setSearchResults(results);
    setIsLoading(false);
  }, [items]);

  const handleImageSearch = useCallback(async (imageBase64: string) => {
      setIsLoading(true);
      setSearchResults(null);
      
      const matchingIds = await smartImageSearch(imageBase64, items);
      const results = items.filter(item => matchingIds.includes(item.id));

      setSearchResults(results);
      setIsLoading(false);
  }, [items]);
  
  const displayedItems = searchResults !== null ? searchResults : items;

  const renderContent = () => {
    switch (page) {
      case Page.Landing:
        return (
          <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 animate-fade-in">
            <h1 className="font-orbitron text-6xl md:text-8xl font-black text-cyan-glow uppercase tracking-widest animate-pulse-glow">
              PROMPT<span className="text-white">CRAFT</span>
            </h1>
            <h2 className="font-tech text-3xl md:text-4xl text-white my-6">FINAL ROUND</h2>
            <div className="relative my-6 w-72">
                <div className="absolute top-1/2 left-0 w-1/3 h-px bg-gradient-to-r from-transparent to-cyan-glow"></div>
                <div className="absolute top-1/2 right-0 w-1/3 h-px bg-gradient-to-l from-transparent to-cyan-glow"></div>
            </div>
            <button
              onClick={() => setPage(Page.Browse)}
              className="mt-8 px-8 py-3 font-tech text-xl bg-cyan-glow text-dark-bg border-2 border-cyan-glow rounded-md font-bold transition-all duration-300 hover:shadow-cyan-glow transform hover:scale-105"
            >
              Start Now
            </button>
          </div>
        );
      case Page.PostItem:
        return user ? <ItemForm user={user} addItem={addItem} setPage={handlePageChange} /> : null;
      case Page.Browse:
      default:
        return (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <SearchBar onSearch={handleSearch} onImageSearch={handleImageSearch} isLoading={isLoading} />
            {isLoading && !displayedItems.length ? (
                <div className="text-center py-16">
                    <CircuitryIcon className="h-16 w-16 mx-auto mb-4 text-cyan-glow animate-spin" />
                    <p className="font-tech text-cyan-glow text-lg">Analyzing Data Streams...</p>
                </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedItems.map(item => (
                  <ItemCard 
                    key={item.id} 
                    item={item} 
                    user={user} 
                    onLoginRequest={() => setIsLoginModalOpen(true)}
                    onDeleteItem={deleteItem}
                  />
                ))}
              </div>
            )}
            {searchResults !== null && searchResults.length === 0 && !isLoading && (
                <div className="text-center py-16 col-span-1 md:col-span-2 lg:col-span-3">
                    <h3 className="font-orbitron text-2xl text-cyan-glow">No Matches Found</h3>
                    <p className="font-tech text-cyan-glow/70 mt-2">Try adjusting your search or use Smart Search for better results.</p>
                </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-twinkle">
      <div className="relative z-10 bg-dark-bg/50 backdrop-blur-xs">
        {page !== Page.Landing && <Header user={user} onLogin={() => setIsLoginModalOpen(true)} onLogout={handleLogout} setPage={handlePageChange} />}
        <main className={`${page !== Page.Landing ? 'pt-20' : ''}`}>
          {renderContent()}
        </main>
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin} />
        {page !== Page.Landing && <Footer />}
      </div>
    </div>
  );
};

export default App;