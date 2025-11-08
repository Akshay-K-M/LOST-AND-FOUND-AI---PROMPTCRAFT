import { User } from '../types';

// In a real app, this would be a secure backend, not localStorage!
const USERS_DB_KEY = 'lostfound_users';

interface StoredUser extends User {
    passwordHash: string; // Simulate a hashed password
}

const getUsers = (): StoredUser[] => {
    try {
        const users = localStorage.getItem(USERS_DB_KEY);
        return users ? JSON.parse(users) : [];
    } catch (e) {
        return [];
    }
};

const saveUsers = (users: StoredUser[]) => {
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
};

// --- Public API ---

export const signUp = async (name: string, email: string, password: string): Promise<{ user?: User; error?: string }> => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 500));

    const users = getUsers();
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
        return { error: 'An account with this email already exists.' };
    }

    const newUser: StoredUser = {
        name,
        email,
        passwordHash: password, // In a real app, hash and salt this!
    };
    
    saveUsers([...users, newUser]);

    return { user: { name: newUser.name, email: newUser.email } };
};

export const login = async (email: string, password: string): Promise<{ user?: User; error?: string }> => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 500));
    
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user || user.passwordHash !== password) {
        return { error: 'Invalid email or password.' };
    }

    return { user: { name: user.name, email: user.email } };
};
