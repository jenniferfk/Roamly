# Roamly
Please note that since it was a project for company's bootcamp, the API(that provides with sign in and login features & the news content) was taken down. But you can check the logic of displaying and fetching in my code.
## 1- Introduction:
Roamly is a travel agency website that contains travel packages and global news so that the user
can be informed on the news of the world to know the safety, and fresh news of the country he’s
visiting.
## 2- Features:
- User can view the packages available in the website. I created the info of the packages
using serverless api endpoint with NextJs.
- User can login or sign up on the website using the APIs provided by the company.
- User, when logged in, can view the global news. Global news can load more (for
pagination and better optimization) and can load less. It’s only accessible when the user
is logged in.
To store the token, I used redux toolkit, redux and local storage. Local storage is the main
controller of the state of logged in but using Redux ensures consistency and scalability as the
application grows. If I later decide to introduce more complex state management requirements,
having Redux already in place could make it easier to accommodate these changes.
About the API calls, I tried creating an env file to put the APIs in it and I kept the way I tried to
call it, but for some reason it kept showing errors.
I used Formik for my forms and axios to help me post the form’s information into the API.

I chose Next JS instead of react + vite , for its feature of pre-rendering pages at build time and
for its ability to let me create serverless API endpoints within my Next.js application by creating
files inside the pages/api directory.
