import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Navbar from './components/Navbar';

import Weather from './pages/Weather';
import Market from './pages/Market';
import Ecommerce from './pages/Ecommerce';
import Diseases from './pages/Diseases';
import Advisory from './pages/Advisory';
import Community from './pages/Community';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-cream min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/market" element={<Market />} />
            <Route path="/ecommerce" element={<Ecommerce />} />
            <Route path="/diseases" element={<Diseases />} />
            <Route path="/advisory" element={<Advisory />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
