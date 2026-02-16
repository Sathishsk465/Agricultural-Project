import React, { useState } from 'react';
import { Upload, Camera, AlertTriangle, CheckCircle, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import PageHero from '../components/PageHero';

const Diseases = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setResult(null);
        }
    };

    const analyzeImage = () => {
        if (!selectedImage) return;

        setAnalyzing(true);
        // Mock API Call
        setTimeout(() => {
            setAnalyzing(false);
            setResult({
                disease: "நெல் இலை கருகல் நோய் (Rice Blast)",
                confidence: 92,
                treatment: "டிரைசைக்ளோசோல் (Tricyclazole) 75 WP மருந்தினை ஒரு ஏக்கருக்கு 200 லிட்டர் நீரில் கலந்து தெளிக்கவும்.",
                prevention: "தழைச்சத்து உரங்களை அதிகமாக இடுவதை தவிர்க்கவும்."
            });
        }, 2000);
    };

    return (
        <div className="bg-cream min-h-screen pb-10">
            <Navbar />
            <PageHero
                title="பயிர் நோய் கண்டறிதல்"
                subtitle="உங்கள் பயிரின் புகைப்படத்தை பதிவேற்றி நோய்களை உடனுக்குடன் கண்டறியுங்கள்"
                image="https://img.freepik.com/premium-photo/indian-farmer-discussing-with-agronomist-farm-collecting-some-information_54391-5876.jpg"
                icon={Search}
            />
            <div className="container mx-auto p-6 max-w-4xl">

                <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                    <div className="mb-8">
                        {selectedImage ? (
                            <div className="relative inline-block">
                                <img src={selectedImage} alt="Crop" className="max-h-64 rounded-lg shadow-md mx-auto" />
                                <button onClick={() => setSelectedImage(null)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"><AlertTriangle size={16} /></button>
                            </div>
                        ) : (
                            <div className="border-4 border-dashed border-earth/30 rounded-xl p-10 flex flex-col items-center justify-center bg-cream/30">
                                <Upload size={60} className="text-earth mb-4" />
                                <p className="font-tamil text-lg mb-4 text-gray-600">பயிர் புகைப்படத்தை பதிவேற்றவும்</p>
                                <label className="bg-paddy text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-green-700 font-tamil flex items-center">
                                    <Camera className="mr-2" /> படம் எடு / தேர்வு செய்
                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                </label>
                            </div>
                        )}
                    </div>

                    {selectedImage && !result && (
                        <button
                            onClick={analyzeImage}
                            disabled={analyzing}
                            className={`px-8 py-3 rounded-lg font-bold font-tamil text-white text-lg ${analyzing ? 'bg-gray-400' : 'bg-turmeric hover:bg-yellow-600'} transition`}
                        >
                            {analyzing ? 'ஆராய்கிறது...' : 'நோயை கண்டுபிடி'}
                        </button>
                    )}

                    {result && (
                        <div className="mt-8 bg-green-50 p-6 rounded-xl border border-green-200 text-left animate-fade-in-up">
                            <div className="flex items-center mb-4">
                                <AlertTriangle className="text-red-500 mr-2" size={30} />
                                <h2 className="text-2xl font-bold font-tamil text-red-600">{result.disease}</h2>
                                <span className="ml-auto bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-bold">{result.confidence}% உறுதி</span>
                            </div>

                            <div className="mb-4">
                                <h3 className="font-bold font-tamil text-lg text-earth mb-1">தடுப்பு முறை:</h3>
                                <p className="font-tamil text-gray-700">{result.prevention}</p>
                            </div>

                            <div>
                                <h3 className="font-bold font-tamil text-lg text-earth mb-1">நிவாரணம்:</h3>
                                <p className="font-tamil text-gray-700 flex items-start">
                                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
                                    {result.treatment}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Diseases;
