
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Auth from "./pages/auth/Auth";

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import Cart from './pages/cart/Cart';
import Fav from './pages/fav/Fav';


function App() {
 
  const token = JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={token ? <Home /> : <Auth />}  />
        <Route path="/home"  element={<Home />} />
        <Route path="/cart"  element={<Cart />} />
        <Route path="/fav"  element={<Fav />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
