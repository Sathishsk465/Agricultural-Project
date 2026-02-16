import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { X } from 'lucide-react';

const AuthModal = () => {
    const { login, register, user } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        district: 'Chennai',
        village: '',
        crops: '',
        location: { latitude: 0, longitude: 0 }
    });
    const [error, setError] = useState('');

    // Tamil Nadu Districts List (Simplified)
    const districts = [
        "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
    ];

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setFormData(prev => ({
                    ...prev,
                    location: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                }));
            });
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        let res;
        if (isLogin) {
            res = await login(formData.phone);
        } else {
            const cropsArray = formData.crops.split(',').map(c => c.trim());
            res = await register({ ...formData, crops: cropsArray });
        }

        if (!res.success) {
            setError(res.message);
        }
    };

    if (user) return null;

    return (
        <div className="fixed inset-0  bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-cream p-8 rounded-2xl shadow-2xl w-full max-w-md border-4 border-green-600">
                <h2 className="text-2xl font-bold font-tamil text-center text-paddy mb-6">
                    {isLogin ? 'உழவர் நுழைவு' : 'புதிய கணக்கு'}
                </h2>

                {error && <p className="text-red-500 text-center mb-4 font-tamil">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4 font-tamil">
                    {!isLogin && (
                        <>
                            <input type="text" name="name" placeholder="பெயர்" onChange={handleChange} className="w-full p-3 border border-earth rounded bg-white focus:outline-none focus:ring-2 focus:ring-paddy" required />
                            <select name="district" onChange={handleChange} className="w-full p-3 border border-earth rounded bg-white focus:outline-none focus:ring-2 focus:ring-paddy">
                                {districts.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                            <input type="text" name="village" placeholder="கிராமம்" onChange={handleChange} className="w-full p-3 border border-earth rounded bg-white focus:outline-none focus:ring-2 focus:ring-paddy" required />
                            <input type="text" name="crops" placeholder="பயிர்கள் (கற்பூரம், நெல்...)" onChange={handleChange} className="w-full p-3 border border-earth rounded bg-white focus:outline-none focus:ring-2 focus:ring-paddy" />
                        </>
                    )}
                    <input type="tel" name="phone" placeholder="தொலைபேசி எண்" onChange={handleChange} className="w-full p-3 border border-earth rounded bg-white focus:outline-none focus:ring-2 focus:ring-paddy" required />

                    <button type="submit" className="w-full bg-paddy text-white py-3 rounded-lg font-bold hover:bg-green-700 transition transform hover:scale-105">
                        {isLogin ? 'உள்ளே செல்' : 'பதிவு செய்'}
                    </button>
                </form>

                <p className="text-center mt-4 font-tamil text-earth">
                    {isLogin ? 'கணக்கு இல்லையா? ' : 'ஏற்கனவே கணக்கு உள்ளதா? '}
                    <button onClick={() => setIsLogin(!isLogin)} className="text-paddy font-bold underline">
                        {isLogin ? 'பதிவு செய்யவும்' : 'நுழைவு'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthModal;
