'use client'
import { setAccessToken, setRefreshToken } from '@/app/redux/slices/authSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import styles from '../styles/home.module.css';
import { Post } from '@/interfaces/Posts';
import NewsCard from '@/molecules/NewsCard';
import { fetchData } from '@/molecules/FetchData';

export default function NewsContent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); 
  const [isListEnd, setIsListEnd] = useState(false);
  const dispatch = useDispatch();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const openModal = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showLess = () => {
    setPosts(prevPosts => prevPosts.slice(0, 10)); 
    setShowAllPosts(false);
  };

  const loadMore = () => {
    fetchData({
      page,
      storedAccessToken,
      storedRefreshToken,
      dispatch,
      setPosts,
      setPage,
      setIsListEnd,
      setLoading,
    });
  };
const storedAccessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
const storedRefreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken'):null;

  useEffect(() => {
    if (storedAccessToken && storedRefreshToken) {
      dispatch(setAccessToken(storedAccessToken));
      dispatch(setRefreshToken(storedRefreshToken));
      setIsLoggedIn(true);
    }
  }, [storedAccessToken]);
  useEffect(() => {
    if (isLoggedIn) {
      fetchData({
        page,
        storedAccessToken,
        storedRefreshToken,
        dispatch,
        setPosts,
        setPage,
        setIsListEnd,
        setLoading,
      });
    }
  }, [isLoggedIn]);
  return (
    <>
    <div className="flex flex-col items-center justify-center mx-4">
    <h1 className={`text-3xl font-bold mb-4 ${styles.ItaFont}`}>Global News</h1>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {posts
  .filter((post, index, self) => 
    index === self.findIndex((p) => (
      p._id === post._id
    ))
  )
  .map(post => (
    post.image_url && (
      <NewsCard key={post._id} post={post} onClick={() => openModal(post)}/>
    )
  ))
}
</div>
  <div className='justify-center align-center text-center animate-pulse'>
    {loading && <p>Loading...</p>}
    {isListEnd && <p>No more posts to load.</p>}
        {!isListEnd && !loading && isLoggedIn && (
          <button onClick={loadMore} className="text-center hover:bg-blue-600 text-black px-4 py-2 rounded">
            Load More
          </button>
        )}
        {!showAllPosts  && isLoggedIn && (
        <button onClick={showLess}>
          Show Less
        </button>
      )}
        {!isLoggedIn && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-600 h-28 rounded-lg p-4 filter blur-sm">
              <h3 className="text-xl mb-2">Please login to see global news</h3>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="text-xl mb-2">Please login to see global news</h3>
            </div>
            <div className="bg-red-400 rounded-lg p-4 filter blur-sm">
              <h3 className="text-xl mb-2">Please login to see global news</h3>
            </div>
          </div>
        )}
        </div>
        {isModalOpen && selectedPost && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-8 rounded-lg max-w-lg h-3/4 overflow-y-auto">
      <button onClick={closeModal} className="text-black font-bold bg-gray-800 hover:bg-gray-600 text-white px-4 py-2 rounded mt-4">X</button>
      <h2 className="text-2xl font-bold mb-4">{selectedPost.title}</h2>
      <img src={selectedPost.image_url} alt={selectedPost.title} className="w-full h-48 object-cover mb-4" />
      <p className="text-gray-700">{selectedPost.description}</p>
      <p className="text-gray-500">{selectedPost.pubDate}</p>
    </div>
  </div>
)}
</>
  )
}
