import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from './components/Main'
import About from './components/About'
import Login from './components/Login'
import Register from './components/Register'
import ErrorPage from './components/ErrorPage';

import {SearchResults} from './components/Search'
import {FrontPage} from './components/Main'
import {Details} from './components/Details'

import MyAccount from './components/MyAccount';
import AIMovieFinder from './components/AIMovieFinder';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Main/>,
      },
      {
        path: "/search/:query",
        element: <SearchResults/>
      },
      {
        path: "/movie/:id",
        element: <Details/>
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/myAccount",
        element: <MyAccount />,
      },
      {
        path: "/findMovieAI",
        element: <AIMovieFinder />,
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

