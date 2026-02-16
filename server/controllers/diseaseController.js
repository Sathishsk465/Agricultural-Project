exports.identifyDisease = async (req, res) => {
    try {
        // In a real app, this would process an image via AI
        const mockDiagnosis = {
            diseaseName: 'இலை கருகல் நோய் (Leaf Blight)',
            confidence: 94,
            symptoms: 'இலைகளில் பழுப்பு நிற புள்ளிகள் தோன்றி விரைவாக பரவும்.',
            solution: 'வேப்ப எண்ணெய் கரைசல் தெளிக்கவும். பாதிக்கப்பட்ட இலைகளை அப்புறப்படுத்தவும்.',
            image: 'https://images.unsplash.com/photo-1599403565153-f75608bfa635?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        };
        res.json(mockDiagnosis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
