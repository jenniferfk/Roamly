import { setAccessToken } from '@/app/redux/slices/authSlice';
import { Post } from '@/interfaces/Posts';
import axios from 'axios';

interface FetchDataProps {
  page: number;
  storedAccessToken: string | null;
  storedRefreshToken: string | null;
  dispatch: any; 
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setIsListEnd: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const fetchData = async ({
  page,
  storedAccessToken,
  storedRefreshToken,
  dispatch,
  setPosts,
  setPage,
  setIsListEnd,
  setLoading,
}: FetchDataProps) => {
  setLoading(true);
  console.log('fetching with', storedAccessToken);

  try {
    if (!storedAccessToken) return;

    const response = await axios.get(
      `http://192.30.129.113:5837/posts?page=${page}&pageSize=10`,
      {
        headers: {
          Authorization: `Bearer ${storedAccessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (response && response.data && response.data.results) {
      setPosts(prevPosts => [...prevPosts, ...response.data.results]);
      setPage(prevPage => prevPage + 1); 
    } else {
      setIsListEnd(true); 
    }
  } catch (error) {
    if (error) {
      try {
        const refreshResponse = await axios.post(
          'http://192.30.129.113:5837/refresh-token',
          {
            refreshToken: storedRefreshToken,
          }
        );
        const newAccessToken = refreshResponse.data.accessToken;
        console.log('New Access Token:', newAccessToken);
        dispatch(setAccessToken(newAccessToken));
        localStorage.setItem('accessToken', newAccessToken);
        const refreshedResponse = await axios.get(
          `http://192.30.129.113:5837/posts?page=${page}&pageSize=10`,
          {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (refreshedResponse && refreshedResponse.data && refreshedResponse.data.results) {
          setPosts(prevPosts => [...prevPosts, ...refreshedResponse.data.results]);
          setPage(prevPage => prevPage + 1); 
        } else {
          setIsListEnd(true); 
        }
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
      }
    } else {
      console.error('Error fetching data:', error);
    }
  } finally {
    setLoading(false);
  }
};
