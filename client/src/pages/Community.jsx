import React, { useState } from 'react';
import { Send, ThumbsUp, MessageCircle, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import PageHero from '../components/PageHero';

const Community = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            user: "குமார்",
            district: "Salem",
            message: "எனது நெல் வயலில் இலை சுருட்டல் நோய் உள்ளது. என்ன மருந்து தெளிக்கலாம்?",
            likes: 12,
            comments: 4,
            time: "2 மணி நேரம் முன்"
        },
        {
            id: 2,
            user: "ராஜா",
            district: "Thanjavur",
            message: "நாளை தஞ்சாவூர் சந்தையில் நெல் விலை நிலவரம் எப்படி இருக்கும்?",
            likes: 8,
            comments: 2,
            time: "4 மணி நேரம் முன்"
        }
    ]);
    const [newMessage, setNewMessage] = useState("");

    const handlePost = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        const newPost = {
            id: posts.length + 1,
            user: "நான்", // Current user placeholder
            district: "Chennai",
            message: newMessage,
            likes: 0,
            comments: 0,
            time: "இப்போது"
        };
        setPosts([newPost, ...posts]);
        setNewMessage("");
    };

    return (
        <div className="bg-cream min-h-screen pb-10">
            <Navbar />
            <PageHero
                title="விவசாயிகள் குழு"
                subtitle="விவசாயிகள் தங்களுக்குள் ஆலோசனைகள் மற்றும் அனுபவங்களை பகிர்ந்து கொள்ளும் தளம்"
                image="https://img.freepik.com/premium-photo/indian-farmer-discussing-with-agronomist-farm-collecting-some-information_54391-5876.jpg"
                icon={Users}
            />
            <div className="container mx-auto p-4 max-w-3xl">

                {/* Post Input */}
                <div className="bg-white p-4 rounded-xl shadow-md mb-6">
                    <textarea
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-paddy font-tamil resize-none"
                        rows="3"
                        placeholder="உங்கள் கேள்விகள் அல்லது கருத்துக்களை பகிரவும்..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    ></textarea>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500 font-tamil">விவசாயம் சார்ந்ததை மட்டும் பகிரவும்.</span>
                        <button onClick={handlePost} className="bg-paddy text-white px-6 py-2 rounded-lg font-tamil hover:bg-green-700 flex items-center">
                            <Send size={16} className="mr-2" /> பதிவிடு
                        </button>
                    </div>
                </div>

                {/* Posts Feed */}
                <div className="space-y-4">
                    {posts.map(post => (
                        <div key={post.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-bold font-tamil text-earth">{post.user}</h3>
                                    <p className="text-xs text-gray-500">{post.district} • {post.time}</p>
                                </div>
                            </div>
                            <p className="font-tamil text-gray-800 text-lg mb-4">{post.message}</p>
                            <div className="flex items-center space-x-6 text-gray-500 border-t pt-2">
                                <button className="flex items-center hover:text-paddy transition">
                                    <ThumbsUp size={18} className="mr-1" /> <span className="text-sm">{post.likes}</span>
                                </button>
                                <button className="flex items-center hover:text-blue-500 transition">
                                    <MessageCircle size={18} className="mr-1" /> <span className="text-sm">{post.comments} கருத்துகள்</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Community;
