import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import styles from '../styles/home.module.css';
import { setAccessToken, setRefreshToken } from '@/app/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

//const API_LOGIN= process.env.API_LOGIN || '';

const LoginForm = () => {
  const initialValues = {
    email: '',
    password: ''
  };
const dispatch= useDispatch();
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      setLoading(true);
  
      const response = await axios.post('http://192.30.129.113:5837/login', {
        email: values.email,
        password: values.password,
        token_expires_in: '15m',
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        maxRedirects: 0,
        responseType: 'json'
      });
  
      console.log('Response:', response);
  
      const data = response.data;
  
      console.log('Response Data:', data);
  
      if (response.status === 200) {
        if (data.accessToken && data.refreshToken) {
          const { accessToken, refreshToken } = data;
          dispatch(setAccessToken(accessToken));
          dispatch(setRefreshToken(refreshToken));
          localStorage.setItem('accessToken', accessToken); 
          localStorage.setItem('refreshToken', refreshToken); 
          localStorage.setItem('isAuthenticated', 'true');
          console.log('Authentication successful.');
          console.log('Access', accessToken);
          console.log('Refreshr', refreshToken);
        } else {
          console.log('Access token or refresh token missing in response data.');
          alert('Access token or refresh token missing in response data.');
        }
      } else if (response.status === 400) {
        console.log('User not found.');
        alert('User not found');
      } else if (response.status === 401) {
        console.log('Invalid password.');
        alert('Invalid password');
      } else {
        console.log('Internal server error. Please try again later.');
        alert('Internal server error. Please try again later.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setLoginError('Invalid email or password');
    }finally {
      setLoading(false); 
      setSubmitting(false);
    }
  };
  
  return (
    <div className={styles.card}>
    <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <Field type="email" name="email" placeholder="Email Address" className={styles.email} />
          <ErrorMessage name="email" component="div" className={styles.error} />
          <Field type="password" name="password" placeholder="Password" className={styles.pass} />
          <ErrorMessage name="password" component="div" className={styles.error} />
          <button type="submit" className={styles.login_btn} disabled={loading}> 
              {loading ? 'Loading...' : 'Login'} 
            </button>
          {loginError && <div className={styles.error}>{loginError}</div>}
        </Form>
      </Formik>
      </div>
  );
};

export default LoginForm;
