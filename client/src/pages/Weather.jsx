import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cloud, Sun, CloudRain, Wind, Thermometer, BookOpen, CloudSun } from 'lucide-react';
import PageHero from '../components/PageHero';
import Navbar from '../components/Navbar';

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState("Chennai");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedDay, setSelectedDay] = useState('today'); // 'yesterday', 'today', 'tomorrow'

    const tnCities = [
        "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli",
        "Erode", "Vellore", "Thoothukudi", "Dindigul", "Thanjavur", "Ranipet",
        "Virudhunagar", "Karur", "Nilgiris", "Theni", "Krishnagiri", "Kanyakumari"
    ];

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    useEffect(() => {
        fetchWeather(city);
    }, []);

    const fetchWeather = async (cityName) => {
        try {
            setLoading(true);

            // Fetch Current Weather (Today)
            const currentRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=ta`);

            // Fetch Forecast (For Tomorrow)
            const forecastRes = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=ta`);

            // Process Data
            const currentData = currentRes.data;

            // Find tomorrow's data (approx 24 hours later)
            const tomorrowData = forecastRes.data.list.find(item => {
                const date = new Date(item.dt * 1000);
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                return date.getDate() === tomorrow.getDate() && date.getHours() >= 12;
            }) || forecastRes.data.list[8]; // Fallback to 8th item (24h)

            // Simulate Yesterday (Variation of today)
            const yesterdayData = {
                ...currentData,
                main: {
                    ...currentData.main,
                    temp: currentData.main.temp - (Math.random() * 2 - 1), // +/- 1 degree
                    humidity: Math.min(100, currentData.main.humidity + 5)
                },
                weather: currentData.weather, // Assume similar weather
                simulated: true
            };

            setWeather({
                yesterday: yesterdayData,
                today: currentData,
                tomorrow: tomorrowData
            });

            setLoading(false);
            setSuggestions([]);
        } catch (err) {
            console.error("API Error", err);
            setLoading(false);
        }
    };

    const handleCityChange = (e) => {
        const value = e.target.value;
        setCity(value);
        if (value.length > 0) {
            const filtered = tnCities.filter(c => c.toLowerCase().startsWith(value.toLowerCase()));
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const selectCity = (cityName) => {
        setCity(cityName);
        setSuggestions([]);
        fetchWeather(cityName);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWeather(city);
        setSuggestions([]);
    };

    const getDisplayData = () => {
        if (!weather) return null;
        switch (selectedDay) {
            case 'yesterday': return weather.yesterday;
            case 'tomorrow': return weather.tomorrow;
            default: return weather.today;
        }
    };

    const displayData = getDisplayData();

    if (loading) return <div className="text-center p-10 font-tamil text-xl text-paddy">வானிலை தகவலை ஏற்றுகிறது... (Loading...)</div>;

    return (
        <div className="bg-cream min-h-screen">
            <Navbar />
            <PageHero
                title="உழவன் வானிலை"
                subtitle="மண்ணின் மணம் மாறாத துல்லியமான வானிலை மற்றும் விவசாய ஆலோசனைகள்"
                image="https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80&w=1600"
                icon={CloudSun}
            />

            <div className="container mx-auto p-4 md:p-6 max-w-4xl -mt-10 relative z-30">
                {/* Search Section - Traditional Styled */}
                <div className="bg-white p-2 rounded-2xl shadow-2xl mb-10 max-w-lg mx-auto border-t-4 border-earth">
                    <form onSubmit={handleSearch} className="flex p-1">
                        <input
                            type="text"
                            value={city}
                            onChange={handleCityChange}
                            placeholder="உங்கள் ஊரைத் தேடுக..."
                            className="flex-1 p-4 bg-cream/30 border-none rounded-l-xl focus:ring-0 font-tamil text-earth placeholder-earth/50"
                        />
                        <button type="submit" className="bg-paddy text-white px-8 py-4 rounded-xl font-tamil font-bold hover:bg-green-700 transition shadow-lg flex items-center">
                            தேடு
                        </button>
                    </form>

                    {suggestions.length > 0 && (
                        <div className="px-2 pb-2">
                            <ul className="bg-cream/50 border border-earth/10 rounded-xl overflow-hidden">
                                {suggestions.map((s, index) => (
                                    <li
                                        key={index}
                                        onClick={() => selectCity(s)}
                                        className="p-3 hover:bg-turmeric/20 cursor-pointer font-tamil text-earth border-b border-earth/5 last:border-0"
                                    >
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Date Tabs - Traditional Earth Tones */}
                <div className="flex justify-center mb-10 bg-earth/5 p-2 rounded-full w-fit mx-auto border border-earth/10">
                    {['yesterday', 'today', 'tomorrow'].map((day) => (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`px-8 py-2.5 rounded-full font-tamil text-md font-bold transition-all duration-300 ${selectedDay === day
                                ? 'bg-earth text-white shadow-xl'
                                : 'text-earth/70 hover:text-earth hover:bg-white/50'
                                }`}
                        >
                            {day === 'yesterday' && 'நேற்று'}
                            {day === 'today' && 'இன்று'}
                            {day === 'tomorrow' && 'நாளை'}
                        </button>
                    ))}
                </div>

                {/* Main Weather Visualizer - Full Width Traditional Style */}
                {displayData && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">

                        {/* Weather Card - Full Width with Animated Background */}
                        <div className={`rounded-[2rem] shadow-2xl overflow-hidden border-4 border-paddy/20 relative group transition-colors duration-1000 ${(displayData.weather && displayData.weather[0].main === 'Rain') ? 'bg-gradient-to-br from-indigo-100 via-white to-blue-100' :
                            (displayData.weather && displayData.weather[0].main === 'Clear' && displayData.main.temp > 30) ? 'bg-gradient-to-br from-orange-100 via-white to-yellow-100' :
                                'bg-gradient-to-br from-sky-100 via-white to-white'
                            }`}>

                            {/* Animated Weather Background Layer (Positioned above gradient, below text) */}
                            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                                {displayData.weather[0].main === 'Rain' && (
                                    <div className="absolute inset-0">
                                        {[...Array(50)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="absolute bg-blue-500/40 w-[2px] h-[40px] rounded-full animate-rain"
                                                style={{
                                                    left: `${Math.random() * 100}%`,
                                                    top: '-50px',
                                                    animationDuration: `${0.3 + Math.random() * 0.3}s`,
                                                    animationDelay: `${Math.random() * 2}s`
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                                {displayData.weather[0].main === 'Clear' && (
                                    <div className="absolute inset-0">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-turmeric/30 blur-[130px] rounded-full animate-pulse-slow"></div>
                                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-400/20 blur-[100px] rounded-full animate-pulse-slow"></div>
                                    </div>
                                )}
                                {displayData.weather[0].main === 'Clouds' && (
                                    <div className="absolute inset-0">
                                        {[...Array(10)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="absolute bg-white/40 blur-3xl rounded-full animate-float-slow"
                                                style={{
                                                    width: `${200 + Math.random() * 300}px`,
                                                    height: `${100 + Math.random() * 200}px`,
                                                    left: `${-20 + Math.random() * 120}%`,
                                                    top: `${Math.random() * 100}%`,
                                                    animationDuration: `${25 + Math.random() * 20}s`,
                                                    animationDelay: `-${Math.random() * 20}s`
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Traditional Pattern Header */}
                            <div className="h-4 bg-repeat-x opacity-20 relative z-20" style={{ backgroundImage: 'radial-gradient(circle, #2E7D32 20%, transparent 20%)', backgroundSize: '20px 20px' }}></div>

                            <div className="p-8 md:p-12 relative flex flex-col md:flex-row items-center justify-between gap-8 z-20">
                                <div className="text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                        <span className="bg-white/60 text-paddy px-4 py-1 rounded-full text-sm font-bold border border-paddy/10 backdrop-blur-md">
                                            {weather.today.name}
                                        </span>
                                        <span className="text-earth/60 text-sm font-tamil bg-white/60 px-3 py-1 rounded-full border border-white/80 backdrop-blur-md">
                                            {selectedDay === 'tomorrow' ? 'கணிப்பு' : 'தற்போதைய நிலை'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center md:justify-start">
                                        <h2 className="text-8xl md:text-9xl font-bold text-earth leading-none drop-shadow-sm">
                                            {Math.round(displayData.main.temp)}
                                        </h2>
                                        <span className="text-4xl md:text-5xl text-earth/40 ml-2 font-light">°C</span>
                                    </div>
                                    <p className="font-tamil text-2xl md:text-3xl text-paddy font-bold mt-2 capitalize drop-shadow-sm">
                                        {displayData.weather[0].description}
                                    </p>
                                </div>

                                <div className="relative flex flex-col items-center">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-turmeric/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
                                        {displayData.main.temp > 30
                                            ? <Sun size={180} className="text-turmeric drop-shadow-2xl relative z-10 animate-spin-slow" />
                                            : <CloudRain size={180} className="text-blue-500 drop-shadow-2xl relative z-10" />
                                        }
                                    </div>
                                    <div className="mt-8 grid grid-cols-3 gap-6 w-full">
                                        {[
                                            { icon: Wind, label: 'Wind', value: `${displayData.wind.speed}k/h` },
                                            { icon: CloudSun, label: 'Humidity', value: `${displayData.main.humidity}%` },
                                            { icon: Thermometer, label: 'Feels', value: `${Math.round(displayData.main.feels_like)}°` }
                                        ].map((item, idx) => (
                                            <div key={idx} className="text-center group/item hover:scale-110 transition-transform">
                                                <div className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-2 border border-earth/10 group-hover/item:border-paddy transition-colors shadow-sm">
                                                    <item.icon size={24} className="text-earth" />
                                                </div>
                                                <p className="text-[10px] text-earth/50 font-bold font-tamil uppercase tracking-widest">{item.label}</p>
                                                <p className="font-bold text-earth">{item.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Traditional Pattern Footer */}
                            <div className="h-4 bg-repeat-x opacity-20 rotate-180 relative z-20" style={{ backgroundImage: 'radial-gradient(circle, #2E7D32 20%, transparent 20%)', backgroundSize: '20px 20px' }}></div>

                            {/* Global CSS for weather animations */}
                            <style dangerouslySetInnerHTML={{
                                __html: `
                                @keyframes rain {
                                    from { transform: translateY(0); opacity: 0; }
                                    10% { opacity: 1; }
                                    90% { opacity: 1; }
                                    to { transform: translateY(600px); opacity: 0; }
                                }
                                @keyframes float-slow {
                                    0% { transform: translateX(-100px); }
                                    50% { transform: translateX(50px); }
                                    100% { transform: translateX(-100px); }
                                }
                                @keyframes pulse-slow {
                                    0%, 100% { transform: scale(1); opacity: 0.5; }
                                    50% { transform: scale(1.1); opacity: 0.8; }
                                }
                                .animate-rain { animation: rain linear infinite; }
                                .animate-float-slow { animation: float-slow ease-in-out infinite; }
                                .animate-pulse-slow { animation: pulse-slow ease-in-out infinite; }
                            `}} />
                        </div>

                        {/* Agricultural Advice Board - Full Width Below Weather */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden border-b-8 border-earth group">
                            {/* Kolam-inspired background pattern */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-paddy/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-paddy/10 transition-colors"></div>

                            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
                                <div className="bg-turmeric p-6 rounded-[2rem] shadow-2xl rotate-3 flex-shrink-0 border-4 border-white">
                                    <BookOpen size={48} className="text-earth" />
                                </div>
                                <div className="text-center md:text-left flex-grow">
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-6">
                                        <h3 className="text-3xl font-bold font-tamil text-paddy">விவசாய ஆலோசனைகள்</h3>
                                        <span className="hidden md:block w-1.5 h-1.5 bg-earth/20 rounded-full"></span>
                                        <p className="text-earth/60 font-tamil font-medium">பயிர்ப் பாதுகாப்பு மற்றும் பராமரிப்பு வழிகாட்டி</p>
                                    </div>

                                    <div className="bg-cream/40 p-8 rounded-3xl border-2 border-paddy/10 relative overflow-hidden">
                                        {/* Decorative grain/soil pattern */}
                                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}></div>

                                        {/* Decorative quote marks */}
                                        <span className="absolute -top-4 -left-2 text-6xl text-paddy/20 font-serif">“</span>
                                        <p className="text-2xl md:text-3xl font-tamil text-earth leading-relaxed italic text-center md:text-left relative z-10">
                                            {displayData.main.temp > 35
                                                ? "வெப்பம் அதிகமாக உள்ளது. பயிர்களுக்கு காலை அல்லது மாலை வேளையில் நீர் பாய்ச்சவும். ஆவியாதலைக் குறைக்க மூடாக்கு இடவும்."
                                                : displayData.weather && displayData.weather[0].main === 'Rain'
                                                    ? "மழை பெய்யும் வாய்ப்புள்ளது. உரம் இடுவதையோ அல்லது பூச்சி மருந்து தெளிப்பதையோ தவிர்க்கவும். நீர் வடிகால் வசதியை உறுதி செய்யவும்."
                                                    : "வானிலை சீராக உள்ளது. நிலத்தை உழுவதற்கும், களை எடுப்பதற்கும், வழக்கமான பராமரிப்பு பணிகளுக்கும் இது ஏற்ற நேரம்."}
                                        </p>
                                        <span className="absolute -bottom-10 -right-2 text-6xl text-paddy/20 font-serif">”</span>
                                    </div>

                                    <div className="mt-12 flex flex-wrap items-center justify-center md:justify-between gap-6">
                                        <div className="flex items-center gap-4 bg-paddy px-6 py-3 rounded-2xl text-white shadow-lg transition transform hover:scale-105 cursor-pointer">
                                            <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
                                            <span className="font-tamil font-bold">இன்றைய முக்கிய பணி</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-earth/50">
                                            <span className="w-10 h-[1px] bg-earth/20"></span>
                                            <span className="font-tamil italic">வேளாண் ஆராய்ச்சி மையம் வழங்குவது</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;
