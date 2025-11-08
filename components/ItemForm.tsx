
import React, { useState } from 'react';
import { Item, ItemStatus, Page, User } from '../types';

interface ItemFormProps {
  user: User;
  addItem: (item: Item) => void;
  setPage: (page: Page) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ user, addItem, setPage }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<ItemStatus>(ItemStatus.Lost);
  const [contactInfo, setContactInfo] = useState(user.email);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [error, setError] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !location || !date || !contactInfo) {
      setError('Please fill out all required fields.');
      return;
    }
    setError('');

    const newItem: Item = {
      id: Date.now().toString(),
      name,
      description,
      location,
      date: new Date(date).toISOString(),
      status,
      contactInfo,
      imageUrl: image || `https://picsum.photos/seed/${Date.now()}/400/300`,
      userId: user.email, // using email as a unique ID for this simulation
    };

    addItem(newItem);
    setPage(Page.Browse);
  };

  const InputField: React.FC<{ label: string; value: string; onChange: (e: any) => void; type?: string; required?: boolean }> = ({ label, value, onChange, type = 'text', required = true }) => (
    <div>
      <label className="block font-tech text-cyan-glow/80 mb-1">{label}</label>
      <input type={type} value={value} onChange={onChange} required={required} className="w-full p-2 font-tech bg-dark-bg/70 border border-cyan-glow/50 rounded text-cyan-glow focus:ring-1 focus:ring-cyan-glow focus:border-cyan-glow outline-none"/>
    </div>
  );

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 animate-fade-in">
        <button onClick={() => setPage(Page.Browse)} className="font-tech text-cyan-glow/80 hover:text-cyan-glow mb-6">&larr; Back to all items</button>
        <h2 className="font-orbitron text-3xl text-cyan-glow mb-6" style={{ textShadow: '0 0 8px #00ffff' }}>Report an Item</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-4">
                <button type="button" onClick={() => setStatus(ItemStatus.Lost)} className={`w-full py-3 font-tech text-lg rounded border-2 ${status === ItemStatus.Lost ? 'bg-red-500/30 border-red-400 text-white' : 'border-cyan-glow/50 text-cyan-glow/80'}`}>I Lost Something</button>
                <button type="button" onClick={() => setStatus(ItemStatus.Found)} className={`w-full py-3 font-tech text-lg rounded border-2 ${status === ItemStatus.Found ? 'bg-green-500/30 border-green-400 text-white' : 'border-cyan-glow/50 text-cyan-glow/80'}`}>I Found Something</button>
            </div>
            
            <div>
                <label className="block font-tech text-cyan-glow/80 mb-1">Item Name</label>
                <textarea value={name} onChange={(e) => setName(e.target.value)} required rows={2} className="w-full p-2 font-tech bg-dark-bg/70 border border-cyan-glow/50 rounded text-cyan-glow focus:ring-1 focus:ring-cyan-glow focus:border-cyan-glow outline-none"></textarea>
            </div>
            <div>
                <label className="block font-tech text-cyan-glow/80 mb-1">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} className="w-full p-2 font-tech bg-dark-bg/70 border border-cyan-glow/50 rounded text-cyan-glow focus:ring-1 focus:ring-cyan-glow focus:border-cyan-glow outline-none"></textarea>
            </div>
             <div>
                <label className="block font-tech text-cyan-glow/80 mb-1">Location (e.g., 'City Park')</label>
                <textarea value={location} onChange={(e) => setLocation(e.target.value)} required rows={2} className="w-full p-2 font-tech bg-dark-bg/70 border border-cyan-glow/50 rounded text-cyan-glow focus:ring-1 focus:ring-cyan-glow focus:border-cyan-glow outline-none"></textarea>
            </div>
            <InputField label="Date" value={date} onChange={(e) => setDate(e.target.value)} type="date" />
            <InputField label="Contact Info (Email/Phone)" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} />
            
            <div>
                <label className="block font-tech text-cyan-glow/80 mb-1">Image (Optional)</label>
                <input type="file" onChange={handleImageChange} accept="image/*" className="w-full text-sm text-cyan-glow/80 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-cyan-glow/20 file:text-cyan-glow hover:file:bg-cyan-glow/30" />
            </div>

            {image && <img src={image} alt="Preview" className="rounded-lg max-h-40 mx-auto" />}
            {error && <p className="text-red-400 font-tech text-center">{error}</p>}

            <button type="submit" className="w-full py-3 font-tech text-xl bg-cyan-glow text-dark-bg border-2 border-cyan-glow rounded-md font-bold transition-all duration-300 hover:shadow-cyan-glow">Submit Report</button>
        </form>
    </div>
  );
};

export default ItemForm;
