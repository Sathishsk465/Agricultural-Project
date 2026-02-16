import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, CloudRain, ShoppingCart, Activity, Users, BookOpen, User, LogOut, Menu, X } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import logo from '../assets/yer_pazhagu_logo.png';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-green-600 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 flex justify-between items-center h-16 md:h-20">
                <Link to="/" className="flex items-center space-x-2">
                    <img className='w-12 md:w-16 lg:w-20' src={logo} alt="logo" />
                    <span className="text-xl md:text-2xl font-bold font-tamil">ஏர் பழகு</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex space-x-2 xl:space-x-6 items-center font-bold font-tamil text-sm xl:text-md">
                    <Link to="/weather" className="flex items-center hover:text-turmeric transition px-2 py-1"><CloudRain size={18} className="mr-1" /> வானிலை</Link>
                    <Link to="/market" className="flex items-center hover:text-turmeric transition px-2 py-1"><Activity size={18} className="mr-1" /> சந்தை விலை</Link>
                    <Link to="/ecommerce" className="flex items-center hover:text-turmeric transition px-2 py-1"><ShoppingCart size={18} className="mr-1" /> விற்பனை</Link>
                    <Link to="/diseases" className="flex items-center hover:text-turmeric transition px-2 py-1"><span className="mr-1">🌿</span> நோய் அறிதல்</Link>
                    <Link to="/advisory" className="flex items-center hover:text-turmeric transition px-2 py-1"><BookOpen size={18} className="mr-1" /> திட்டங்கள்</Link>
                    <Link to="/community" className="flex items-center hover:text-turmeric transition px-2 py-1"><Users size={18} className="mr-1" /> சமூகம்</Link>
                </div>

                <div className="flex items-center space-x-2 md:space-x-4">
                    {user ? (
                        <div className="hidden sm:flex items-center space-x-2">
                            <div className="flex items-center space-x-1 md:space-x-2">
                                <User size={18} />
                                <span className="font-tamil text-sm hidden xl:inline-block">{user.name}</span>
                            </div>
                            <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-2 md:px-3 py-1 rounded text-xs md:text-sm font-tamil">
                                <LogOut size={16} />
                            </button>
                        </div>
                    ) : (
                        <span className="hidden sm:inline font-tamil text-xs md:text-sm">வரவேற்கிறோம்</span>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 hover:bg-green-700 rounded-lg transition"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            {isMenuOpen && (
                <div className="lg:hidden bg-green-700 border-t border-green-500 font-tamil p-4 space-y-4 animate-in slide-in-from-top duration-300">
                    <Link to="/weather" onClick={() => setIsMenuOpen(false)} className="flex items-center py-2 hover:bg-green-600 px-3 rounded-lg"><CloudRain size={20} className="mr-3" /> வானிலை</Link>
                    <Link to="/market" onClick={() => setIsMenuOpen(false)} className="flex items-center py-2 hover:bg-green-600 px-3 rounded-lg"><Activity size={20} className="mr-3" /> சந்தை விலை</Link>
                    <Link to="/ecommerce" onClick={() => setIsMenuOpen(false)} className="flex items-center py-2 hover:bg-green-600 px-3 rounded-lg"><ShoppingCart size={20} className="mr-3" /> விற்பனை சந்தை</Link>
                    <Link to="/diseases" onClick={() => setIsMenuOpen(false)} className="flex items-center py-2 hover:bg-green-600 px-3 rounded-lg"><span className="mr-3">🌿</span> நோய் கண்டறிதல்</Link>
                    <Link to="/advisory" onClick={() => setIsMenuOpen(false)} className="flex items-center py-2 hover:bg-green-600 px-3 rounded-lg"><BookOpen size={20} className="mr-3" /> விவசாய திட்டங்கள்</Link>
                    <Link to="/community" onClick={() => setIsMenuOpen(false)} className="flex items-center py-2 hover:bg-green-600 px-3 rounded-lg"><Users size={20} className="mr-3" /> விவசாயக் குழுக்கள்</Link>

                    {user && (
                        <div className="pt-4 border-t border-green-500 flex justify-between items-center">
                            <span className="font-bold flex items-center"><User size={18} className="mr-2" /> {user.name}</span>
                            <button onClick={() => { logout(); setIsMenuOpen(false); }} className="bg-red-500 px-4 py-2 rounded-lg text-sm">வெளியேறு</button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
