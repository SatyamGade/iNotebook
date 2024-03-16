import React, { Suspense, lazy } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Loader from './components/Loader'
import Navbar from './components/Navbar';
import "./app.css";
import RequiredAuth from './utils/RequiredAuth';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const NewNote = lazy(() => import('./pages/NewNote'));
const UpdateNote = lazy(() => import('./pages/UpdateNote'));
const Error = lazy(() => import('./pages/Error'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>

          <Route path='/' element={<RequiredAuth><Navbar /><Home /></RequiredAuth>} />
          <Route path='/newnote' element={<RequiredAuth><NewNote /></RequiredAuth>} />
          <Route path='/updatenote' element={<RequiredAuth><UpdateNote /></RequiredAuth>} />

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='*' element={<Error />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App