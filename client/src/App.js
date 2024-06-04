import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from './pages/UserProfile';
import Signin from './pages/Signin';
import Siginup from './pages/Siginup';
import { Provider } from 'react-redux'; 
import store from './redux/store';

function App() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate('/sign-in');
    }
  }, [token, navigate]);

  return (
    <Provider store={store}>
      <ToastContainer />
      <main className='main'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="sign-in" element={<Signin />} />
          <Route path="sign-up" element={<Siginup />} />
        </Routes>
      </main>
    </Provider>
  );
}

export default App;
