import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Post } from './Post';
import type { Post as PostType } from '../types';

const MOCK_POSTS: PostType[] = [
  {
    id: '1',
    userId: '1',
    user: {
      id: '1',
      username: 'traveler',
      avatar: '',
      followers: 1200,
      following: 300
    },
    mediaUrl: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    caption: 'Beautiful sunset at the beach! 🌅',
    likes: 1234,
    comments: 56,
    shares: 12,
    timestamp: new Date().toISOString()
  },
  {
    id: '2',
    userId: '2',
    user: {
      id: '2',
      username: 'foodie',
      avatar: '',
      followers: 800,
      following: 400
    },
    mediaUrl: 'https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f',
    caption: 'Trying out this new recipe! 🍜',
    likes: 856,
    comments: 32,
    shares: 8,
    timestamp: new Date().toISOString()
  }
];

export function Feed() {
  return (
    <div className="flex flex-col items-center min-h-screen pt-16 bg-black">
      {MOCK_POSTS.map((post) => (
        <PostContainer key={post.id} post={post} />
      ))}
    </div>
  );
}

function PostContainer({ post }: { post: PostType }) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false
  });

  return (
    <div 
      ref={ref} 
      className="w-full max-w-md mb-4"
    >
      <Post 
        post={post} 
        isVisible={inView}
        onLike={() => console.log('Like clicked')}
        onComment={() => console.log('Comment clicked')}
        onShare={() => console.log('Share clicked')}
      />
    </div>
  );
}