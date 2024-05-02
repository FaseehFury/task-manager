import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { QueryClientProvider, QueryClient } from "react-query";
import Layout from './components/layouts/main';
import User from './components/Createuser';
import Home from './components/AddTask';

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient();

const AuthContext = createContext()
root.render(
  <React.StrictMode>
    <AuthContext.Provider value={{ name: 'Adeel', email: 'adeel@gmail.com' }}>

      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/layouts' element={<Layout />}>
              <Route path='home' element={<Home />} />
              <Route path='user' element={<User />} />
            </Route>


          </Routes>
        </BrowserRouter>

      </QueryClientProvider>
    </AuthContext.Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export { AuthContext }
