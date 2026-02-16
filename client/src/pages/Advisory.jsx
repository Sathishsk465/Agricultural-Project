import React, { useState, useEffect } from 'react';
import { Search, Filter, ExternalLink, Leaf, Info, Shovel, Landmark, ShieldCheck, BookOpenText } from 'lucide-react';
import { fetchSchemes } from '../services/api';
import Navbar from '../components/Navbar';
import PageHero from '../components/PageHero';

const Advisory = () => {
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        category: 'All',
        min_land: ''
    });

    const categories = [
        'All',
        'Income Support',
        'Insurance',
        'Credit',
        'Infrastructure',
        'Advisory',
        'Organic Farming',
        'Sustainability',
        'Machinery Subsidy',
        'Horticulture',
        'Irrigation'
    ];

    const landOptions = [
        { label: 'All Sizes', value: '' },
        { label: '0 Acres', value: '0' },
        { label: '1 Acre', value: '1' },
        { label: '3 Acres', value: '3' },
        { label: '5 Acres', value: '5' },
        { label: '10 Acres', value: '10' }
    ];

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            loadSchemes();
        }, 500); // 500ms debounce

        return () => clearTimeout(timeoutId);
    }, [filters.search, filters.category, filters.min_land]);

    const loadSchemes = async () => {
        try {
            setLoading(true);
            const params = {
                search: filters.search,
                category: filters.category === 'All' ? undefined : filters.category,
                min_land: filters.min_land || undefined
            };
            const data = await fetchSchemes(params);
            setSchemes(data);
        } catch (error) {
            console.error('Error loading schemes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-cream pb-20 font-tamil">
            <Navbar />
            <PageHero
                title="வேளாண் திட்டங்கள் மற்றும் மானியங்கள்"
                subtitle="அரசு வழங்கும் விவசாய உதவித் திட்டங்கள் மற்றும் மானியங்கள் பற்றிய முழு விவரங்கள்"
                image="https://images.seekhoapp.com/blog-image/compressed-banner/9a7ed327-f2b4-4d66-9fb5-473317fb5a76/2b1dfd5a179b4b909dc8cca8b2cddea3.webp"
                icon={BookOpenText}
            />
            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10">

                {/* Filters Section */}
                <section className="bg-white rounded-3xl shadow-lg p-6 mb-10 border border-green-100 flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-grow w-full space-y-2">
                        <label className="text-sm font-bold text-earth flex items-center gap-1 ml-1">
                            <Search size={14} /> தேடு (Search)
                        </label>
                        <input
                            type="text"
                            name="search"
                            value={filters.search}
                            onChange={handleFilterChange}
                            placeholder="திட்டம் அல்லது விவரங்களைத் தேடு..."
                            className="w-full bg-green-50 border border-green-100 rounded-2xl p-3.5 focus:ring-2 focus:ring-paddy outline-none transition-all"
                        />
                    </div>

                    <div className="w-full md:w-60 space-y-2">
                        <label className="text-sm font-bold text-earth flex items-center gap-1 ml-1">
                            <Filter size={14} /> வகை (Category)
                        </label>
                        <select
                            name="category"
                            value={filters.category}
                            onChange={handleFilterChange}
                            className="w-full bg-green-50 border border-green-100 rounded-2xl p-3.5 focus:ring-2 focus:ring-paddy outline-none transition-all cursor-pointer"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="w-full md:w-60 space-y-2">
                        <label className="text-sm font-bold text-earth flex items-center gap-1 ml-1">
                            <Shovel size={14} /> நிலத்தின் அளவு (Min Land)
                        </label>
                        <select
                            name="min_land"
                            value={filters.min_land}
                            onChange={handleFilterChange}
                            className="w-full bg-green-50 border border-green-100 rounded-2xl p-3.5 focus:ring-2 focus:ring-paddy outline-none transition-all cursor-pointer"
                        >
                            {landOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                </section>

                {/* Schemes Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white rounded-3xl h-[500px] animate-pulse shadow-sm" />
                        ))}
                    </div>
                ) : schemes.length === 0 ? (
                    <div className="bg-white p-20 rounded-3xl text-center shadow-sm border border-green-50">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-6">
                            <Info size={40} className="text-paddy" />
                        </div>
                        <h3 className="text-2xl font-bold text-earth mb-2">திட்டங்கள் எதுவும் இல்லை</h3>
                        <p className="text-gray-500">உங்கள் அளவுகோல்களுடன் பொருந்தக்கூடிய திட்டங்கள் எதுவும் இல்லை.</p>
                        <button
                            onClick={() => setFilters({ search: '', category: 'All', min_land: '' })}
                            className="mt-6 text-paddy font-bold underline"
                        >
                            அனைத்து திட்டங்களையும் காட்டு
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {schemes.map((scheme) => (
                            <div key={scheme.scheme_id} className="bg-white rounded-3xl shadow-md overflow-hidden border border-green-100 flex flex-col hover:shadow-xl transition-all duration-300 group">
                                {/* Image */}
                                <div className="h-52 overflow-hidden relative">
                                    <img
                                        src={scheme.image_url}
                                        alt={scheme.scheme_name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800";
                                        }}
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-paddy/90 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                                            {scheme.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-grow flex flex-col">
                                    <h2 className="text-xl font-bold text-paddy mb-3 line-clamp-2">{scheme.scheme_name}</h2>

                                    <p className="text-gray-600 text-sm mb-6 line-clamp-2">{scheme.description}</p>

                                    <div className="space-y-4 mb-6">
                                        <div className="bg-green-50/50 p-4 rounded-2xl">
                                            <h4 className="text-xs font-bold text-paddy uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <Leaf size={14} /> பலன்கள் (Benefits)
                                            </h4>
                                            <p className="text-sm text-earth leading-relaxed">{scheme.benefits}</p>
                                        </div>

                                        <div className="border border-green-50 p-4 rounded-2xl">
                                            <h4 className="text-xs font-bold text-earth uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <ShieldCheck size={14} /> தகுதி (Eligibility)
                                            </h4>
                                            <p className="text-sm text-gray-600 leading-relaxed">{scheme.eligibility}</p>
                                        </div>
                                    </div>

                                    {/* Highlight Box */}
                                    <div className="mt-auto pt-4 flex flex-col gap-4">
                                        <div className="bg-earth text-white rounded-2xl p-4 text-center">
                                            <p className="text-xs font-medium uppercase opacity-80 mb-1">Land Requirement</p>
                                            <p className="font-bold text-lg">{scheme.approximate_land_acres}</p>
                                        </div>

                                        <a
                                            href={scheme.official_apply_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full bg-paddy text-sm text-white py-4 px-4 rounded-2xl font-bold shadow-md hover:bg-green-700 transition-all flex items-center justify-center gap-2 active:scale-95"
                                        >
                                            <ExternalLink size={18} />
                                            இப்பொழுதே விண்ணப்பிக்கவும் (Apply Now)
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Advisory;
