import React, { useState, useEffect, useContext } from 'react';
import { Phone, Star, Edit, Trash2, ShoppingBag } from 'lucide-react';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../services/api';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';
import PageHero from '../components/PageHero';

const Ecommerce = () => {
    const { user } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newProduct, setNewProduct] = useState({
        name: '',
        category: 'தானியங்கள்',
        description: '',
        price_per_kg: '',
        seller_name: '',
        location: '',
        whatsapp: '',
        image: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const data = await fetchProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProduct({ ...newProduct, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setNewProduct({
            name: product.name,
            category: product.category || 'தானியங்கள்',
            description: product.description || '',
            price_per_kg: product.price_per_kg,
            seller_name: product.seller_name || '',
            location: product.location,
            whatsapp: product.whatsapp || product.phone || '',
            image: product.image
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...newProduct,
                price_per_kg: Number(newProduct.price_per_kg)
            };

            if (editingProduct) {
                await updateProduct(editingProduct._id, payload);
            } else {
                await createProduct(payload);
            }

            setIsModalOpen(false);
            setEditingProduct(null);
            setNewProduct({ name: '', category: 'தானியங்கள்', description: '', price_per_kg: '', seller_name: '', location: '', whatsapp: '', image: '' });
            loadData();
        } catch (error) {
            alert(error.response?.data?.message || 'Error saving product');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                loadData();
            } catch (error) {
                alert(error.response?.data?.message || 'Error deleting product');
            }
        }
    };

    return (
        <div className="bg-cream min-h-screen pb-10">
            <Navbar />
            <PageHero
                title="விற்பனை சந்தை"
                subtitle="நேரடியாக விவசாயிகளிடம் இருந்து தரமான பொருட்களை வாங்குங்கள்"
                image="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=1600"
                icon={ShoppingBag}
            />
            <div className="container mx-auto p-6 relative">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white/30 p-4 rounded-xl backdrop-blur-sm border border-white/50">
                    <h1 className="text-2xl md:text-3xl font-bold font-tamil text-center md:text-left text-paddy">விவசாய பொருட்கள் விற்பனை</h1>

                    <div className="flex items-center">
                        {user ? (
                            <button
                                onClick={() => {
                                    setEditingProduct(null);
                                    setNewProduct({ name: '', category: 'தானியங்கள்', description: '', price_per_kg: '', seller_name: '', location: '', whatsapp: '', image: '' });
                                    setIsModalOpen(true);
                                }}
                                className="bg-paddy text-white px-4 py-2 rounded-lg font-tamil shadow-lg hover:bg-green-700 flex items-center transition whitespace-nowrap"
                            >
                                + உங்கள் பொருளை விற்க
                            </button>
                        ) : (
                            <p className="text-earth font-tamil bg-cream/50 px-4 py-2 rounded-lg border border-paddy/10">பொருட்களை விற்க உள்நுழையவும்</p>
                        )}
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-10 font-tamil text-paddy">ஏற்றப்படுகிறது...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div key={product._id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition duration-300 relative group flex flex-col h-full">
                                <img
                                    src={product.image || "https://via.placeholder.com/400x300?text=No+Image"}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />

                                {/* Ownership Buttons */}
                                {user && product.created_by && (product.created_by === user._id || product.created_by._id === user._id) && (
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        <button
                                            onClick={() => openEditModal(product)}
                                            className="p-2 bg-white rounded-full shadow-md text-paddy hover:text-green-700 transition"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="p-2 bg-white rounded-full shadow-md text-red-500 hover:text-red-700 transition"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                )}

                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-lg font-bold font-tamil mb-1">{product.name}</h3>
                                    <p className="text-sm text-gray-500 font-tamil mb-2">📍 {product.location} | வி: {product.created_by?.name || product.seller_name || 'விவசாயி'}</p>

                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xl font-bold text-paddy">₹{product.price_per_kg}/kg</span>
                                        <div className="flex items-center text-yellow-500">
                                            <Star size={16} fill="currentColor" />
                                            <span className="text-sm ml-1 text-gray-700">4.5</span>
                                        </div>
                                    </div>

                                    <a
                                        href={`https://wa.me/${product.whatsapp}?text=வணக்கம், நான் உங்கள் ${product.name} வாங்க விரும்புகிறேன்.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-auto block w-full text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-tamil flex justify-center items-center transition"
                                    >
                                        <Phone size={18} className="mr-2" />
                                        தொடர்புக்கு (WhatsApp)
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative animate-in fade-in zoom-in duration-300">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
                            >
                                ✕
                            </button>

                            <h2 className="text-2xl font-bold font-tamil text-paddy mb-4 text-center">
                                {editingProduct ? 'தகவலை மாற்றியமைக்க' : 'புதிய பொருள் சேர்க்க'}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-3 font-tamil">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">பொருள் பெயர்</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={newProduct.name}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-paddy outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">வகை (Category)</label>
                                    <select
                                        name="category"
                                        value={newProduct.category}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-paddy outline-none"
                                    >
                                        <option value="தானியங்கள்">தானியங்கள் (Grains)</option>
                                        <option value="காய்கறிகள்">காய்கறிகள் (Vegetables)</option>
                                        <option value="பழங்கள்">பழங்கள் (Fruits)</option>
                                        <option value="எண்ணெய் வித்துக்கள்">எண்ணெய் வித்துக்கள் (Oil Seeds)</option>
                                        <option value="மசாலா பொருட்கள்">மசாலா பொருட்கள் (Spices)</option>
                                        <option value="மற்றவை">மற்றவை (Others)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">விளக்கம் (Description)</label>
                                    <textarea
                                        name="description"
                                        value={newProduct.description}
                                        onChange={handleInputChange}
                                        rows="2"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-paddy outline-none"
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">விலை (₹/kg)</label>
                                        <input
                                            type="number"
                                            name="price_per_kg"
                                            required
                                            value={newProduct.price_per_kg}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-paddy outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">ஊர் / இடம்</label>
                                        <input
                                            type="text"
                                            name="location"
                                            required
                                            value={newProduct.location}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-paddy outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">விற்பனையாளர் பெயர்</label>
                                    <input
                                        type="text"
                                        name="seller_name"
                                        value={newProduct.seller_name}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-paddy outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp எண்</label>
                                    <input
                                        type="tel"
                                        name="whatsapp"
                                        required
                                        value={newProduct.whatsapp}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-paddy outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">படம்</label>
                                    <div className="space-y-2">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="text-sm text-gray-500"
                                        />
                                        <input
                                            type="text"
                                            name="image"
                                            value={newProduct.image}
                                            onChange={handleInputChange}
                                            placeholder="Or image URL"
                                            className="w-full border border-gray-300 rounded-lg p-2 text-xs"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-paddy text-white py-2 rounded-lg font-bold shadow hover:bg-green-700 transition mt-4"
                                >
                                    ✅ {editingProduct ? 'மாற்றங்களைச் சேமிக்கவும்' : 'விற்பனைக்கு சேர்க்கவும்'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Ecommerce;
