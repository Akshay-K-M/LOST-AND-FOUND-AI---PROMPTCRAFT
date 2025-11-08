
import React, { useState } from 'react';
import { User } from '../types';
import { login, signUp } from '../services/authService';
import { CircuitryIcon } from './icons';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

// Defined InputField outside the LoginModal to prevent re-rendering on state change
const InputField: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  autoComplete?: string;
}> = ({ label, value, onChange, type = 'text', autoComplete }) => (
  <div>
    <label className="block font-tech text-cyan-glow/80 mb-1 text-left">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      required
      autoComplete={autoComplete}
      className="w-full p-2 font-tech bg-dark-bg/70 border border-cyan-glow/50 rounded text-cyan-glow focus:ring-1 focus:ring-cyan-glow focus:border-cyan-glow outline-none"
    />
  </div>
);

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    let result;
    if (isLoginView) {
      if (!email || !password) {
        setError('Please enter email and password.');
        setIsLoading(false);
        return;
      }
      result = await login(email, password);
    } else {
      if (!name || !email || !password) {
        setError('Please fill all fields.');
        setIsLoading(false);
        return;
      }
      result = await signUp(name, email, password);
    }

    setIsLoading(false);
    if (result.user) {
      onLogin(result.user);
      onClose();
    } else if (result.error) {
      setError(result.error);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setError('');
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    resetForm();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] animate-fade-in" onClick={onClose}>
      <div className="bg-dark-bg border-2 border-cyan-glow/50 rounded-lg shadow-cyan-glow p-8 w-full max-w-md m-4 text-center transform transition-all" onClick={(e) => e.stopPropagation()}>
        <h2 className="font-orbitron text-2xl font-bold text-cyan-glow mb-2">{isLoginView ? 'Access Protocol' : 'Create Account'}</h2>
        <p className="font-tech text-cyan-glow/80 mb-6">
          {isLoginView ? 'Log in to your PromptCraft account.' : 'Join to start finding and reporting items.'}
        </p>

        <form onSubmit={handleAuthAction} className="space-y-4">
          {!isLoginView && (
            <InputField label="Name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          )}
          <InputField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" />
          <InputField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete={isLoginView ? 'current-password' : 'new-password'} />

          {error && <p className="text-red-400 font-tech text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 px-6 py-3 font-tech text-lg bg-cyan-glow text-dark-bg border-2 border-cyan-glow rounded-md font-bold transition-all duration-300 hover:shadow-cyan-glow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <CircuitryIcon className="h-6 w-6 animate-spin" />
            ) : (
              <span>{isLoginView ? 'Log In' : 'Sign Up'}</span>
            )}
          </button>
        </form>

        <div className="mt-6 font-tech text-cyan-glow/80">
          {isLoginView ? "Don't have an account? " : "Already have an account? "}
          <button onClick={toggleView} className="font-bold text-cyan-glow hover:underline">
            {isLoginView ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
