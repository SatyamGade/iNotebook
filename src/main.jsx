import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { JWTProvider } from './contexts/JwtProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <JWTProvider>
    <React.StrictMode>
      <App />
      <ToastContainer autoClose={1700}/>
    </React.StrictMode>
  </JWTProvider>,
)
