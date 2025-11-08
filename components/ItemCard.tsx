import React, { useState } from 'react';
import { Item, ItemStatus, User } from '../types';
import { TrashIcon } from './icons';

interface ItemCardProps {
  item: Item;
  user: User | null;
  onLoginRequest: () => void;
  onDeleteItem: (itemId: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, user, onLoginRequest, onDeleteItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedDate = new Date(item.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleViewDetails = () => {
    if (user) {
        setIsExpanded(!isExpanded);
    } else {
        onLoginRequest();
    }
  }

  const handleDelete = () => {
      onDeleteItem(item.id);
  }

  const isOwner = user && user.email === item.userId;

  const statusColor = item.status === ItemStatus.Lost ? 'text-red-400' : 'text-green-400';
  const statusBgColor = item.status === ItemStatus.Lost ? 'bg-red-500/10' : 'bg-green-500/10';
  const statusBorderColor = item.status === ItemStatus.Lost ? 'border-red-500/50' : 'border-green-500/50';

  return (
    <div className="bg-dark-bg/50 border border-cyan-glow/20 rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-cyan-glow/50 hover:shadow-cyan-glow-sm flex flex-col">
      <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <h3 className="font-orbitron text-lg font-bold text-cyan-glow pr-2">{item.name}</h3>
            <span className={`flex-shrink-0 px-2 py-1 text-xs font-bold rounded ${statusColor} ${statusBgColor} ${statusBorderColor} font-tech uppercase`}>
                {item.status}
            </span>
        </div>

        <p className="font-tech text-cyan-glow/70 text-sm mb-1">
          <span className="font-bold">Location:</span> {item.location}
        </p>
        <p className="font-tech text-cyan-glow/70 text-sm mb-4">
          <span className="font-bold">Date:</span> {formattedDate}
        </p>

        {isExpanded && (
            <div className="animate-fade-in mt-4 pt-4 border-t border-cyan-glow/20">
                <p className="font-tech text-cyan-glow/90 mb-2 text-sm">{item.description}</p>
                <p className="font-tech text-cyan-glow bg-cyan-glow/10 p-2 rounded text-sm break-all">
                    <span className="font-bold">Contact:</span> {item.contactInfo}
                </p>
            </div>
        )}
        
        <div className="mt-auto pt-4 flex items-center space-x-2">
            <button
              onClick={handleViewDetails}
              className="w-full px-4 py-2 font-tech text-sm bg-cyan-glow/10 border border-cyan-glow text-cyan-glow rounded-md transition-all duration-300 hover:bg-cyan-glow/20 hover:shadow-cyan-glow-sm"
            >
              {user ? (isExpanded ? 'Hide Details' : 'View Details') : 'Login to View Details'}
            </button>
            {isOwner && (
                 <button
                    onClick={handleDelete}
                    className="flex-shrink-0 p-2 font-tech text-sm bg-red-500/20 border border-red-400 text-red-400 rounded-md transition-all duration-300 hover:bg-red-500/40 hover:shadow-md"
                    aria-label="Delete item"
                >
                    <TrashIcon className="h-5 w-5" />
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;