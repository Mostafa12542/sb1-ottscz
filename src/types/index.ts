export interface User {
  id: string;
  username: string;
  avatar: string;
  followers: number;
  following: number;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  mediaUrl: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
}