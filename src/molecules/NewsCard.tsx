import { Post } from '@/interfaces/Posts';
import React from 'react';

interface NewsCardProps {
    post:Post;
    onClick: () => void;
}
const NewsCard = ({ post, onClick }:NewsCardProps) => {
  return (
    <div className="bg-white rounded-lg p-4" onClick={onClick}>
      <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover mb-4" />
      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
    </div>
  );
};

export default NewsCard;
