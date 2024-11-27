import React, { useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import type { Post as PostType } from '../types';

interface PostProps {
  post: PostType;
  isVisible: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

export function Post({ post, isVisible, onLike, onComment, onShare }: PostProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVisible]);

  const isVideo = post.mediaUrl.endsWith('.mp4');

  return (
    <div className="bg-black border-b border-gray-800">
      <div className="relative aspect-[9/16]">
        {isVideo ? (
          <video
            ref={videoRef}
            src={post.mediaUrl}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={post.mediaUrl}
            alt={post.caption}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          <img
            src={post.user.avatar || 'https://via.placeholder.com/40'}
            alt={post.user.username}
            className="w-10 h-10 rounded-full mr-2"
          />
          <span className="text-white font-bold">@{post.user.username}</span>
        </div>
        
        <p className="text-white mb-4">{post.caption}</p>
        
        <div className="flex items-center space-x-6">
          <button onClick={onLike} className="flex items-center text-white">
            <Heart className="w-6 h-6 mr-1" />
            <span>{post.likes}</span>
          </button>
          
          <button onClick={onComment} className="flex items-center text-white">
            <MessageCircle className="w-6 h-6 mr-1" />
            <span>{post.comments}</span>
          </button>
          
          <button onClick={onShare} className="flex items-center text-white">
            <Share2 className="w-6 h-6 mr-1" />
            <span>{post.shares}</span>
          </button>
        </div>
      </div>
    </div>
  );
}