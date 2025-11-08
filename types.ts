export interface User {
  name: string;
  email: string;
}

export enum ItemStatus {
  Lost = 'LOST',
  Found = 'FOUND',
}

export interface Item {
  id: string;
  name: string;
  description: string;
  location: string;
  date: string; // ISO string format
  status: ItemStatus;
  contactInfo: string;
  imageUrl?: string;
  userId: string;
}

export enum Page {
  Landing,
  Browse,
  PostItem,
}
