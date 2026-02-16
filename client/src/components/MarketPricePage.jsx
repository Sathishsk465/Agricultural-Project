import React, { useState, useEffect } from 'react';
import { fetchMarketPrices } from '../services/api';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { AlertCircle, Info, BarChart3 } from 'lucide-react';
import Navbar from './Navbar';
import PageHero from './PageHero';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const MarketPricePage = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [isPerKg, setIsPerKg] = useState(false);
    const [filters, setFilters] = useState({
        state: 'Tamil Nadu',
        district: '',
        market: '',
        commodity: ''
    });

    const [options, setOptions] = useState({
        states: ['Tamil Nadu', 'Gujarat', 'Maharashtra', 'Karnataka', 'Rajasthan', 'Uttar Pradesh', 'Punjab', 'Haryana', 'Kerala', 'Andhra Pradesh'],
        districts: [],
        markets: [],
        commodities: []
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        handleSearch();
    }, [filters.state]);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const params = {
                state: filters.state,
                district: filters.district || undefined,
                market: filters.market || undefined,
                commodity: filters.commodity || undefined
            };

            const result = await fetchMarketPrices(params);
            setData(result);

            if (result.length > 0) {
                const uniqueDistricts = [...new Set(result.map(item => item.district?.trim()).filter(Boolean))].sort();
                const uniqueMarkets = [...new Set(result.map(item => item.market?.trim()).filter(Boolean))].sort();
                const uniqueCommodities = [...new Set(result.map(item => item.commodity?.trim()).filter(Boolean))].sort();

                setOptions(prev => ({
                    ...prev,
                    districts: uniqueDistricts,
                    markets: uniqueMarkets,
                    commodities: uniqueCommodities
                }));
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Dynamic price calculation
    const formatPrice = (price) => {
        if (isPerKg) {
            return (Number(price) / 100).toFixed(2);
        }
        return price;
    };

    // Chart Data preparation
    const chartData = {
        labels: data.slice(0, 10).map(item => `${item.commodity} (${item.market})`),
        datasets: [
            {
                label: `Market Price (₹/${isPerKg ? 'kg' : '100kg'})`,
                data: data.slice(0, 10).map(item => isPerKg ? (item.modal_price / 100).toFixed(2) : item.modal_price),
                backgroundColor: 'rgba(46, 125, 50, 0.7)',
                borderColor: '#2E7D32',
                borderWidth: 1,
                borderRadius: 8,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-cream pb-10 font-tamil">
            <Navbar />
            <PageHero
                title="உழவன் சந்தை விலை நிலவரம்"
                subtitle="நேரடி சந்தை விலைகளை உடனுக்குடன் தெரிந்து கொள்ளுங்கள்"
                image="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600"
                icon={BarChart3}
            />
            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10">

                {/* Filters Section */}
                <section className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-green-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-earth mb-1">மாநிலம் (State)</label>
                            <select
                                name="state"
                                value={filters.state}
                                onChange={handleInputChange}
                                className="p-3 bg-green-50 border border-green-200 rounded-xl focus:ring-2 focus:ring-paddy outline-none transition-all"
                            >
                                {options.states.map(s => <option key={`state-${s}`} value={s}>{s}</option>)}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-earth mb-1">மாவட்டம் (District)</label>
                            <select
                                name="district"
                                value={filters.district}
                                onChange={handleInputChange}
                                className="p-3 bg-green-50 border border-green-200 rounded-xl focus:ring-2 focus:ring-paddy outline-none transition-all"
                            >
                                <option key="all-districts" value="">அனைத்து மாவட்டங்கள்</option>
                                {options.districts.map(d => <option key={`district-${d}`} value={d}>{d}</option>)}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-earth mb-1">சந்தை (Market)</label>
                            <select
                                name="market"
                                value={filters.market}
                                onChange={handleInputChange}
                                className="p-3 bg-green-50 border border-green-200 rounded-xl focus:ring-2 focus:ring-paddy outline-none transition-all"
                            >
                                <option key="all-markets" value="">அனைத்து சந்தைகள்</option>
                                {options.markets.map(m => <option key={`market-${m}`} value={m}>{m}</option>)}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-earth mb-1">பொருள் (Commodity)</label>
                            <select
                                name="commodity"
                                value={filters.commodity}
                                onChange={handleInputChange}
                                className="p-3 bg-green-50 border border-green-200 rounded-xl focus:ring-2 focus:ring-paddy outline-none transition-all"
                            >
                                <option key="all-commodities" value="">அனைத்து பொருட்கள்</option>
                                {options.commodities.map(c => <option key={`commodity-${c}`} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center gap-4">
                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className="px-8 py-3 bg-paddy text-white font-bold rounded-xl shadow-lg hover:bg-earth transition-colors flex items-center gap-2"
                        >
                            {loading ? (
                                <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                            ) : null}
                            தேடு (Search)
                        </button>
                    </div>
                </section>

                {/* Price Unit Toggle & Info */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 bg-white/50 p-4 rounded-2xl border border-green-100 shadow-sm">
                    <div className="flex items-center gap-2 text-earth text-sm font-medium">
                        <AlertCircle size={20} className="text-paddy" />
                        <span>அனைத்து விலைகளும் 100 கிலோ (குவிண்டால்) கணக்கிலானது.</span>
                        <span className="hidden md:inline text-gray-500 font-normal">(All prices are per Quintal - 100 kg)</span>
                    </div>
                    <button
                        onClick={() => setIsPerKg(!isPerKg)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-paddy text-white text-sm font-bold rounded-xl shadow-md hover:bg-earth transition-all active:scale-95"
                    >
                        <Info size={16} />
                        {isPerKg ? 'குவிண்டால் விலை காட்டு (Show per 100kg)' : 'ஒரு கிலோ விலை காட்டு (Show per KG)'}
                    </button>
                </div>

                {/* Dynamic Chart Section */}
                {data.length > 0 && !loading && (
                    <section className="bg-white rounded-3xl shadow-md p-6 mb-8 border border-green-100">
                        <h2 className="text-xl font-bold text-paddy mb-4 flex items-center gap-2">
                            விலை ஒப்பீடு (Market Price Trend)
                        </h2>
                        <div className="h-80 w-full">
                            <Bar
                                data={chartData}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } }
                                }}
                            />
                        </div>
                    </section>
                )}

                {/* Table Section */}
                <section className="bg-white rounded-3xl shadow-md overflow-hidden border border-green-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-paddy text-white border-b border-green-200">
                                <tr>
                                    <th className="p-5 whitespace-nowrap font-bold">மாவட்டம்</th>
                                    <th className="p-5 whitespace-nowrap font-bold">சந்தை</th>
                                    <th className="p-5 whitespace-nowrap font-bold">பொருள்</th>
                                    <th className="p-5 whitespace-nowrap font-bold">
                                        குறைந்த விலை <br />
                                        <span className="text-[11px] font-normal text-green-100">(₹ / {isPerKg ? 'kg' : '100 kg'})</span>
                                    </th>
                                    <th className="p-5 whitespace-nowrap font-bold">
                                        அதிக விலை <br />
                                        <span className="text-[11px] font-normal text-green-100">(₹ / {isPerKg ? 'kg' : '100 kg'})</span>
                                    </th>
                                    <th className="p-5 whitespace-nowrap font-bold">
                                        சந்தை விலை <br />
                                        <span className="text-[11px] font-normal text-green-100">(₹ / {isPerKg ? 'kg' : '100 kg'})</span>
                                    </th>
                                    <th className="p-5 whitespace-nowrap font-bold">தேதி</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="p-20 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-paddy border-t-transparent"></div>
                                                <p className="text-paddy font-semibold">தகவல்கள் சேகரிக்கப்படுகின்றன...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : data.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="p-20 text-center text-earth font-medium">
                                            தகவல்கள் ஏதும் கிடைக்கவில்லை. வேறு தேடலைப் பயன்படுத்தவும்.
                                        </td>
                                    </tr>
                                ) : (
                                    currentItems.map((item, index) => (
                                        <tr key={`row-${index}`} className="border-b border-green-50 hover:bg-green-50/50 transition-colors">
                                            <td className="p-5 text-earth">{item.district}</td>
                                            <td className="p-5 text-earth">{item.market}</td>
                                            <td className="p-5 font-bold text-paddy text-lg">{item.commodity}</td>
                                            <td className="p-5 text-earth font-medium">₹{formatPrice(item.min_price)}</td>
                                            <td className="p-5 text-earth font-medium">₹{formatPrice(item.max_price)}</td>
                                            <td className="p-5">
                                                <span className="inline-block px-4 py-1.5 bg-green-50 text-earth font-bold rounded-xl border border-green-100 shadow-sm text-lg">
                                                    ₹{formatPrice(item.modal_price)}
                                                </span>
                                            </td>
                                            <td className="p-5 text-sm text-gray-500 font-medium">{item.arrival_date}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {!loading && data.length > itemsPerPage && (
                        <div className="p-6 bg-green-50/50 flex justify-between items-center border-t border-green-100">
                            <p className="text-sm text-earth font-medium">
                                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, data.length)} of <span className="font-bold text-paddy">{data.length}</span> results
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => { setCurrentPage(prev => Math.max(prev - 1, 1)); window.scrollTo(0, 0); }}
                                    disabled={currentPage === 1}
                                    className="px-5 py-2.5 bg-white border border-green-200 text-earth font-bold rounded-xl shadow-sm disabled:opacity-50 hover:border-paddy transition-all"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => { setCurrentPage(prev => Math.min(prev + 1, totalPages)); window.scrollTo(0, 0); }}
                                    disabled={currentPage === totalPages}
                                    className="px-6 py-2.5 bg-paddy text-white font-bold rounded-xl shadow-md disabled:opacity-50 hover:bg-earth transition-all"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default MarketPricePage;
