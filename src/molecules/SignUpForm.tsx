import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import styles from '../styles/home.module.css';

const API_SIGNUP= process.env.API_SIGNUP || '';
const SignupForm = () => {
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: ''
  };


  const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {

    try {
      const response = await fetch(API_SIGNUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          token_expires_in: '30m', 
        }),
      });

      console.log(values);
    } catch (error) {
      console.log('Failed to sign up');
    }
    setSubmitting(false);
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
          <button type="submit" className={styles.signup_btn}>Signup</button>
        </Form>
      </Formik>
      </div>
  );
};

export default SignupForm;
